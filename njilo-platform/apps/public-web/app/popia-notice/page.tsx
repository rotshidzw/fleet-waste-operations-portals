import { PageHeader } from "../../components/PageHeader";
import { Section } from "@njilo/ui";

export default function PopiaNoticePage() {
  return (
    <main>
      <PageHeader title="POPIA Notice" subtitle="Protection of Personal Information Act compliance." />
      <Section title="Data processing" subtitle="">
        <p className="text-slate-700">
          Njilo Holdings adheres to POPIA requirements for the collection, storage, and processing of personal data.
        </p>
      </Section>
    </main>
  );
}
