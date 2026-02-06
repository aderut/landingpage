import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AfterHeroSection from "./components/AfterHeroSection";
import UsedCarsSection from "./components/UsedCarsSection";
import NewCarsForExport from "./components/NewCarsForExport";
import ProUsedCarExportServices from "./components/ProUsedCarExportServices";
import HowToBuy from "./components/HowToBuy";
import Footer from "./components/Footer";


export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* TOP AREA: video + grey overlay (Navbar + Hero only) */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Grey overlay */}
        <div className="absolute inset-0 bg-gray-200/80" />

        {/* Foreground content */}
        <div className="relative z-10 h-full">
          <Navbar />
          <Hero />
        </div>
      </div>

      {/* SECTIONS BELOW HERO */}
      <AfterHeroSection />
      <UsedCarsSection />
      <NewCarsForExport />
      <ProUsedCarExportServices />
      <HowToBuy />
      <Footer />
    </div>
  );
}
