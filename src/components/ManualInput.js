import React from 'react';
import { AlertCircle } from 'lucide-react';

const ManualInput = ({
  wordText,
  debugInfo,
  onTextChange,
  onConvert,
  onConvertAndNext
}) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Manual Input</h2>
      <textarea
        value={wordText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Paste một câu hỏi để convert thủ công..."
        className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm"
      />
      <div className="grid grid-cols-2 gap-3 mt-3">
        <button
          onClick={onConvert}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Convert
        </button>
        <button
          onClick={onConvertAndNext}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Convert & Next
        </button>
      </div>
      
      {debugInfo && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs font-mono whitespace-pre-wrap">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-1" />
            <div className="text-yellow-800">{debugInfo}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualInput;

