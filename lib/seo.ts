import type { Metadata } from "next";

export const siteUrl = "https://wmsc.in";
export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const organizationName = "Whitefield Malayali Social Club";

export const homeDescription = "Whitefield Malayali Social Club (WMSC) brings Malayalis in Whitefield, Bengaluru together through Kerala culture, Onam celebrations, sports and community support.";

export function pageMetadata({ title, description, path, image = "/og.png", imageAlt = organizationName, locale = "en_IN", article = false }: {
  title: string; description: string; path: string; image?: string; imageAlt?: string; locale?: string; article?: boolean;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title, description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: organizationName, locale,
      type: article ? "article" : "website",
      ...(article ? { publishedTime: "2026-09-04", authors: [siteUrl] } : {}),
      images: [{ url: `${siteUrl}${image}`, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: `${siteUrl}${image}`, alt: imageAlt }] },
  };
}

export const organizationSchema = {
  "@type": "Organization", "@id": organizationId,
  name: organizationName, alternateName: "WMSC", url: `${siteUrl}/`,
  description: homeDescription,
  logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
  image: `${siteUrl}/og.png`,
  areaServed: { "@type": "Place", name: "Whitefield, Bengaluru, Karnataka, India" },
  sameAs: ["https://www.instagram.com/whitefieldmalayalisocialclub"],
  knowsAbout: ["Malayali community in Whitefield", "Kerala culture", "Onam", "Sports", "Community support"],
};

export const websiteSchema = {
  "@type": "WebSite", "@id": websiteId,
  url: `${siteUrl}/`, name: organizationName, alternateName: "WMSC",
  publisher: { "@id": organizationId }, inLanguage: ["en-IN", "ml-IN"],
};

export function pageSchema(path: string, name: string, description: string, language = "en-IN") {
  return {
    "@type": "WebPage", "@id": `${siteUrl}${path}#webpage`,
    url: `${siteUrl}${path}`, name, description, inLanguage: language,
    isPartOf: { "@id": websiteId }, about: { "@id": organizationId },
    publisher: { "@id": organizationId },
    ...(path !== "/" ? { breadcrumb: { "@id": `${siteUrl}${path}#breadcrumb` } } : {}),
  };
}

export function breadcrumbSchema(path: string, name: string) {
  return {
    "@type": "BreadcrumbList", "@id": `${siteUrl}${path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
    ],
  };
}
