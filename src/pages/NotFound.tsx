import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";

export default function NotFound() {
  return <div className="portfolio-site"><SEOHead title="Page not found · Ujjwal Raj Nepal" /><main className="not-found"><p className="eyebrow">404</p><h1>This page isn’t here.</h1><p>The link may have changed. You can find my projects and contact details on the homepage.</p><Link to="/" className="text-action"><ArrowLeft size={17} /> Back to the homepage</Link></main></div>;
}
