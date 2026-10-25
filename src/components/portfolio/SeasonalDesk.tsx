import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { DeskSeason } from "@/hooks/useDeskSeason";
import { formatDay } from "@/lib/calendar";

export function SeasonalCard({ season, onOpen }: { season: DeskSeason; onOpen: () => void }) {
  return <button className="seasonal-card" onClick={onOpen} aria-label="Open the Nepal and US almanac">
    <span className="seasonal-card-top"><CalendarDays size={12} /> {season.preview ? "TIME TRAVEL" : "THE DESK ALMANAC"}<ArrowUpRight size={13} /></span>
    <span className="seasonal-card-body"><span className="seasonal-symbol" aria-hidden="true">{season.theme.icon}</span><span><strong>{season.theme.label}</strong><small>{formatDay(season.date, { day: "numeric", month: "short", year: "numeric" })} <i>·</i> NEPAL + US</small></span></span>
    <span className="seasonal-card-bottom">A desk that changes with the year <span>↗</span></span>
  </button>;
}

export function SeasonalAtmosphere({ season }: { season: DeskSeason }) {
  return <div className={`seasonal-atmosphere atmosphere-${season.mood}`} aria-hidden="true">
    <div className="seasonal-wash" />
    <div className="seasonal-particles">{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ left: `${8 + index * 7.6}%`, top: `${10 + index % 4 * 13}%`, animationDelay: `${-index * 1.7}s`, animationDuration: `${10 + index % 4 * 3}s` }} />)}</div>
    {["tihar", "christmas"].includes(season.mood) && <div className="festival-lights">{Array.from({ length: 15 }, (_, index) => <i key={index} style={{ top: `${Math.sin(index / 14 * Math.PI) * 30}px` }} />)}</div>}
    {season.mood === "dashain" && <div className="festival-kites"><i /><i /></div>}
    {["independence", "memorial", "veterans", "presidents"].includes(season.mood) && <div className="american-pennant"><span>{Array.from({ length: 9 }, (_, row) => <b key={row}>{"★ ".repeat(row % 2 === 0 ? 6 : 5).trim()}</b>)}</span></div>}
    {["independence", "newyear"].includes(season.mood) && <div className="festival-fireworks">{[0, 1, 2].map(index => <div key={index} className={`firework firework-${index}`}>{Array.from({ length: 12 }, (_, ray) => <i key={ray} style={{ transform: `rotate(${ray * 30}deg)` }} />)}</div>)}</div>}
    {["tihar", "shivaratri"].includes(season.mood) && <div className="festival-diyas">{Array.from({ length: 5 }, (_, index) => <span key={index}><i /></span>)}</div>}
    {season.mood === "tihar" && <div className="marigold-garland">{Array.from({ length: 16 }, (_, index) => <i key={index} style={{ top: `${Math.sin(index / 15 * Math.PI) * 25}px` }} />)}</div>}
    {["buddha", "chhath", "maghe"].includes(season.mood) && <div className="festival-horizon"><span /></div>}
    {season.mood === "buddha" && <div className="festival-lotus">{[-60, -30, 0, 30, 60].map(angle => <i key={angle} style={{ transform: `rotate(${angle}deg)` }} />)}</div>}
    {season.mood === "lhosar" && <div className="festival-bunting">{Array.from({ length: 15 }, (_, index) => <i key={index} />)}</div>}
    {season.mood === "janai" && <div className="festival-thread" />}
  </div>;
}
