import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import type { DeskSeason } from "@/hooks/useDeskSeason";
import { calendarSources, eventsForYear, eventsOnDate, formatDay, isoDate, moods, type Mood } from "@/lib/calendar";

const previews: { mood: Mood; date: string; label: string; region: string }[] = [
  { mood: "independence", date: "2026-07-04", label: "Fourth of July", region: "US" },
  { mood: "thanksgiving", date: "2026-11-26", label: "Thanksgiving", region: "US" },
  { mood: "christmas", date: "2026-12-25", label: "Christmas", region: "US" },
  { mood: "newyear", date: "2027-01-01", label: "New Year", region: "US" },
  { mood: "halloween", date: "2026-10-31", label: "Halloween", region: "US" },
  { mood: "memorial", date: "2026-05-25", label: "Memorial Day", region: "US" },
  { mood: "veterans", date: "2026-11-11", label: "Veterans Day", region: "US" },
  { mood: "juneteenth", date: "2026-06-19", label: "Juneteenth", region: "US" },
  { mood: "mlk", date: "2026-01-19", label: "MLK Day", region: "US" },
  { mood: "labor", date: "2026-09-07", label: "Labor Day", region: "US" },
  { mood: "presidents", date: "2026-02-16", label: "Presidents’ Day", region: "US" },
  { mood: "holi", date: "2026-03-02", label: "Holi", region: "NP" },
  { mood: "nepalnewyear", date: "2026-04-14", label: "Nepali New Year", region: "NP" },
  { mood: "monsoon", date: "2026-07-15", label: "Monsoon", region: "NP" },
  { mood: "dashain", date: "2026-10-20", label: "Dashain", region: "NP" },
  { mood: "buddha", date: "2026-05-01", label: "Buddha Jayanti", region: "NP" },
  { mood: "teej", date: "2026-09-14", label: "Teej", region: "NP" },
  { mood: "chhath", date: "2026-11-15", label: "Chhath", region: "NP" },
  { mood: "shivaratri", date: "2027-03-06", label: "Shivaratri", region: "NP" },
  { mood: "lhosar", date: "2026-12-30", label: "Tamu Lhosar", region: "NP" },
  { mood: "jatra", date: "2026-09-25", label: "Indra Jatra", region: "NP" },
  { mood: "janai", date: "2026-08-28", label: "Janai Purnima", region: "NP" },
  { mood: "maghe", date: "2027-01-15", label: "Maghi", region: "NP" },
  { mood: "yomari", date: "2026-12-24", label: "Yomari / Udhauli", region: "NP" },
  { mood: "tihar", date: "2026-11-08", label: "Tihar", region: "NP" },
];

export default function AlmanacContent({ season, onSeeRoom }: { season: DeskSeason; onSeeRoom: () => void }) {
  const [month, setMonth] = useState(season.date.slice(0, 7));
  const [previewRegion, setPreviewRegion] = useState("US");
  useEffect(() => setMonth(season.date.slice(0, 7)), [season.date]);
  const [year, monthNumber] = month.split("-").map(Number);
  const first = new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const events = eventsForYear(year).filter(event => event.date.startsWith(month));
  const selectedEvents = eventsOnDate(season.date);
  function moveMonth(direction: number) { setMonth(isoDate(year, monthNumber + direction, 1).slice(0, 7)); }
  function select(date: string) { season.setPreview(date === season.today ? null : date); }

  return <div className="portfolio-content almanac-content">
    <p className="eyebrow">09 / TWO CALENDARS. ONE LITTLE WORLD.</p><h2>A reason to<br /><em>look up.</em></h2><p className="content-lead">Festivals from home. Holidays across the ocean. And a room that finds a little magic in the time of year.</p>
    <div className="almanac-world-clocks">{[{ city: "KATHMANDU", zone: "Asia/Kathmandu", marker: "NP" }, { city: "NEW YORK", zone: "America/New_York", marker: "US" }].map(clock => <div key={clock.city}><span>{clock.marker}</span><p>{clock.city}<strong>{new Intl.DateTimeFormat("en-GB", { timeZone: clock.zone, hour: "2-digit", minute: "2-digit" }).format(season.now)}</strong><small>{new Intl.DateTimeFormat("en-US", { timeZone: clock.zone, weekday: "short", month: "short", day: "numeric" }).format(season.now)}</small></p></div>)}</div>
    <div className={`almanac-feature mood-${season.mood}`}><span className="almanac-emblem" aria-hidden="true">{season.theme.icon}</span><div><span className="eyebrow">{season.preview ? "PREVIEWING" : "TODAY AT THE DESK"} · {formatDay(season.date)}</span><h3>{season.theme.title}</h3><p>{season.theme.line}</p><button onClick={onSeeRoom}>See the room <ArrowRight size={14} /></button></div></div>
    <div className="theme-preview-heading"><h3>Take the year for a spin</h3><div aria-label="Theme collections">{["US", "NP"].map(region => <button key={region} aria-pressed={previewRegion === region} onClick={() => setPreviewRegion(region)}>{region === "US" ? "United States" : "Nepal"}</button>)}</div></div>
    <div className="theme-swatches" aria-label="Preview a holiday room">{previews.filter(item => item.region === previewRegion).map(item => <button key={item.mood} className={`swatch-${item.mood}`} aria-pressed={season.date === item.date && season.mood === item.mood} onClick={() => season.previewTheme(item.date, item.mood)}><span aria-hidden="true">{moods[item.mood].icon}</span>{item.label}</button>)}</div>
    {season.preview && <button className="text-action return-today" onClick={() => { season.setPreview(null); setMonth(season.today.slice(0, 7)); }}><RotateCcw size={13} /> Return to today · {formatDay(season.today)}</button>}
    <div className="almanac-calendar">
      <div className="calendar-heading"><button onClick={() => moveMonth(-1)} aria-label="Previous month"><ChevronLeft size={18} /></button><h3>{formatDay(`${month}-01`, { month: "long", year: "numeric" })}</h3><button onClick={() => moveMonth(1)} aria-label="Next month"><ChevronRight size={18} /></button></div>
      <p className="calendar-instruction">Pick a day to change the room’s mood.</p>
      <div className="calendar-grid" aria-label="Choose a date">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <span className="weekday" key={day}>{day}</span>)}{Array.from({ length: first }, (_, index) => <span key={`blank-${index}`} />)}{Array.from({ length: days }, (_, index) => {
        const date = isoDate(year, monthNumber, index + 1);
        const dayEvents = events.filter(event => date >= event.date && date <= (event.end ?? event.date));
        return <button key={date} aria-label={`${formatDay(date, { month: "long", day: "numeric", year: "numeric" })}${dayEvents.length ? `: ${dayEvents.map(event => event.name).join(", ")}` : ""}`} aria-current={date === season.today ? "date" : undefined} aria-pressed={date === season.date} onClick={() => select(date)}>{index + 1}<span className="day-markers" aria-hidden="true">{["NP", "US"].map(region => dayEvents.some(event => event.region === region) && <i key={region} className={`marker-${region}`} />)}</span></button>;
      })}</div>
      <div className="calendar-legend"><span><i className="marker-NP" /> Nepal</span><span><i className="marker-US" /> United States</span><small>Dates follow Kathmandu time</small></div>
    </div>
    <div className="selected-day" aria-live="polite"><span className="eyebrow">{formatDay(season.date, { weekday: "long", month: "long", day: "numeric" })}</span>{selectedEvents.length ? selectedEvents.map(event => <article key={event.id}><h3>{event.name}</h3><small>{event.region === "NP" ? "NEPAL" : "UNITED STATES"} · {event.kind}</small><p>{event.note}</p><a href={event.source} target="_blank" rel="noreferrer">Calendar source <ArrowUpRight size={12} /></a>{event.cultureSource && <a className="tradition-source" href={event.cultureSource} target="_blank" rel="noreferrer">Festival traditions <ArrowUpRight size={12} /></a>}</article>) : <p>No featured holiday today. Still a good day to make something.</p>}</div>
    <div className="calendar-upcoming"><h3>On the calendar this month</h3>{events.length ? events.map(event => <button key={event.id} onClick={() => event.mood ? season.previewTheme(event.date, event.mood) : select(event.date)}><span className={`event-country marker-${event.region}`}>{event.region}</span><span><strong>{event.name}</strong><small>{event.kind}</small></span><time dateTime={event.date}>{formatDay(event.date)}{event.end ? `–${formatDay(event.end, { day: "numeric" })}` : ""}</time></button>) : <p>No featured dates in this month yet.</p>}</div>
    <details className="calendar-notes"><summary>About these dates</summary><p>Selected Nepali dates cover BS 2083, through April 2027, plus Holi 2026. Lunar dates are added year by year. Other years keep their seasonal atmosphere without guessing festival dates. US federal dates and observed weekdays follow OPM rules. Halloween is marked as a cultural day. This is a little cultural almanac, not a complete office closure calendar.</p><a href={calendarSources.kathmandu} target="_blank" rel="noreferrer">Nepal festival dates ↗</a><a href={calendarSources.gazette} target="_blank" rel="noreferrer">BS 2083 holiday reference ↗</a><a href={calendarSources.us} target="_blank" rel="noreferrer">US federal dates ↗</a></details>
  </div>;
}
