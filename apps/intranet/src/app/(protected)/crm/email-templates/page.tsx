const templates = [
  {
    name: "Lead Acknowledgement",
    subject: "Thank you for contacting Njilo Consulting & Logistics",
    body: "We have received your request and will respond within 1 business day."
  },
  {
    name: "Proposal Follow-up",
    subject: "Proposal follow-up",
    body: "Please let us know if you require any clarification on the fleet proposal."
  }
];

export default function EmailTemplatesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Email Templates</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <div key={template.name} className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold">{template.name}</h2>
            <p className="mt-2 text-xs text-slate-500">Subject: {template.subject}</p>
            <p className="mt-2 text-sm text-slate-600">{template.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
