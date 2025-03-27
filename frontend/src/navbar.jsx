import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-black via-zinc-900 to-black border-b border-zinc-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 bg-clip-text text-transparent hover:from-purple-500 hover:via-blue-600 hover:to-purple-500 transition-all duration-300">
                AI-Chemy
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="px-4 py-2 rounded-lg bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 transition-all duration-300"
                onClick={() => {
                  /* Add your connect ICP logic */
                }}
              >
                Connect ICP
              </button>
              <button className="px-4 py-2 rounded-lg bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 transition-all duration-300">
                Confirm Material
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-4 py-2 rounded-lg bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 transition-all duration-300">
              Make Research
            </button>
            <Link
              to="/researchlab"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              Research Lab
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (with transition) */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-48 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button className="block w-full px-4 py-2 rounded-lg bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 transition-all duration-300">
              Connect ICP
            </button>
            <button className="block w-full px-4 py-2 rounded-lg bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 transition-all duration-300">
              Confirm Material
            </button>
            <button className="block w-full px-4 py-2 rounded-lg bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 transition-all duration-300">
              Make Research
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
