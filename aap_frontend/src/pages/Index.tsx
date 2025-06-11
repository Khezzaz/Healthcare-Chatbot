
import React from "react";
import HeroSection from "@/components/home/hero-section";
import FloatingNavbar from "@/components/ui/floating-navbar";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Features",
    link: "/features",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <FloatingNavbar navItems={navItems} />
      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default Index;
