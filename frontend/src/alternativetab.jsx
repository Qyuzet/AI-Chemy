import React from "react";
import { useChemy } from "./contexts/ChemyContext";

const AlternativeTab = () => {
  const { possibilities, setSelectedPossibility } = useChemy();

  return (
    <div className="card bg-black text-white w-full shadow-sm h-[400px] overflow-hidden">
      <div className="card-body h-full flex flex-col">
        <h2 className="card-title">Possible Reactions</h2>
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {possibilities.map((possibility, index) => (
              <button
                key={index}
                onClick={() => setSelectedPossibility(possibility)}
                className="px-4 py-2 text-left rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                {possibility.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeTab;
