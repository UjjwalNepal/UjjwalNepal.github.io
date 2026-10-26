import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { experience, profile, projects, skillGroups, type Channel } from "@/data/portfolio";

export function AboutContent() {
  return <div className="portfolio-content">
    <p className="eyebrow">Background</p>
    <h1>About me.</h1>
    <p className="content-lead">{profile.biography}</p>
    <p>I like working across the whole product: the interface people touch, the systems underneath, and the decisions that make it useful. Sometimes that means leading a team. Sometimes it means getting deep into the code.</p>
    <div className="about-facts"><span>BASED IN <strong>Nepal</strong></span><span>BUILDING SINCE <strong>2016</strong></span><span>MY FOCUS <strong>Engineering × product</strong></span></div>
    <div className="section-label"><h3>Experience</h3><Link to="/resume" target="_blank">View résumé <ArrowUpRight size={14} /></Link></div>
    <div className="career-list">{experience.map(item => <article className="career-item" key={item.company}>
      <span className="career-year">{item.year}</span><div><h4>{item.company}</h4><p className="career-role">{item.role}</p><p>{item.description}</p>{(item.period || item.since) && <small>{item.period || `Started ${item.since}`}</small>}</div>
    </article>)}</div>
  </div>;
}

export function WorkContent({ selected, onSelect }: { selected: string | null; onSelect: (id: string | null) => void }) {
  const [filter, setFilter] = useState("ALL");
  const project = projects.find(item => item.id === (selected === "ar-stories" ? "spelly" : selected));
  if (project) return <article className="portfolio-content project-detail">
    <button className="text-action" onClick={() => onSelect(null)}><ArrowLeft size={15} /> All selected work</button>
    <p className="eyebrow">{project.type}</p>
    <h1>{project.title}</h1>
    {(project.role || project.year || project.period) && <div className="project-meta">{project.role && <span>MY ROLE<strong>{project.role}</strong></span>}{project.period ? <span>WHEN<strong>{project.period}</strong></span> : project.year && <span>STARTED<strong>{project.year}</strong></span>}</div>}
    <p className="content-lead">{project.description}</p>
    <h3>{project.contributions ? "What I worked on" : "What it does"}</h3><ul className="contributions">{(project.contributions ?? project.highlights ?? []).map(item => <li key={item}>{item}</li>)}</ul>
    <div className="tool-tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
    {project.url && <p><a className="text-action" href={project.url} target="_blank" rel="noreferrer">{project.urlLabel || `Visit ${project.title}`} <ArrowUpRight size={15} /></a></p>}
    <a className="text-action" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}`}>Let's talk about this work <ArrowUpRight size={15} /></a>
    <button className="next-project" onClick={() => onSelect(projects[(projects.indexOf(project) + 1) % projects.length].id)}><span>Next project<strong>{projects[(projects.indexOf(project) + 1) % projects.length].title}</strong></span><ArrowRight size={22} /></button>
  </article>;
  return <div className="portfolio-content">
    <p className="eyebrow">Projects</p><h1>Selected work.</h1>
    <p className="content-lead">Live-streaming, AI tools, business systems, and mobile apps. Select a project for the details.</p>
    <div className="project-filters" aria-label="Filter projects">{["ALL", "PLATFORMS", "AR & AI", "MOBILE"].map(category => <button key={category} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}</button>)}</div>
    <div className="work-list">{projects.filter(item => filter === "ALL" || item.category === filter).map(item => <button key={item.id} className={`work-row ${item.color}`} onClick={() => onSelect(item.id)}>
      <span className="work-number">{item.number}</span><span className="work-description"><span className="work-category">{item.type}</span><strong>{item.title}</strong><span>{item.summary}</span></span><ArrowUpRight size={22} />
    </button>)}</div>
  </div>;
}

export function ToolboxContent() {
  const [lens, setLens] = useState("All disciplines");
  const visible = skillGroups.filter((_, index) => lens === "All disciplines" || (lens === "Product & people" ? index < 2 : index >= 2));
  return <div className="portfolio-content">
    <p className="eyebrow">Skills & tools</p><h1>What I work with.</h1>
    <p className="content-lead">I work across product strategy, technical leadership, and engineering. These are the disciplines and tools behind the projects.</p>
    <div className="project-filters" aria-label="Filter capabilities">{["All disciplines", "Product & people", "Engineering"].map(item => <button key={item} aria-pressed={lens === item} onClick={() => setLens(item)}>{item}</button>)}</div>
    <div className="skill-list">{visible.map(group => <article key={group.number}><span>{group.number}</span><div><h3>{group.name}</h3><p className="skill-description">{group.description}</p><div className="tool-tags">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div><Link className="skill-evidence" to={`/#work/${group.project}`}>{group.evidence}<ArrowUpRight size={12} /></Link></div></article>)}</div>
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
    <p className="eyebrow">Contact</p><h1>Get in touch.</h1>
    <p className="content-lead">For product leadership, a new build, or a technical problem you want to work through—send me an email.</p>
    <div className="contact-intents" aria-label="Start a conversation">{["Product leadership", "Build an MVP", "Technical direction", "Something unexpected"].map(topic => <a key={topic} href={`mailto:${profile.email}?subject=${encodeURIComponent(topic)}`}>{topic}<ArrowUpRight size={12} /></a>)}</div>
    <div className="email-link"><a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a><button onClick={copyEmail} aria-label={copied ? "Email copied" : "Copy email address"}>{copied ? <Check size={17} /> : <Copy size={17} />}</button></div>
    <p className="copy-status" role="status">{copied ? "Email copied. Talk soon!" : copyFailed ? "Select the email address above to copy it, or click to open your email app." : ""}</p>
    <div className="social-directory">
      <a href={profile.github} target="_blank" rel="noreferrer"><Github size={20} /><span>GitHub<small>Code and projects</small></span><ArrowUpRight size={20} /></a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /><span>LinkedIn<small>Professional profile</small></span><ArrowUpRight size={20} /></a>
      <a href={`mailto:${profile.email}`}><Mail size={20} /><span>Email<small>Send a message</small></span><ArrowUpRight size={20} /></a>
    </div>
    <p className="contact-signoff">Based in Nepal.<span>Ujjwal</span></p>
  </div>;
}

export function TerminalContent({ onNavigate }: { onNavigate: (channel: Channel) => void }) {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState(["Ujjwal Raj Nepal / personal site", "Type help to look around."]);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [history]);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    setCommand("");
    if (!value) return;
    if (value === "clear") { setHistory([]); return; }
    const destinations: Record<string, Channel> = { about: "about", work: "work", skills: "toolbox", toolbox: "toolbox", contact: "contact", home: "home", play: "arcade", arcade: "arcade", leadership: "leadership", playbook: "leadership", calendar: "almanac", almanac: "almanac" };
    const responses: Record<string, string> = {
      help: "Take a look around:\n  about     Meet the person\n  work      Browse selected projects\n  skills    Open the toolbox\n  playbook  Product & leadership\n  play      Take an arcade break\n  calendar  Nepal + US almanac\n  contact   Say hello\n  whoami    A quick introduction\n  date      The time in Nepal\n  clear     Clear this screen\n  home      Back to the homepage",
      whoami: `${profile.name}\n${profile.role}\nBuilding from Nepal since 2016.`,
      date: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kathmandu" }) + " NPT",
    };
    setHistory(items => [...items, `ujjwal@site:~$ ${value}`, responses[value] || (destinations[value] ? `Opening ${value}…` : `Command not found: ${value}. Try help.`)].slice(-60));
    if (destinations[value]) onNavigate(destinations[value]);
  }
  return <div className="terminal-content"><div className="terminal-title">UJJ / PERSONAL TERMINAL <span>CONNECTED</span></div><div ref={log} className="terminal-log" role="log" aria-live="polite">{history.map((line, index) => <pre key={index}>{line}</pre>)}</div><form onSubmit={submit}><label htmlFor="terminal-command">ujjwal@site:~$</label><input id="terminal-command" value={command} onChange={event => setCommand(event.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Terminal command" placeholder="help" /><button type="submit" aria-label="Run command"><ArrowRight size={18} /></button></form><p>Just a small playground. Try <button onClick={() => setCommand("help")}>help</button>.</p></div>;
}

export function ResumeContent() {
  const whoslive = projects.find(project => project.id === "whoslive")!;
  return <div className="resume-view">
    <div className="resume-toolbar"><Link to="/">← Back to the site</Link><button onClick={() => window.print()}><Printer size={16} /> Print / Save PDF</button></div>
    <main className="resume-paper">
      <header className="resume-header"><p className="eyebrow">Product leadership & engineering</p><h1>{profile.name}</h1><p className="resume-role">{profile.role}</p>
        <div className="resume-links"><span>Nepal</span><a href={`mailto:${profile.email}`}>{profile.email}</a><a href="https://ujjwalnepal.me">ujjwalnepal.me</a><a href={profile.linkedin}>LinkedIn</a><a href={profile.github}>GitHub / ujjwalnepal</a></div>
      </header>
      <section className="resume-summary"><h2>Profile</h2><p>{profile.resumeSummary}</p></section>
      <section className="resume-featured-product"><h2>Featured product</h2><div className="resume-product-heading"><h3>{whoslive.title}</h3><a href={whoslive.url}>whoslive.io <ArrowUpRight size={12} /></a></div><h4>Live-stream discovery · Personalized feeds · Creator community</h4><p>{whoslive.description}</p></section>
      <section className="resume-strengths"><h2>Leadership & product capabilities</h2><div className="resume-capabilities">{skillGroups.slice(0, 2).map(group => <div key={group.name}><h3>{group.name}</h3><p>{group.tools.join(" · ")}</p></div>)}</div></section>
      <section className="resume-experience"><h2>Experience</h2>{experience.map(item => <article key={item.company}><div className="resume-job-heading"><h3>{item.company}</h3>{item.since && <span>Started {item.since}</span>}</div><h4>{item.role}</h4><ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></article>)}</section>
      <section className="resume-skills"><h2>Technical skills</h2><div className="resume-skill-grid">{skillGroups.slice(2).map(group => <div key={group.name}><h3>{group.name}</h3><p>{group.tools.join(" · ")}</p></div>)}</div></section>
      <footer className="resume-footer"><span>Selected projects, product thinking, and contact</span><a href="https://ujjwalnepal.me">ujjwalnepal.me</a></footer>
    </main>
  </div>;
}
