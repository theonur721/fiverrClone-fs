import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/search";
import AddGig from "./pages/add_gig";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 p-5 max-w-[1440px] mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add-gig" element={<AddGig />} />
          <Route path="/detail" element={<h1>DETAY</h1>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
