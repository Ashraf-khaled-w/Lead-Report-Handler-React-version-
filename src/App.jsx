import React, { useState, useEffect } from "react";
import CalcFiled from "./UI/CalcFiled";
function App() {
  const [counts, setCounts] = useState(() => {
    const savedCounts = localStorage.getItem("leadReportCounts");
    const initialCounts = {
      totalLeads: 0,
      wrongNumber: 0,
      noAnswer: 0,
      followUp: 0,
      newCall: 0,
      qualified: 0,
      notQualified: 0,
      gatekeeper: 0,
      wrongData: 0,
      dncr: 0,
      dncrList: [],
    };

    if (savedCounts) {
      const parsed = JSON.parse(savedCounts);
      // Migrate old uppercase DNCR if it exists and dncr is missing
      if (parsed.DNCR !== undefined && parsed.dncr === undefined) {
        parsed.dncr = parsed.DNCR;
        delete parsed.DNCR;
      }
      // Ensure dncrList exists
      if (!parsed.dncrList) {
        parsed.dncrList = [];
      }
      return { ...initialCounts, ...parsed };
    }

    return initialCounts;
  });

  useEffect(() => {
    localStorage.setItem("leadReportCounts", JSON.stringify(counts));
  }, [counts]);

  const [showReport, setShowReport] = useState(false);
  const [dncrInput, setDncrInput] = useState("");

  const updateCount = (field, value) => {
    setCounts((prev) => ({ ...prev, [field]: value }));
  };

  const handleDncrSubmit = (e) => {
    e.preventDefault();
    if (!dncrInput.trim()) return;
    setCounts((prev) => ({
      ...prev,
      dncr: prev.dncr + 1,
      dncrList: [...(prev.dncrList || []), dncrInput],
    }));
    setDncrInput("");
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
      dncr: 0,
      dncrList: [],
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
    counts.newCall + counts.followUp + counts.wrongData + counts.gatekeeper + counts.dncr;

  const reportText = `Total lead = ${counts.totalLeads}

Total Answered = ${totalAnswered} 
1- New Call = ${counts.newCall}
2- Follow Up = ${counts.followUp}
3- Wrong Data = ${counts.wrongData}
4- Gatekeeper = ${counts.gatekeeper}

Qualified = ${counts.qualified} || Not Qualified = ${counts.notQualified} ||  DNCR = ${counts.dncr}

No Answer = ${calculatedNoAnswer}`;

  const reportDncr = `DNCR Count = ${counts.dncr}
List:
${(counts.dncrList || []).map((name, i) => `${i + 1}- ${name}`).join("\n")}`;

  return (
    <>
      <div className="container mx-auto flex flex-col min-h-screen justify-center items-center py-10">
        <div className="flex flex-col bg-white rounded-xl shadow-xl p-8 m-2 w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Leads Report Handler
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
              label="New Call"
              value={counts.newCall}
              onChange={(val) => updateCount("newCall", val)}
            />
            <CalcFiled
              label="Follow Up"
              value={counts.followUp}
              onChange={(val) => updateCount("followUp", val)}
            />

            <CalcFiled
              label="Qualified"
              value={counts.qualified}
              onChange={(val) => updateCount("qualified", val)}
            />
            <CalcFiled
              label="DNCR"
              value={counts.dncr}
              onChange={(val) => updateCount("dncr", val)}
            />
            <CalcFiled
              label="Not Qualified"
              value={counts.notQualified}
              onChange={(val) => updateCount("notQualified", val)}
            />
            <form onSubmit={handleDncrSubmit} className="flex gap-2 items-center">
              <input
                type="text"
                className="border border-gray-300 rounded px-2 py-1 grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add DNCR name"
                value={dncrInput}
                onChange={(e) => setDncrInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-sm font-bold"
              >
                Add
              </button>
            </form>
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

          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="bg-blue-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              onClick={handleReport}
            >
              Report
            </button>
            <button
              className="bg-red-500 text-white font-bold py-2 px-8 rounded-lg hover:bg-red-600 transition-colors shadow-md"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        {showReport && (
          <div className="flex flex-col bg-white rounded-xl shadow-xl p-8 m-2 w-full max-w-3xl mt-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Generated Report</h2>
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
                value={reportText}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">DNCR List</h3>
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
                value={reportDncr}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
