// src/components/CarFilters.jsx
import { useEffect, useMemo, useState } from "react";

/**
 * value = current applied filters (source of truth from parent)
 * onApply = called when user presses Search (or when you want to apply)
 */
export default function CarFilters({ value, onApply, loading }) {
  // local draft state so user can type without immediately fetching
  const [local, setLocal] = useState(value);

  // keep local in sync when parent changes (e.g., after Clear)
  useEffect(() => {
    setLocal(value);
  }, [value]);

  // you can replace this list with your own or fetch dynamically later
  const brandOptions = useMemo(
    () => ["", "TOYOTA", "HONDA", "NISSAN", "BMW", "BENZ", "AUDI", "HAVAL", "XPENG"],
    []
  );

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 " +
    "placeholder:text-gray-400 outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-200";

  const btnBase =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition " +
    "disabled:opacity-60 disabled:cursor-not-allowed";

  function apply() {
    // normalize values before applying
    onApply({
      q: (local.q || "").trim(),
      make: (local.make || "").trim(),  // "" means All Brands
      model: (local.model || "").trim(),
      year: (local.year || "").trim(),
    });
  }

  function clearAll() {
    const empty = { q: "", make: "", model: "", year: "" };
    setLocal(empty);
    onApply(empty);
  }

  const getMake = async (e)=>{
     console.log("-----===>",e)
  } 

  return (
    <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {/* Search */}
        <input
          className={inputCls}
          placeholder="Search (q)"
          value={local.q}
          onChange={(e) => setLocal((p) => ({ ...p, q: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />

        {/* Brand */}
        <select
          className={inputCls}
          value={local.make}
          onChange={(e) => setLocal((p) => ({ ...p, make: e.target.value }))}
        >
          {brandOptions.map((b) => (
            <option key={b || "ALL"} value={b}>
              {b ? b : "All Brands"}
            </option>
          ))}
        </select>

        {/* Model */}
        <input
          className={inputCls}
          placeholder="Model (Camry)"
          value={local.model}
          onChange={(e) => setLocal((p) => ({ ...p, model: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />

        {/* Year */}
        <input
          className={inputCls}
          placeholder="Year (2023) lol"
          inputMode="numeric"
          value={local.year}
          onChange={(e) => getMake((p) => ({ ...p, year: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          disabled={loading}
          onClick={apply}
          className={`${btnBase} bg-gray-900 text-white hover:bg-gray-800`}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          type="button"
          onClick={clearAll}
          className={`${btnBase} border border-gray-200 bg-white text-gray-900 hover:bg-gray-50`}
        >
          All Brands
        </button>
      </div>
    </div>
  );
}
