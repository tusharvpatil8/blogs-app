import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../assets/logo/blog-logo.jpeg";
import { webNavigationLinks } from "../../utils/options/headerOptions";
import Button from "../ui/button"
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#F5F5F5] shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
      <div className="max-w-7xl mx-auto  py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-12 w-12" />
        </NavLink>

        {/* Centered Nav */}
        <nav className="hidden lg:flex lg:justify-around lg:gap-5 xl:gap-10">
          {webNavigationLinks
            .filter((link) => link.name.toLowerCase() !== "login")
            .map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                    `text-[#003A7B] font-medium ${isActive
                      ? " overflow-hidden relative after:bg-blue-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-1/2"
                      : ""
                    }`
                  }
              >
                {link.name}
              </NavLink>
            ))}
        </nav>

        {/* Right Side Login Button */}
        <div className="hidden md:block">
          {webNavigationLinks.map(
            (link) =>
              link.name.toLowerCase() === "login" && (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  {link.name}
                </NavLink>
              )
          )}
          
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-blue-700 focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-2">
          {webNavigationLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-700 font-medium border-l-4 border-blue-700 pl-2"
                  : "block text-gray-700 hover:text-blue-700 transition"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
      </div>
    </header>
  );
};

export default Header;
