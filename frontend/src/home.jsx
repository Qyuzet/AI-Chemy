import React from "react";
import { ChemyProvider } from "./contexts/ChemyContext";
import RetractableChatbox from "./chatbox";
import AlternativeTab from "./alternativetab";
import GeneralTab from "./generaltab";
import ComposerTab from "./composertab";

const HomePage = () => {
  return (
    <ChemyProvider>
      <div className="flex flex-col w-full bg-gradient-to-b from-black via-zinc-900 to-black min-h-screen">
        <div className="flex flex-col md:flex-row flex-1 container mx-auto px-4 py-6 gap-6">
          <div className="w-full md:w-96 flex-shrink-0">
            <RetractableChatbox />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-800 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <AlternativeTab />
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-800 shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                <GeneralTab />
              </div>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-800 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <ComposerTab />
            </div>
          </div>
        </div>
      </div>
    </ChemyProvider>
  );
};

export default HomePage;
