import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";


import Home from "./pages/Home";
import Contact from "./pages/Contact";
import PortfolioM from "./pages/PortfolioM";
import Forex from "./Subpages/Forex";
import Comex from "./Subpages/Comex";
import Crypto from "./Subpages/Crypto";

// import Home from "./Pages/Home";
// import GuideToKickStart from "./Pages/guide-to-KickStart";
// import FAQ from "./Pages/FAQ";

// import ForexSection from "./SubPages/Forex-Section";
// import CryptoSection from "./SubPages/Crypto-Section";
// import ComexServices from "./SubPages/Comex-Services";
// import Footer from "./Components/Footer";

// Main Services Landing Page
// function ServicesPage() {
// return (
// <main className="services-landing-page">
// <ForexSection />
// <CryptoSection />
// <ComexServices />
// </main>
// );
// }

// Temporary pages
// function PlaceholderPage({ title }) {
// return (
// <main className="route-placeholder">
// <h1>{title}</h1>
// <p>Content for this page will be added soon.</p>
// </main>
// );
// }

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/portfolio" element={<PortfolioM />} />
        <Route path="/services/forex" element={<Forex />} />
        <Route path="/services/comex" element={<Comex />} />
        <Route path="/services/crypto" element={<Crypto />} />
      </Routes>
      <Footer />
    </>
  );
}
 