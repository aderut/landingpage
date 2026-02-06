export default function Hero() {
    return (
      <section className="relative h-full">
        {/* Centered content */}
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="mx-auto w-full max-w-[92%]">
            {/* MAIN HEADING */}
            <h1 className="
              font-extrabold leading-tight text-black
              text-[28px]          /* mobile */
              sm:text-[36px]       /* small tablets */
              md:text-[44px]       /* desktop */
            ">
              Your Trusted <br />
              Nigeria Car Export |{" "}
              <span className="text-red-600">Premium</span> New <br />
              & Used Cars <br />
              For Global Dealers
            </h1>
  
            {/* SUBTEXT */}
            <p className="
              mx-auto mt-3 max-w-md text-gray-700
              text-[12px]
              sm:text-[14px]
            ">
              Wide Selection, Easy Process, <br className="sm:hidden" />
              Guaranteed Delivery
            </p>
  
            {/* BUTTONS */}
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button className="
                rounded-full bg-red-600 px-6 py-3
                text-sm font-semibold text-white
                shadow-sm hover:opacity-90
              ">
                Contact Us
              </button>
  
              <button className="
                rounded-full bg-black px-6 py-3
                text-sm font-semibold text-white
                shadow-sm hover:opacity-90
              ">
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  