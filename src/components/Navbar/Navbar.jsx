import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

// TailwindCSS required. Drop this component into any React app with Tailwind configured.
// Adds responsive behavior, a mobile menu button, and a Services dropdown (desktop + mobile).

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <nav className="max-w-6xl mx-auto bg-white rounded-full shadow-sm ring-1 ring-gray-200 px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-transparent">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M6 15.5L17 6l11 9.5v9.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-9.5z" fill="#D9F99D"/>
              <path d="M11 20.5h12v6a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1v-6z" fill="#84CC16" opacity="0.9"/>
            </svg>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-gray-900 font-semibold text-lg">ZapShift</span>
          </div>
        </div>

        {/* Center: Links (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {/* Services with dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen((s) => !s)}
              className={`flex items-center gap-2 text-sm px-2 py-1 rounded-md focus:outline-none ${
                servicesOpen ? "text-gray-900 font-semibold" : "hover:text-gray-900"
              }`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-gray-200 py-2 z-20">
                <NavLink to="/services/consulting" className={({ isActive }) => (isActive ? "block px-4 py-2 text-sm text-gray-900 font-semibold" : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50")}>Consulting</NavLink>
                <NavLink to="/services/implementation" className={({ isActive }) => (isActive ? "block px-4 py-2 text-sm text-gray-900 font-semibold" : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50")}>Implementation</NavLink>
                <NavLink to="/services/support" className={({ isActive }) => (isActive ? "block px-4 py-2 text-sm text-gray-900 font-semibold" : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50")}>Support</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/coverage" className={({ isActive }) => (isActive ? "text-gray-900 font-semibold" : "hover:text-gray-900")}>Coverage</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-gray-900 font-semibold" : "hover:text-gray-900")}>About Us</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => (isActive ? "text-gray-900 font-semibold" : "hover:text-gray-900")}>Pricing</NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? "text-gray-900 font-semibold" : "hover:text-gray-900")}>Blog</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-gray-900 font-semibold" : "hover:text-gray-900")}>Contact</NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Right: actions (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 rounded-full text-sm border border-gray-200 text-gray-700 hover:bg-gray-50">Sign In</button>

          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-lime-300 hover:bg-lime-400 text-gray-900 shadow-sm">Sign Up</button>

          <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md" aria-label="open">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M5 12h11M13 5l6 7-6 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto bg-white rounded-xl shadow-sm ring-1 ring-gray-200 px-4 py-3">
          <div className="flex flex-col gap-2">
            {/* Services mobile collapsible */}
            <button
              onClick={() => setServicesOpen((s) => !s)}
              className="flex items-center justify-between w-full px-2 py-2 text-left rounded-md text-gray-700"
            >
              <span className="font-medium">Services</span>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {servicesOpen && (
              <div className="flex flex-col pl-4">
                <NavLink to="/services/consulting" className={({ isActive }) => (isActive ? "py-2 font-semibold" : "py-2 hover:text-gray-900")}>Consulting</NavLink>
                <NavLink to="/services/implementation" className={({ isActive }) => (isActive ? "py-2 font-semibold" : "py-2 hover:text-gray-900")}>Implementation</NavLink>
                <NavLink to="/services/support" className={({ isActive }) => (isActive ? "py-2 font-semibold" : "py-2 hover:text-gray-900")}>Support</NavLink>
              </div>
            )}

            <NavLink to="/coverage" className={({ isActive }) => (isActive ? "py-2 font-semibold" : "py-2 hover:text-gray-900")}>Coverage</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "py-2 font-semibold" : "py-2 hover:text-gray-900")}>About Us</NavLink>
            <NavLink to="/pricing" className={({ isActive }) => (isActive ? "py-2 font-semibold" : "py-2 hover:text-gray-900")}>Pricing</NavLink>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? "py-2 font-semibold" : "py-2 hover:text-gray-900")}>Blog</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "py-2 font-semibold" : "py-2 hover:text-gray-900")}>Contact</NavLink>

            <div className="mt-2 flex gap-2">
              <button className="flex-1 px-4 py-2 rounded-full text-sm border border-gray-200 text-gray-700">Sign In</button>
              <button className="px-4 py-2 rounded-full text-sm font-semibold bg-lime-300 hover:bg-lime-400 text-gray-900">Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
