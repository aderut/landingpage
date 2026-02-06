import React from "react";

function FooterLink({ children }) {
  return (
    <a
      href="#"
      className="text-[11px] text-white/90 hover:text-white hover:underline"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#DD0000]">
      {/* increase height here */}
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-28">
        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-extrabold text-white">CONTACT US</h4>
            <div className="mt-5 space-y-3 text-[11px] text-white/90">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  ✉️
                </span>
                <span>Email</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  💬
                </span>
                <span>Whatsapp</span>
              </div>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-sm font-extrabold text-white">
              FOLLOW US ON SOCIAL MEDIA
            </h4>

            <div className="mt-5 space-y-3 text-[11px] text-white/90">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  f
                </span>
                <span>Facebook</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  x
                </span>
                <span>Twitter</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  ⦿
                </span>
                <span>Instagram</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm font-extrabold text-white">QUICK LINKS</h4>

            <div className="mt-5 flex flex-col gap-3">
              <FooterLink>About Us</FooterLink>
              <FooterLink>Terms of use</FooterLink>
              <FooterLink>Financial privacy policy</FooterLink>
              <FooterLink>Accessibility</FooterLink>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-14">
          <div className="h-px w-full bg-white/60" />
        </div>
      </div>
    </footer>
  );
}
