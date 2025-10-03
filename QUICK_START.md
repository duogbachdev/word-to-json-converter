# ⚡ Quick Start - Word to JSON Converter

## 🚀 Chạy app trong 3 bước

### 1. Cài đặt
```bash
npm install
```

### 2. Chạy
```bash
npm start
```

### 3. Mở browser
```
http://localhost:3000
```

---

## 📝 Sử dụng nhanh

### Batch Import (Khuyên dùng)

1. **Chuẩn bị file Word** với format:
```
Câu 1. Đây là câu hỏi?
A. Đáp án A
B. Đáp án B
C. Đáp án C
D. Đáp án D

Câu 2. Câu hỏi tiếp theo?
...
```

2. **Click "Choose File"** → Chọn file .docx

3. **Click "Convert All"** → Tất cả câu được convert

4. **Duyệt qua từng câu** bằng nút ◀️ ▶️

5. **Copy hoặc Download** JSON

---

### Manual Mode (Từng câu)

1. **Paste câu hỏi** vào ô Manual Input

2. **Click "Convert"**

3. **Copy JSON**

4. **Click "Convert & Next"** để làm câu tiếp theo

---

### Gửi API

1. **Convert JSON** (batch hoặc manual)

2. **Nếu gặp lỗi CORS:**
   - Chọn **AllOrigins** từ dropdown CORS Proxy

3. **Chọn Method:** GET/POST/PUT/PATCH

4. **Nhập URL:** `https://api.example.com/endpoint`

5. **Nhập Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_TOKEN"
}
```

6. **Click "Send Request"**

7. **Xem response** bên dưới

---

## 🛡️ Fix lỗi CORS

### Lỗi:
```
Access to fetch at '...' has been blocked by CORS policy
```

### Giải pháp:
1. Chọn **CORS Proxy** = **AllOrigins**
2. Gửi lại request
3. ✅ Done!

Chi tiết: [CORS_GUIDE.md](CORS_GUIDE.md)

---

## 🎯 Tips & Tricks

### 1. Auto-detect DangThuc
- App tự động phát hiện DangThuc 1 (A,B,C,D) hoặc 2 (a,b,c,d)
- Không cần chọn thủ công khi dùng Batch Import

### 2. Navigation nhanh
- Dùng nút ◀️ ▶️ để duyệt câu
- Counter hiển thị vị trí hiện tại (X/Y)

### 3. View Array
- Click "Xem Array" để xem tất cả câu dạng array
- Tiện cho việc gửi nhiều câu cùng lúc

### 4. Copy nhanh
- Click Copy → JSON tự động vào clipboard
- Paste trực tiếp vào Postman hoặc code

### 5. Download JSON
- Single question: `cau_X.json`
- Array: `all_questions.json`

---

## 🔧 Cấu hình

### Các trường cần điền:

| Field | Mô tả | Bắt buộc |
|-------|-------|----------|
| **IdDeThi** | ID của đề thi | ✅ |
| **IdMonHoc** | ID môn học | ✅ |
| **IdTrangThai** | ID trạng thái | ✅ |
| **SoId** | Số ID | ❌ |
| **ThuTu** | Thứ tự câu | ✅ (auto) |
| **DangThuc** | Dạng thức (1 hoặc 2) | ✅ (auto) |

---

## 📋 Checklist trước khi gửi API

- [ ] JSON đã được generate
- [ ] IdDeThi đã điền
- [ ] IdMonHoc đã điền
- [ ] IdTrangThai đã điền
- [ ] Headers có Authorization token
- [ ] Đã chọn CORS Proxy (nếu cần)
- [ ] Method đúng (GET/POST/PUT)
- [ ] URL endpoint đúng

---

## ❓ Troubleshooting

### File không import được
- ✅ Check file có phải .docx không
- ✅ Check file có câu hỏi không
- ✅ Check format câu hỏi đúng chưa

### JSON không đúng format
- ✅ Check DangThuc đã chọn đúng chưa
- ✅ Check câu hỏi có đủ đáp án không
- ✅ Xem Debug Info để biết lỗi

### API không gửi được
- ✅ Check có lỗi CORS không → Chọn proxy
- ✅ Check Headers có đúng JSON không
- ✅ Check token còn hạn không
- ✅ Check URL có đúng không

### GET method bị lỗi body
- ✅ Đã fix trong version 2.0.0
- ✅ GET không gửi body nữa

---

## 📚 Tài liệu đầy đủ

- [README.md](README.md) - Hướng dẫn chi tiết
- [CORS_GUIDE.md](CORS_GUIDE.md) - Hướng dẫn CORS
- [CONTRIBUTING.md](CONTRIBUTING.md) - Hướng dẫn contribute
- [CHANGELOG.md](CHANGELOG.md) - Lịch sử thay đổi

---

## 🆘 Cần giúp đỡ?

- 📧 Email: contact@yourdomain.com
- 🐛 GitHub Issues: [Create Issue](https://github.com/yourusername/word-to-json-converter/issues)
- 📖 Documentation: [Full Docs](README.md)

---

## 🎉 Bắt đầu ngay!

```bash
npm start
```

Mở http://localhost:3000 và bắt đầu convert! 🚀

---

Made with ❤️ by Word to JSON Converter Team

