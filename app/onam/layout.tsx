import type { Metadata } from "next";

const title = "Onam 1.0 — WMSC";
const description = "Whitefield Malayali Social Club presents Onam 1.0—a cinematic celebration of Kerala culture, unity and tradition in Whitefield, Bengaluru.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/onam-1-poster.jpg", width: 1086, height: 1448, alt: "Whitefield Malayali Social Club Onam 1.0 celebration poster" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/onam-1-poster.jpg"] },
};

export default function OnamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
