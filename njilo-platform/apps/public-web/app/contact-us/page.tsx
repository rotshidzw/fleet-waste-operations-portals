import { prisma } from "@njilo/db";
import { PageHeader } from "../../components/PageHeader";
import { Section, Button } from "@njilo/ui";

async function submitContact(formData: FormData) {
  "use server";
  const fullName = String(formData.get("fullName") || "");
  const email = String(formData.get("email") || "");
  const phone = String(formData.get("phone") || "");
  const companyName = String(formData.get("companyName") || "");
  const department = String(formData.get("department") || "SALES");
  const message = String(formData.get("message") || "");

  await prisma.lead.create({
    data: {
      fullName,
      email,
      phone,
      companyName,
      department: department as "SALES" | "OPS" | "HR" | "SUPPORT",
      message,
      source: "contact-us"
    }
  });
}

export default function ContactUsPage() {
  return (
    <main>
      <PageHeader title="Contact Us" subtitle="Engage with our enterprise operations team." />
      <Section title="Send a message" subtitle="We respond within one business day.">
        <form action={submitContact} className="grid gap-4 md:grid-cols-2">
          <input name="fullName" placeholder="Full name" className="rounded-md border border-slate-200 p-3" required />
          <input name="email" type="email" placeholder="Email address" className="rounded-md border border-slate-200 p-3" required />
          <input name="phone" placeholder="Phone" className="rounded-md border border-slate-200 p-3" />
          <input name="companyName" placeholder="Company" className="rounded-md border border-slate-200 p-3" />
          <select name="department" className="rounded-md border border-slate-200 p-3 md:col-span-2">
            <option value="SALES">Sales</option>
            <option value="OPS">Operations</option>
            <option value="HR">HR</option>
            <option value="SUPPORT">Support</option>
          </select>
          <textarea name="message" placeholder="Message" className="rounded-md border border-slate-200 p-3 md:col-span-2" rows={4} />
          <Button type="submit" className="md:col-span-2">Submit</Button>
        </form>
      </Section>
    </main>
  );
}
