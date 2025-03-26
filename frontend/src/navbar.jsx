import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

    const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [authClient, setAuthClient] = useState(null);

      useEffect(() => {
        const checkAuth = async () => {
          try {
            const client = await window.AuthClient.create();
            setAuthClient(client);
            const authenticated = await client.isAuthenticated();
            setIsAuthenticated(authenticated);
          } catch (error) {
            console.error("Authentication error:", error);
          }
        };
        checkAuth();
      }, []);

      const handleConnect = async () => {
        if (!authClient) return;

        await authClient.login({
          identityProvider: "https://identity.ic0.app",
          onSuccess: () => {
            setIsAuthenticated(true);
          },
        });
      };

      const handleDisconnect = async () => {
        if (authClient) {
          await authClient.logout();
          setIsAuthenticated(false);
        }
      };

      return (
        <nav className="bg-black text-gray-100 shadow-xl border-b border-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-8">
                <Link
                  to="/"
                  className="flex items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                    AI-Chemy
                  </span>
                 </Link>
                
                <div className="hidden md:flex space-x-4">
                  <Link
                    to="/researchlab"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
                  >
                      Make Research Paper
                  </Link>
                  <Link
                    href="#"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
                  >
                    Confirm Material
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                {isAuthenticated ? (
                  <button
                    onClick={handleDisconnect}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={handleConnect}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Connect ICP
                  </button>
                )}
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
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              >
                Confirm Material
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleDisconnect}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={handleConnect}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  Connect ICP
                </button>
              )}
            </div>
          </div>
        </nav>
      );
};

export default Navbar;