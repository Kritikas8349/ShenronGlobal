import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
<<<<<<< HEAD
import Portfolio from "./pages/Portfolio";
import Forex from "./Subpages/Forex";
import Comex from "./Subpages/Comex";
import Crypto from "./Subpages/Crypto";
=======
import Contact from "./pages/Contact";
// import Portfolio from "./pages/Portfolio";
// import Forex from "./Subpages/Forex";
// import Comex from "./Subpages/Comex";
// import Crypto from "./Subpages/Crypto";
>>>>>>> 7c7fb35f6cf6bb6fb02723b4bff2c5d7c2413de0

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
<<<<<<< HEAD
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services/forex" element={<Forex />} />
        <Route path="/services/comex" element={<Comex />} />
        <Route path="/services/crypto" element={<Crypto />} />
      </Routes>
    </>
  );
}
=======
return (
<>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/contact-us" element={<Contact />} />

</Routes>
<Footer/>
</>
);
}
>>>>>>> 7c7fb35f6cf6bb6fb02723b4bff2c5d7c2413de0
