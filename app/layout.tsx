import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "WMSC — Whitefield Malayali Social Club";
  const description = "A welcoming community for Malayalis in and around Whitefield, Bengaluru—celebrating culture, connection, play and care.";
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title,
    description,
    icons: { icon: "/wmsc-logo.png", shortcut: "/wmsc-logo.png", apple: "/wmsc-logo.png" },
    openGraph: { title, description, type: "website", images: [{ url: socialImage, width: 1731, height: 909, alt: "A little bit of Kerala. Right here in Whitefield." }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
