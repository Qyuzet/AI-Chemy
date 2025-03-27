import React, { useState, useRef, useEffect } from "react";
import { useChemy } from "./contexts/ChemyContext";

const RetractableChatbox = () => {
  const [materialQuery, setMaterialQuery] = useState("");
  const chatBoxRef = useRef(null);

  const { chatHistory, isLoading, chemyLogic } = useChemy();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materialQuery.trim() || isLoading) return;

    await chemyLogic(
      `What are the possible chemical combinations to create ${materialQuery}?`
    );
    setMaterialQuery("");
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-800 shadow-xl">
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
          Chemical Reaction Explorer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-300">
              What material would you like to create?
            </label>
            <input
              type="text"
              value={materialQuery}
              onChange={(e) => setMaterialQuery(e.target.value)}
              placeholder="e.g., a strong adhesive, a water-resistant polymer"
              className="w-full p-3 rounded-lg bg-black/50 text-white border border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !materialQuery.trim()}
            className={`w-full px-4 py-3 rounded-lg ${
              isLoading || !materialQuery.trim()
                ? "bg-zinc-700 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            } transition-all duration-300 text-white font-medium shadow-lg hover:shadow-purple-500/20`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              "Explore Chemical Reactions"
            )}
          </button>
        </form>
      </div>
      <div ref={chatBoxRef} className="flex-1 p-6 overflow-y-auto">
        <div className="h-full bg-black/30 rounded-lg p-6">
          <pre className="whitespace-pre-wrap text-zinc-300 text-sm font-mono">
            {chatHistory.length > 0
              ? chatHistory[chatHistory.length - 1].content
              : "Start by asking about a material you'd like to create..."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RetractableChatbox;
