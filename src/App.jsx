import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'

import Dummy from "./pages/timepass"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
      <>
      <Routes>
        <Route path="/" element={<Dummy />} />
      </Routes>

      </>
  )
}

export default App
