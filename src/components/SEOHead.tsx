
import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SEOHead = ({
  title = "Ujjwal Raj Nepal | Product Leader & Technologist",
  description = "Product leadership, technical direction, and hands-on engineering. Building useful products from Nepal since 2016.",
  keywords = "Ujjwal Raj Nepal, product leadership, CTO, entrepreneurship, product strategy, full stack engineering, AI, AR, cloud, mobile apps",
  ogImage = "/images/ujjwal-nepal.jpg",
  ogUrl = "https://ujjwalnepal.me/",
}: SEOHeadProps) => {
  const imageUrl = new URL(ogImage, ogUrl).href;
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
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
};

export default SEOHead;
