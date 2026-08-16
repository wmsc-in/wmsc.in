import type { Metadata } from "next";
import "./globals.css";

const title = "WMSC — Whitefield Malayali Social Club";
const description = "A welcoming community for Malayalis in and around Whitefield, Bengaluru—celebrating culture, connection, play and care.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wmsc.in"),
  title,
  description,
  icons: { icon: "/wmsc-logo.png", shortcut: "/wmsc-logo.png", apple: "/wmsc-logo.png" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "A little bit of Kerala. Right here in Whitefield." }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
