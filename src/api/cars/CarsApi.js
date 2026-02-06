// src/api/carsApi.js
const BASE_URL = "/api/cars/search"; // via Vite proxy

function clean(v) {
  const s = String(v ?? "").trim();
  if (!s) return "";
  const bad = ["brand", "all brands", "select brand"];
  if (bad.includes(s.toLowerCase())) return "";
  return s;
}

export async function fetchCars({
  q = "",
  make = "",
  model = "",
  year = "",
  page = 1,
  limit = 30,
}) {
  q = clean(q);
  make = clean(make);
  model = clean(model);
  year = clean(year);

  const params = new URLSearchParams();

  params.set("q", q);
  // ✅ ONLY include make/model/year if they have a real value
  if (make) params.set("make", make);
  if (model) params.set("model", model);
  if (year) params.set("year", year);

  params.set("page", String(page));
  params.set("limit", String(limit));

  const url = `${BASE_URL}?${params.toString()}`;

  // ✅ Debug: confirm what you're sending
  console.log("FETCH:", url);

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok || data?.success !== true) {
    throw new Error(data?.error || "Failed to fetch cars");
  }

  return data;
}
