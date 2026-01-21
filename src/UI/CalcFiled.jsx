import React, { useState } from "react";

export default function CalcFiled({ label, value, onChange }) {
  const handlePlus = () => {
    onChange(value + 1);
  };
  const handleMinus = () => {
    onChange(value - 1);
  };
  return (
    <div className="flex justify-between items-center w-full">
      <label className="font-bold text-gray-600 text-sm">{label}:</label>
      <div className="flex items-center space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
          onClick={handleMinus}
        >
          -1
        </button>
        <input
          type="number"
          className="border border-gray-300 rounded w-16 text-center p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
          onClick={handlePlus}
        >
          +1
        </button>
      </div>
    </div>
  );
}
