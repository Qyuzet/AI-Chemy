import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./navbar";
import RetractableChatbox from "./chatbox";
import Generaltab from "./generaltab";
import Footer from "./footer";
import "/index.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex">
        <RetractableChatbox />
        <div className="flex-1">
          <Generaltab />
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
