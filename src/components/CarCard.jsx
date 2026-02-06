// src/components/CarCard.jsx
import { money } from "../utils/normalizeCar";

export default function CarCard({ car }) {
  return (
    <a
      href={car.link || "#"}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full bg-gray-100">
        <img
          src={car.image}
          alt={car.title}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">
            {car.title}
          </h3>
          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
            {car.year ?? "—"}
          </span>
        </div>

        <p className="mt-1 text-xs text-gray-600">
          {car.make} {car.model}
        </p>

        <p className="mt-3 text-base font-semibold text-gray-900">
          {money(car.price)}
        </p>

        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-600">
          {car.mileage && <span>{car.mileage}</span>}
          {car.fuel && <span>• {car.fuel}</span>}
          {car.location && <span>• {car.location}</span>}
        </div>
      </div>
    </a>
  );
}
