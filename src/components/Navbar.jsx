import { useEffect, useMemo, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [dd, setDd] = useState(null);
  const [mdd, setMdd] = useState(null);
  const ddCloseTimer = useRef(null);

  const nav = useMemo(
    () => [
      { label: "Home", href: "#home", key: "home" },
      {
        label: "Brands",
        href: "#brands",
        key: "brands",
        dropdown: ["Toyota", "Honda", "Mercedes", "BMW"],
      },
      { label: "Cars", href: "#cars", key: "cars" },
      {
        label: "About Us",
        href: "#about",
        key: "about",
        dropdown: ["Our Company", "Why Port Dealer", "Testimonials"],
      },
      {
        label: "Contact Us",
        href: "#contact",
        key: "contact",
        dropdown: ["WhatsApp", "Email", "Support"],
      },
    ],
    []
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDd(null);
        setMdd(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNav = (label) => {
    setActive(label);
    setOpen(false);
    setDd(null);
    setMdd(null);
  };

  const openDropdown = (key) => {
    if (ddCloseTimer.current) clearTimeout(ddCloseTimer.current);
    setDd(key);
  };

  const closeDropdownSoon = () => {
    if (ddCloseTimer.current) clearTimeout(ddCloseTimer.current);
    ddCloseTimer.current = setTimeout(() => setDd(null), 120);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="pt-6 relative z-[40]">
        <div className="mx-auto w-[92%] max-w-6xl">
          <div className="flex items-center justify-between rounded-full bg-white px-4 py-3 shadow-sm sm:px-6">
            {/* LOGO */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/10">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-[11px] font-extrabold text-white">
                  PD
                </div>
              </div>
              <div className="text-sm font-extrabold text-black whitespace-nowrap">
                Port Dealer
              </div>
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6 text-[13px] text-black/70">
              {nav.map((item) => {
                const isActive = active === item.label;
                const hasDd = Array.isArray(item.dropdown);
                const isOpen = dd === item.key;

                if (!hasDd) {
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={() => handleNav(item.label)}
                      className={`hover:text-black ${
                        isActive ? "text-black font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => openDropdown(item.key)}
                    onMouseLeave={closeDropdownSoon}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setDd((p) => (p === item.key ? null : item.key))
                      }
                      className={`flex items-center gap-1 hover:text-black ${
                        isActive ? "text-black font-semibold" : ""
                      }`}
                    >
                      {item.label}
                      <span className="text-black/50">▾</span>
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute left-0 top-[30px] w-48 rounded-xl border border-gray-200 bg-white shadow-lg transition ${
                        isOpen
                          ? "opacity-100 translate-y-0"
                          : "pointer-events-none opacity-0 -translate-y-1"
                      }`}
                    >
                      <div className="p-2">
                        {item.dropdown.map((d) => (
                          <a
                            key={d}
                            href={item.href}
                            onClick={() => handleNav(item.label)}
                            className="block rounded-lg px-3 py-2 text-[13px] text-black/70 hover:bg-gray-100 hover:text-black"
                          >
                            {d}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2">
              {/* 🔍 SEARCH (NOW ON MOBILE + DESKTOP) */}
              <button
                className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-gray-100 text-black/70"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16.5 16.5 21 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* English (desktop only) */}
              <button className="hidden md:inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-black">
                English
              </button>

              {/* WhatsApp (desktop only) */}
              <button className="hidden md:inline-flex rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:opacity-90">
                WhatsApp
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setOpen(true)}
                className="md:hidden h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* BACKDROP */}
      <div
        onClick={() => {
          setOpen(false);
          setMdd(null);
        }}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed left-0 top-0 z-[70] h-full w-[80%] max-w-[340px] bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between">
          <div className="font-extrabold text-black whitespace-nowrap">
            Port Dealer
          </div>
          <button
            onClick={() => {
              setOpen(false);
              setMdd(null);
            }}
            className="h-9 w-9 rounded-full border border-gray-200 hover:bg-gray-50"
          >
            ✕
          </button>
        </div>

        {/* Links + dropdowns */}
        <div className="px-5 py-4 space-y-2">
          {nav.map((item) => {
            const isAct = active === item.label;
            const hasDd = Array.isArray(item.dropdown);
            const opened = mdd === item.key;

            if (!hasDd) {
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => handleNav(item.label)}
                  className={`block rounded-xl px-4 py-3 text-[13px] ${
                    isAct
                      ? "bg-red-50 text-red-600 font-semibold"
                      : "text-black/70 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <div key={item.key} className="rounded-xl border border-gray-200">
                <button
                  onClick={() => {
                    setActive(item.label);
                    setMdd((p) => (p === item.key ? null : item.key));
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-[13px] rounded-xl ${
                    isAct
                      ? "bg-red-50 text-red-600 font-semibold"
                      : "text-black/70 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {item.label}
                  <span className={`transition ${opened ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    opened ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-3 pb-3">
                      {item.dropdown.map((d) => (
                        <a
                          key={d}
                          href={item.href}
                          onClick={() => handleNav(item.label)}
                          className="block rounded-lg px-3 py-2 text-[13px] text-black/70 hover:bg-gray-100 hover:text-black"
                        >
                          {d}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
