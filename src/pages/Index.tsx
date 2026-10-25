import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Disc3, Expand, Gamepad2, FileText, Headphones, MapPin, Minimize, Power, Volume2, VolumeX, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import SEOHead from "@/components/SEOHead";
import { AboutContent, ContactContent, ReadingView, TerminalContent, ToolboxContent, WorkContent } from "@/components/portfolio/PortfolioContent";
import { channels, profile, projects, type Channel } from "@/data/portfolio";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import { useDeskSeason } from "@/hooks/useDeskSeason";
import { SeasonalAtmosphere, SeasonalCard } from "@/components/portfolio/SeasonalDesk";
import LeadershipContent from "@/components/portfolio/LeadershipContent";
import "@/styles/portfolio.css";
import "@/styles/desk-extras.css";
import "@/styles/legibility.css";

const ArcadeContent = lazy(() => import("@/components/portfolio/ArcadeContent"));
const AlmanacContent = lazy(() => import("@/components/portfolio/AlmanacContent"));

function NepalClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const timer = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer); }, []);
  return <time dateTime={time.toISOString()}>{time.toLocaleTimeString("en-GB", { timeZone: "Asia/Kathmandu", hour: "2-digit", minute: "2-digit" })}<span> NPT</span></time>;
}

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hashChannel, projectId] = location.hash.slice(1).split("/");
  const channel: Channel = channels.some(item => item.id === hashChannel) ? hashChannel as Channel : "home";
  const reading = new URLSearchParams(location.search).get("reading") === "1";
  const [zoomed, setZoomed] = useState(false);
  const [powered, setPowered] = useState(true);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [motion, setMotion] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const scene = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const sound = useAmbientSound();
  const { stop: stopSound, toggle: toggleSound } = sound;
  const season = useDeskSeason();
  const focused = channel !== "home" || zoomed;
  useEffect(() => { if (reading) stopSound(); }, [reading, stopSound]);

  const go = useCallback((next: Channel, project?: string) => {
    setPowered(true);
    navigate({ pathname: "/", search: location.search, hash: next === "home" ? "" : `#${next}${project ? `/${project}` : ""}` });
  }, [navigate, location.search]);
  const goReading = useCallback(() => { navigate("/?reading=1"); }, [navigate]);
  useEffect(() => { screen.current?.scrollTo(0, 0); }, [channel, projectId]);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (creditsOpen || reading || event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test((event.target as HTMLElement).tagName) || (event.target as HTMLElement).isContentEditable) return;
      const digit = Number(event.key);
      if (digit >= 1 && digit <= channels.length) { event.preventDefault(); go(channels[digit - 1].id); }
      if (event.key === "Escape") { setZoomed(false); go("home"); }
      if (event.key.toLowerCase() === "z") { event.preventDefault(); if (focused) { go("home"); setZoomed(false); } else setZoomed(true); }
      if (event.key.toLowerCase() === "m") { event.preventDefault(); void toggleSound(); }
      if (event.key.toLowerCase() === "p") { event.preventDefault(); go("arcade"); }
      if (event.key.toLowerCase() === "c") { event.preventDefault(); go("terminal"); }
      if (event.key.toLowerCase() === "r") { event.preventDefault(); goReading(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, goReading, toggleSound, creditsOpen, reading, focused]);
  useEffect(() => {
    if (!motion || focused || reading) {
      scene.current?.style.setProperty("--pan-x", "0px");
      scene.current?.style.setProperty("--pan-y", "0px");
      return;
    }
    let frame = 0;
    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        scene.current?.style.setProperty("--pan-x", `${(event.clientX / window.innerWidth - 0.5) * -12}px`);
        scene.current?.style.setProperty("--pan-y", `${(event.clientY / window.innerHeight - 0.5) * -7}px`);
      });
    }
    window.addEventListener("pointermove", onMove);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(frame); };
  }, [motion, focused, reading]);

  return <>
    <SEOHead title={`${channel === "home" ? "" : `${channels.find(item => item.id === channel)?.label} · `}Ujjwal Raj Nepal — Product Leader & Technologist`} description={profile.introduction} ogImage="/images/kathmandu-study-daylight.jpg" />
    {reading ? <ReadingView onReturn={() => navigate("/")} /> : <main className={`desk-experience ${focused ? "is-focused" : ""} ${!motion ? "motion-paused" : ""}`} data-mood={season.mood} ref={scene}>
      <a className="skip-to-content" href="#monitor-content" onClick={event => { event.preventDefault(); screen.current?.focus(); }}>Skip to portfolio content</a>
      <div className="room-background" aria-hidden="true" /><div className="room-shade" aria-hidden="true" />
      <SeasonalAtmosphere season={season} />
      {season.preview && <div className="season-preview-banner"><span>PREVIEW · {season.theme.label}</span><button onClick={() => season.setPreview(null)}>Back to today <X size={12} /></button></div>}
      <div className="window-rain" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ left: `${index * 5.3}%`, animationDelay: `${index * -0.47}s`, animationDuration: `${2.1 + (index % 5) * 0.4}s` }} />)}</div>
      <header className="desk-header"><button onClick={() => { go("home"); setZoomed(false); }} className="wordmark" aria-label="Ujjwal Raj Nepal, back to the desk">UJJ<span>UJJWAL RAJ NEPAL</span></button><nav aria-label="Main navigation">{[channels[2], channels[6], channels[7], channels[4]].map(item => <button key={item.id} onClick={() => go(item.id)} aria-current={channel === item.id ? "page" : undefined}><span>{item.number}</span>{item.label}</button>)}</nav><a className="header-resume" href="/resume" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={14} /></a></header>
      <aside className="desk-intro"><p className="eyebrow"><span className="live-dot" /> A LITTLE CORNER OF THE INTERNET</p><h2>Ideas to<br /><em>impact.</em></h2><p>Product vision. Technical depth.<br />A little entrepreneurial instinct.<br />Building from Nepal, thinking beyond.</p><div className="intro-location"><MapPin size={12} /> NEPAL <span>OPEN TO THE WORLD</span></div><SeasonalCard season={season} onOpen={() => go("almanac")} /></aside>
      {focused && <button className="back-to-desk" onClick={() => { go("home"); setZoomed(false); }}><X size={14} /> Back to the desk <kbd>ESC</kbd></button>}
      <section className={`computer ${!powered ? "is-off" : ""}`} aria-label="Interactive portfolio monitor">
        <div className="monitor-housing"><div className="monitor-brand"><span>NEPAL<span className="brand-dot">®</span></span><span>PERSONAL COMPUTER <b>01</b></span></div>
          <div className="screen-bezel"><div className={`monitor-screen channel-${channel}`}>
            <div className="screen-status"><span><span className="live-dot" /> UJJ — {channels.find(item => item.id === channel)?.label.toUpperCase()}</span><span>CH {channels.find(item => item.id === channel)?.number}</span></div>
            <div className="screen-scroll" ref={screen} id="monitor-content" tabIndex={0} aria-label={`${channel} content`}>
              {!powered ? <div className="screen-asleep"><Power size={24} /><p>A little quiet.</p><button onClick={() => setPowered(true)}>Wake the monitor <ArrowRight size={14} /></button></div> : <div key={`${channel}-${projectId || ""}`} className="screen-page">
                {channel !== "home" && <h1 className="sr-only">{profile.name} — {channels.find(item => item.id === channel)?.label}</h1>}
                {channel === "home" && <div className="screen-home"><p className="eyebrow">नमस्ते &nbsp; / &nbsp; NAMASTE, I'M</p><h1>Ujjwal<br /><em>Raj Nepal.</em><span className="screen-spark">✳</span></h1><p className="home-role">Product leader. Hands-on builder.</p><p className="home-description">I connect the idea, the team,<br className="desktop-break" /> and the technology.</p><button className="screen-cta" onClick={() => go("work")}>Explore my work <ArrowRight size={18} /></button><button className="home-about" onClick={() => go("leadership")}>How I turn ideas into products <ArrowUpRight size={12} /></button><button className="home-play" onClick={() => go("arcade")}><Gamepad2 size={14} /> Or, stay for a little play <span>↗</span></button><div className="screen-home-footer"><span>BASED IN NEPAL</span><span>OPEN TO CONVERSATION <i /></span></div></div>}
                {channel === "about" && <AboutContent />}
                {channel === "work" && <WorkContent selected={projectId || null} onSelect={id => go("work", id || undefined)} />}
                {channel === "toolbox" && <ToolboxContent />}
                {channel === "contact" && <ContactContent />}
                {channel === "terminal" && <TerminalContent onNavigate={go} />}
                {channel === "leadership" && <LeadershipContent />}
                <Suspense fallback={<p className="portfolio-content" role="status">Opening a little more of the desk…</p>}>
                  {channel === "arcade" && <ArcadeContent />}
                  {channel === "almanac" && <AlmanacContent season={season} onSeeRoom={() => go("home")} />}
                </Suspense>
              </div>}
            </div><div className="crt-glass" aria-hidden="true" /></div></div>
          <div className="monitor-controls"><button className={`power-button ${powered ? "on" : ""}`} onClick={() => setPowered(value => !value)} aria-label={powered ? "Turn monitor off" : "Turn monitor on"} aria-pressed={powered}><Power size={15} /><span /></button><div className="channel-controls" aria-label="Monitor channels">{channels.map(item => <button key={item.id} onClick={() => go(item.id)} className={channel === item.id ? "selected" : ""} aria-label={`Channel ${item.number}: ${item.label}`} aria-pressed={channel === item.id}><span>{item.number}</span><i /></button>)}</div><button className="monitor-zoom" onClick={() => { if (focused) { go("home"); setZoomed(false); } else setZoomed(true); }} aria-label={focused ? "Zoom out to the desk" : "Zoom monitor"}>{focused ? <Minimize size={16} /> : <Expand size={16} />}</button><div className="speaker-grille" aria-hidden="true" /></div>
        </div>
        <div className="computer-base"><span>BUILT WITH CURIOSITY</span><div className="disk-slot" /><div className="digital-clock"><NepalClock /></div></div><div className="computer-shadow" />
      </section>
      <aside className="tape-collection" aria-label="Selected project tapes"><p className="object-caption">THE WORK COLLECTION <span>↙ PICK A TAPE</span></p><div className="tape-stack">{projects.map(project => <button key={project.id} className={`project-tape tape-${project.color}`} onClick={() => go("work", project.id)} aria-label={`Play ${project.title} project tape`}><span className="tape-end">{project.number}</span><span className="tape-label">{project.title}<small>{project.year || project.tapeLabel}</small></span><span className="tape-format">VHS</span></button>)}</div><Link to="/resume" className="resume-note" target="_blank"><span className="note-tape" /><FileText size={17} /><span>The story<br />so far.</span><small>MY RÉSUMÉ <ArrowUpRight size={12} /></small></Link></aside>
      <button className={`desk-radio ${sound.enabled ? "is-playing" : ""}`} onClick={() => void sound.toggle()} aria-label={sound.enabled ? "Turn ambient rain off" : "Play ambient rain"} aria-pressed={sound.enabled}><div className="radio-disc"><Disc3 /></div><div className="radio-label"><span>AFTER HOURS</span><strong>{sound.enabled ? "RAIN IS PLAYING" : "A LITTLE AMBIENCE"}</strong><small><Headphones size={10} /> KATHMANDU · VOL. 01</small></div><span className="radio-play">{sound.enabled ? "Ⅱ" : "▶"}</span></button>
      <div className="desk-keyboard" aria-hidden="true">{Array.from({ length: 36 }, (_, index) => <i key={index}>{index < 10 ? "QWERTYUIOP"[index] : ""}</i>)}<i className="spacebar" /></div>
      <footer className="desk-footer"><span className="desk-footer-location"><span className="live-dot" /> NEPAL <NepalClock /></span><div className="keyboard-hints"><span><kbd>1–9</kbd> channels</span><span><kbd>C</kbd> terminal</span><span><kbd>M</kbd> sound</span></div><div className="desk-tools"><button onClick={() => go("almanac")}>Almanac <span aria-hidden="true">{season.theme.icon}</span></button><button onClick={() => setCreditsOpen(true)}>About this desk</button><button onClick={goReading}><BookOpen size={13} /> Reading mode</button><button onClick={() => void sound.toggle()} aria-pressed={sound.enabled} title={sound.unavailable ? "Audio unavailable in this browser" : "Toggle ambient rain"}>{sound.enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}<span>Sound {sound.enabled ? "on" : "off"}</span></button></div></footer>
      <span className="sr-only" role="status">{sound.unavailable ? "Audio is unavailable in this browser." : ""}</span>
    </main>}
    <Dialog.Root open={creditsOpen} onOpenChange={setCreditsOpen}><Dialog.Portal><Dialog.Overlay className="credits-overlay" /><Dialog.Content className="credits-dialog"><Dialog.Close className="credits-close" aria-label="Close about this desk"><X size={18} /></Dialog.Close><p className="eyebrow">A PERSONAL SPACE ON THE INTERNET</p><Dialog.Title>A desk with a view.</Dialog.Title><Dialog.Description>A little nostalgia, a window toward the Himalayas, and a collection of things I've worked on.</Dialog.Description><p>Inspired by the playful, interactive world of <a href="https://felixrieseberg.com/" target="_blank" rel="noreferrer">Felix Rieseberg's website <ArrowUpRight size={12} /></a>. Reimagined for my own corner of Nepal, with original AI-generated room artwork.</p><div className="credits-shortcuts"><span><kbd>1–9</kbd> Switch channels</span><span><kbd>C</kbd> Open terminal</span><span><kbd>P</kbd> Open arcade</span><span><kbd>M</kbd> Toggle ambient rain</span><span><kbd>Z</kbd> Zoom monitor</span><span><kbd>R</kbd> Reading mode</span><span><kbd>ESC</kbd> Return to the desk</span></div><button className="motion-toggle" onClick={() => setMotion(value => !value)} aria-pressed={!motion}>{motion ? "Pause scene motion" : "Enable scene motion"}</button><button className="text-action" onClick={() => { setCreditsOpen(false); goReading(); }}>Prefer a quiet page? Open reading mode <ArrowRight size={14} /></button></Dialog.Content></Dialog.Portal></Dialog.Root>
  </>;
}
