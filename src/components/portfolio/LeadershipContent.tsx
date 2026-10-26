import { useState } from "react";
import { ArrowRight, ArrowUpRight, Compass, Layers3, Rocket, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "@/data/portfolio";

const chapters = [
  { label: "Find the problem", icon: Compass, question: "What is worth building?", title: "Start with someone’s day.", description: "Before a feature list, I want a clear picture of the person, the problem, and the change we hope to make. A useful product starts with a specific need.", artifact: "A clear problem, a real user, one useful outcome.", example: "HowApp", evidence: "Shaped a parenting product around practical activities and community, taking it from concept to delivery.", project: "howapp" },
  { label: "Make the call", icon: Layers3, question: "What should we do first?", title: "Ambition needs a small first step.", description: "I like big ideas with a small, testable starting point. Scope is a product decision: choose what matters now, name the tradeoffs, and leave room to learn.", artifact: "A focused first release and explicit tradeoffs.", example: "Fresh KTM", evidence: "Connected supply chain, point of sale, accounting, and billing in an integrated agritech ERP.", project: "fresh-ktm" },
  { label: "Build together", icon: Users, question: "How do we get there?", title: "Give people context, then ownership.", description: "Product, design, and engineering work better with a shared picture of success. I bridge those conversations and stay close enough to the code to understand the cost of a decision.", artifact: "Shared direction, clear ownership, working software.", example: "Farspeak", evidence: "Served as CTO of an AI developer toolkit, before WhosLive.", project: "farspeak" },
  { label: "Keep learning", icon: Rocket, question: "What happens after launch?", title: "Shipping opens the conversation.", description: "A release is a chance to listen. I want to understand what people actually use, where they get stuck, and whether the product deserves the next investment of time.", artifact: "The next question to answer, not just the next feature.", example: "Spelly", evidence: "Brought together native iOS, AR storytelling, machine learning, and AWS infrastructure in a working product.", project: "spelly" },
];

export default function LeadershipContent() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];
  return <div className="portfolio-content leadership-content">
    <p className="eyebrow">Product & leadership</p>
    <h1>How I work.</h1>
    <p className="content-lead">I work best when I can help decide what to build and take responsibility for getting it out. Here’s how I approach those decisions.</p>
    <div className="leadership-statement"><span>The work</span><p>Product direction <i>×</i> technical depth <i>×</i> people</p></div>
    <p className="playbook-invite">Four parts of the process.</p>
    <div className="playbook-tabs" role="tablist" aria-label="Product leadership playbook">{chapters.map((item, index) => <button key={item.label} id={`chapter-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="chapter-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % chapters.length;
      else if (event.key === "ArrowLeft") next = (index + chapters.length - 1) % chapters.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = chapters.length - 1;
      else return;
      event.preventDefault(); setActive(next); document.getElementById(`chapter-tab-${next}`)?.focus();
    }}><item.icon size={17} /><span>0{index + 1}<strong>{item.label}</strong></span></button>)}</div>
    <section className="playbook-panel" id="chapter-panel" role="tabpanel" aria-labelledby={`chapter-tab-${active}`} tabIndex={0}>
      <span className="chapter-question">{chapter.question}</span><h3>{chapter.title}</h3><p>{chapter.description}</p>
      <div className="chapter-artifact"><span>The outcome</span><p>{chapter.artifact}</p></div>
      <div className="chapter-evidence"><small>In practice · {chapter.example}</small><p>{chapter.evidence}</p><Link to={`/#work/${chapter.project}`}>Explore the work <ArrowUpRight size={14} /></Link></div>
    </section>
    <div className="builder-invitation"><span className="builder-mark" aria-hidden="true">↗</span><div><h3>Working on something new?</h3><p>I’m interested in early products, team leadership, and technical direction.</p><a href={`mailto:${profile.email}?subject=Let's%20build%20something`}>Let’s talk about it <ArrowRight size={15} /></a></div></div>
  </div>;
}
