import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Gamepad2, Lightbulb, RotateCcw, Sparkles } from "lucide-react";
import { applyDecision, flipMemoryCard, launchOutcome, launchRounds, newMemoryGame, type Metric, type Metrics } from "@/lib/arcade";

const symbols = ["✦", "◇", "☂", "☕", "⌘", "☾"];
const symbolNames = ["Spark", "Kite", "Rain", "Tea", "Code", "Moon"];
const metricLabels: Record<Metric, string> = { clarity: "Clarity", trust: "Trust", momentum: "Momentum" };

function MemoryGame() {
  const [game, setGame] = useState(newMemoryGame);
  const [best, setBest] = useState<number | null>(() => {
    try { const value = Number(localStorage.getItem("ujj-signal-best-v1")); return Number.isInteger(value) && value >= 6 ? value : null; } catch { return null; }
  });
  const complete = game.matched.length === 6;
  useEffect(() => {
    if (game.open.length !== 2) return;
    const timer = window.setTimeout(() => setGame(current => ({ ...current, open: [] })), 950);
    return () => window.clearTimeout(timer);
  }, [game.open]);
  useEffect(() => {
    if (!complete || (best !== null && best <= game.moves)) return;
    setBest(game.moves);
    try { localStorage.setItem("ujj-signal-best-v1", String(game.moves)); } catch { /* Play still works when storage is unavailable. */ }
  }, [complete, best, game.moves]);

  return <div className="signal-game">
    <div className="game-heading"><div><span className="eyebrow">Memory / 01</span><h1>Signal Match</h1></div><button className="arcade-icon-button" onClick={() => setGame(newMemoryGame())} aria-label="Restart Signal Match"><RotateCcw size={17} /></button></div>
    <p>Flip two cards at a time to find six matching pairs. There’s no timer.</p>
    <div className="game-scoreboard"><span>PAIRS <strong>{game.matched.length}<small>/6</small></strong></span><span>MOVES <strong>{String(game.moves).padStart(2, "0")}</strong></span><span>YOUR BEST <strong>{best ?? "—"}</strong></span></div>
    <div className="memory-grid" aria-label="Signal Match cards">{game.deck.map((symbol, index) => {
      const matched = game.matched.includes(symbol);
      const revealed = matched || game.open.includes(index);
      return <button key={index} className={`memory-card ${revealed ? "is-revealed" : ""} ${matched ? "is-matched" : ""}`} disabled={matched || revealed || game.open.length === 2} aria-label={`Card ${index + 1}: ${matched ? "matched " : ""}${revealed ? symbolNames[symbol] : "face down"}`} onClick={() => setGame(current => flipMemoryCard(current, index))}><span aria-hidden="true">{revealed ? symbols[symbol] : "✳"}</span><small aria-hidden="true">{matched ? "CONNECTED" : revealed ? symbolNames[symbol] : String(index + 1).padStart(2, "0")}</small></button>;
    })}</div>
    <div className={`game-message ${complete ? "game-complete" : ""}`} role="status">{complete ? <><Sparkles size={19} /><span><strong>All the right connections.</strong> Six pairs in {game.moves} moves. {game.moves === 6 ? "A perfect run." : "Fancy another round?"}</span></> : <span>{game.open.length === 2 ? "Different signals. Take a breath and try again." : `${game.matched.length} of 6 pairs found. Your next move.`}</span>}</div>
    <p className="arcade-footnote">Your best score stays in this browser. Just for the joy of it.</p>
  </div>;
}

function LaunchGame() {
  const [choices, setChoices] = useState<number[]>([]);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => { content.current?.scrollIntoView({ block: "start", behavior: "instant" }); }, [choices.length]);
  const [selected, setSelected] = useState<number | null>(null);
  const [shareStatus, setShareStatus] = useState("");
  const metrics = choices.reduce<Metrics>((current, choice, index) => applyDecision(current, launchRounds[index].options[choice]), { clarity: 35, trust: 35, momentum: 45 });
  const round = launchRounds[choices.length];
  const decision = selected !== null && round ? round.options[selected] : null;
  const visibleMetrics = decision ? applyDecision(metrics, decision) : metrics;
  const result = launchOutcome(metrics);
  async function share() {
    try {
      await navigator.clipboard.writeText(`I played Launch Lab on Ujjwal’s site: ${result.title} Clarity ${metrics.clarity}, trust ${metrics.trust}, momentum ${metrics.momentum}. Try it: https://ujjwalnepal.me/#arcade`);
      setShareStatus("Result copied. Send it to someone you’d build with.");
    } catch { setShareStatus("Copy this link to invite a friend: https://ujjwalnepal.me/#arcade"); }
  }
  return <div className="launch-game" ref={content}>
    <div className="game-heading"><div><span className="eyebrow">Product decisions / 02</span><h1>Launch Lab</h1></div><button className="arcade-icon-button" aria-label="Restart Launch Lab" onClick={() => { setChoices([]); setSelected(null); setShareStatus(""); }}><RotateCcw size={17} /></button></div>
    <p>One idea. Four decisions. Keep a small product moving without losing sight of the people using it.</p>
    <div className="launch-meters">{(Object.keys(metricLabels) as Metric[]).map(key => <div key={key}><label htmlFor={`meter-${key}`}>{metricLabels[key]} <strong>{visibleMetrics[key]}</strong></label><meter id={`meter-${key}`} min={0} max={100} value={visibleMetrics[key]}>{visibleMetrics[key]} / 100</meter></div>)}</div>
    {round ? <>
      <div className="launch-progress" aria-label={`Decision ${choices.length + 1} of 4`}>{launchRounds.map((item, index) => <i key={item.chapter} className={index <= choices.length ? "is-current" : ""} />)}</div>
      <div className="launch-question"><span className="eyebrow">{round.chapter}</span><h4>{round.question}</h4><p>{round.context}</p></div>
      <div className="launch-options">{round.options.map((option, index) => <button key={option.title} className={selected === index ? "is-selected" : ""} disabled={selected !== null} onClick={() => setSelected(index)}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span><strong>{option.title}</strong><small>{option.description}</small></span>{selected === index ? <Check size={17} /> : <ArrowRight size={17} />}</button>)}</div>
      {decision && <div className="decision-feedback" role="status"><Lightbulb size={18} /><div><p>{decision.lesson}</p><button className="arcade-primary" onClick={() => { setChoices(current => [...current, selected!]); setSelected(null); }}>{choices.length === 3 ? "See your launch" : "Next decision"}<ArrowRight size={15} /></button></div></div>}
    </> : <div className="launch-result" role="status"><span className="result-star" aria-hidden="true">✳</span><p className="eyebrow">YOUR FIRST CHAPTER IS SHIPPED</p><h4>{result.title}</h4><p>{result.description}</p><ol>{choices.map((choice, index) => <li key={index}>{launchRounds[index].options[choice].title}</li>)}</ol><button className="arcade-primary" onClick={() => void share()}><Copy size={15} /> Copy your result</button><p className="copy-status">{shareStatus}</p></div>}
    <p className="arcade-footnote">A fictional game about product tradeoffs. The scores are illustrative.</p>
  </div>;
}

export default function ArcadeContent() {
  const [game, setGame] = useState<"memory" | "launch" | null>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => { if (game) content.current?.scrollIntoView({ block: "start", behavior: "instant" }); }, [game]);
  return <div ref={content} className="portfolio-content arcade-content">
    {game ? <><button className="text-action" onClick={() => setGame(null)}><ArrowLeft size={15} /> Back to the arcade</button>{game === "memory" ? <MemoryGame /> : <LaunchGame />}</> : <>
      <p className="eyebrow">Just for fun</p><h1>Take a break.</h1><p className="content-lead">Two small games. Match six pairs, or make four decisions about a new product.</p>
      <div className="arcade-games"><button onClick={() => setGame("memory")}><span className="game-number">01</span><Gamepad2 size={23} /><h3>Signal Match</h3><p>Flip the cards and find all six matching pairs.</p><span className="game-meta">MEMORY · 1–2 MIN · SOLO</span><strong>Make a connection <ArrowUpRightIcon /></strong></button><button onClick={() => setGame("launch")}><span className="game-number">02</span><Lightbulb size={23} /><h3>Launch Lab</h3><p>You’re in the product seat. What will you ship?</p><span className="game-meta">STRATEGY · 2 MIN · SOLO</span><strong>Make the call <ArrowUpRightIcon /></strong></button></div>
    </>}
  </div>;
}

function ArrowUpRightIcon() { return <ArrowRight size={15} style={{ transform: "rotate(-35deg)" }} />; }
