import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./navbar";
import RetractableChatbox from "./chatbox";
import GeneralTab from "./generaltab";
import AlternativeTab from "./alternativetab";
import ComposerTab from "./composertab";
import Footer from "./footer";
import "/index.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col md:flex-row flex-1 bg-black">
        <div className="w-full md:w-80 h-[calc(100vh-4rem)] flex flex-col">
          <RetractableChatbox />
        </div>
        <div className="flex-1 p-4">
          <section className="flex flex-col gap-4 h-full">
            <div className="grid grid-cols-2 gap-2 md:gap-4 flex-1">
              <div className="border-2 border-white rounded-lg p-2 md:p-4 bg-black shadow-md overflow-hidden">
                <AlternativeTab />
              </div>
              <div className="border-2 border-white rounded-lg p-2 md:p-4 bg-black shadow-md overflow-hidden">
                <GeneralTab />
              </div>
            </div>
            <div className="border-2 border-white rounded-lg p-2 md:p-4 bg-black shadow-md flex-1">
              <ComposerTab />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
