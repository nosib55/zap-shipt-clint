import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useContext(AuthContext);

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
          <div className="flex flex-col leading-tight">
            <span className="text-gray-900 font-semibold text-xl">
             <Link to="/"> <img src="/logo.svg"  className="w-40" alt="" /></Link>
            </span>
          </div>
        </div>

        {/* Center: Links (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen((s) => !s)}
              className={`flex items-center gap-2 text-sm px-2 py-1 rounded-md ${
                servicesOpen ? "text-gray-900 font-semibold" : "hover:text-gray-900"
              }`}
            >
              Services
              <svg className="w-4 h-4" viewBox="0 0 20 20">
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-gray-200 py-2 z-20">
                <NavLink to="/services/consulting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Consulting</NavLink>
                <NavLink to="/services/implementation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Implementation</NavLink>
                <NavLink to="/services/support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Support</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/coverage">Coverage</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/send-parcel">Send Parcel</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Desktop Right: Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 rounded-full text-sm border border-gray-200 text-gray-700 hover:bg-gray-50">
                  Sign In
                </button>
              </Link>

              <Link to="/register">
                <button className="px-4 py-2 rounded-full text-sm font-semibold bg-lime-300 hover:bg-lime-400 text-gray-900 shadow-sm">
                  Be A Rider
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full text-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Logout
              </button>

              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full border"
              />
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="p-2 rounded-md"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto bg-white rounded-xl shadow-sm px-4 py-3">
          <div className="flex flex-col gap-2">

            {/* Services mobile */}
            <button
              onClick={() => setServicesOpen((s) => !s)}
              className="flex items-center justify-between w-full px-2 py-2"
            >
              <span className="font-medium">Services</span>
              <svg className="w-4 h-4" viewBox="0 0 20 20">
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {servicesOpen && (
              <div className="flex flex-col pl-4">
                <NavLink to="/services/consulting" className="py-2">Consulting</NavLink>
                <NavLink to="/services/implementation" className="py-2">Implementation</NavLink>
                <NavLink to="/services/support" className="py-2">Support</NavLink>
              </div>
            )}

            <NavLink to="/coverage" className="py-2">Coverage</NavLink>
            <NavLink to="/about" className="py-2">About Us</NavLink>
            <NavLink to="/pricing" className="py-2">Pricing</NavLink>
            <NavLink to="/blog" className="py-2">Blog</NavLink>
            <NavLink to="/contact" className="py-2">Contact</NavLink>

            {/* Mobile Auth Buttons */}
            {!user ? (
              <div className="mt-2 flex gap-2">
                <Link to="/login" className="flex-1">
                  <button className="w-full px-4 py-2 rounded-full border border-gray-200 text-gray-700">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 rounded-full bg-lime-300 font-semibold">
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={logout}
                className="mt-2 px-4 py-2 rounded-full border border-gray-300 text-gray-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
