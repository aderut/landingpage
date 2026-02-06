export default function AfterHeroSection() {
    const parts = [
      { name: "Caliper", img: "https://via.placeholder.com/80" },
      { name: "Crankshaft", img: "https://via.placeholder.com/80" },
      { name: "Tires", img: "https://via.placeholder.com/80" },
      { name: "Battery", img: "https://via.placeholder.com/80" },
    ];
  
    return (
      <section className="bg-white py-10">
        <div className="mx-auto w-[92%] max-w-6xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* LEFT: Premium Auto-Parts Collection */}
            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {/* Header bar */}
                <div className="bg-gradient-to-r from-red-500 to-red-200 px-5 py-4">
                  <h3 className="text-center text-sm font-bold text-black">
                    Premium <span className="text-red-700">Auto-Parts</span> Collection
                  </h3>
                </div>
  
                <div className="p-5">
                  <div className="grid grid-cols-4 gap-4">
                    {parts.map((p) => (
                      <div key={p.name} className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          <img
                            src={p.img}
                            alt={p.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="text-[10px] font-medium text-black/80">{p.name}</p>
                        <button className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-semibold text-white hover:opacity-90">
                          Go
                        </button>
                      </div>
                    ))}
                  </div>
  
                  {/* bottom controls */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl border border-gray-200 bg-white" />
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white hover:opacity-90">
                      🔍
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            {/* MIDDLE: Entertainment / News */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1400&auto=format&fit=crop"
                    alt="News"
                    className="h-56 w-full object-cover md:h-64"
                  />
                  <div className="absolute inset-0 bg-black/10" />
  
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="text-lg font-extrabold text-white drop-shadow">
                      Entertainment
                    </span>
                  </div>
  
                  <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-black">
                    News
                  </div>
  
                  <div className="absolute bottom-4 left-4 text-white drop-shadow">
                    <p className="text-lg font-extrabold">News Headline</p>
                  </div>
                </div>
              </div>
            </div>
  
           {/* RIGHT: Quick links (top) + New Arrivals (bottom) */}
<div className="lg:col-span-2">
  <div className="flex flex-col gap-3">

    {/* Quick links – NOW ON TOP */}
    <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
      <button className="mb-1.5 w-full rounded-lg border border-gray-200 px-2 py-1.5 text-[10px] font-semibold hover:bg-gray-50">
        🚗 Car Library
      </button>
      <button className="mb-1.5 w-full rounded-lg border border-gray-200 px-2 py-1.5 text-[10px] font-semibold hover:bg-gray-50">
        🧾 How To Buy
      </button>
      <button className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-[10px] font-semibold hover:bg-gray-50">
        🤝 Global Partners
      </button>
    </div>

    {/* New Arrivals – NOW BELOW */}
    <div className="relative rounded-xl border border-gray-200 bg-white px-3 py-4 shadow-sm max-h-[180px]">
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-sm">
        🚘
      </div>

      <p className="mt-2 text-center text-[11px] font-semibold">
        New Arrivals
      </p>

      <p className="mt-0.5 text-center text-[10px] text-black/60">
        Today <span className="font-bold text-red-600">+2079</span>
      </p>

      <p className="mt-1 text-center text-[9px] text-black/40">
        1/21/2026
      </p>

      {/* Social icons */}
      <div className="absolute right-[-8px] top-3 flex flex-col gap-1.5">
        {["f", "x", "in", "▶"].map((t) => (
          <div
            key={t}
            className="flex h-5 w-5 items-center justify-center rounded bg-white text-[9px] font-bold shadow ring-1 ring-black/10"
          >
            {t}
          </div>
        ))}
      </div>
    </div>

  </div>
</div>

            {/* end grid */}
          </div>
        </div>
      </section>
    );
  }
  