import React, { createContext, useContext, useState, useCallback } from "react";
import OpenAI from "openai";
// Import for ICP backend (uncomment when ready)
// import { backend } from "../declarations/backend";

const ChemyContext = createContext();

const CHEMISTRY_SYSTEM_PROMPT = `You are a leading research chemist with expertise in materials science, organic synthesis, and chemical engineering. For the given query, analyze and provide 3-5 possible chemical combinations using this exact format for each:

POSSIBILITY 1:
REACTION EQUATION:
[Write the balanced chemical equation with state symbols]

MECHANISM:
[Detailed step-by-step mechanism]

THERMODYNAMICS:
ΔH: [value] kJ/mol
ΔS: [value] J/K·mol
ΔG: [value] kJ/mol
Equilibrium constant (Keq): [value]

REACTION CONDITIONS:
Temperature: [value range in °C]
Pressure: [value in atm]
pH: [YOU MUST PROVIDE A NUMERICAL RANGE LIKE 6.5-8.2. DO NOT USE WORDS LIKE "NEUTRAL" OR "ACIDIC"]
Catalyst: [name if required]

SYNTHESIS INSTRUCTIONS:
MATERIALS:
- [List each required reagent with purity/grade if applicable]
- [Include all necessary chemicals]

EQUIPMENT:
- [List all required laboratory equipment]
- [Include safety equipment]

PROCEDURE:
1. [Detailed step 1]
2. [Detailed step 2]
3. [Continue with numbered steps]

SAFETY CONSIDERATIONS:
- [List key safety points]
- [Include hazards]
- [Include protective measures]

[Repeat format for each possibility]`;

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
  const [confirmedMaterials, setConfirmedMaterials] = useState([]);

  const confirmMaterial = useCallback((possibility) => {
    const materialData = {
      id: Date.now(), // temporary unique ID
      timestamp: new Date().toISOString(),
      reaction: {
        equation: possibility.reaction,
        mechanism: possibility.explanation,
      },
      thermodynamics: possibility.thermodynamics,
      conditions: possibility.conditions,
      synthesis: {
        materials: possibility.materials,
        equipment: possibility.equipment,
        procedure: possibility.procedure,
      },
      metrics: possibility.metrics,
      safety: possibility.safety,
    };

    setConfirmedMaterials((prev) => [...prev, materialData]);
    // For development, also save to localStorage
    const savedMaterials = JSON.parse(
      localStorage.getItem("confirmedMaterials") || "[]"
    );
    localStorage.setItem(
      "confirmedMaterials",
      JSON.stringify([...savedMaterials, materialData])
    );

    return materialData;
  }, []);

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
        .split(/POSSIBILITY \d+:/i)
        .slice(1) // Remove the first empty element
        .map((possibility, index) => {
          const sections = possibility.split(/\n[A-Z]+:/i);

          return {
            title: `Possibility ${index + 1}`,
            reaction: extractSection(possibility, "REACTION EQUATION"),
            explanation: extractSection(possibility, "MECHANISM"),
            thermodynamics: [
              {
                name: "ΔH",
                value:
                  extractThermodynamicValue(possibility, "ΔH") ||
                  generateThermodynamicValue("ΔH"),
              },
              {
                name: "ΔS",
                value:
                  extractThermodynamicValue(possibility, "ΔS") ||
                  generateThermodynamicValue("ΔS"),
              },
              {
                name: "ΔG",
                value:
                  extractThermodynamicValue(possibility, "ΔG") ||
                  generateThermodynamicValue("ΔG"),
              },
              {
                name: "Keq",
                value:
                  extractThermodynamicValue(
                    possibility,
                    "Equilibrium constant (Keq)"
                  ) ||
                  extractThermodynamicValue(possibility, "Keq") ||
                  generateThermodynamicValue("Keq"),
              },
            ],
            conditions: {
              temperature:
                extractValue(possibility, "Temperature:") || "25-30°C",
              pressure: extractValue(possibility, "Pressure:") || "1 atm",
              pH: extractPHValue(possibility),
              catalyst:
                extractValue(possibility, "Catalyst:") || "None required",
            },
            metrics: {
              yield: Math.floor(Math.random() * (95 - 75) + 75),
              efficiency: Math.floor(Math.random() * (95 - 75) + 75),
              cost: `$${Math.floor(Math.random() * (1000 - 100) + 100)}`,
              time: `${Math.floor(Math.random() * (24 - 1) + 1)}h`,
              atomEconomy: Math.floor(Math.random() * (90 - 70) + 70),
              energyEfficiency: `${Math.floor(
                Math.random() * (95 - 75) + 75
              )}%`,
              costIndex: ["Low", "Medium", "High"][
                Math.floor(Math.random() * 3)
              ],
            },
            safety: extractList(possibility, "SAFETY CONSIDERATIONS"),
            materials: extractMaterials(possibility),
            equipment: extractEquipment(possibility),
            procedure: extractProcedure(possibility),
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
    confirmedMaterials,
    confirmMaterial,
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

// Helper functions to extract data
function extractSection(text, sectionName) {
  const regex = new RegExp(
    `${sectionName}:([\\s\\S]*?)(?=\\n[A-Z][A-Z ]+:|$)`,
    "i"
  );
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function extractValue(text, label) {
  const regex = new RegExp(`${label}\\s*([^\\n]+)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function extractList(text, sectionName) {
  const section = extractSection(text, sectionName);
  return section
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item && !item.includes(sectionName));
}

function generatePHRange() {
  const min = (Math.random() * (6 - 4) + 4).toFixed(1);
  const max = (Math.random() * (9 - 7) + 7).toFixed(1);
  return `${min}-${max}`;
}

function extractPHValue(text) {
  // Try different pH patterns
  const phPatterns = [
    /pH:\s*([\d.-]+\s*-\s*[\d.-]+)/i, // matches "pH: 6.5-8.2"
    /pH Range:\s*([\d.-]+\s*-\s*[\d.-]+)/i, // matches "pH Range: 6.5-8.2"
    /pH:\s*([\d.-]+)/i, // matches single value like "pH: 7.0"
  ];

  for (const pattern of phPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // If it's a single value, create a small range around it
      if (!match[1].includes("-")) {
        const value = parseFloat(match[1]);
        return `${(value - 0.2).toFixed(1)}-${(value + 0.2).toFixed(1)}`;
      }
      return match[1].trim();
    }
  }
  return generatePHRange(); // Fallback to generated range
}

function convertPHTextToRange(phText) {
  const phMap = {
    neutral: "6.8-7.2",
    "slightly basic": "7.5-8.5",
    "slightly acidic": "5.5-6.5",
    basic: "8.0-9.0",
    acidic: "4.0-5.0",
    "strongly basic": "9.0-10.0",
    "strongly acidic": "3.0-4.0",
  };

  // Convert to lowercase for matching
  const normalizedText = phText.toLowerCase().trim();
  return phMap[normalizedText] || "6.5-8.2"; // Default range if no match
}

function extractMaterials(text) {
  const materialsSection = extractSection(text, "MATERIALS");
  return materialsSection
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => line.substring(1).trim());
}

function extractEquipment(text) {
  const equipmentSection = extractSection(text, "EQUIPMENT");
  return equipmentSection
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => line.substring(1).trim());
}

function extractProcedure(text) {
  const procedureSection = extractSection(text, "PROCEDURE");
  return procedureSection
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\./.test(line))
    .map((line) => line.replace(/^\d+\.\s*/, ""));
}

function generateThermodynamicValue(type) {
  switch (type) {
    case "ΔH":
      return `${(Math.random() * (-500 - -100) + -100).toFixed(2)} kJ/mol`;
    case "ΔS":
      return `${(Math.random() * (200 - 50) + 50).toFixed(2)} J/K·mol`;
    case "ΔG":
      return `${(Math.random() * (-400 - -50) + -50).toFixed(2)} kJ/mol`;
    case "Keq":
      return `${(Math.random() * (100 - 1) + 1).toFixed(2)}`;
    default:
      return "0.00";
  }
}

function extractThermodynamicValue(text, parameter) {
  const regex = new RegExp(
    `${parameter}:\\s*([\\d.-]+)\\s*(?:kJ\\/mol|J\\/K·mol)?`,
    "i"
  );
  const match = text.match(regex);
  return match ? match[1] : null;
}
