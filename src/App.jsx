import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/landingpage"
import AboutUs from "./pages/AboutUs/AboutUs"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QualityAssuranceAudit from "./pages/Services/QualityAssuranceAudit"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services/qa-audit" element={<QualityAssuranceAudit />} />

      </Routes>

    </>
  )
}

export default App
