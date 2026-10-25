export const profile = {
  name: "Ujjwal Raj Nepal",
  role: "Product leader & hands-on technologist",
  email: "nepalujjwal95@gmail.com",
  github: "https://github.com/ujjwalnepal",
  linkedin: "https://np.linkedin.com/in/ujjwal-raj-nepal-6526a2b0",
  introduction: "I connect product vision, people, and engineering to turn an idea into something useful. A product leader and hands-on technologist in Nepal, with an entrepreneurial streak and a soft spot for ambitious problems.",
  biography: "I've been building software since 2016, moving between technical leadership, product direction, and hands-on engineering. From serving as CTO at Farspeak to leading HowApp from concept to delivery, I care about the whole journey: the problem, the people, the product, and the systems that keep it running.",
  resumeSummary: "Product leader and hands-on technologist building software since 2016. Experience spans CTO responsibilities, cross-functional team leadership, product delivery, and full-stack engineering. Brings an entrepreneurial approach to translating business needs into focused products, with work across AI developer tools, enterprise operations, mobile, and augmented reality.",
};

// Based on the résumé details in the existing About, Experience, and Skills sections.
// Start dates are preserved without assuming that every engagement is still current.
interface Experience {
  company: string;
  role: string;
  since?: string;
  year?: string;
  period?: string;
  description: string;
  bullets: readonly string[];
}

export const experience: readonly Experience[] = [
  { company: "Farspeak", role: "Chief Technology Officer (CTO)", period: "Before WhosLive", description: "Served as CTO at Farspeak, an AI developer toolkit for working with structured data and documents through natural-language queries.", bullets: ["Served as CTO of an AI developer platform for querying structured records and documents in natural language."] },
  { company: "Fresh KTM", role: "Lead Technical Consultant", since: "Apr 2022", year: "2022", description: "Led development of an agritech ERP, connecting supply chain operations, point of sale, accounting, and billing. Designed scalable systems and CI/CD pipelines.", bullets: ["Architected and led development of an agritech ERP connecting supply chain, point of sale, accounting, and billing workflows.", "Established scalable system architecture, CI/CD pipelines, and DevOps practices to support product delivery."] },
  { company: "Stealth AI Startup", role: "Lead Full-stack Developer", since: "Oct 2021", year: "2021", description: "Built Spelly, an iOS AR storytelling app, with ARKit and RealityKit. Integrated CoreML and language models, supported by a scalable NoSQL backend on AWS.", bullets: ["Led development of Spelly, a native iOS storytelling app combining Swift, ARKit, RealityKit, CoreML, and language models.", "Engineered a scalable NoSQL backend and serverless infrastructure on AWS to support the application."] },
  { company: "HowApp: Play at Home", role: "Full-stack Developer / Project Manager", since: "Apr 2019", year: "2019", description: "Took a parenting app from concept to delivery, leading developers and designers and shaping a product centered on community and practical activities.", bullets: ["Led developers and designers from concept to delivery of a parenting platform, combining product direction with hands-on development.", "Shaped and built community features and practical activities around the needs of parents."] },
  { company: "Otonomis", role: "ML Engineer / Full-stack Developer", since: "May 2017", year: "2017", description: "Developed a vehicle fleet tracking platform, a scalable tracking server, and native iOS and Android apps for real-time location and reporting.", bullets: ["Built a fleet management platform with a scalable tracking server, real-time location data, and reporting.", "Developed native iOS and Android applications connecting fleet operations with mobile users."] },
  { company: "Computer Science Research and Development Center", role: "Engineer", since: "Apr 2016", year: "2016", description: "Researched and developed cross-platform mobile applications, with an emphasis on adaptive interfaces and a consistent experience across iOS and Android.", bullets: ["Researched and developed cross-platform mobile applications with adaptive interfaces and consistent iOS and Android experiences."] },
];

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: "PLATFORMS" | "AR & AI" | "MOBILE";
  year?: string;
  period?: string;
  tapeLabel?: string;
  color: "sage" | "terracotta" | "ochre" | "blue" | "violet" | "teal";
  role?: string;
  type: string;
  summary: string;
  description: string;
  contributions?: readonly string[];
  highlights?: readonly string[];
  tools: readonly string[];
  url?: string;
  urlLabel?: string;
}

export const projects: readonly Project[] = [
  {
    id: "whoslive", number: "01", title: "WhosLive", subtitle: "Find your people. Catch them live.", category: "PLATFORMS", color: "violet", tapeLabel: "LIVE", type: "Live streaming · Discovery · Mobile",
    summary: "One place to discover live streams and keep up with creators across Twitch, YouTube, Kick, and Rumble.",
    description: "WhosLive brings live-stream discovery together across platforms. Viewers can explore gaming, sports, entertainment, and live events, personalize their feed, and follow the creators they want to catch live.",
    // Public product capabilities; personal role, dates, and contributions await confirmation.
    highlights: ["Browse trending streams and search by category across multiple streaming platforms.", "Connect streaming accounts and personalize a feed around favorite creators and interests.", "Follow creators and receive updates when they go live."],
    tools: ["Live discovery", "Personalized feeds", "Creator follows", "iOS & Android"],
    url: "https://whoslive.io/",
  },
  {
    id: "farspeak", number: "02", title: "Farspeak", subtitle: "Your data. A conversation away.", category: "AR & AI", color: "teal", tapeLabel: "CTO", role: "Chief Technology Officer (CTO)", period: "Before WhosLive", type: "AI · Developer tools · Data",
    summary: "An AI toolkit that makes structured data and documents queryable in natural language.",
    description: "Before WhosLive, I served as CTO at Farspeak. The platform brings structured records and documents into a shared data layer, helping developers build AI applications that answer questions using their own data.",
    highlights: ["Process JSON records and PDF documents through a JavaScript / TypeScript client.", "Keep stored data and its vector embeddings synchronized as records change.", "Query data in natural language, with support for retrieval-augmented generation and MongoDB Atlas."],
    tools: ["AI developer tools", "JavaScript / TypeScript", "RAG", "Vector embeddings", "MongoDB Atlas"],
    url: "https://github.com/farspeak/farspeak-js", urlLabel: "Explore Farspeak on GitHub",
  },
  {
    id: "fresh-ktm", number: "03", title: "Fresh KTM", subtitle: "From farm to a better system.", category: "PLATFORMS", year: "2022", color: "sage", role: "Lead Technical Consultant", type: "Agritech · ERP · Infrastructure",
    summary: "Connecting the moving parts of an agritech business — from supply chain and inventory to point of sale.",
    description: "An integrated ERP system designed around the everyday operations of an agritech business. My work brought supply chain, point-of-sale, accounting, and billing workflows into one scalable platform.",
    contributions: ["Architected the system and led development across operational modules.", "Created accounting and billing functionality to support business requirements.", "Established CI/CD pipelines and DevOps practices for dependable delivery."],
    tools: ["Full-stack development", "ERP", "CI/CD", "System design", "Supply chain"],
  },
  {
    id: "spelly", number: "04", title: "Spelly", subtitle: "A little more reality. A lot more imagination.", category: "AR & AI", year: "2021", color: "terracotta", role: "Lead Full-stack Developer", type: "iOS · Augmented reality · AI",
    summary: "An AR storytelling app that brings digital stories into the physical world.",
    description: "At a stealth AI startup, I led development of Spelly, an iOS storytelling app built with ARKit and RealityKit, connecting immersive scenes with machine learning and language models.",
    contributions: ["Developed the native iOS experience and AR interactions.", "Integrated CoreML and LLM-powered features into the application.", "Engineered a scalable NoSQL backend on AWS, including serverless infrastructure."],
    tools: ["Swift", "ARKit", "RealityKit", "CoreML", "LLMs", "AWS", "NoSQL"],
  },
  {
    id: "howapp", number: "05", title: "HowApp", subtitle: "Less planning. More play.", category: "MOBILE", year: "2019", color: "ochre", role: "Full-stack Developer / Project Manager", type: "Parenting · Mobile · Product",
    summary: "A parenting platform built around practical activities, community, and play at home.",
    description: "A product journey from the first idea to a delivered parenting app. I combined hands-on full-stack development with responsibility for the team and product direction.",
    contributions: ["Led a team of developers and designers from concept to delivery.", "Shaped the product vision around practical value for parents.", "Built the application and its community-focused features."],
    tools: ["Mobile development", "Full-stack development", "Product strategy", "UX", "Team leadership"],
  },
  {
    id: "otonomis", number: "06", title: "Otonomis", subtitle: "Making sense of things in motion.", category: "PLATFORMS", year: "2017", color: "blue", role: "ML Engineer / Full-stack Developer", type: "IoT · Native mobile · Real-time systems",
    summary: "Fleet tracking that connects vehicles, real-time data, and the people managing them.",
    description: "A comprehensive vehicle fleet management system, combining a scalable tracking server with native applications and reporting tools.",
    contributions: ["Developed the tracking server and real-time data flows.", "Created native mobile apps for both iOS and Android.", "Connected location tracking and reporting in a unified fleet management experience."],
    tools: ["IoT", "Machine learning", "iOS", "Android", "Real-time systems"],
  },
] as const;

export const skillGroups = [
  { number: "01", name: "Product & entrepreneurship", description: "Turn an ambitious idea into a focused first product.", evidence: "HowApp · concept to delivery", project: "howapp", tools: ["Product strategy", "Product management", "MVP scoping", "Prioritization", "Product delivery", "Business workflows"] },
  { number: "02", name: "Leadership & execution", description: "Connect technical decisions, team direction, and business needs.", evidence: "Farspeak · CTO / Fresh KTM · technical lead", project: "farspeak", tools: ["Technical leadership", "Team leadership", "Cross-functional collaboration", "Project management", "Agile delivery", "Software architecture"] },
  { number: "03", name: "Web & native mobile", description: "Build the part people actually touch.", evidence: "HowApp · mobile / Otonomis · iOS & Android", project: "otonomis", tools: ["TypeScript", "React", "Vue", "Swift", "React Native", "Flutter", "Native iOS & Android"] },
  { number: "04", name: "AI & spatial computing", description: "Bring intelligence into software and stories into physical space.", evidence: "Spelly · AR storytelling / Farspeak · AI tools", project: "spelly", tools: ["LLMs", "CoreML", "Machine learning", "ARKit", "RealityKit", "AI product development", "IoT"] },
  { number: "05", name: "Backend & architecture", description: "Make the experience dependable beneath the surface.", evidence: "Fresh KTM · integrated ERP", project: "fresh-ktm", tools: ["Node.js", "NestJS", "Express", "MongoDB", "NoSQL", "API design", "System design", "Real-time systems"] },
  { number: "06", name: "Cloud & delivery", description: "Carry a product from the first deployment into everyday operation.", evidence: "Spelly · AWS / Fresh KTM · CI/CD", project: "spelly", tools: ["AWS", "Google Cloud", "AWS Lambda", "CloudFront", "CI/CD", "DevOps", "Scalable infrastructure"] },
];

export const channels = [
  { id: "home", label: "Home", number: "01" },
  { id: "about", label: "About", number: "02" },
  { id: "work", label: "Work", number: "03" },
  { id: "toolbox", label: "Toolbox", number: "04" },
  { id: "contact", label: "Connect", number: "05" },
  { id: "terminal", label: "Terminal", number: "06" },
  { id: "leadership", label: "Playbook", number: "07" },
  { id: "arcade", label: "Arcade", number: "08" },
  { id: "almanac", label: "Almanac", number: "09" },
] as const;

export type Channel = typeof channels[number]["id"];
