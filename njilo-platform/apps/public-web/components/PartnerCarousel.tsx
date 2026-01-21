import Image from "next/image";

const partners = [
  { name: "Metro Utilities", logo: "/media/stock/partner-1.svg" },
  { name: "Civic Logistics", logo: "/media/stock/partner-2.svg" },
  { name: "TransNova", logo: "/media/stock/partner-3.svg" },
  { name: "HarborTech", logo: "/media/stock/partner-4.svg" }
];

export function PartnerCarousel() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex animate-scroll gap-10 px-8 py-6">
        {[...partners, ...partners].map((partner, index) => (
          <div key={`${partner.name}-${index}`} className="flex items-center gap-3">
            <Image src={partner.logo} alt={partner.name} width={80} height={48} />
            <span className="text-sm font-medium text-slate-700">{partner.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
