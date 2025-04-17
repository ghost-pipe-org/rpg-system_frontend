import React from "react";
import "./index.css";

export const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            Tailwind CSS
          </h1>
          <p className="text-gray-700 mb-4">Teste.</p>
          <div className="flex justify-center space-x-4">
            <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
              Botão
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
              Botão
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
