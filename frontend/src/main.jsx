import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./navbar";
import RetractableChatbox from "./chatbox";
import GeneralTab from "./generaltab";
import AlternativeTab from "./alternativtab";
import ComposerTab from "./composertab";
import Footer from "./footer";
import "/index.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex bg-black">
        <RetractableChatbox />
      <div className="flex-1">
      <section className="flex flex-col gap-4 p-4 h-full">
        <div className="grid grid-cols-2 gap-4 flex-1">
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
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
