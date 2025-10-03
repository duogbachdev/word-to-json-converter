import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <FileText className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-800">Word to API JSON Converter</h1>
      </div>
      <p className="text-gray-600 text-sm ml-11">
        Chuyển đổi câu hỏi từ file Word sang JSON và gửi trực tiếp đến API
      </p>
    </div>
  );
};

export default Header;

