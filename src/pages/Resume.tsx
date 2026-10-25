import { ResumeContent } from "@/components/portfolio/PortfolioContent";
import SEOHead from "@/components/SEOHead";
import "@/styles/portfolio.css";
import "@/styles/resume.css";

export default function Resume() {
  return <><SEOHead title="Résumé · Ujjwal Raj Nepal" description="Product leadership, CTO experience, cross-functional delivery, and engineering skills of Ujjwal Raj Nepal." ogUrl="https://ujjwalnepal.me/resume/" ogImage="/images/kathmandu-study-daylight.jpg" /><ResumeContent /></>;
}
