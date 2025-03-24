import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./navbar";
import RetractableChatbox from "./chatbox";
import GeneralTab from "./generaltab";
import AlternativeTab from "./alternativtab";
import ComposerTab from "./composertab";
import Footer from "./footer";
import "/index.css";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hamburger Menu Button */}
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="lucide lucide-menu" style={{ fontSize: "24px" }}></i>
      </button>
      
      <main className="flex-1 flex bg-black relative">
        {/* Chatbox - Hidden on small screens, toggled with button */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-900 p-4 transition-transform ${
            isChatOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0`}
        >
          <RetractableChatbox />
          <button
            className="absolute top-2 right-2 text-white lg:hidden"
            onClick={() => setIsChatOpen(false)}
          >
            ✖
          </button>
        </div>
        
        <div className="flex-1 p-4">
          <section className="flex flex-col gap-4 h-full">
            {/* Tabs */}
            <div className={`grid gap-4 ${isMenuOpen ? "grid-cols-1" : "grid-cols-2"}`}>
              <div className="border-2 border-white rounded-lg p-4 bg-black shadow-md">
                <AlternativeTab />
              </div>
              <div className="border-2 border-white rounded-lg p-4 bg-black shadow-md">
                <GeneralTab />
              </div>
            </div>
            <div className="border-2 border-white rounded-lg p-4 bg-black shadow-md flex-1">
              <ComposerTab />
            </div>
          </section>
        </div>
      </main>
      <Footer />
      
      {/* Chat Toggle Button */}
      <button
        className="fixed bottom-4 left-4 p-3 bg-blue-600 text-white rounded-full lg:hidden"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        💬
      </button>
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
