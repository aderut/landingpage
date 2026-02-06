import React, { useEffect, useMemo, useState } from "react";

/** ------------------ PARSERS ------------------ */
const moneyFromApi = (v) => {
  const s = String(v ?? "").trim();
  if (!s) return "$0";
  return s.startsWith("$") ? s : `$${s}`;
};

const cleanMileage = (v) => {
  const s = String(v ?? "").replace(/\s+/g, " ").trim();
  const num = s.match(/\d{1,3}(?:,\d{3})*|\d+/)?.[0] ?? "";
  return num ? `${num} km` : "";
};

const pickFuel = (car) => {
  const joined = Array.isArray(car?.base_info) ? car.base_info.join(" ") : "";
  return joined.match(/Fuel\s+([A-Za-z]+)/i)?.[1] || "";
};

const firstImage = (images) =>
  Array.isArray(images) && images.length ? images[0] : "";

/** ------------------ CAR CARD ------------------ */
function CarCard({ car }) {
  const img = firstImage(car.images);

  return (
    <div className="border border-gray-200 bg-white text-[9px] overflow-hidden">
      {img ? (
        <div className="h-[72px] w-full bg-gray-100">
          <img
            src={img}
            alt={car.title || "car"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="bg-[#bdbdbd] px-2 py-1 text-white">
        <div className="flex justify-between font-semibold">
          <span className="truncate">
            {car.year} {car.make}
          </span>
          <span className="rounded bg-white/30 px-1">
            {car.base?.toUpperCase?.() || "—"}
          </span>
        </div>
        <div className="truncate font-semibold">{car.model}</div>
      </div>

      <div className="px-2 py-2">
        <p className="text-gray-500 truncate">{car.location || ""}</p>
        <p className="font-bold text-red-600 text-[11px]">
          {moneyFromApi(car.price)}
        </p>

        <div className="mt-1 flex justify-between text-gray-600">
          <span>{cleanMileage(car.mileage)}</span>
          <span>{pickFuel(car)}</span>
        </div>

        <p className="mt-1 text-gray-400">
          {car.scrapedAt ? new Date(car.scrapedAt).toISOString().slice(0, 10) : ""}
        </p>

        {car.link ? (
          <a
            href={car.link}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-[9px] text-red-600 underline"
          >
            View Details
          </a>
        ) : null}
      </div>
    </div>
  );
}

/** ------------------ MAIN SECTION ------------------ */
export default function UsedCarsSection() {
  // ✅ LIVE API (change to localhost only if your backend is running)
  const SEARCH_API = "https://dealer.ufuon.com/api/cars/search";

  // dropdown data endpoints (your code already uses these)
  const YEARS_API = "https://dealer.ufuon.com/api/functions/only-years";
  const MAKES_API = "https://dealer.ufuon.com/api/functions/makes"; // ?year=
  const MODELS_API = "https://dealer.ufuon.com/api/functions/model"; // ?make=&year=

  // filters (Year -> Brand -> Model)
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  // cars
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // paging (API returns page/pages)
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 30;

  /** ✅ Build search URL (IMPORTANT: uses `yaer` because your API expects it) */
  function buildSearchUrl(nextPage = 1, overrides = {}) {
    const params = new URLSearchParams();
    params.set("q", "");

    const mk = overrides.make ?? make;
    const md = overrides.model ?? model;
    const yr = overrides.year ?? year;

    params.set("make", mk || "");
    params.set("model", md || "");
    params.set("yaer", yr || ""); // ✅ NOTE: yaer (not year)
    params.set("page", String(nextPage));
    params.set("limit", String(limit));

    return `${SEARCH_API}?${params.toString()}`;
  }

  /** ✅ Fetch cars (ALL cars if year/make/model are empty) */
  async function fetchCars(nextPage = 1, overrides = {}) {
    setLoading(true);
    setErr("");
  
    try {
      // IMPORTANT: keep using yaer because your search API uses yaer
      const params = new URLSearchParams();
      params.set("q", "");
  
      const mk = overrides.make ?? make;
      const md = overrides.model ?? model;
      const yr = overrides.year ?? year;
  
      params.set("make", mk || "");
      params.set("model", md || "");
      params.set("yaer", yr || ""); // ✅
      params.set("page", String(nextPage));
      params.set("limit", String(limit));
  
      const url = `${SEARCH_API}?${params.toString()}`;
      console.log("FETCH:", url);
  
      const res = await fetch(url);
      const data = await res.json();
  
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to fetch cars");
  
      const list = Array.isArray(data.cars) ? data.cars : [];
  
      // ✅ HARD FILTER (so your UI is correct even if API ignores year)
      const filtered =
        yr ? list.filter((c) => String(c.year || "").trim() === String(yr).trim()) : list;
  
      setCars(filtered);
      setPage(Number(data.page || nextPage));
      setPages(Number(data.pages || 1));
  
      // Optional: warn you if backend isn’t filtering
      if (yr && filtered.length !== list.length) {
        console.warn("API returned mixed years; UI filtered them out.");
      }
    } catch (e) {
      setCars([]);
      setPage(1);
      setPages(1);
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  

  /** ✅ Load years for dropdown */
  async function loadYears() {
    try {
      const res = await fetch(YEARS_API);
      const data = await res.json();
      setYears(Array.isArray(data?.data) ? data.data : []);
    } catch {
      setYears([]);
    }
  }

  /** ✅ Fetch makes after year selected */
  async function loadMakesForYear(y) {
    try {
      const res = await fetch(`${MAKES_API}?year=${encodeURIComponent(y)}`);
      const data = await res.json();
      setMakes(Array.isArray(data?.data) ? data.data : []);
    } catch {
      setMakes([]);
    }
  }

  /** ✅ Fetch models after make selected */
  async function loadModelsForYearMake(y, mk) {
    try {
      const res = await fetch(
        `${MODELS_API}?make=${encodeURIComponent(mk)}&year=${encodeURIComponent(y)}`
      );
      const data = await res.json();
      const list = Array.isArray(data?.data?.Models) ? data.data.Models : [];
      setModels(list);
    } catch {
      setModels([]);
    }
  }

  /** ✅ On first render: show ALL cars + load years */
  useEffect(() => {
    fetchCars(1, { year: "", make: "", model: "" }); // ✅ all cars first
    loadYears();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Handlers */
  const onChangeYear = async (y) => {
    setYear(y);
    setMake("");
    setModel("");
    setMakes([]);
    setModels([]);
    if (y) await loadMakesForYear(y);
  };

  const onChangeMake = async (mk) => {
    setMake(mk);
    setModel("");
    setModels([]);
    if (year && mk) await loadModelsForYearMake(year, mk);
  };

  const onSearch = () => {
    // ✅ you said "put everything before you can search"
    if (!year || !make || !model) {
      setErr("Please select Year, Brand, and Model before searching.");
      return;
    }
    fetchCars(1); // uses selected year/make/model
  };

  const onAllBrands = () => {
    setYear("");
    setMake("");
    setModel("");
    setMakes([]);
    setModels([]);
    setErr("");
    fetchCars(1, { year: "", make: "", model: "" }); // back to ALL cars
  };

  // options for rendering
  const makeOptions = useMemo(
    () => makes.map((m) => m?.make_display).filter(Boolean),
    [makes]
  );

  const modelOptions = useMemo(
    () => models.map((m) => m?.model_name).filter(Boolean),
    [models]
  );

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-20">
        <div className="relative mb-8 sm:mb-10">
          <div className="h-[2px] w-full bg-red-600" />
          <div className="absolute -top-3 right-0 rounded border border-red-600 bg-white px-3 py-1 text-[10px] font-semibold">
            Used Cars
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 sm:gap-6">
          {/* FILTER PANEL */}
          <aside className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <div className="md:pr-2">
              <div className="rounded-lg bg-red-600 p-4 text-center text-white">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/40">
                  🛡️
                </div>
                <p className="text-[10px] font-semibold leading-tight">
                  Legitimacy and <br /> Safety
                </p>
              </div>

              {/* Year */}
              <select
                value={year}
                onChange={(e) => onChangeYear(e.target.value)}
                className="mt-4 w-full rounded border border-gray-200 px-2 py-2 text-[10px]"
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              {/* Brand */}
              <div className="mt-4 space-y-2">
                <select
                  value={make}
                  onChange={(e) => onChangeMake(e.target.value)}
                  className="w-full rounded border border-gray-200 px-2 py-2 text-[10px]"
                  disabled={!year}
                >
                  <option value="">{!year ? "Select year first" : "Brand"}</option>
                  {makeOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* Model */}
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded border border-gray-200 px-2 py-2 text-[10px]"
                  disabled={!year || !make}
                >
                  <option value="">
                    {!make ? "Select brand first" : "Model"}
                  </option>
                  {modelOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                <button
                  onClick={onSearch}
                  className="w-full rounded bg-red-600 py-2 text-[10px] font-semibold text-white disabled:opacity-60"
                  disabled={loading || !year || !make || !model}
                >
                  {loading ? "Searching..." : "Search"}
                </button>

                {err ? <p className="text-[10px] text-red-600">{err}</p> : null}
              </div>

              <button
                onClick={onAllBrands}
                className="mt-4 w-full rounded bg-red-600 py-3 text-sm font-bold text-white"
              >
                All Brands
              </button>
            </div>
          </aside>

          {/* CAR GRID */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-10">
            <div className="mb-3 flex items-center justify-between text-[10px] text-gray-600">
              <span>{loading ? "Loading..." : `${cars.length} car(s)`}</span>

              <div className="flex items-center gap-2">
                <button
                  className="rounded border px-2 py-1 disabled:opacity-50"
                  disabled={loading || page <= 1}
                  onClick={() => fetchCars(page - 1)}
                >
                  Prev
                </button>

                <span>
                  Page {page} / {pages}
                </span>

                <button
                  className="rounded border px-2 py-1 disabled:opacity-50"
                  disabled={loading || page >= pages}
                  onClick={() => fetchCars(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {!loading && !cars.length && !err ? (
              <p className="mt-6 text-center text-[11px] text-gray-500">
                No cars matched your search.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
