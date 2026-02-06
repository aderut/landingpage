import React, { useEffect, useMemo, useRef, useState } from "react";

/* ------- MOCK DATA (replace with real data) ------- */
const newCars = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: [
    "2024 Livan X3 PRO",
    "2025 Buick EnvisionS",
    "2024 Buick Velite 6",
    "2025 Jetour G700",
  ][i % 4],
  spec: [
    "1.5L 113HP L4 5MT",
    "1.5T 211HP L4 9AT",
    "BEV 50.3KWH",
    "2.0T 245HP 8AT",
  ][i % 4],
  msrp: ["$48,900", "$196,900", "$112,800", "$75,000"][i % 4],
  price: ["$7,881", "$21,512", "$13,701", "$18,900"][i % 4],
  date: ["2025-09-26", "2025-09-25", "2025-09-24", "2025-09-23"][i % 4],
}));

function NewCarCard({ item }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] font-semibold text-gray-900 leading-snug">
        {item.title}
      </div>
      <div className="mt-1 text-[10px] text-gray-600">{item.spec}</div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="text-[9px] text-gray-500">
          <div>MSRP {item.msrp}</div>
          <div className="mt-1">Port Dealer</div>
        </div>

        <div className="text-right">
          <div className="text-[12px] font-extrabold text-red-600">
            {item.price}
          </div>
          <div className="mt-1 text-[9px] text-gray-400">{item.date}</div>
        </div>
      </div>
    </div>
  );
}

/* helper: split array into pages */
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function NewCarsForExport() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const pages = useMemo(() => chunk(newCars, 6), []);
  const loopPages = useMemo(() => [...pages, ...pages], [pages]);

  /* AUTO SCROLL + LOOP */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let timer = null;

    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        el.scrollLeft += 1.1; // speed

        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }, 12);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    if (!paused) start();
    else stop();

    return () => stop();
  }, [paused]);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8 lg:px-16">
        {/* TITLE ONLY */}
        <h2 className="text-center text-lg font-extrabold text-red-600">
          New Car For Export
        </h2>

        {/* SCROLL TRACK */}
        <div
          ref={trackRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          onPointerDown={pause}
          onPointerUp={resume}
          className="
            mt-6
            overflow-x-auto
            [scrollbar-width:none]
            [-ms-overflow-style:none]
          "
        >
          {/* hide scrollbar */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
          `}</style>

          <div className="no-scrollbar flex gap-4 pb-2">
            {loopPages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="shrink-0 w-[92vw] sm:w-[640px] md:w-[760px] lg:w-[860px]"
              >
                {/* Mobile: 2 columns (2 rows)
                    Desktop: 3 columns */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {page.map((item) => (
                    <NewCarCard
                      key={`${pageIndex}-${item.id}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE HINT */}
        <p className="mt-3 text-center text-[11px] text-gray-400 md:hidden">
          Swipe left or right to see more
        </p>
      </div>
    </section>
  );
}
