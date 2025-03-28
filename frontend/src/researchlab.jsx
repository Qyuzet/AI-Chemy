import React, { createContext, useContext, useState, useCallback } from "react";
import OpenAI from "openai";
import { jsPDF } from "jspdf";

const ResearchContext = createContext();

const RESEARCH_SYSTEM_PROMPT = `You are a distinguished academic researcher with expertise in multidisciplinary research and extensive publication experience in high-impact journals (Nature, Science, Cell). Generate a comprehensive research paper following academic standards and this precise structure:

1. Title: [Create a precise, SEO-optimized title with keywords]

2. Abstract (200-250 words):
- Background & Context
- Research Objective
- Methodology Overview
- Key Findings
- Implications & Impact
- Keywords: [5 relevant keywords]

3. Introduction (800-1000 words):
- Current State of the Field
- Knowledge Gaps
- Research Questions/Hypotheses
- Theoretical Framework
- Study Objectives
- Innovation & Contribution

4. Methodology (800-1000 words):
- Research Design
- Data Collection Methods
- Sampling Strategy & Size Calculation
- Variables & Measurements
- Quality Control Measures
- Statistical Analysis Plan
- Ethical Considerations & Approvals

5. Results (1000-1200 words):
- Descriptive Statistics
- Primary Outcomes
- Secondary Outcomes
- Statistical Analyses
- Confidence Intervals
- P-values
- Effect Sizes
- [Include placeholders for figures/tables with detailed descriptions]

6. Discussion (1000-1200 words):
- Summary of Key Findings
- Comparison with Existing Literature
- Theoretical Implications
- Practical Applications
- Study Strengths
- Limitations
- Future Research Directions

7. Conclusion (400-500 words):
- Research Summary
- Key Contributions
- Broader Impact
- Policy Implications
- Future Perspectives

8. References:
[Generate 25-30 fictional but properly formatted references in APA style]

Additional Requirements:
- Use precise scientific language
- Include statistical significance where applicable
- Suggest potential figures/tables
- Highlight practical applications
- Include funding considerations
- Suggest potential collaborations
- Include data availability statement
- Add conflict of interest statement
- Include author contributions section

Format all statistical values precisely (e.g., "p < 0.001, CI [0.45, 0.67], d = 0.89").`;

// Note: Replace with your actual OpenAI API key
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const ResearchProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [researchPaper, setResearchPaper] = useState(null);
  const [error, setError] = useState(null);

  const generateResearchPaper = useCallback(async (researchTopic) => {
    setIsLoading(true);
    setError(null);

    try {
      const completion = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: RESEARCH_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `Generate a research paper on the topic: ${researchTopic}`,
          },
        ],
        temperature: 0.6,
        max_tokens: 4000,
      });

      const paperContent = completion.choices[0].message.content;
      setResearchPaper(paperContent);
      return paperContent;
    } catch (error) {
      setError("Failed to generate research paper");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downloadPDF = () => {
    if (!researchPaper) {
      setError("No research paper to download");
      return;
    }

    try {
      const doc = new jsPDF();

      // Set font and size
      doc.setFontSize(12);

      // Split text into lines that fit the page
      const splitText = doc.splitTextToSize(researchPaper, 180);

      // Add text to PDF
      doc.text(splitText, 15, 20);

      // Save the PDF
      doc.save("research_paper.pdf");
    } catch (error) {
      setError("Failed to create PDF");
      console.error(error);
    }
  };

  const value = {
    generateResearchPaper,
    downloadPDF,
    researchPaper,
    isLoading,
    error,
  };

  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error("useResearch must be used within a ResearchProvider");
  }
  return context;
};

// Research Paper Generator Component
function ResearchPaperGenerator() {
  const [topic, setTopic] = useState("");
  const {
    generateResearchPaper,
    downloadPDF,
    researchPaper,
    isLoading,
    error,
  } = useResearch();

  const handleGenerate = async () => {
    await generateResearchPaper(topic);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">
        Research Paper Generator
      </h1>

      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter research topic"
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
        />

        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`flex-1 p-3 rounded-lg ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-black text white hover:bg-white hover:text-black transition duration-300"
            } text-white font-semibold`}
          >
            {isLoading ? "Generating..." : "Generate Research Paper"}
          </button>

          {researchPaper && (
            <button
              onClick={downloadPDF}
              className="flex-1 p-3 bg-black text white hover:bg-white hover:text-black font-semibold transition duration-300"
            >
              Download PDF
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {researchPaper && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Research Paper Preview
            </h2>
            <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-[500px]">
              {researchPaper}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export { ResearchPaperGenerator };
