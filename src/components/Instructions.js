import React from 'react';

const Instructions = () => {
  return (
    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-amber-900 mb-3">📖 Hướng dẫn sử dụng:</h3>
      <div className="space-y-4">
        <div className="p-3 bg-green-100 border border-green-300 rounded">
          <h4 className="font-bold text-green-900 mb-2">🚀 Chế độ Batch Import (Khuyên dùng):</h4>
          <ol className="list-decimal list-inside space-y-1 text-green-900 text-sm">
            <li>Click "Choose File" và chọn file .docx</li>
            <li>Tool sẽ tự động phát hiện tất cả câu hỏi và DangThuc</li>
            <li>Click "Convert All" để convert toàn bộ thành một JSON array</li>
            <li>Copy hoặc Download JSON để sử dụng</li>
          </ol>
        </div>
        
        <div className="p-3 bg-blue-100 border border-blue-300 rounded">
          <h4 className="font-bold text-blue-900 mb-2">✍️ Chế độ Manual (từng câu):</h4>
          <ol className="list-decimal list-inside space-y-1 text-blue-900 text-sm">
            <li>Chọn Dạng thức và điều chỉnh số Thứ tự</li>
            <li>Paste một câu hỏi vào ô Manual Input</li>
            <li>Click "Convert Single"</li>
            <li>Copy JSON và tiếp tục với câu tiếp theo</li>
          </ol>
        </div>
        
        <div className="p-3 bg-purple-100 border border-purple-300 rounded">
          <h4 className="font-bold text-purple-900 mb-2">🌐 Gửi API (như Postman):</h4>
          <ol className="list-decimal list-inside space-y-1 text-purple-900 text-sm">
            <li>Sau khi convert JSON, cuộn xuống phần "Gửi trực tiếp đến API"</li>
            <li>Chọn HTTP Method (POST/PUT/PATCH)</li>
            <li>Nhập URL endpoint của API</li>
            <li>Điều chỉnh Headers nếu cần (thêm Authorization token, v.v.)</li>
            <li>Click "Send Request" để gửi</li>
            <li>Xem kết quả trả về ngay bên dưới</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Instructions;

