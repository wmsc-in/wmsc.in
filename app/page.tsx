import Home from "./home";
import StructuredData from "./structured-data";
import { homeDescription, pageMetadata, pageSchema } from "../lib/seo";

const title = "WMSC — Whitefield Malayali Social Club";
export const dynamic = "force-static";
export const metadata = pageMetadata({ title, description: homeDescription, path: "/" });

export default function HomePage() {
  return <><StructuredData data={[pageSchema("/", title, homeDescription)]} /><Home /></>;
}
