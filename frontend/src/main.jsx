import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import HomePage from "./home";
import { ResearchProvider, ResearchPaperGenerator } from './researchlab';
import Footer from "./footer";
import "/index.css";

const App = () => {
  return (
    <ResearchProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen max-w-full">
          <Navbar />
          <main className="flex-grow bg-black">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/researchlab" element={<ResearchPaperGenerator />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ResearchProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;