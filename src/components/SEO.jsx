import { Helmet } from "react-helmet-async";

function SEO({ title, description, canonical }) {
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "QuickQR",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    description: "Free online QR code generator and QR scanner.",
  };
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="robots" content="index, follow" />

      {canonical && (
        <link rel="canonical" href={`https://your-domain.com${canonical}`} />
      )}

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">
        {JSON.stringify(applicationSchema)}
      </script>
    </Helmet>
  );
}

export default SEO;
