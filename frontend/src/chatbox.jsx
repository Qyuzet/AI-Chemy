import React, { useState, useRef, useEffect } from "react";
import { useChemy } from "./contexts/ChemyContext";
import "/index.css";

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
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-zinc-900 shadow-lg border-2 rounded-xl m-2 md:rounded-none md:m-0">
      <div className="p-4 border-b border-white">
        <h2 className="text-xl font-bold text-white mb-2">
          Chemical Reaction Explorer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              What material would you like to create?
            </label>
            <input
              type="text"
              value={materialQuery}
              onChange={(e) => setMaterialQuery(e.target.value)}
              placeholder="e.g., a strong adhesive, a water-resistant polymer"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-white focus:outline-none"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !materialQuery.trim()}
            className={`w-full px-4 py-2 rounded ${
              isLoading || !materialQuery.trim()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors text-white`}
          >
            {isLoading ? "Analyzing..." : "Explore Chemical Reactions"}
          </button>
        </form>
      </div>
      <div ref={chatBoxRef} className="flex-1 p-4 overflow-y-auto">
        <div className="h-full bg-gray-800 rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-white text-sm font-mono">
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
