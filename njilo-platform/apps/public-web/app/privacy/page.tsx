import { PageHeader } from "../../components/PageHeader";
import { Section } from "@njilo/ui";

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader title="Privacy Policy" subtitle="How Njilo protects personal information." />
      <Section title="Overview" subtitle="">
        <p className="text-slate-700">
          Njilo Holdings collects and processes data for legitimate business purposes, ensuring confidentiality and
          compliance with applicable regulations.
        </p>
      </Section>
    </main>
  );
}
