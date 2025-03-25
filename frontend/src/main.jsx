import React from "react";
import ReactDOM from "react-dom/client";
import { ChemyProvider } from "./contexts/ChemyContext";
import Navbar from "./navbar";
import RetractableChatbox from "./chatbox";
import GeneralTab from "./generaltab";
import AlternativeTab from "./alternativetab";
import ComposerTab from "./composertab";
import Footer from "./footer";
import "/index.css";

const App = () => {
  return (
    <ChemyProvider>
      <div className="flex flex-col h-screen max-w-full">
        <Navbar />
        <main className="flex flex-row flex-1 bg-black min-h-0">
          <div className="w-full md:w-80 flex-shrink-0">
            <RetractableChatbox />
          </div>
          <div className="flex-1 p-2 md:p-4 min-w-0 overflow-auto">
            <section className="flex flex-col gap-2 md:gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div className="border-2 border-white rounded-lg p-2 md:p-4 bg-black shadow-md">
                  <AlternativeTab />
                </div>
                <div className="border-2 border-white rounded-lg p-2 md:p-4 bg-black shadow-md">
                  <GeneralTab />
                </div>
              </div>
              <div className="border-2 border-white rounded-lg p-2 md:p-4 bg-black shadow-md">
                <ComposerTab />
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </ChemyProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
