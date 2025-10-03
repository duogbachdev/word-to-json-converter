# 🛡️ Hướng dẫn xử lý CORS - Word to JSON Converter

## ❓ CORS là gì?

**CORS (Cross-Origin Resource Sharing)** là cơ chế bảo mật của trình duyệt ngăn chặn website gọi API từ domain khác.

### Ví dụ lỗi CORS:
```
Access to fetch at 'https://admin.vett.edu.vn/api/...' from origin 'http://localhost:3000' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

---

## 🔧 Giải pháp đã tích hợp

App đã tích hợp **CORS Proxy** để bypass CORS khi bạn không có quyền sửa backend.

### Cách sử dụng:

1. **Mở phần "Gửi trực tiếp đến API"**
2. **Chọn CORS Proxy** từ dropdown (màu vàng)
3. **Nhập URL API** như bình thường
4. **Click "Send Request"**

App sẽ tự động wrap URL của bạn qua proxy server.

---

## 📋 Các CORS Proxy có sẵn

### 1. **AllOrigins** (Khuyên dùng)
- **URL:** `https://api.allorigins.win/raw?url=`
- **Ưu điểm:** 
  - ✅ Không cần đăng ký
  - ✅ Không giới hạn requests
  - ✅ Dễ sử dụng
- **Nhược điểm:**
  - ⚠️ Public service, có thể chậm
  - ⚠️ Không phù hợp cho production

**Ví dụ:**
```
Original: https://admin.vett.edu.vn/api/DSDeThiCauHoi/showPage
Proxied:  https://api.allorigins.win/raw?url=https://admin.vett.edu.vn/api/DSDeThiCauHoi/showPage
```

---

### 2. **CORS.SH**
- **URL:** `https://cors.sh/`
- **Ưu điểm:**
  - ✅ Nhanh
  - ✅ Reliable
- **Nhược điểm:**
  - ⚠️ Free tier: 50 requests/hour
  - ⚠️ Cần upgrade cho nhiều requests

**Ví dụ:**
```
Original: https://admin.vett.edu.vn/api/...
Proxied:  https://cors.sh/https://admin.vett.edu.vn/api/...
```

---

### 3. **ThingProxy**
- **URL:** `https://thingproxy.freeboard.io/fetch/`
- **Ưu điểm:**
  - ✅ Không cần config
  - ✅ Đơn giản
- **Nhược điểm:**
  - ⚠️ Có thể bị rate limit
  - ⚠️ Không stable cho production

---

### 4. **CORS Anywhere (Heroku)**
- **URL:** `https://cors-anywhere.herokuapp.com/`
- **Ưu điểm:**
  - ✅ Open source
  - ✅ Có thể tự host
- **Nhược điểm:**
  - ⚠️ Cần request access trước: https://cors-anywhere.herokuapp.com/corsdemo
  - ⚠️ Rate limited

**Cách dùng:**
1. Vào https://cors-anywhere.herokuapp.com/corsdemo
2. Click "Request temporary access"
3. Chọn proxy này trong app

---

## 🚀 Giải pháp tốt nhất (Production)

### Option 1: Tự host CORS Proxy

**Tạo proxy server đơn giản với Node.js:**

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

app.use('/api', createProxyMiddleware({
  target: 'https://admin.vett.edu.vn',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  }
}));

app.listen(3001, () => {
  console.log('Proxy server running on http://localhost:3001');
});
```

**Cài đặt:**
```bash
npm install express cors http-proxy-middleware
node server.js
```

**Sử dụng:**
```
Original: https://admin.vett.edu.vn/api/DSDeThiCauHoi/showPage
Proxied:  http://localhost:3001/api/DSDeThiCauHoi/showPage
```

---

### Option 2: Yêu cầu Backend thêm CORS headers

**Liên hệ team backend để thêm:**

```javascript
// Backend (Node.js/Express)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
```

Hoặc với .NET:
```csharp
// Startup.cs
services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

app.UseCors("AllowAll");
```

---

### Option 3: Browser Extension (Development only)

**Cài extension để disable CORS:**

**Chrome:**
- [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

**Firefox:**
- [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)

⚠️ **Chỉ dùng cho development, KHÔNG dùng cho production!**

---

## 🎯 Khuyến nghị theo use case

### Development (Local testing)
✅ **Dùng AllOrigins** hoặc **Browser Extension**

### Staging/Testing
✅ **Tự host proxy server** hoặc **CORS.SH**

### Production
✅ **Yêu cầu backend thêm CORS headers** (best practice)
✅ **Tự host proxy server** trên VPS/Cloud

---

## 🔍 Debug CORS Issues

### 1. Kiểm tra Network Tab
```
1. Mở DevTools (F12)
2. Tab Network
3. Gửi request
4. Click vào request bị lỗi
5. Xem Headers → Response Headers
6. Tìm "Access-Control-Allow-Origin"
```

### 2. Kiểm tra Console
```
Nếu thấy:
- "blocked by CORS policy" → Cần proxy
- "Failed to fetch" → Có thể là network issue
- "401 Unauthorized" → Token hết hạn
```

### 3. Test với cURL
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://admin.vett.edu.vn/api/DSDeThiCauHoi/showPage
```

Nếu cURL work → Chắc chắn là CORS issue

---

## 📝 Ví dụ thực tế

### Trường hợp của bạn:

**API:**
```
GET https://admin.vett.edu.vn/api/DSDeThiCauHoi/showPage?IdTrangThai=&active=true&dangThuc=&iPageIndex=1&iPageSize=10&idDeThi=6e02668f-7ddc-4f50-876a-1d724eedc993&sOrder=x.ThuTu+desc&sSearch=
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Giải pháp:**

1. **Chọn CORS Proxy:** AllOrigins
2. **Method:** GET
3. **URL:** Paste URL trên
4. **Headers:** Paste headers trên
5. **Click Send Request**

App sẽ tự động gửi qua:
```
https://api.allorigins.win/raw?url=https://admin.vett.edu.vn/api/DSDeThiCauHoi/showPage?...
```

---

## ⚠️ Lưu ý bảo mật

### Khi dùng Public Proxy:

1. **Không gửi sensitive data** qua public proxy
2. **Token có thể bị log** bởi proxy server
3. **Chỉ dùng cho testing**, không dùng production
4. **Rotate token** thường xuyên

### Best Practice:

✅ Dùng proxy chỉ cho development
✅ Production phải có CORS headers từ backend
✅ Không commit token vào git
✅ Sử dụng environment variables

---

## 🆘 Troubleshooting

### Proxy không work?

**Thử các bước sau:**

1. **Đổi proxy khác** từ dropdown
2. **Check URL** có đúng format không
3. **Check headers** có đúng JSON không
4. **Test trực tiếp** trên Postman trước
5. **Check console** xem có error gì

### Vẫn bị lỗi?

**Liên hệ:**
- GitHub Issues
- Email: contact@yourdomain.com

---

## 📚 Tài liệu tham khảo

- [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [CORS Anywhere GitHub](https://github.com/Rob--W/cors-anywhere)
- [AllOrigins](https://allorigins.win/)
- [CORS.SH](https://cors.sh/)

---

Made with ❤️ by Word to JSON Converter Team

