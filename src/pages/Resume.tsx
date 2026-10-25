import { ResumeContent } from "@/components/portfolio/PortfolioContent";
import SEOHead from "@/components/SEOHead";
import "@/styles/portfolio.css";

export default function Resume() {
  return <><SEOHead title="Résumé · Ujjwal Raj Nepal" description="Engineering experience, selected work, and technical skills of Ujjwal Raj Nepal." ogUrl="https://ujjwalnepal.me/resume/" ogImage="/images/kathmandu-study.jpg" /><ResumeContent /></>;
}
