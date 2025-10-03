import React from 'react';
import { Send } from 'lucide-react';

const ApiSender = ({
  apiEndpoint,
  apiMethod,
  apiHeaders,
  apiResponse,
  isSending,
  jsonOutput,
  onEndpointChange,
  onMethodChange,
  onHeadersChange,
  onSend
}) => {
  return (
    <>
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Send className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-purple-900">🚀 Gửi trực tiếp đến API</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <select
              value={apiMethod}
              onChange={(e) => onMethodChange(e.target.value)}
              className="px-3 py-2 border border-purple-300 rounded-lg font-semibold bg-white"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              value={apiEndpoint}
              onChange={(e) => onEndpointChange(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="flex-1 px-4 py-2 border border-purple-300 rounded-lg text-sm"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Headers (JSON format):
            </label>
            <textarea
              value={apiHeaders}
              onChange={(e) => onHeadersChange(e.target.value)}
              placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
              className="w-full px-3 py-2 border border-purple-300 rounded-lg font-mono text-xs"
              rows="3"
            />
          </div>
          
          <button
            onClick={onSend}
            disabled={!jsonOutput || isSending}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Send className="w-5 h-5" />
            {isSending ? 'Đang gửi...' : 'Send Request'}
          </button>
        </div>
      </div>
      
      {apiResponse && (
        <div className="mt-4">
          <h4 className="text-sm font-bold text-gray-800 mb-2">API Response:</h4>
          <textarea
            value={apiResponse}
            readOnly
            className="w-full h-48 px-4 py-3 border border-green-300 rounded-lg bg-green-50 font-mono text-xs"
          />
        </div>
      )}
    </>
  );
};

export default ApiSender;

