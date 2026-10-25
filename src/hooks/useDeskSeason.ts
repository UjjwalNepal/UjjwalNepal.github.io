import { useCallback, useEffect, useState } from "react";
import { dateInZone, eventsOnDate, moodForDate, moods, type Mood } from "@/lib/calendar";

export function useDeskSeason() {
  const [now, setNow] = useState(() => new Date());
  const [preview, setPreviewState] = useState<string | null>(null);
  const [moodOverride, setMoodOverride] = useState<Mood | null>(null);
  const setPreview = useCallback((date: string | null) => { setPreviewState(date); setMoodOverride(null); }, []);
  const previewTheme = useCallback((date: string, mood: Mood) => { setPreviewState(date); setMoodOverride(mood); }, []);
  useEffect(() => {
    const update = () => setNow(new Date());
    const timer = window.setInterval(update, 60_000);
    window.addEventListener("focus", update);
    return () => { clearInterval(timer); window.removeEventListener("focus", update); };
  }, []);
  const today = dateInZone(now);
  const date = preview ?? today;
  const mood = moodOverride ?? moodForDate(date);
  return { now, today, date, preview, setPreview, previewTheme, mood, theme: moods[mood], events: eventsOnDate(date) };
}

export type DeskSeason = ReturnType<typeof useDeskSeason>;
