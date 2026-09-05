import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "./structured-data";
import { siteUrl, organizationName, homeDescription, organizationSchema, websiteSchema } from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: organizationName,
  description: homeDescription,
  applicationName: "WMSC",
  icons: { icon: "/logo.png", shortcut: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FDDFYDCVXT" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-FDDFYDCVXT');` }} />
      </head>
      <body>
        <StructuredData data={[organizationSchema, websiteSchema]} />
        {children}
      </body>
    </html>
  );
}
