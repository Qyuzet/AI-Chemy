import React from "react";
import { ChemyProvider } from "./contexts/ChemyContext";
import RetractableChatbox from "./chatbox";
import AlternativeTab from "./alternativetab";
import GeneralTab from "./generaltab";
import ComposerTab from "./composertab";

const HomePage = () => {
  return (
    <ChemyProvider>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-row flex-1 bg-black min-h-0">
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
        </div>
      </div>
    </ChemyProvider>
  );
};

export default HomePage;