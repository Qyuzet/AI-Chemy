import React from "react";
import { useChemy } from "./contexts/ChemyContext";

const ComposerTab = () => {
  const { selectedPossibility } = useChemy();

  return (
    <div className="card bg-black text-white w-full shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Chemical Reaction</h2>
        {selectedPossibility && (
          <div className="p-4 bg-gray-800 rounded overflow-auto max-h-96">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {selectedPossibility.reaction}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComposerTab;
