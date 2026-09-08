"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/navLinks";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    function updateActive() {
      const line = window.innerHeight * 0.35;
      let current = "";
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300"
      style={{ padding: scrolled ? "12px 16px 0" : "0" }}
    >
      <div
        className="w-full transition-all duration-300"
        style={{
          maxWidth: scrolled ? "1152px" : "100%",
          borderRadius: scrolled ? "20px" : "0px",
          overflow: "hidden",
          background: scrolled ? "rgba(248,251,255,0.98)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          border: scrolled ? "1px solid rgba(28,15,76,0.08)" : "none",
          boxShadow: scrolled
            ? "0 8px 32px rgba(8,10,30,0.16), 0 2px 10px rgba(8,10,30,0.08)"
            : "0 1px 10px rgba(8,10,30,0.07)",
        }}
      >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/isotipo.webp"
            alt="Platita.pe"
            width={256}
            height={85}
            style={{ height: "40px", width: "120px", objectFit: "contain" }}
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`group relative pb-1 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-[#1c0f4c]" : "text-[rgba(15,10,46,0.66)] hover:text-[#1c0f4c]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 rounded-full transition-all duration-300 ${
                    isActive ? "" : "w-0 group-hover:w-full"
                  }`}
                  style={{
                    width: isActive ? "100%" : undefined,
                    background: "linear-gradient(90deg, #6cdcff, #bc45e9)",
                  }}
                />
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#registro"
            className="btn-gradient px-5 py-2 rounded-full text-sm font-bold"
          >
            <span>Reserva tu lugar</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú"
        >
          <span
            className="block w-5 h-0.5 transition-transform duration-200"
            style={{ background: "#1c0f4c", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "" }}
          />
          <span
            className="block w-5 h-0.5 transition-opacity duration-200"
            style={{ background: "#1c0f4c", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 transition-transform duration-200"
            style={{ background: "#1c0f4c", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-5 pb-5 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(248,251,255,0.99)", borderTop: "1px solid rgba(12,18,55,0.08)" }}
        >
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-[#1c0f4c]" : "text-[rgba(15,10,46,0.70)] hover:text-[#1c0f4c]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#registro"
            className="btn-gradient px-5 py-2.5 rounded-full text-sm font-bold text-center"
            onClick={() => setMenuOpen(false)}
          >
            <span>Reserva tu lugar</span>
          </a>
        </div>
      )}
      </div>
    </nav>
  );
}
