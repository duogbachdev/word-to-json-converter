# Word to JSON Converter

Công cụ chuyển đổi câu hỏi từ file Word (.docx) sang định dạng JSON và gửi trực tiếp đến API.

## ✨ Tính năng

- 🚀 **Batch Import**: Import và convert nhiều câu hỏi cùng lúc từ file Word
- ✍️ **Manual Mode**: Convert từng câu hỏi thủ công
- 🔄 **Auto-detect**: Tự động phát hiện dạng thức câu hỏi (DangThuc 1 hoặc 2)
- 📤 **API Integration**: Gửi JSON trực tiếp đến API endpoint
- 💾 **Export**: Download JSON dưới dạng file
- 📋 **Copy to Clipboard**: Copy JSON nhanh chóng
- 🎯 **Navigation**: Duyệt qua từng câu hỏi đã convert

## 🛠️ Công nghệ sử dụng

- **React** - UI Framework
- **Tailwind CSS** - Styling
- **Mammoth.js** - Đọc file Word
- **Lucide React** - Icons

## 📁 Cấu trúc dự án

```
word-to-json-converter/
├── public/
│   ├── index.html          # HTML với SEO meta tags
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
├── src/
│   ├── components/         # React components
│   │   ├── Header.js       # Header component
│   │   ├── BatchImport.js  # Batch import component
│   │   ├── ConfigForm.js   # Configuration form
│   │   ├── ManualInput.js  # Manual input component
│   │   ├── JsonOutput.js   # JSON output display
│   │   ├── ApiSender.js    # API sender component
│   │   └── Instructions.js # Instructions component
│   ├── utils/              # Utility functions
│   │   ├── textFormatter.js    # Text formatting utilities
│   │   ├── questionParser.js   # Question parsing logic
│   │   ├── fileHandler.js      # File handling utilities
│   │   └── apiClient.js        # API client utilities
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   └── index.js            # Entry point
└── package.json            # Dependencies
```

## 🚀 Cài đặt và chạy

### Yêu cầu

- Node.js >= 14.x
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone <repository-url>

# Di chuyển vào thư mục dự án
cd word-to-json-converter

# Cài đặt dependencies
npm install
```

### Chạy development server

```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Build production

```bash
npm run build
```

Build files sẽ được tạo trong thư mục `build/`

## 📖 Hướng dẫn sử dụng

### Chế độ Batch Import (Khuyên dùng)

1. Click "Choose File" và chọn file .docx
2. Tool sẽ tự động phát hiện tất cả câu hỏi và DangThuc
3. Click "Convert All" để convert toàn bộ
4. Sử dụng nút ◀️ ▶️ để duyệt qua từng câu
5. Copy hoặc Download JSON để sử dụng

### Chế độ Manual (từng câu)

1. Chọn Dạng thức và điều chỉnh số Thứ tự
2. Paste một câu hỏi vào ô Manual Input
3. Click "Convert"
4. Copy JSON và tiếp tục với câu tiếp theo

### Gửi API (như Postman)

1. Sau khi convert JSON, cuộn xuống phần "Gửi trực tiếp đến API"
2. Chọn HTTP Method (POST/PUT/PATCH)
3. Nhập URL endpoint của API
4. Điều chỉnh Headers nếu cần (thêm Authorization token, v.v.)
5. Click "Send Request" để gửi
6. Xem kết quả trả về ngay bên dưới

## 📝 Định dạng câu hỏi

### DangThuc 1 (A, B, C, D)

```
Câu 1. Đây là câu hỏi?
A. Đáp án A
B. Đáp án B
C. Đáp án C
D. Đáp án D
```

hoặc với markdown:

```
**Câu 1.** Đây là câu hỏi?
**A.** Đáp án A
**B.** Đáp án B
**C.** Đáp án C
**D.** Đáp án D
```

### DangThuc 2 (a, b, c, d)

```
Câu 1. Đây là câu hỏi?
a) Lệnh hỏi a
b) Lệnh hỏi b
c) Lệnh hỏi c
d) Lệnh hỏi d
```

## 🔧 Cấu hình

Các trường cấu hình:

- **IdDeThi**: ID của đề thi
- **SoId**: Số ID (optional)
- **IdMonHoc**: ID môn học
- **IdTrangThai**: ID trạng thái
- **ThuTu**: Thứ tự câu hỏi (auto-increment trong batch mode)
- **DangThuc**: Dạng thức câu hỏi (1 hoặc 2, auto-detect trong batch mode)

## 🎨 SEO Features

- ✅ Meta tags đầy đủ (title, description, keywords)
- ✅ Open Graph tags cho social media
- ✅ Twitter Card tags
- ✅ Structured Data (JSON-LD)
- ✅ Canonical URL
- ✅ PWA manifest
- ✅ Robots.txt
- ✅ Semantic HTML

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request.

## 📄 License

MIT License

---

Made with ❤️ by Word to JSON Converter Team
