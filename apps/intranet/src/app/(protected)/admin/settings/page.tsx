import { companyProfile } from "@njilo/config";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Organisation Settings</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold">Company Profile</p>
        <p className="mt-2 text-sm text-slate-600">{companyProfile.name}</p>
        <p className="text-sm text-slate-600">{companyProfile.headOffice.address}</p>
        <p className="text-sm text-slate-600">{companyProfile.headOffice.phone}</p>
      </div>
    </div>
  );
}
