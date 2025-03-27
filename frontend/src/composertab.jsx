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
        <div className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-zinc-400 text-sm">Formula Breakdown</span>
            </div>
            <button
              onClick={() =>
                navigator.clipboard.writeText(selectedPossibility.reaction)
              }
              className="text-xs text-zinc-500 hover:text-purple-400 transition-colors"
            >
              Copy Formula
            </button>
          </div>
          <div className="p-6 max-h-[300px] overflow-auto">
            <pre className="font-mono text-sm">
              <code className="text-green-400 leading-relaxed">
                {selectedPossibility.reaction
                  .split("+")
                  .map((part, index, array) => (
                    <React.Fragment key={index}>
                      <span className="text-purple-400">{part.trim()}</span>
                      {index < array.length - 1 && (
                        <span className="text-zinc-500"> + </span>
                      )}
                    </React.Fragment>
                  ))}
              </code>
            </pre>
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
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <p className="text-zinc-500">
              Select a reaction to view its chemical formula
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComposerTab;
