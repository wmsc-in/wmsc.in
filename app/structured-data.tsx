export default function StructuredData({ data }: { data: unknown[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({ "@context": "https://schema.org", "@graph": data }).replace(/</g, "\\u003c"),
  }} />;
}
