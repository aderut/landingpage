// src/components/CarGrid.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import CarFilters from "./CarFilters";
import CarCard from "./CarCard";
import { fetchCars } from "../api/carsApi";
import { normalizeCar } from "../utils/normalizeCar";

export default function CarGrid() {
  const LIMIT = 30;

  // applied filters (source of truth)
  const [filters, setFilters] = useState({ q: "", make: "", model: "", year: "" });

  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sentinelRef = useRef(null);

  // ✅ prevent duplicate loads
  const isFetchingRef = useRef(false);

  // ✅ ignore stale responses (when filters change fast)
  const reqIdRef = useRef(0);

  const canLoadMore = useMemo(() => page < pages, [page, pages]);

  async function loadPage({ nextPage, mode, nextFilters }) {
    if (isFetchingRef.current) return; // ✅ guard
    isFetchingRef.current = true;

    setLoading(true);
    setError("");

    const myReqId = ++reqIdRef.current;

    try {
      const data = await fetchCars({
        ...nextFilters,
        page: nextPage,
        limit: LIMIT,
      });

      // ✅ if a newer request happened, ignore this result
      if (myReqId !== reqIdRef.current) return;

      const normalized = (data.cars || []).map(normalizeCar);

      setPage(Number(data.page || nextPage));
      setPages(Number(data.pages || 1));

      setCars((prev) => (mode === "replace" ? normalized : [...prev, ...normalized]));
    } catch (e) {
      if (myReqId !== reqIdRef.current) return;
      setError(e?.message || "Failed to load cars");
    } finally {
      if (myReqId === reqIdRef.current) {
        setLoading(false);
      }
      isFetchingRef.current = false;
    }
  }

  // initial load
  useEffect(() => {
    loadPage({ nextPage: 1, mode: "replace", nextFilters: filters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply filters (reset list)
  function handleApply(next) {
    setFilters(next);

    // reset UI list immediately
    setCars([]);
    setPage(1);
    setPages(1);

    loadPage({ nextPage: 1, mode: "replace", nextFilters: next });
  }

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (loading) return;
        if (!canLoadMore) return;

        loadPage({ nextPage: page + 1, mode: "append", nextFilters: filters });
      },
      { root: null, rootMargin: "350px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [filters, loading, canLoadMore, page]); // canLoadMore already depends on pages

  return (
    <div>
      <CarFilters value={filters} onApply={handleApply} loading={loading} />

      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* sentinel */}
      <div ref={sentinelRef} className="h-10" />

      <div className="py-6 text-center text-sm text-gray-500">
        {loading && "Loading…"}
        {!loading && cars.length === 0 && !error && "No cars found."}
        {!loading && cars.length > 0 && !canLoadMore && "End of results."}
      </div>
    </div>
  );
}
