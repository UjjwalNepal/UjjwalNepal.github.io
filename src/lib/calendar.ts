export type Mood = "spring" | "monsoon" | "autumn" | "winter" | "holi" | "dashain" | "tihar" | "halloween" | "newyear" | "independence" | "thanksgiving" | "christmas" | "memorial" | "veterans" | "juneteenth" | "mlk" | "labor" | "presidents" | "nepalnewyear" | "buddha" | "teej" | "chhath" | "shivaratri" | "lhosar" | "jatra" | "janai" | "maghe" | "yomari";
export type Region = "NP" | "US";
export interface CalendarEvent {
  id: string;
  name: string;
  date: string;
  end?: string;
  region: Region;
  kind: "Festival" | "Federal holiday" | "Cultural day" | "Holiday";
  note: string;
  mood?: Mood;
  source: string;
  observed?: boolean;
  cultureSource?: string;
}

export const calendarSources = {
  nepal: "https://nepal.embassy.gov.au/kmdu/001.html",
  kathmandu: "https://kathmandu.gov.np/en/calendar",
  gazette: "https://www.pradhanlaw.com/publications/list-of-public-holidays-2083-202627",
  culture: "https://www.pashupati.gov.np/festivals/",
  nepaliYear: "https://au.nepalembassy.gov.np/pages/19/",
  us: "https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/",
  halloween: "https://guides.loc.gov/chronicling-america-halloween",
};

// Gregorian dates are explicitly verified for BS 2083 (through April 13, 2027).
// Festival dates use Kathmandu's civic calendar; they are not embassy closure dates.
// Community-specific celebrations stay separate. Never repeat lunar dates annually.
const nepal = (id: string, name: string, date: string, mood: Mood, note: string, source = calendarSources.gazette, end?: string): CalendarEvent => ({ id, name, date, mood, note, source, end, region: "NP", kind: "Festival", cultureSource: calendarSources.culture });
export const nepaliEvents: readonly CalendarEvent[] = [
  nepal("holi-hills-2026", "Holi · पहाडी होली", "2026-03-02", "holi", "Colour, spring, and shared joy. This is the hill-region celebration; Terai Holi has its own date.", calendarSources.nepal),
  nepal("new-year-2083", "Nepali New Year · २०८३", "2026-04-14", "nepalnewyear", "Baisakh 1 begins the Bikram Sambat year. नयाँ वर्षको शुभकामना!"),
  nepal("buddha-2026", "Buddha Jayanti · बुद्ध जयन्ती", "2026-05-01", "buddha", "Commemorating the Buddha’s birth, enlightenment, and passing. A quiet theme of light and reflection.", calendarSources.nepal),
  { id: "republic-2026", name: "Nepal Republic Day", date: "2026-05-29", region: "NP", kind: "Holiday", note: "Republic Day in Nepal.", mood: "nepalnewyear", source: calendarSources.gazette },
  nepal("janai-2026", "Janai Purnima / Raksha Bandhan", "2026-08-28", "janai", "Sacred threads, family bonds, and full-moon traditions; observances vary across communities."),
  nepal("gaijatra-2026", "Gai Jatra · गाईजात्रा", "2026-08-29", "jatra", "A Newar tradition of remembrance and community, bringing processions and humour into shared grief."),
  nepal("teej-2026", "Haritalika Teej · तीज", "2026-09-14", "teej", "Red and gold, songs, gatherings, and devotion. Teej is celebrated especially by Hindu women."),
  nepal("indra-2026", "Indra Jatra · इन्द्रजात्रा", "2026-09-25", "jatra", "Kathmandu’s living heritage: chariot processions, masked dances, and community gatherings."),
  nepal("dashain-season-2026", "Dashain · दशैं", "2026-10-11", "dashain", "From Ghatasthapana to Kojagrat Purnima: family reunions, blessings, jamara, and kites. The festival span is longer than the office holiday.", calendarSources.kathmandu, "2026-10-25"),
  nepal("dashain-tika-2026", "Vijaya Dashami · विजयादशमी", "2026-10-21", "dashain", "The day for tika and blessings from elders. शुभ दशैं!", calendarSources.kathmandu),
  nepal("kojagrat-2026", "Kojagrat Purnima", "2026-10-25", "dashain", "The full moon marks the conclusion of the Dashain festival.", calendarSources.kathmandu),
  nepal("tihar-season-2026", "Tihar · तिहार", "2026-11-07", "tihar", "Days of light and connection: honouring animals, welcoming Laxmi, and celebrating bonds between siblings.", calendarSources.kathmandu, "2026-11-11"),
  nepal("kaag-2026", "Kaag Tihar", "2026-11-07", "tihar", "The first Tihar day honours crows.", calendarSources.kathmandu),
  nepal("tihar-lights-2026", "Kukur Tihar / Laxmi Puja", "2026-11-08", "tihar", "Dogs are honoured with garlands; Laxmi Puja brings lamps and light to homes this evening.", calendarSources.kathmandu),
  nepal("gai-2026", "Gai Tihar", "2026-11-09", "tihar", "A Tihar day honouring cows, amid the festival’s lamps and marigolds.", calendarSources.kathmandu),
  nepal("mha-puja-2026", "Mha Puja / Nepal Sambat New Year", "2026-11-10", "tihar", "Mha Puja honours the self in Newar tradition. The day also marks the beginning of Nepal Sambat 1147.", calendarSources.kathmandu),
  nepal("tihar-bhai-2026", "Bhai Tika · भाइटीका", "2026-11-11", "tihar", "Siblings exchange blessings and celebrate their bond. शुभ तिहार!", calendarSources.kathmandu),
  nepal("chhath-2026", "Chhath · छठ", "2026-11-15", "chhath", "Offerings to the setting and rising sun, with devotion at rivers and ponds. Especially cherished in the Terai and Madhesh.", calendarSources.kathmandu),
  nepal("yomari-2026", "Yomari Punhi / Udhauli", "2026-12-24", "yomari", "Two distinct traditions share a date: Newar Yomari Punhi celebrates the harvest, while Kirat communities observe Udhauli."),
  nepal("tamu-2026", "Tamu Lhosar", "2026-12-30", "lhosar", "The Gurung community’s New Year. A day of cultural celebration, gathering, and renewal."),
  nepal("maghe-2027", "Maghe Sankranti / Maghi", "2027-01-15", "maghe", "The first day of Magh brings seasonal foods and river observances. Maghi is also New Year for Tharu communities."),
  nepal("sonam-2027", "Sonam Lhosar", "2027-02-07", "lhosar", "New Year celebrated by the Tamang community. Kept separate from Tamu and Gyalpo Lhosar."),
  nepal("shivaratri-2027", "Maha Shivaratri · महाशिवरात्रि", "2027-03-06", "shivaratri", "The Great Night of Shiva, marked by prayer and night-long devotion, especially at Pashupatinath."),
  nepal("gyalpo-2027", "Gyalpo Lhosar", "2027-03-09", "lhosar", "New Year observed by Sherpa and other Himalayan Buddhist communities."),
  nepal("holi-hills-2027", "Holi · hills and mountains", "2027-03-21", "holi", "Fagu Purnima in hill and Himalayan districts. Terai communities celebrate the following day."),
  nepal("holi-terai-2027", "Holi · Terai", "2027-03-22", "holi", "The Terai celebration of the festival of colours. शुभ होली!"),
  nepal("ghode-2027", "Ghode Jatra · घोडेजात्रा", "2027-04-06", "jatra", "The Kathmandu Valley’s festival of horses, with equestrian events at Tundikhel."),
];

export const moods: Record<Mood, { label: string; title: string; line: string; icon: string }> = {
  nepalnewyear: { label: "A new Nepali year", title: "नयाँ वर्ष, नयाँ सम्भावना।", line: "A new year. New possibilities. A little red and gold to welcome a fresh beginning.", icon: "✳" },
  buddha: { label: "Buddha Jayanti", title: "A moment of stillness.", line: "Soft light, compassion, and reflection. Remembering the Buddha’s life and teachings.", icon: "❋" },
  teej: { label: "Haritalika Teej", title: "रातो रङ्ग, साझा उमङ्ग।", line: "Crimson, gold, song, and togetherness. Warm wishes to everyone celebrating Teej.", icon: "❧" },
  chhath: { label: "Chhath at the river", title: "In gratitude to the sun.", line: "A golden horizon, quiet water, and devotion at dusk and dawn. शुभ छठ!", icon: "☀" },
  shivaratri: { label: "Maha Shivaratri", title: "A night of reflection.", line: "Indigo skies and the quiet glow of lamps for the Great Night of Shiva.", icon: "☾" },
  lhosar: { label: "Lhosar greetings", title: "A new year, together.", line: "Colour, community, and renewal. Warm wishes to those celebrating their New Year today.", icon: "✧" },
  jatra: { label: "Living heritage", title: "The city carries its stories.", line: "Celebrating the Kathmandu Valley’s distinct jatras, traditions, and communities.", icon: "❖" },
  janai: { label: "Janai Purnima", title: "Threads of connection.", line: "A full moon, sacred threads, and bonds of care across different traditions.", icon: "○" },
  maghe: { label: "Maghe Sankranti · Maghi", title: "The warmth of a new season.", line: "Seasonal food, shared tables, and warm wishes for Maghe Sankranti and Maghi.", icon: "☀" },
  yomari: { label: "Yomari Punhi · Udhauli", title: "A harvest of shared stories.", line: "Honouring the distinct Newar and Kirat traditions that share this day.", icon: "◇" },
  spring: { label: "Spring light", title: "A little room to grow.", line: "Fresh starts. Open windows. Ideas taking root.", icon: "✿" },
  monsoon: { label: "Monsoon hours", title: "Let the ideas rain.", line: "Rain at the window. Something good in the works.", icon: "☂" },
  autumn: { label: "Autumn in Kathmandu", title: "Golden hour, longer ideas.", line: "Clear skies, warm light, and a little curiosity.", icon: "✳" },
  winter: { label: "Winter quiet", title: "Warm tea. Bright ideas.", line: "A slower evening. A little space to make things.", icon: "❄" },
  holi: { label: "Colours of Holi", title: "Make room for colour.", line: "A playful desk for a colourful day. शुभ होली!", icon: "✿" },
  dashain: { label: "Dashain skies", title: "Let your ideas fly.", line: "Kites, connections, and a little time together.", icon: "◇" },
  tihar: { label: "Tihar lights", title: "A little more light.", line: "Good company. New beginnings. शुभ तिहार!", icon: "✦" },
  halloween: { label: "Halloween after hours", title: "Good ideas. Mildly haunted.", line: "The only ghosts here are abandoned side projects.", icon: "☾" },
  newyear: { label: "Hello, new year", title: "Here’s to what comes next.", line: "A clean page, a midnight sparkle, and something worth starting.", icon: "✧" },
  independence: { label: "Fourth of July", title: "Stars, stripes & possibility.", line: "Happy Independence Day, America. Here’s to freedom, community, and the courage to build.", icon: "★" },
  thanksgiving: { label: "Thanksgiving", title: "A little room for gratitude.", line: "For the people who show up, the ideas we share, and the things we build together.", icon: "❧" },
  christmas: { label: "Christmas at the desk", title: "Merry, bright & a little nostalgic.", line: "Warm lights, good company, and a little wonder. Merry Christmas!", icon: "✶" },
  memorial: { label: "Memorial Day", title: "A moment to remember.", line: "Honouring the US service members who gave their lives in military service.", icon: "★" },
  veterans: { label: "Veterans Day", title: "With gratitude for service.", line: "Honouring America’s veterans and the commitment of those who have served.", icon: "★" },
  juneteenth: { label: "Juneteenth", title: "Freedom deserves remembrance.", line: "A day to honour emancipation, reflect on history, and celebrate Black freedom.", icon: "✦" },
  mlk: { label: "Martin Luther King Jr. Day", title: "Make room for a better world.", line: "A day for service, reflection, and the continuing work of equality.", icon: "✧" },
  labor: { label: "Labor Day", title: "Here’s to the people who build.", line: "Celebrating the work, care, and skill that keep communities moving. Take a well-earned pause.", icon: "✳" },
  presidents: { label: "Presidents’ Day", title: "A day in American history.", line: "Washington’s Birthday on the federal calendar; a moment to reflect on leadership and public service.", icon: "★" },
};

export function dateInZone(now: Date, timeZone = "Asia/Kathmandu"): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type: string) => parts.find(item => item.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function isoDate(year: number, month: number, day: number): string {
  return new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10);
}

function nthWeekday(year: number, month: number, weekday: number, nth: number): string {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  return isoDate(year, month, 1 + (weekday - first + 7) % 7 + (nth - 1) * 7);
}

function lastMonday(year: number, month: number): string {
  const last = new Date(Date.UTC(year, month, 0));
  return isoDate(year, month, last.getUTCDate() - (last.getUTCDay() + 6) % 7);
}

export function usEvents(year: number): CalendarEvent[] {
  const specs: [string, string, string, Mood?][] = [
    ["new-year", "New Year’s Day", isoDate(year, 1, 1), "newyear"],
    ["mlk", "Martin Luther King Jr. Day", nthWeekday(year, 1, 1, 3), "mlk"],
    ["washington", "Washington’s Birthday", nthWeekday(year, 2, 1, 3), "presidents"],
    ["memorial", "Memorial Day", lastMonday(year, 5), "memorial"],
    ["juneteenth", "Juneteenth", isoDate(year, 6, 19), "juneteenth"],
    ["independence", "Independence Day · Fourth of July", isoDate(year, 7, 4), "independence"],
    ["labor", "Labor Day", nthWeekday(year, 9, 1, 1), "labor"],
    ["columbus", "Columbus Day", nthWeekday(year, 10, 1, 2)],
    ["veterans", "Veterans Day", isoDate(year, 11, 11), "veterans"],
    ["thanksgiving", "Thanksgiving", nthWeekday(year, 11, 4, 4), "thanksgiving"],
    ["christmas", "Christmas Day", isoDate(year, 12, 25), "christmas"],
  ];
  const events: CalendarEvent[] = [];
  for (const [id, name, date, mood] of specs) {
    const event: CalendarEvent = { id: `${id}-${year}`, name, date, mood, region: "US", kind: "Federal holiday", note: id === "columbus" ? "Federal name. Some communities mark Indigenous Peoples’ Day on this date." : "US federal holiday. Individual workplaces may follow different schedules.", source: calendarSources.us };
    events.push(event);
    const actual = new Date(`${date}T00:00:00Z`);
    const weekday = actual.getUTCDay();
    if (weekday === 0 || weekday === 6) {
      actual.setUTCDate(actual.getUTCDate() + (weekday === 6 ? -1 : 1));
      events.push({ ...event, id: `${event.id}-observed`, date: actual.toISOString().slice(0, 10), name: `${name} (observed)`, observed: true, mood: undefined, note: "Observed weekday for most Monday–Friday federal employees; the celebration date is listed separately." });
    }
  }
  events.push({ id: `halloween-${year}`, name: "Halloween", date: isoDate(year, 10, 31), region: "US", kind: "Cultural day", mood: "halloween", note: "A cultural celebration, not a US federal holiday.", source: calendarSources.halloween });
  return events;
}

export function eventsForYear(year: number): CalendarEvent[] {
  // Include next New Year's observed day when it falls on December 31.
  return [...nepaliEvents, ...usEvents(year), ...usEvents(year + 1).filter(event => event.observed)]
    .filter(event => event.date.startsWith(`${year}-`))
    .sort((a, b) => a.date.localeCompare(b.date) || a.region.localeCompare(b.region));
}

export function eventsOnDate(date: string): CalendarEvent[] {
  return eventsForYear(Number(date.slice(0, 4))).filter(event => date >= event.date && date <= (event.end ?? event.date));
}

export function seasonForDate(date: string): Mood {
  const month = Number(date.slice(5, 7));
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "monsoon";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export function moodForDate(date: string): Mood {
  const events = eventsOnDate(date);
  return (events.find(event => event.mood && !event.end) ?? events.find(event => event.mood))?.mood ?? seasonForDate(date);
}

export function formatDay(date: string, options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }): string {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
