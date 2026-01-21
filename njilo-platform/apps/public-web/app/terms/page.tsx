import { PageHeader } from "../../components/PageHeader";
import { Section } from "@njilo/ui";

export default function TermsPage() {
  return (
    <main>
      <PageHeader title="Terms & Conditions" subtitle="Commercial terms for Njilo services." />
      <Section title="Summary" subtitle="">
        <p className="text-slate-700">Terms are provided upon engagement and form part of contractual agreements.</p>
      </Section>
    </main>
  );
}
