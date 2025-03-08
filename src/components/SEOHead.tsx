
import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SEOHead = ({
  title = "Ujjwal Raj Nepal | Full Stack Developer",
  description = "Full Stack Developer with over a decade of experience in web apps, 3D tech, AR, DevOps, cloud infrastructure, LLMs, and ML.",
  keywords = "full stack developer, web development, 3D tech, AR, DevOps, GCP, AWS, LLM, ML, mobile apps",
  ogImage = "/og-image.png",
  ogUrl = "https://ujjwalnepal.me",
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
};

export default SEOHead;
