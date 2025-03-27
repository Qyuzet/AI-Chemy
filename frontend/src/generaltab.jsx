import React from "react";
import { useChemy } from "./contexts/ChemyContext";

const GeneralTab = () => {
  const { selectedPossibility } = useChemy();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
        Explanation
      </h2>
      {selectedPossibility ? (
        <div className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-lg p-6 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
              <h3 className="text-lg font-medium text-purple-400">
                {selectedPossibility.title}
              </h3>
            </div>
            <div className="pl-4 border-l-2 border-zinc-800">
              <p className="text-zinc-300 leading-relaxed">
                {selectedPossibility.explanation}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full border-2 border-zinc-700 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-zinc-500">
              Select a reaction to view its explanation
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralTab;
