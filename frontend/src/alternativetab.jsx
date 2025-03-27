import React from "react";
import { useChemy } from "./contexts/ChemyContext";

const AlternativeTab = () => {
  const { possibilities, setSelectedPossibility } = useChemy();

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
        Possible Reactions
      </h2>
      <div className="h-[400px] overflow-y-auto pr-2 space-y-3">
        {possibilities.map((possibility, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedPossibility(possibility);
              copy(possibility.title);
            }}
            className="w-full p-4 text-left rounded-lg bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 group relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-purple-400 font-semibold">
                Possibility {index + 1}
              </span>
              <span className="text-xs text-zinc-500 group-hover:text-purple-400 transition-colors">
                Click to copy
              </span>
            </div>
            <p className="mt-2 text-zinc-300 font-medium">
              {possibility.title}
            </p>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlternativeTab;
