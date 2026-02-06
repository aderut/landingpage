import React from "react";

const steps = [
  { step: "Step1", label: "Search", icon: "🔍" },
  { step: "Step2", label: "Inquire", icon: "✉️" },
  { step: "Step3", label: "Negotiate", icon: "💲" },
  { step: "Step4", label: "Payment", icon: "💳" },
  { step: "Step5", label: "Shipment", icon: "🚢" },
  { step: "Step6", label: "Pickup", icon: "📦" },
];

const features = [
  {
    title: "Effortless Car Sourcing",
    desc: "Smooth experience from search to delivery.",
    icon: "🚗",
  },
  {
    title: "Transparent Price Breakdown",
    desc: "Clear, detailed pricing with no hidden fees.",
    icon: "🧾",
  },
  {
    title: "Pro Negotiation",
    desc: "Save big with our expert negotiation.",
    icon: "🏷️",
  },
];

const bottom = [
  {
    title: "Nationwide Network",
    desc: "Fast response times with extensive coverage and expert sourcing team.",
    icon: "🌐",
  },
  {
    title: "Source Any Vehicle",
    desc: "We support all types of cars.",
    icon: "🚘",
  },
  {
    title: "Fair Service Fees",
    desc: "Reliable support at a competitive price.",
    icon: "✅",
  },
];

export default function ProUsedCarExportServices() {
  return (
    <section className="w-full bg-white py-12">
      {/* soft fabric-like background area */}
      <div className="relative w-full px-12 lg:px-20 py-12 overflow-hidden">
        {/* pink “fabric” vibe using gradients (no image needed) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -bottom-28 h-[420px] w-[420px] rounded-full bg-red-200/60 blur-3xl" />
          <div className="absolute -right-40 -bottom-28 h-[420px] w-[420px] rounded-full bg-red-200/60 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100/50 blur-3xl" />
        </div>

        <div className="relative">
          <h2 className="text-center text-lg font-extrabold text-red-600">
            Professional Used Car Export Services
          </h2>

          {/* Steps row */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            {steps.map((s, idx) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-[10px] text-gray-600">{s.step}</div>
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-sm">
                    {s.icon}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-gray-900">
                    {s.label}
                  </div>
                </div>

                {/* arrow (not on last) */}
                {idx !== steps.length - 1 && (
                  <div className="hidden md:block text-gray-400 text-xl">›</div>
                )}
              </div>
            ))}
          </div>

          {/* Middle 3 features */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
                  {f.icon}
                </div>
                <div className="mt-3 text-sm font-extrabold text-gray-900">
                  {f.title}
                </div>
                <div className="mt-1 text-[11px] text-gray-600">{f.desc}</div>
              </div>
            ))}
          </div>

          {/* Bottom 3 blurbs */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {bottom.map((b) => (
              <div key={b.title} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-red-200 bg-white text-red-600">
                  {b.icon}
                </div>
                <div className="mt-3 text-sm font-extrabold text-gray-900">
                  {b.title}
                </div>
                <div className="mt-1 text-[11px] text-gray-600">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
