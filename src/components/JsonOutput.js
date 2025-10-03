import React from 'react';
import { Copy, Download } from 'lucide-react';

const JsonOutput = ({
  jsonOutput,
  onCopy,
  onDownload
}) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">JSON Output</h2>
        <div className="flex gap-2">
          <button
            onClick={onCopy}
            disabled={!jsonOutput}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={onDownload}
            disabled={!jsonOutput}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      <textarea
        value={jsonOutput}
        readOnly
        placeholder="JSON output sẽ xuất hiện ở đây..."
        className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
      />
    </div>
  );
};

export default JsonOutput;

