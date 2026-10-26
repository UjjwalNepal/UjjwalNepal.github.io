import { lazy, Suspense, useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { AboutContent, ContactContent, TerminalContent, ToolboxContent, WorkContent } from "@/components/portfolio/PortfolioContent";
import LeadershipContent from "@/components/portfolio/LeadershipContent";
import { channels, profile, projects, type Channel } from "@/data/portfolio";
import { useDeskSeason, type DeskSeason } from "@/hooks/useDeskSeason";
import { formatDay } from "@/lib/calendar";
import "@/styles/editorial.css";

const ArcadeContent = lazy(() => import("@/components/portfolio/ArcadeContent"));
const AlmanacContent = lazy(() => import("@/components/portfolio/AlmanacContent"));

function Home({ season }: { season: DeskSeason }) {
  return <>
    <section className="intro-section" aria-labelledby="intro-title">
      <div className="intro-copy">
        <p className="intro-kicker">Product leadership & engineering</p>
        <h1 id="intro-title">Ujjwal<br />Raj Nepal<span>.</span></h1>
        <p className="intro-description">I’m a product leader and engineer based in Nepal. I work on the product decisions, the team, and the code.</p>
        <p className="intro-history">Previously CTO at <Link to="/#work/farspeak">Farspeak</Link>. Building software since 2016.</p>
        <div className="intro-links"><a href="#selected-work" onClick={event => { event.preventDefault(); document.getElementById("selected-work")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }}>Selected work <ArrowDown size={17} /></a><Link to="/#about">A bit about me <ArrowRight size={17} /></Link></div>
      </div>
      <aside className="intro-portrait">
        <img src="/images/ujjwal-nepal.jpg" width="460" height="460" alt="Ujjwal Raj Nepal outdoors" fetchPriority="high" />
        <div className="portrait-caption"><span>नमस्ते, from Nepal.</span><time dateTime={season.now.toISOString()}>{new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kathmandu", hour: "2-digit", minute: "2-digit" }).format(season.now)} NPT</time></div>
        <p>I’m interested in the early decisions that shape a business—and staying close to what gets built.</p>
        <a href={`mailto:${profile.email}`}>Get in touch <ArrowUpRight size={15} /></a>
      </aside>
    </section>
    <section className="selected-section" id="selected-work" aria-labelledby="selected-title">
      <div className="section-heading"><h2 id="selected-title">Selected work</h2><Link to="/#work">Explore all projects <ArrowRight size={17} /></Link></div>
      <div className="project-index">{projects.map(project => <Link to={`/#work/${project.id}`} key={project.id} className="project-index-row"><span className="project-index-number">{project.number}</span><div className="project-index-name"><h3>{project.title}</h3><span>{project.role || "Live-stream discovery"}</span></div><p>{project.summary}</p><ArrowUpRight size={24} /></Link>)}</div>
    </section>
    <section className="home-notes" aria-label="More about my work">
      <div><p className="section-label-text">How I work</p><h2>Product direction.<br />Technical responsibility.</h2><p>At HowApp, I led developers and designers from an idea to a delivered app. At Fresh KTM, I connected supply chain, point of sale, and accounting in one system.</p><Link to="/#leadership">My approach <ArrowRight size={17} /></Link></div>
      <div><p className="section-label-text">Beyond the job title</p><h2>There’s room<br />for a little play.</h2><p>A memory game, a product decision game, and a calendar that follows festivals in Nepal and holidays in the US.</p><div className="notes-links"><Link to="/#arcade">Play a game <ArrowRight size={17} /></Link><Link to="/#toolbox">Skills & tools <ArrowRight size={17} /></Link></div></div>
    </section>
    <Link to="/#almanac" className="calendar-strip"><span className="calendar-strip-date">{formatDay(season.date, { month: "short", day: "numeric" })}<small>{season.preview ? "Preview" : "Today"}</small></span><span><strong>{season.theme.label}</strong><span>{season.events.length ? season.events.map(event => event.name).join(" · ") : "A calendar of Nepal, the United States, and the seasons."}</span></span><span className="calendar-strip-cta">Open the almanac <ArrowUpRight size={20} /></span></Link>
  </>;
}

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hashChannel, projectId] = location.hash.slice(1).split("/");
  const channel: Channel = channels.some(item => item.id === hashChannel) ? hashChannel as Channel : "home";
  const season = useDeskSeason();
  const main = useRef<HTMLElement>(null);
  const previousPage = useRef(`${channel}/${projectId || ""}`);
  const go = (next: Channel, project?: string) => navigate({ pathname: "/", hash: next === "home" ? "" : `#${next}${project ? `/${project}` : ""}` });

  useEffect(() => {
    const currentPage = `${channel}/${projectId || ""}`;
    if (previousPage.current !== currentPage) {
      window.scrollTo({ top: 0, behavior: "instant" });
      main.current?.focus({ preventScroll: true });
      previousPage.current = currentPage;
    }
  }, [channel, projectId]);

  return <div className="portfolio-site" data-mood={season.mood}>
    <SEOHead title={`${channel === "home" ? "" : `${channels.find(item => item.id === channel)?.label} · `}Ujjwal Raj Nepal — Product & Engineering`} description={profile.introduction} ogImage="/images/ujjwal-nepal.jpg" />
    <a className="site-skip" href="#main-content" onClick={event => { event.preventDefault(); main.current?.focus(); }}>Skip to content</a>
    <div className="site-shell">
      <header className="site-header"><Link to="/" className="site-wordmark" aria-label="Ujjwal Raj Nepal, home">UJJ<span>.</span></Link><nav aria-label="Main navigation">{[{ id: "work", label: "Work" }, { id: "about", label: "About" }, { id: "arcade", label: "Play" }, { id: "almanac", label: "Almanac" }].map(item => <Link key={item.id} to={`/#${item.id}`} aria-current={channel === item.id ? "page" : undefined}>{item.label}</Link>)}<Link to="/resume">Résumé <ArrowUpRight size={14} /></Link></nav><Link className="header-contact" to="/#contact">Let’s talk <ArrowUpRight size={16} /></Link></header>
      {season.preview && <div className="preview-notice" role="status"><span>Previewing {season.theme.label} · {formatDay(season.date)}</span><button onClick={() => season.setPreview(null)}>Back to today ×</button></div>}
      <main ref={main} id="main-content" tabIndex={-1} className={channel === "home" ? "site-home" : `site-page page-${channel}`}>
        {channel === "home" ? <Home season={season} /> : <>
          <div className="page-breadcrumb"><Link to="/">Home</Link><span>/</span><span>{channels.find(item => item.id === channel)?.label}</span>{projectId && <><span>/</span><span>{projects.find(project => project.id === projectId)?.title || "Project"}</span></>}</div>
          {channel === "about" && <AboutContent />}
          {channel === "work" && <WorkContent selected={projectId || null} onSelect={id => go("work", id || undefined)} />}
          {channel === "toolbox" && <ToolboxContent />}
          {channel === "contact" && <ContactContent />}
          {channel === "leadership" && <LeadershipContent />}
          {channel === "terminal" && <><h1 className="terminal-heading">A command line, if you prefer.</h1><TerminalContent onNavigate={go} /></>}
          <Suspense fallback={<p className="page-loading" role="status">Loading…</p>}>
            {channel === "arcade" && <ArcadeContent />}
            {channel === "almanac" && <AlmanacContent season={season} onPreviewHome={() => go("home")} />}
          </Suspense>
        </>}
      </main>
      <footer className="site-footer"><div><Link to="/" className="footer-name">Ujjwal Raj Nepal</Link><span>Product & engineering · Nepal</span></div><nav aria-label="More links"><Link to="/#leadership">Approach</Link><Link to="/#toolbox">Skills</Link><Link to="/#contact">Contact</Link><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><Link to="/#terminal">Terminal</Link></nav><span className="footer-year">© {season.now.getFullYear()}</span></footer>
    </div>
  </div>;
}
