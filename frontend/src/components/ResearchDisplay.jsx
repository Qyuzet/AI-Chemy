import React from 'react';
import { jsPDF } from "jspdf";

const ResearchDisplay = ({ researchData }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add institutional header
    doc.setFontSize(20);
    doc.text("Research Report", 105, 20, { align: "center" });
    doc.setFontSize(12);
    
    // Add content with proper formatting
    let yPos = 40;
    const sections = researchData.split('\n\n');
    
    sections.forEach(section => {
      const lines = doc.splitTextToSize(section, 180);
      if (yPos + lines.length * 10 > 280) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(lines, 15, yPos);
      yPos += lines.length * 10 + 10;
    });
    
    doc.save("research-report.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      {/* Professional Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Research Report</h1>
          <div className="flex space-x-4">
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Export to PDF
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Print
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Generated on: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 print:space-y-6">
        {researchData.split('\n\n').map((section, index) => (
          <div key={index} className="prose max-w-none">
            <div className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed">
              {section}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          This report was generated using advanced AI research algorithms.
          For academic and research purposes only.
        </p>
      </div>
    </div>
  );
};

export default ResearchDisplay;