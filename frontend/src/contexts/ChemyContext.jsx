import React, { createContext, useContext, useState, useCallback } from "react";
import OpenAI from "openai";
// Import for ICP backend (uncomment when ready)
// import { backend } from "../declarations/backend";

const ChemyContext = createContext();

const CHEMISTRY_SYSTEM_PROMPT = `You are a Chemistry researcher who has won multiple Nobel Prizes, now teaching a highly curious university student about chemical reactions. Your goal is to provide the student with up to 10 possible chemical combinations to create an ideal material.

For each possibility, follow this strict format:

Start with a title for the reaction.

Write the chemical reaction using only chemical formulas (no compound names).

Provide a simple 2-3 sentence explanation of what happens in the reaction to form the ideal material. Use simple language to ensure the student understands.

Example format:

Possibility 1: [Reaction Title]
Reaction:
[Chemical Reaction Formula]
Explanation:
[Short explanation in simple words]

Possibility 2: [Reaction Title]
Reaction:
[Chemical Reaction Formula]
Explanation:
[Short explanation in simple words]

Do not add any extra text like introductions, conclusions, or sourcing suggestions. Follow this exact format in every response.`;

// Current OpenAI implementation
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const ChemyProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPossibility, setSelectedPossibility] = useState(null);
  const [possibilities, setPossibilities] = useState([]);

  // Current OpenAI implementation
  const chemyLogic = useCallback(async (userInput) => {
    setIsLoading(true);
    setError(null);

    const userMessage = {
      role: "user",
      content: userInput,
      timestamp: new Date().toISOString(),
    };

    try {
      setChatHistory((prev) => [...prev, userMessage]);

      const completion = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: CHEMISTRY_SYSTEM_PROMPT,
          },
          userMessage,
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const aiResponse = {
        role: "assistant",
        content: completion.choices[0].message.content,
        timestamp: new Date().toISOString(),
      };

      // Parse possibilities...
      const parsedPossibilities = aiResponse.content
        .split("\n\n")
        .filter((section) => section.startsWith("Possibility"))
        .map((possibility) => {
          const [title, ...rest] = possibility.split("\n");
          const reactionIndex = rest.findIndex((line) =>
            line.startsWith("Reaction:")
          );
          const explanationIndex = rest.findIndex((line) =>
            line.startsWith("Explanation:")
          );

          return {
            title: title.replace("Possibility ", ""),
            reaction: rest
              .slice(reactionIndex + 1, explanationIndex)
              .join("\n")
              .trim(),
            explanation: rest
              .slice(explanationIndex + 1)
              .join("\n")
              .trim(),
          };
        });

      setPossibilities(parsedPossibilities);
      setLastResponse(aiResponse);
      setChatHistory((prev) => [...prev, aiResponse]);

      return aiResponse;
    } catch (error) {
      const errorMessage = {
        role: "system",
        content: "Sorry, there was an error processing your chemistry request.",
        error: error.message,
        timestamp: new Date().toISOString(),
      };

      setError(errorMessage);
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* 
  // LLAMA Implementation (uncomment and use this when ready)
  const chemyLogicLlama = useCallback(async (userInput) => {
    setIsLoading(true);
    setError(null);

    const userMessage = {
      role: "user",
      content: userInput,
      timestamp: new Date().toISOString(),
    };

    try {
      setChatHistory((prev) => [...prev, userMessage]);

      // Call ICP backend canister with Llama
      const messages = [
        {
          role: "system",
          content: CHEMISTRY_SYSTEM_PROMPT,
        },
        userMessage,
      ];

      const response = await backend.chat(messages);

      const aiResponse = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };

      // Parse possibilities (same parsing logic)
      const parsedPossibilities = aiResponse.content
        .split("\n\n")
        .filter((section) => section.startsWith("Possibility"))
        .map((possibility) => {
          const [title, ...rest] = possibility.split("\n");
          const reactionIndex = rest.findIndex((line) =>
            line.startsWith("Reaction:")
          );
          const explanationIndex = rest.findIndex((line) =>
            line.startsWith("Explanation:")
          );

          return {
            title: title.replace("Possibility ", ""),
            reaction: rest
              .slice(reactionIndex + 1, explanationIndex)
              .join("\n")
              .trim(),
            explanation: rest
              .slice(explanationIndex + 1)
              .join("\n")
              .trim(),
          };
        });

      setPossibilities(parsedPossibilities);
      setLastResponse(aiResponse);
      setChatHistory((prev) => [...prev, aiResponse]);

      return aiResponse;
    } catch (error) {
      const errorMessage = {
        role: "system",
        content: "Sorry, there was an error processing your chemistry request.",
        error: error.message,
        timestamp: new Date().toISOString(),
      };

      setError(errorMessage);
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  }, []);
  */

  const clearHistory = useCallback(() => {
    setChatHistory([]);
    setLastResponse(null);
    setError(null);
  }, []);

  const value = {
    chatHistory,
    isLoading,
    lastResponse,
    error,
    chemyLogic, // When ready, replace this with chemyLogicLlama
    clearHistory,
    possibilities,
    selectedPossibility,
    setSelectedPossibility,
  };

  return (
    <ChemyContext.Provider value={value}>{children}</ChemyContext.Provider>
  );
};

export const useChemy = () => {
  const context = useContext(ChemyContext);
  if (!context) {
    throw new Error("useChemy must be used within a ChemyProvider");
  }
  return context;
};

export default ChemyContext;
