import React from "react";

function IconBox({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "h-10 w-10 rounded-full flex items-center justify-center",
          active ? "bg-red-50 ring-1 rixng-red-200" : "bg-gray-50 ring-1 ring-gray-200",
        ].join(" ")}
      >
        {icon}
      </div>
      <p className="text-[11px] text-gray-700">{label}</p>
    </div>
  );
}

export default function HowToBuy() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-red-600 font-extrabold tracking-wide text-lg sm:text-xl">
            HOW TO BUY
          </h2>
          <p className="mt-1 text-[11px] sm:text-xs text-red-500">
            Key Questions Answered for How to Import Cars...
          </p>
        </div>

        {/* Icon row */}
        <div className="mt-6 flex items-center justify-center gap-10 sm:gap-16">
          <IconBox
            label="General Questions"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-800">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm2.1-7.25l-.9.92A3.5 3.5 0 0 0 13 13h-2v-.5c0-.8.3-1.55.9-2.1l1.2-1.2a1.5 1.5 0 1 0-2.6-1.05H8.5a3.5 3.5 0 1 1 6.6 1.6Z"
                />
              </svg>
            }
          />

          <IconBox
            label="Payment"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-800">
                <path
                  fill="currentColor"
                  d="M2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7Zm3-1a1 1 0 0 0-1 1v1h18V7a1 1 0 0 0-1-1H5Zm17 6H4v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5Z"
                />
              </svg>
            }
          />

          <div className="flex flex-col items-center gap-2">
            <IconBox
              label="Logistics"
              active
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-800">
                  <path
                    fill="currentColor"
                    d="M3 6h13v9H3V6Zm15 3h3l2 3v3h-5V9Zm-2-5H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h1a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h1a1 1 0 0 0 1-1v-6l-2.6-4A2 2 0 0 0 19.7 7H18V6a2 2 0 0 0-2-2Zm-7 15a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm12 0a1 1 0 1 1 0-2a1 1 0 0 1 0 2Z"
                  />
                </svg>
              }
            />
            <button className="mt-1 rounded-full bg-red-500 px-4 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-red-600">
              Learn it Now
            </button>
          </div>

          <IconBox
            label="Glossary"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-800">
                <path
                  fill="currentColor"
                  d="M6 2h11a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1 4h10V4H7v2Zm0 4h10V8H7v2Zm0 4h7v-2H7v2Z"
                />
              </svg>
            }
          />
        </div>

        {/* About + Illustration */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-extrabold text-red-600">About PortDealer</h3>
            <p className="mt-1 text-xs text-red-500">Your Reliable Car Plug</p>

            <button className="mt-4 rounded-full bg-red-100 px-4 py-2 text-[11px] font-semibold text-red-700 hover:bg-red-200">
              Click to View
            </button>
          </div>

        
        </div>

        {/* Start Journey text */}
        <div className="mt-10 text-center">
          <p className="text-base sm:text-lg font-extrabold text-gray-900">
            Start Your Journey Now{" "}
            <span className="text-red-600">@PortDealer</span>
          </p>
        </div>
      </div>
    </section>
  );
}
