import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import WorkCategorySection from "./components/sections/WorkCategory";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";
import { CATEGORIES } from "./data/Projects";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Work />
      {CATEGORIES.map((cat) => (
        <WorkCategorySection key={cat.slug} slug={cat.slug} />
      ))}
      <Services />
      <About />
      <Contact />

      <Footer />
    </>
  );
}