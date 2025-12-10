import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dummy from "./pages/timepass"
import LandingPage from "./pages/LandingPage/landingpage"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
      <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dummy" element={<Dummy />} />
      </Routes>

      </>
  )
}

export default App
