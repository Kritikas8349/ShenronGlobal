
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// import Home from "./Pages/Home";
// import GuideToKickStart from "./Pages/guide-to-KickStart";
// import FAQ from "./Pages/FAQ";

// import ForexSection from "./SubPages/Forex-Section";
// import CryptoSection from "./SubPages/Crypto-Section";
// import ComexServices from "./SubPages/Comex-Services";
// import Footer from "./Components/Footer";

// Main Services Landing Page
// function ServicesPage() {
//   return (
//     <main className="services-landing-page">
//       <ForexSection />
//       <CryptoSection />
//       <ComexServices />
//     </main>
//   );
// }

// Temporary pages
// function PlaceholderPage({ title }) {
//   return (
//     <main className="route-placeholder">
//       <h1>{title}</h1>
//       <p>Content for this page will be added soon.</p>
//     </main>
//   );
// }

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
{/* 
      <Routes>
   
        <Route path="/" element={<Home />} />


        <Route path="/service" element={<ServicesPage />} />

      
        <Route
          path="/services/forex"
          element={<ForexSection />}
        />

        <Route
          path="/services/crypto"
          element={<CryptoSection />}
        />

        <Route
          path="/services/comex"
          element={<ComexServices />}
        />

      
        <Route
          path="/guide-to-kickstart"
          element={<GuideToKickStart />}
        />

     
        <Route path="/faq" element={<FAQ />} />


        <Route
          path="/exclusive-deals"
          element={<PlaceholderPage title="Exclusive Deals" />}
        />

        <Route
          path="/contact"
          element={<PlaceholderPage title="Contact Us" />}
        />


        <Route
          path="*"
          element={<PlaceholderPage title="404 - Page Not Found" />}
        />
      </Routes>
      <Footer/> */}
    </>
  );
}
