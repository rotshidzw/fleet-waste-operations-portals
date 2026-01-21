import Link from "next/link";
import { Card } from "@njilo/ui";

const modules = [
  { title: "Partners", href: "/cms/partners", description: "Logo and display order." },
  { title: "Testimonials", href: "/cms/testimonials", description: "Client quotes and roles." },
  { title: "Publications", href: "/cms/publications", description: "Reports and downloadable PDFs." },
  { title: "Events", href: "/cms/events", description: "Company and partner events." },
  { title: "Media Gallery", href: "/cms/media", description: "Image gallery items." },
  { title: "Video Gallery", href: "/cms/video", description: "Video library entries." },
  { title: "Blog Posts", href: "/cms/blog", description: "Thought leadership content." },
  { title: "Services", href: "/cms/services", description: "Service directory content." }
];

export default function CmsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {modules.map((item) => (
        <Card key={item.title} title={item.title} description={item.description}>
          <Link href={item.href} className="text-sm font-semibold text-blue-700">
            Open module →
          </Link>
        </Card>
      ))}
    </div>
  );
}
