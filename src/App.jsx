import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/landingpage"
import AboutUs from "./pages/AboutUs/AboutUs"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QualityAssuranceAudit from "./pages/Services/QualityAssuranceAudit"
import ProjectManagement from "./pages/Services/ProjectManagement"
import CostConsultancy from "./pages/Services/CostConsultancy"
import CPMPertTechnique from "./pages/Services/CPMPertTechnique"
import QSBillingAudit from "./pages/Services/QSBillingAudit"
import EHSAudit from "./pages/Services/EHSAudit"
import ProjectExecution from "./pages/Services/ProjectExecution"
import ProjectPlanning from "./pages/Services/ProjectPlanning"
import ServicesPage from "./pages/Services/ServicesPage"
import Projects from "./pages/Projects/Projects"
import Careers from "./pages/Careers/Careers"
import ContractManagement from './pages/Services/ContractManagement';
import QualityControl from './pages/Services/QualityControl';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/qa-audit" element={<QualityAssuranceAudit />} />
        <Route path="/services/project-management" element={<ProjectManagement />} />
        <Route path="/services/cost-consultancy" element={<CostConsultancy />} />
        <Route path="/services/cpm-pert" element={<CPMPertTechnique />} />
        <Route path="/services/qs-billing-audit" element={<QSBillingAudit />} />
        <Route path="/services/ehs-audit" element={<EHSAudit />} />
        <Route path="/services/contract-management" element={<ContractManagement />} />
        <Route path="/services/quality-control" element={<QualityControl />} />
        <Route path="/services/project-execution" element={<ProjectExecution />} />
        <Route path="/services/project-planning" element={<ProjectPlanning />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/careers" element={<Careers />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
