import React from "react";
import { useChemy } from "./contexts/ChemyContext";

const ComposerTab = () => {
  const { selectedPossibility } = useChemy();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
        Chemical Reaction
      </h2>
      {selectedPossibility ? (
        <div className="p-6 bg-black/30 rounded-lg overflow-auto max-h-96 border border-zinc-800">
          <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300">
            {selectedPossibility.reaction}
          </pre>
        </div>
      ) : (
        <div className="p-6 bg-black/30 rounded-lg border border-zinc-800 text-zinc-500 text-center">
          Select a reaction to view details
        </div>
      )}
    </div>
  );
};

export default ComposerTab;
