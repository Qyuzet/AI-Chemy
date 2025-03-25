import React from "react";
import { useChemy } from "./contexts/ChemyContext";

const GeneralTab = () => {
  const { selectedPossibility } = useChemy();

  return (
    <div className="card bg-black text-white w-full shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Explanation</h2>
        {selectedPossibility ? (
          <div className="p-4 bg-gray-800 rounded">
            <p className="text-sm">{selectedPossibility.explanation}</p>
          </div>
        ) : (
          <p className="text-gray-400">
            Select a possibility to see its explanation
          </p>
        )}
      </div>
    </div>
  );
};

export default GeneralTab;
