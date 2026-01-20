import { partnerLogos } from "@njilo/config";

export function PartnerCarousel() {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex gap-6 py-6 partner-carousel">
        {logos.map((logo, index) => (
          <div key={`${logo}-${index}`} className="flex h-16 w-32 flex-shrink-0 items-center justify-center rounded border border-slate-100 bg-slate-50">
            <span className="text-xs text-slate-400">Logo {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
