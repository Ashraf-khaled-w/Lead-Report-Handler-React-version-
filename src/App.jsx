import React, { useState, useEffect } from "react";
import CalcFiled from "./UI/CalcFiled";
function App() {
  const [counts, setCounts] = useState(() => {
    const savedCounts = localStorage.getItem("leadReportCounts");
    return savedCounts
      ? JSON.parse(savedCounts)
      : {
          totalLeads: 0,
          wrongNumber: 0,
          noAnswer: 0,
          followUp: 0,
          newCall: 0,
          qualified: 0,
          notQualified: 0,
          gatekeeper: 0,
          wrongData: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem("leadReportCounts", JSON.stringify(counts));
  }, [counts]);

  const [showReport, setShowReport] = useState(false);

  const updateCount = (field, value) => {
    setCounts((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setCounts({
      totalLeads: 0,
      wrongNumber: 0,
      noAnswer: 0,
      followUp: 0,
      newCall: 0,
      qualified: 0,
      notQualified: 0,
      gatekeeper: 0,
      wrongData: 0,
    });
    setShowReport(false);
  };

  const handleReport = () => {
    setShowReport(true);
  };

  const calculatedNoAnswer =
    counts.totalLeads -
    (counts.wrongNumber +
      counts.followUp +
      counts.newCall +
      counts.gatekeeper +
      counts.wrongData);

  const totalAnswered =
    counts.newCall + counts.followUp + counts.wrongData + counts.gatekeeper;

  const reportText = `Total lead = ${counts.totalLeads}

Total Answerd = ${totalAnswered} 
1- New Call = ${counts.newCall}
2- Follow up = ${counts.followUp}
3- wrong data = ${counts.wrongData}
4- GateKepper = ${counts.gatekeeper}

Qulified = ${counts.qualified} || Not Qulifed = ${counts.notQualified}

No Answerd = ${calculatedNoAnswer}`;

  return (
    <>
      <div className="container mx-auto flex flex-col min-h-screen justify-center items-center py-10">
        <div className="flex flex-col bg-white rounded-xl shadow-xl p-8 m-2 w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Lead Report Handler
          </h1>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-6">
            <label htmlFor="totalLeads" className="text-gray-700 font-bold text-lg">
              Total Leads:
            </label>
            <input
              type="number"
              id="totalLeads"
              className="border border-gray-300 rounded px-3 py-1 w-24 text-center bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={counts.totalLeads}
              onChange={(e) => updateCount("totalLeads", Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 bg-gray-50 p-4 rounded-lg mb-6">
            <CalcFiled
              label="Wrong Number"
              value={counts.wrongNumber}
              onChange={(val) => updateCount("wrongNumber", val)}
            />
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-6">
            <label className="text-gray-700 font-bold text-lg">No Answer:</label>
            <span className="text-gray-700 font-bold text-lg">{calculatedNoAnswer}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg mb-6">
            <CalcFiled
              label="follow up"
              value={counts.followUp}
              onChange={(val) => updateCount("followUp", val)}
            />
            <CalcFiled
              label="New call"
              value={counts.newCall}
              onChange={(val) => updateCount("newCall", val)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg mb-6">
            <CalcFiled
              label="Gatekeeper"
              value={counts.gatekeeper}
              onChange={(val) => updateCount("gatekeeper", val)}
            />
            <CalcFiled
              label="Wrong Data"
              value={counts.wrongData}
              onChange={(val) => updateCount("wrongData", val)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg mb-6">
            <CalcFiled
              label="Qulified"
              value={counts.qualified}
              onChange={(val) => updateCount("qualified", val)}
            />
            <CalcFiled
              label="Not Qulified"
              value={counts.notQualified}
              onChange={(val) => updateCount("notQualified", val)}
            />
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="bg-blue-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              onClick={handleReport}
            >
              Report
            </button>
            <button
              className="bg-gray-500 text-white font-bold py-2 px-8 rounded-lg hover:bg-gray-600 transition-colors shadow-md"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        {showReport && (
          <div className="flex flex-col bg-white rounded-xl shadow-xl p-8 m-2 w-full max-w-3xl mt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Generated Report</h2>
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
              value={reportText}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
