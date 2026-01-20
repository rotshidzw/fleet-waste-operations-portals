export default function TelematicsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tracking & Telematics</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">
          Configure integration providers, API keys, and view last sync times. This module is ready for provider onboarding.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold">Provider Name</label>
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="Provider" />
          </div>
          <div>
            <label className="text-xs font-semibold">API Key</label>
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="API Key" />
          </div>
        </div>
      </div>
    </div>
  );
}
