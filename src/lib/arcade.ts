export interface MemoryState { deck: number[]; open: number[]; matched: number[]; moves: number }
export function newMemoryGame(random = Math.random): MemoryState {
  const deck = Array.from({ length: 12 }, (_, index) => index % 6);
  for (let index = deck.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [deck[index], deck[other]] = [deck[other], deck[index]];
  }
  return { deck, open: [], matched: [], moves: 0 };
}

export function flipMemoryCard(state: MemoryState, index: number): MemoryState {
  if (!Number.isInteger(index) || index < 0 || index >= state.deck.length || state.open.length === 2 || state.open.includes(index) || state.matched.includes(state.deck[index])) return state;
  if (!state.open.length) return { ...state, open: [index] };
  const first = state.open[0];
  if (state.deck[first] === state.deck[index]) return { ...state, open: [], matched: [...state.matched, state.deck[index]], moves: state.moves + 1 };
  return { ...state, open: [first, index], moves: state.moves + 1 };
}

export type Metric = "clarity" | "trust" | "momentum";
export type Metrics = Record<Metric, number>;
export interface Decision { title: string; description: string; delta: Metrics; lesson: string }
export const launchRounds: { chapter: string; question: string; context: string; options: Decision[] }[] = [
  { chapter: "01 / THE SPARK", question: "You have an idea. Where do you start?", context: "You’re building a small app that helps neighbours share skills. The team has one month to get a useful first version out.", options: [
    { title: "Talk to five neighbours", description: "Understand how they solve this problem today.", delta: { clarity: 25, trust: 10, momentum: -10 }, lesson: "You learn that finding someone trustworthy matters more than having a huge directory. Clarity costs a little time." },
    { title: "Build a tiny prototype", description: "Make the idea tangible and get it into people’s hands.", delta: { clarity: 10, trust: 0, momentum: 20 }, lesson: "A prototype creates momentum. You still need to find out whether the problem matters to the people trying it." },
    { title: "Open a public waitlist", description: "See who signs up before committing to the build.", delta: { clarity: 5, trust: -5, momentum: 25 }, lesson: "The idea attracts interest. Sign-ups are a useful starting signal, but they don’t yet tell you who will keep using it." },
  ] },
  { chapter: "02 / THE CUT", question: "The wishlist is bigger than the month.", context: "People want chat, payments, ratings, scheduling, and a smart matching engine. Your team can ship one dependable flow.", options: [
    { title: "One excellent introduction", description: "Help one neighbour find and contact another.", delta: { clarity: 20, trust: 10, momentum: 5 }, lesson: "A clear first promise makes the release easier to understand, build, and evaluate." },
    { title: "Build the matching engine", description: "Invest early in the most distinctive part of the idea.", delta: { clarity: -5, trust: 5, momentum: -15 }, lesson: "The system has potential, but it consumes the schedule before you have enough real usage to guide it." },
    { title: "Concierge it manually", description: "Personally connect the first few neighbours.", delta: { clarity: 15, trust: 20, momentum: -5 }, lesson: "Manual work reveals the details that software will eventually need to handle. It earns trust, but won’t scale forever." },
  ] },
  { chapter: "03 / THE RELEASE", question: "It works. Mostly. Who gets it first?", context: "The main flow is ready. A few rough edges remain, and you haven’t seen what happens when strangers use it.", options: [
    { title: "Invite a small neighbourhood", description: "A clear beta invitation, direct support, and a feedback loop.", delta: { clarity: 15, trust: 20, momentum: 5 }, lesson: "A small launch gives you room to listen and fix problems while expectations are clear." },
    { title: "Launch everywhere", description: "Make a big announcement and learn in public.", delta: { clarity: 5, trust: -20, momentum: 30 }, lesson: "Attention arrives quickly, along with support demands. Reach is only useful if the experience can keep its promise." },
    { title: "Polish for another month", description: "Smooth every edge before anyone sees it.", delta: { clarity: -5, trust: 10, momentum: -15 }, lesson: "Polish can build confidence, but some questions can only be answered by people using the product." },
  ] },
  { chapter: "04 / WHAT’S NEXT", question: "People signed up. What do you measure?", context: "Launch day is over. You need to choose the signal that should guide the next release.", options: [
    { title: "Successful connections", description: "Did someone get useful help, and come back?", delta: { clarity: 20, trust: 15, momentum: 5 }, lesson: "You connect the metric to the value you promised. Now the team has a reason for the next release." },
    { title: "Total registrations", description: "Keep the acquisition curve moving upward.", delta: { clarity: -10, trust: -5, momentum: 20 }, lesson: "Growth tells you people are arriving. It doesn’t explain whether they found a reason to stay." },
    { title: "The biggest feature request", description: "Give the loudest early supporters what they ask for.", delta: { clarity: 0, trust: 10, momentum: 10 }, lesson: "Responsiveness matters. Check whether a request represents a broad need before it becomes the whole roadmap." },
  ] },
];

export function applyDecision(metrics: Metrics, decision: Decision): Metrics {
  return Object.fromEntries(Object.entries(metrics).map(([key, value]) => [key, Math.min(100, Math.max(0, value + decision.delta[key as Metric]))])) as Metrics;
}

export function launchOutcome(metrics: Metrics): { title: string; description: string } {
  if (Math.min(...Object.values(metrics)) >= 55) return { title: "Built to keep going.", description: "You balanced learning, trust, and forward motion. The next chapter starts with people using what you made." };
  if (metrics.momentum > metrics.trust) return { title: "Fast off the blocks.", description: "You created momentum. Now give trust and understanding the attention they need to catch up." };
  return { title: "Thoughtful foundations.", description: "You made space for care and learning. The next move is a small release that turns those foundations into real use." };
}
