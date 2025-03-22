import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./navbar";
import RetractableChatbox from "./chatbox";
import Generaltab from "./generaltab";
import Footer from "./footer";
import "/index.css"; // Pastikan path ini benar

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-row justify-center items-center">
          <RetractableChatbox />     
          <Generaltab />
      </div>
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
