// src/utils/normalizeCar.js
export function normalizeCar(raw) {
    const id = String(raw?._id ?? raw?.id ?? "");
    const make = String(raw?.make ?? "").trim();
    const model = String(raw?.model ?? "").trim();
    const title = String(raw?.title ?? "").trim() || `${make} ${model}`.trim() || "Car";
  
    const year = Number(raw?.year);
    const price = Number(raw?.price);
  
    const image =
      Array.isArray(raw?.images) && raw.images.length > 0
        ? String(raw.images[0])
        : "/placeholder-car.png";
  
    return {
      id,
      title,
      make,
      model,
      year: Number.isFinite(year) ? year : null,
      price: Number.isFinite(price) ? price : null,
      mileage: String(raw?.mileage ?? "").trim(),
      fuel: String(raw?.fuel ?? "").trim(),
      location: String(raw?.location ?? "").trim(),
      image,
      link: String(raw?.link ?? "").trim(),
    };
  }
  
  export function money(n) {
    if (n == null) return "—";
    return `$${n.toLocaleString()}`;
  }
  