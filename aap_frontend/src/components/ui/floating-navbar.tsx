
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import LanguageSelector from "./language-selector";

interface FloatingNavbarProps {
  navItems: {
    name: string;
    link: string;
  }[];
  className?: string;
}

export const FloatingNavbar = ({
  navItems,
  className,
}: FloatingNavbarProps) => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed top-6 inset-x-0 max-w-2xl mx-auto z-50 transition-all duration-500 ease-in-out",
        isScrolling ? "top-2" : "top-6",
        className
      )}
    >
      <div
        className={cn(
          "glass mx-4 md:mx-6 px-4 py-3 rounded-full border border-white/40 flex items-center justify-between",
          isScrolling ? "shadow-md" : "shadow-sm"
        )}
      >
        <Link
          to="/"
          className="text-foreground font-semibold flex items-center gap-1"
        >
          <span className="text-sina-500 font-bold">Avicenn</span>
          <span className="text-foreground">AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              to={item.link}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Link
            to="/chat"
            className="px-4 py-2 rounded-full text-sm font-medium bg-sina-500 text-white flex items-center gap-2 transition-all hover:bg-sina-600 shadow-sm hover:shadow"
          >
            <MessageCircle size={16} />
            <span className="hidden md:inline">Chat Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FloatingNavbar;
