import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Footer } from "../nav/Footer";
import Navbar from "../nav/Navbar";
import { About, Home, Login, Register, Error } from "../pages";

export default function index() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </main>
      <Footer/>
     
    </BrowserRouter>
  );
}
