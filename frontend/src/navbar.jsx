import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-gray-100 shadow-xl border-b border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                AI-Chemy
              </span>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/researchlab"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                Make Research Paper
              </Link>
              <Link
                to="/confirm-material"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                Confirm Material
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/researchlab"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
          >
            Make Research Paper
          </Link>
          <Link
            to="/confirm-material"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
          >
            Confirm Material
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;