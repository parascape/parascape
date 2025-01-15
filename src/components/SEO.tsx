import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export function SEO({ title, description, image, url }: SEOProps) {
  const siteUrl = "https://parascape.com"; // Replace with your domain

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || "/og-image.png"} />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />
    </Helmet>
  );
} 