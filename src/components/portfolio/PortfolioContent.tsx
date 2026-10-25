import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { experience, profile, projects, skillGroups, type Channel, type Project } from "@/data/portfolio";

export function AboutContent() {
  return <div className="portfolio-content">
    <p className="eyebrow">02 / THE PERSON BEHIND THE PIXELS</p>
    <h2>A builder at heart.<br /><em>Curious by default.</em></h2>
    <p className="content-lead">{profile.biography}</p>
    <p>I like working across the whole product: the interface people touch, the systems underneath, and the decisions that make it useful. Sometimes that means leading a team. Sometimes it means getting deep into the code.</p>
    <div className="about-facts"><span>BASED IN <strong>Nepal</strong></span><span>BUILDING SINCE <strong>2016</strong></span><span>AT THE INTERSECTION <strong>Engineering × product</strong></span></div>
    <div className="section-label"><h3>The journey so far</h3><Link to="/resume" target="_blank">View résumé <ArrowUpRight size={14} /></Link></div>
    <div className="career-list">{experience.map(item => <article className="career-item" key={item.company}>
      <span className="career-year">{item.year}</span><div><h4>{item.company}</h4><p className="career-role">{item.role}</p><p>{item.description}</p>{(item.period || item.since) && <small>{item.period || `Started ${item.since}`}</small>}</div>
    </article>)}</div>
  </div>;
}

function ProjectIllustration({ project }: { project: Project }) {
  return <div className={`project-illustration illustration-${project.id}`} aria-hidden="true">
    <div className="illustration-grid" />
    {project.id === "whoslive" && <div className="stream-discovery"><div className="stream-platforms"><span>Twitch</span><span>YouTube</span><span>Kick</span><span>Rumble</span></div><div className="stream-hub"><i />WhosLive<span>DISCOVER WHAT'S LIVE</span></div></div>}
    {project.id === "farspeak" && <div className="knowledge-flow"><div className="knowledge-records"><span>{"{ data }"}</span><span>documents</span></div><i>→</i><div className="knowledge-answer"><span>Farspeak</span><small>ASK YOUR DATA.</small></div></div>}
    {project.id === "fresh-ktm" && <div className="erp-diagram"><span>GROW</span><i /><span>CONNECT</span><i /><span>DELIVER</span></div>}
    {project.id === "spelly" && <div className="ar-orbit"><div className="ar-cube" /><span>REALITY, REIMAGINED</span><i /><i /></div>}
    {project.id === "howapp" && <div className="play-shapes"><i /><i /><i /><span>A LITTLE EVERYDAY WONDER.</span></div>}
    {project.id === "otonomis" && <div className="tracking-map"><div className="map-route" /><i /><i /><i /><span>CONNECTED. IN MOTION.</span></div>}
    <small>{project.number} / SELECTED WORK</small>
  </div>;
}

export function WorkContent({ selected, onSelect }: { selected: string | null; onSelect: (id: string | null) => void }) {
  const [filter, setFilter] = useState("ALL");
  const project = projects.find(item => item.id === (selected === "ar-stories" ? "spelly" : selected));
  if (project) return <article className="portfolio-content project-detail">
    <button className="text-action" onClick={() => onSelect(null)}><ArrowLeft size={15} /> All selected work</button>
    <ProjectIllustration project={project} />
    <p className="eyebrow">TAPE {project.number} / {project.type}</p>
    <h2>{project.title}</h2><p className="project-subtitle">{project.subtitle}</p>
    {(project.role || project.year || project.period) && <div className="project-meta">{project.role && <span>MY ROLE<strong>{project.role}</strong></span>}{project.period ? <span>WHEN<strong>{project.period}</strong></span> : project.year && <span>STARTED<strong>{project.year}</strong></span>}</div>}
    <p className="content-lead">{project.description}</p>
    <h3>{project.contributions ? "What I worked on" : "What it does"}</h3><ul className="contributions">{(project.contributions ?? project.highlights ?? []).map(item => <li key={item}>{item}</li>)}</ul>
    <div className="tool-tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
    {project.url && <p><a className="text-action" href={project.url} target="_blank" rel="noreferrer">{project.urlLabel || `Visit ${project.title}`} <ArrowUpRight size={15} /></a></p>}
    <a className="text-action" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}`}>Let's talk about this work <ArrowUpRight size={15} /></a>
    <button className="next-project" onClick={() => onSelect(projects[(projects.indexOf(project) + 1) % projects.length].id)}><span>PLAY NEXT TAPE<strong>{projects[(projects.indexOf(project) + 1) % projects.length].title}</strong></span><ArrowRight size={22} /></button>
  </article>;
  return <div className="portfolio-content">
    <p className="eyebrow">03 / A FEW THINGS I'VE BUILT</p><h2>Different problems.<br /><em>Same curiosity.</em></h2>
    <p className="content-lead">A collection of work across platforms, mobile, and the space between the digital and physical.</p>
    <div className="project-filters" aria-label="Filter projects">{["ALL", "PLATFORMS", "AR & AI", "MOBILE"].map(category => <button key={category} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}</button>)}</div>
    <div className="work-list">{projects.filter(item => filter === "ALL" || item.category === filter).map(item => <button key={item.id} className={`work-row ${item.color}`} onClick={() => onSelect(item.id)}>
      <span className="work-number">{item.number}</span><span className="work-description"><span className="work-category">{item.type}</span><strong>{item.title}</strong><span>{item.summary}</span></span><ArrowUpRight size={22} />
    </button>)}</div>
  </div>;
}

export function ToolboxContent() {
  return <div className="portfolio-content">
    <p className="eyebrow">04 / TOOLS OF THE TRADE</p><h2>Whatever the idea<br /><em>calls for.</em></h2>
    <p className="content-lead">From a native mobile interface to the infrastructure behind it. These are the tools and disciplines I bring to the work.</p>
    <div className="skill-list">{skillGroups.map(group => <article key={group.number}><span>{group.number}</span><div><h3>{group.name}</h3><div className="tool-tags">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div></article>)}</div>
  </div>;
}

export function ContactContent() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true); setCopyFailed(false);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2500);
    } catch { setCopyFailed(true); }
  }
  return <div className="portfolio-content contact-content">
    <p className="eyebrow">05 / GOOD THINGS START WITH HELLO</p><h2>Have something<br /><em>in mind?</em></h2>
    <p className="content-lead">An idea to build, a problem to untangle, or just a shared curiosity. I'd love to hear from you.</p>
    <div className="email-link"><a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a><button onClick={copyEmail} aria-label={copied ? "Email copied" : "Copy email address"}>{copied ? <Check size={17} /> : <Copy size={17} />}</button></div>
    <p className="copy-status" role="status">{copied ? "Email copied. Talk soon!" : copyFailed ? "Select the email address above to copy it, or click to open your email app." : ""}</p>
    <div className="social-directory">
      <a href={profile.github} target="_blank" rel="noreferrer"><Github size={20} /><span>GitHub<small>The code side of things</small></span><ArrowUpRight size={20} /></a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /><span>LinkedIn<small>The professional side of things</small></span><ArrowUpRight size={20} /></a>
      <a href={`mailto:${profile.email}`}><Mail size={20} /><span>Email<small>The start of a conversation</small></span><ArrowUpRight size={20} /></a>
    </div>
    <p className="contact-signoff">From Nepal, with curiosity.<span>Ujjwal</span></p>
  </div>;
}

export function TerminalContent({ onNavigate }: { onNavigate: (channel: Channel) => void }) {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState(["Welcome to Ujjwal's little corner of the internet.", "Type help to look around."]);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [history]);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    setCommand("");
    if (!value) return;
    if (value === "clear") { setHistory([]); return; }
    const destinations: Record<string, Channel> = { about: "about", work: "work", skills: "toolbox", toolbox: "toolbox", contact: "contact", home: "home" };
    const responses: Record<string, string> = {
      help: "Take a look around:\n  about     Meet the person\n  work      Browse selected projects\n  skills    Open the toolbox\n  contact   Say hello\n  whoami    A quick introduction\n  date      The time in Nepal\n  clear     Clear this screen\n  home      Back to the desk",
      whoami: `${profile.name}\n${profile.role}\nBuilding from Nepal since 2016.`,
      date: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kathmandu" }) + " NPT",
    };
    setHistory(items => [...items, `ujjwal@desk:~$ ${value}`, responses[value] || (destinations[value] ? `Opening ${value}…` : `Command not found: ${value}. Try help.`)].slice(-60));
    if (destinations[value]) onNavigate(destinations[value]);
  }
  return <div className="terminal-content"><div className="terminal-title">UJJ / PERSONAL TERMINAL <span>CONNECTED</span></div><div ref={log} className="terminal-log" role="log" aria-live="polite">{history.map((line, index) => <pre key={index}>{line}</pre>)}</div><form onSubmit={submit}><label htmlFor="terminal-command">ujjwal@desk:~$</label><input id="terminal-command" value={command} onChange={event => setCommand(event.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Terminal command" placeholder="help" /><button type="submit" aria-label="Run command"><ArrowRight size={18} /></button></form><p>Just a small playground. Try <button onClick={() => setCommand("help")}>help</button>.</p></div>;
}

export function ReadingView({ onReturn }: { onReturn: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const workRef = useRef<HTMLElement>(null);
  return <div className="reading-view">
    <header className="reading-header"><Link to="/" onClick={onReturn} className="wordmark">UJJ <span>Ujjwal Raj Nepal</span></Link><button onClick={onReturn}>Back to the desk <ArrowUpRight size={15} /></button></header>
    <main className="reading-main">
      <div className="reading-hero"><p className="eyebrow">NAMASTE. HELLO. WELCOME.</p><h1>Ujjwal Raj Nepal<span>Engineer. Builder.<br /><em>Endlessly curious.</em></span></h1><p>{profile.introduction}</p><nav aria-label="Page sections"><a href="#about">About <ArrowDown size={13} /></a><a href="#work">Selected work <ArrowDown size={13} /></a><a href="#toolbox">Toolbox <ArrowDown size={13} /></a><a href="#contact">Connect <ArrowDown size={13} /></a></nav></div>
      <section id="about"><AboutContent /></section>
      <section id="work" ref={workRef}><WorkContent selected={selected} onSelect={id => { setSelected(id); workRef.current?.scrollIntoView({ behavior: "smooth" }); }} /></section>
      <section id="toolbox"><ToolboxContent /></section>
      <section id="contact"><ContactContent /></section>
    </main><footer className="reading-footer">© {new Date().getFullYear()} Ujjwal Raj Nepal <span>Made with curiosity, in Nepal.</span></footer>
  </div>;
}

export function ResumeContent() {
  return <div className="resume-view"><div className="resume-toolbar"><Link to="/">← Back to the desk</Link><button onClick={() => window.print()}><Printer size={16} /> Print / Save PDF</button></div><main className="resume-paper"><header><p className="eyebrow">ENGINEERING · PRODUCT · CREATIVE TECHNOLOGY</p><h1>{profile.name}</h1><p>{profile.role} · Nepal</p><div className="resume-links"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.github}>github.com/ujjwalnepal</a><a href={profile.linkedin}>LinkedIn</a></div></header><section><h2>Profile</h2><p>{profile.biography}</p></section><section><h2>Experience</h2>{experience.map(item => <article key={item.company}><div><h3>{item.company}</h3>{(item.period || item.since) && <span>{item.period || `Started ${item.since}`}</span>}</div><h4>{item.role}</h4><p>{item.description}</p></article>)}</section><section><h2>Skills & disciplines</h2>{skillGroups.map(group => <p key={group.name}><strong>{group.name}:</strong> {group.tools.join(" · ")}</p>)}</section></main></div>;
}
