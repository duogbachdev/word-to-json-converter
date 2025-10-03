import React from 'react';
import { Send, Shield } from 'lucide-react';
import { CORS_PROXIES } from '../utils/corsProxy';

const ApiSender = ({
  apiEndpoint,
  apiMethod,
  apiHeaders,
  apiResponse,
  isSending,
  jsonOutput,
  corsProxy,
  batchMode,
  allPayloads,
  batchProgress,
  onEndpointChange,
  onMethodChange,
  onHeadersChange,
  onCorsProxyChange,
  onSend,
  onSendBatch
}) => {
  return (
    <>
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Send className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-purple-900">🚀 Gửi trực tiếp đến API</h3>
        </div>

        <div className="space-y-3">
          {/* CORS Proxy Selector */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-yellow-600" />
              <label className="text-xs font-bold text-yellow-800">
                🛡️ CORS Proxy (Bypass CORS restrictions):
              </label>
            </div>
            <select
              value={corsProxy}
              onChange={(e) => onCorsProxyChange(e.target.value)}
              className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-sm bg-white"
            >
              <option value="">❌ Không dùng proxy (Direct - sẽ bị CORS)</option>
              {CORS_PROXIES.map((proxy, idx) => (
                <option key={idx} value={proxy.url}>
                  {proxy.name} - {proxy.note}
                </option>
              ))}
            </select>
            {corsProxy ? (
              <div className="mt-2 space-y-1">
                <p className="text-xs text-yellow-700">
                  ✅ URL sẽ được gửi qua: <code className="bg-yellow-100 px-1 rounded">{corsProxy}</code>
                </p>
                {corsProxy.includes('cors-anywhere.herokuapp.com') && (
                  <div className="bg-yellow-100 border border-yellow-400 rounded p-2 mt-2">
                    <p className="text-xs font-bold text-yellow-800 mb-1">
                      ⚠️ Lần đầu sử dụng CORS Anywhere:
                    </p>
                    <ol className="text-xs text-yellow-700 ml-4 list-decimal space-y-1">
                      <li>Mở link: <a
                        href="https://cors-anywhere.herokuapp.com/corsdemo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        cors-anywhere.herokuapp.com/corsdemo
                      </a></li>
                      <li>Click nút "Request temporary access to the demo server"</li>
                      <li>Quay lại đây và gửi request</li>
                      <li>Access có hiệu lực vài giờ</li>
                    </ol>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-red-600 mt-2">
                ⚠️ Không dùng proxy sẽ gặp lỗi CORS khi gọi API cross-origin!
              </p>
            )}
          </div>

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
          
          {batchMode && allPayloads.length > 0 ? (
            <div className="space-y-2">
              <button
                onClick={onSendBatch}
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Send className="w-5 h-5" />
                {isSending ? 'Đang gửi...' : `Gửi từng câu (${allPayloads.length} câu)`}
              </button>

              {isSending && batchProgress ? (
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-blue-800">
                      Đang gửi: {batchProgress.current}/{batchProgress.total}
                    </span>
                    <span className="text-sm text-blue-600">
                      {batchProgress.elapsed}s
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-blue-600 mt-2 text-center">
                    ⏱️ Ước tính còn: {batchProgress.remaining}s
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-600 text-center">
                  ⚡ Sẽ gửi từng câu một (loop) • Thời gian: ~{Math.ceil(allPayloads.length * 0.3)}s
                </p>
              )}
            </div>
          ) : (
            <button
              onClick={onSend}
              disabled={!jsonOutput || isSending}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="w-5 h-5" />
              {isSending ? 'Đang gửi...' : 'Send Request'}
            </button>
          )}
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

