# 🚀 Batch Send Guide - Gửi hàng loạt

## 🎯 Vấn đề

Khi dùng **Batch Import**, app convert nhiều câu hỏi thành **array of objects**:

```json
[
  { "ThuTu": 1, "DeBai": "...", ... },
  { "ThuTu": 2, "DeBai": "...", ... },
  { "ThuTu": 3, "DeBai": "...", ... }
]
```

Nhưng API của bạn **chỉ nhận từng object một**, không nhận array:

```json
{ "ThuTu": 1, "DeBai": "...", ... }
```

→ Gửi array sẽ bị lỗi! ❌

---

## ✅ Giải pháp: Batch Send

App sẽ **tự động loop** qua từng câu hỏi và gửi **từng câu một**.

### Cách hoạt động:

```javascript
// Thay vì gửi:
POST /api/questions
Body: [object1, object2, object3, ...]  ❌

// App sẽ gửi:
POST /api/questions
Body: object1  ✅

POST /api/questions
Body: object2  ✅

POST /api/questions
Body: object3  ✅
```

---

## 📖 Hướng dẫn sử dụng

### Bước 1: Batch Import
```
1. Choose File → Chọn .docx
2. Click "Convert All"
3. Thấy: "Đã import 10 câu hỏi"
```

### Bước 2: Setup API
```
1. Cuộn xuống "Gửi trực tiếp đến API"
2. CORS Proxy: CORS Anywhere (đã chọn sẵn)
3. Method: POST
4. URL: https://admin.vett.edu.vn/api/DSDeThiCauHoi
5. Headers:
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_TOKEN"
}
```

### Bước 3: Gửi Batch
```
1. Thấy nút màu xanh: "Gửi từng câu (10 câu)"
2. Thấy ước tính thời gian: "~3s"
3. Click nút đó
4. Confirm dialog
5. Xem progress bar:
   - Đang gửi: 5/10
   - Thời gian đã chạy: 2s
   - Ước tính còn: 1s
6. Xem kết quả với tổng thời gian
```

---

## 🎨 UI Changes

### Khi ở Manual Mode:
- Nút tím: **"Send Request"**
- Gửi 1 câu hiện tại

### Khi ở Batch Mode (Chưa gửi):
- Nút xanh: **"Gửi từng câu (X câu)"**
- Text: **"⚡ Sẽ gửi từng câu một (loop) • Thời gian: ~Xs"**

### Khi ở Batch Mode (Đang gửi):
- Progress bar màu xanh
- **"Đang gửi: X/Y"** + **"Zs"** (thời gian đã chạy)
- Progress bar animation
- **"⏱️ Ước tính còn: Zs"**

---

## ⚙️ Technical Details

### Flow:

```javascript
async function handleSendBatch() {
  // 1. Validate
  if (!allPayloads.length) return;
  if (!apiEndpoint) return;
  
  // 2. Confirm
  const ok = confirm(`Gửi ${allPayloads.length} câu?`);
  if (!ok) return;
  
  // 3. Loop
  for (let i = 0; i < allPayloads.length; i++) {
    const payload = allPayloads[i];
    
    // 4. Send single object
    await sendToApi(endpoint, method, headers, JSON.stringify(payload));
    
    // 5. Delay để tránh rate limit
    await sleep(300); // 300ms
  }
  
  // 6. Show summary
  alert(`Thành công: ${successCount}, Lỗi: ${errorCount}`);
}
```

### Delay giữa requests:

```javascript
// Delay 300ms giữa mỗi request
await new Promise(resolve => setTimeout(resolve, 300));
```

**Tại sao cần delay?**
- Tránh rate limit từ server
- Tránh overload server
- Cho server xử lý từng request

**Có thể điều chỉnh:**
```javascript
// Nhanh hơn (200ms)
await new Promise(resolve => setTimeout(resolve, 200));

// Chậm hơn (500ms)
await new Promise(resolve => setTimeout(resolve, 500));
```

---

## 📊 Response Format

### Success Response:

```json
{
  "total": 10,
  "success": 9,
  "error": 1,
  "totalTime": "3s",
  "avgTimePerRequest": "0.30s",
  "results": [
    {
      "index": 1,
      "thuTu": 1,
      "status": 200,
      "ok": true,
      "message": "Success"
    },
    {
      "index": 2,
      "thuTu": 2,
      "status": 200,
      "ok": true,
      "message": "Success"
    },
    {
      "index": 3,
      "thuTu": 3,
      "status": 400,
      "ok": false,
      "message": "Failed"
    },
    ...
  ]
}
```

### Ý nghĩa:

| Field | Mô tả |
|-------|-------|
| `total` | Tổng số câu hỏi |
| `success` | Số câu gửi thành công |
| `error` | Số câu bị lỗi |
| `totalTime` | Tổng thời gian (giây) |
| `avgTimePerRequest` | Thời gian trung bình mỗi câu |
| `results` | Chi tiết từng câu |
| `index` | Thứ tự trong batch (1, 2, 3...) |
| `thuTu` | ThuTu của câu hỏi |
| `status` | HTTP status code |
| `ok` | true = success, false = error |
| `message` | Success hoặc error message |

---

## 🐛 Troubleshooting

### Một số câu bị lỗi?

**Check:**
1. Xem `results` array để biết câu nào lỗi
2. Check `status` code:
   - `200` = Success
   - `400` = Bad request (data không đúng)
   - `401` = Unauthorized (token hết hạn)
   - `500` = Server error

**Fix:**
- Nếu token hết hạn → Lấy token mới
- Nếu data không đúng → Check format câu hỏi
- Nếu server error → Liên hệ backend team

### Tất cả câu đều lỗi?

**Check:**
1. CORS proxy có hoạt động không?
2. Token có đúng không?
3. URL endpoint có đúng không?
4. Headers có đúng format JSON không?

**Test:**
- Gửi 1 câu thủ công trước (Manual mode)
- Nếu 1 câu work → Batch sẽ work
- Nếu 1 câu không work → Fix single trước

### Quá chậm?

**Giảm delay:**
```javascript
// Trong src/App.js, dòng ~280
// Thay đổi từ 300 → 200
await new Promise(resolve => setTimeout(resolve, 200));
```

**Lưu ý:**
- Delay quá nhỏ → Có thể bị rate limit
- Delay quá lớn → Chậm
- 300ms là balance tốt

### Bị rate limit?

**Tăng delay:**
```javascript
// Tăng lên 500ms hoặc 1000ms
await new Promise(resolve => setTimeout(resolve, 500));
```

---

## 💡 Tips & Tricks

### 1. Test với ít câu trước
```
- Import file có 2-3 câu
- Test batch send
- Nếu OK → Import file lớn
```

### 2. Check console
```
F12 → Console tab
Sẽ thấy:
"Đang gửi câu 1/10..."
"Đang gửi câu 2/10..."
...
```

### 3. Backup data
```
- Click "Download" để lưu JSON
- Nếu batch send lỗi → Còn có file backup
```

### 4. Gửi lại câu lỗi
```
1. Xem results để biết câu nào lỗi
2. Dùng navigation (◀️ ▶️) để tìm câu đó
3. Gửi lại từng câu bằng "Send Request"
```

---

## 📈 Performance

### Thời gian ước tính:

| Số câu | Delay | Thời gian |
|--------|-------|-----------|
| 10 | 300ms | ~3 giây |
| 50 | 300ms | ~15 giây |
| 100 | 300ms | ~30 giây |
| 500 | 300ms | ~2.5 phút |

**Công thức:**
```
Thời gian = Số câu × (Delay + Request time)
         ≈ Số câu × 300ms
```

---

## 🔒 Security

### Lưu ý:

⚠️ **Token được gửi qua CORS proxy**
- Public proxy có thể log token
- Chỉ dùng cho development/testing
- Production nên tự host proxy hoặc fix CORS ở backend

✅ **Best practices:**
- Rotate token thường xuyên
- Không commit token vào git
- Sử dụng environment variables
- Production phải có CORS headers từ backend

---

## 🎯 Use Cases

### 1. Import đề thi mới
```
- Giáo viên tạo 100 câu trong Word
- Batch import
- Batch send → Tất cả câu vào database
```

### 2. Update câu hỏi
```
- Sửa câu hỏi trong Word
- Batch import
- Batch send với PUT method
```

### 3. Migrate data
```
- Export từ hệ thống cũ
- Format lại trong Word
- Batch import + send → Hệ thống mới
```

---

## 📚 Related Docs

- [README.md](README.md) - Full guide
- [QUICK_START.md](QUICK_START.md) - Quick start
- [CORS_GUIDE.md](CORS_GUIDE.md) - CORS guide
- [CHANGELOG.md](CHANGELOG.md) - Version history

---

## 🆘 Need Help?

- 📧 Email: contact@yourdomain.com
- 🐛 GitHub Issues
- 💬 GitHub Discussions

---

Made with ❤️ by Word to JSON Converter Team

