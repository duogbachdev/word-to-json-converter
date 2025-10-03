import React from 'react';
import { Upload, Trash2 } from 'lucide-react';

const BatchImport = ({
  allQuestions,
  allPayloads,
  currentQuestionIndex,
  onFileUpload,
  onConvertAll,
  onClearAll,
  onShowPrevious,
  onShowNext,
  onShowAllAsArray
}) => {
  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Upload className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-bold text-green-800">🚀 Import File DOCX - Batch Convert</h3>
      </div>
      
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Chọn file Word (.docx):
        </label>
        <input
          type="file"
          accept=".docx"
          onChange={onFileUpload}
          className="block w-full text-sm text-gray-700 border-2 border-dashed border-green-400 rounded-lg p-4 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:font-semibold hover:file:bg-green-700 cursor-pointer bg-white hover:border-green-500 transition-all"
        />
        <p className="mt-2 text-xs text-gray-600">
          📄 Tool sẽ tự động đọc tất cả câu hỏi từ file Word
        </p>
      </div>
      
      {allQuestions.length > 0 && (
        <div className="mt-4 p-4 bg-white border-2 border-green-400 rounded-lg">
          <div className="mb-3">
            <p className="text-green-800 font-bold text-lg">
              ✅ Đã import thành công: <span className="text-2xl">{allQuestions.length}</span> câu hỏi
            </p>
            <div className="mt-2 text-sm text-gray-700">
              <span className="mr-4">• DangThuc 1: {allQuestions.filter(q => q.dangThuc === 1).length} câu</span>
              <span>• DangThuc 2: {allQuestions.filter(q => q.dangThuc === 2).length} câu</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <button
                onClick={onConvertAll}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
              >
                🎯 Convert All ({allQuestions.length} câu)
              </button>
              <button
                onClick={onClearAll}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
                Clear All
              </button>
            </div>
            
            {allPayloads.length > 0 && (
              <div className="flex gap-2 items-center p-3 bg-blue-50 border border-blue-300 rounded-lg">
                <button
                  onClick={onShowPrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-all"
                >
                  ◀️ Trước
                </button>
                <span className="flex-1 text-center font-bold text-blue-900">
                  Câu {allPayloads[currentQuestionIndex]?.ThuTu} / {allPayloads.length}
                </span>
                <button
                  onClick={onShowNext}
                  disabled={currentQuestionIndex === allPayloads.length - 1}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-all"
                >
                  Sau ▶️
                </button>
                <button
                  onClick={onShowAllAsArray}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all"
                >
                  📦 Xem Array
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {allQuestions.length === 0 && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 Chưa có file nào được chọn. Hãy chọn file .docx để bắt đầu!
          </p>
        </div>
      )}
    </div>
  );
};

export default BatchImport;

