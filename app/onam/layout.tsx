import StructuredData from "../structured-data";
import { pageMetadata, pageSchema, breadcrumbSchema } from "../../lib/seo";

const title = "Onam 1.0 in Whitefield, Bengaluru — WMSC";
const description = "Celebrate Onam with Whitefield Malayali Social Club in Bengaluru: cultural programmes, traditional games and Onam sadya. Date and venue to be announced.";
export const dynamic = "force-static";
export const metadata = pageMetadata({ title, description, path: "/onam/", image: "/onam-1-poster.jpg", imageAlt: "WMSC Onam 1.0 celebration poster" });

export default function OnamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><StructuredData data={[pageSchema("/onam/", title, description), breadcrumbSchema("/onam/", "Onam 1.0")]} />{children}</>;
}
