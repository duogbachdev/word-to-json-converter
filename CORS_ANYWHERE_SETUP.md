# 🛡️ CORS Anywhere Setup - Hướng dẫn nhanh

## ⚡ Setup trong 3 bước (1 lần duy nhất)

### Bước 1: Mở link demo
Mở link này trong tab mới:
```
https://cors-anywhere.herokuapp.com/corsdemo
```

### Bước 2: Request access
Click vào nút màu đỏ:
```
"Request temporary access to the demo server"
```

### Bước 3: Xác nhận
Thấy message:
```
✅ "You now have temporary access to the demo server"
```

**Done!** Quay lại app và sử dụng bình thường.

---

## 📝 Chi tiết

### Access có hiệu lực bao lâu?
- **Vài giờ** (thường là 2-4 giờ)
- Hết hạn thì làm lại 3 bước trên (rất nhanh)

### Tại sao cần request access?
- CORS Anywhere là **public demo server**
- Để tránh abuse, họ yêu cầu request access
- Chỉ cần làm 1 lần, sau đó dùng thoải mái trong vài giờ

### Có cách nào không cần request access?
Có 3 cách:

#### 1. Tự host CORS Anywhere (Khuyên dùng cho production)
```bash
# Clone repo
git clone https://github.com/Rob--W/cors-anywhere.git
cd cors-anywhere

# Install
npm install

# Run
npm start
```

Server sẽ chạy tại `http://localhost:8080`

Sau đó trong app, chọn **Custom Proxy** và nhập:
```
http://localhost:8080/
```

#### 2. Deploy lên Heroku (Free)
```bash
# Clone repo
git clone https://github.com/Rob--W/cors-anywhere.git
cd cors-anywhere

# Login Heroku
heroku login

# Create app
heroku create your-cors-proxy

# Deploy
git push heroku master
```

URL của bạn: `https://your-cors-proxy.herokuapp.com/`

#### 3. Dùng proxy khác
Trong app, chọn:
- **AllOrigins** - Không cần setup
- **CORS.SH** - 50 requests/hour free
- **ThingProxy** - Không cần setup

---

## ❓ Troubleshooting

### Vẫn bị lỗi CORS sau khi request access?

**Check list:**

1. **Đã request access chưa?**
   - Mở https://cors-anywhere.herokuapp.com/corsdemo
   - Thấy message "You now have temporary access"?

2. **Access đã hết hạn?**
   - Request lại (chỉ mất 5 giây)

3. **CORS Anywhere có đang được chọn?**
   - Check dropdown CORS Proxy
   - Phải thấy "CORS Anywhere (Heroku) - KHUYÊN DÙNG"

4. **URL có đúng format?**
   - Phải bắt đầu bằng `http://` hoặc `https://`
   - Ví dụ: `https://admin.vett.edu.vn/api/...`

5. **Headers có đúng JSON?**
   - Check syntax JSON
   - Dùng tool: https://jsonlint.com/

### Vẫn không work?

**Thử các bước sau:**

1. **Clear browser cache**
   - Ctrl + Shift + Delete
   - Clear cache và cookies

2. **Thử proxy khác**
   - Chọn **AllOrigins** từ dropdown
   - Hoặc **ThingProxy**

3. **Test trên Postman trước**
   - Đảm bảo API endpoint đúng
   - Token còn hạn

4. **Check console**
   - F12 → Console tab
   - Xem có error gì không

---

## 🔒 Bảo mật

### Lưu ý khi dùng public proxy:

⚠️ **Không gửi sensitive data** qua public proxy
⚠️ **Token có thể bị log** bởi proxy server
⚠️ **Chỉ dùng cho development/testing**
⚠️ **Production phải tự host hoặc fix CORS ở backend**

### Best practices:

✅ Dùng proxy chỉ cho development
✅ Production yêu cầu backend thêm CORS headers
✅ Không commit token vào git
✅ Rotate token thường xuyên
✅ Tự host proxy nếu cần dùng lâu dài

---

## 📊 So sánh các options

| Option | Setup | Stable | Speed | Limit | Production |
|--------|-------|--------|-------|-------|------------|
| **CORS Anywhere (Demo)** | 1 lần | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Vài giờ | ❌ |
| **Tự host CORS Anywhere** | 5 phút | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Unlimited | ✅ |
| **AllOrigins** | Không | ⭐⭐⭐ | ⭐⭐ | Unlimited | ❌ |
| **CORS.SH** | Không | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 50/hour | ❌ |
| **Backend CORS** | Backend | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Unlimited | ✅ |

---

## 🎯 Khuyến nghị

### Development (Ngay bây giờ)
👉 **Dùng CORS Anywhere Demo**
- Request access 1 lần
- Dùng thoải mái vài giờ
- Hết hạn thì request lại (5 giây)

### Testing (Dài hạn)
👉 **Tự host CORS Anywhere**
- Deploy lên Heroku (free)
- Hoặc chạy local
- Không giới hạn

### Production
👉 **Yêu cầu backend thêm CORS headers**
- Best practice
- Secure nhất
- Performance tốt nhất

---

## 📚 Links hữu ích

- **CORS Anywhere Demo:** https://cors-anywhere.herokuapp.com/corsdemo
- **CORS Anywhere GitHub:** https://github.com/Rob--W/cors-anywhere
- **Deploy to Heroku:** https://devcenter.heroku.com/articles/git
- **MDN CORS Guide:** https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

## 🆘 Cần giúp đỡ?

- 📧 Email: contact@yourdomain.com
- 🐛 GitHub Issues: [Create Issue](https://github.com/yourusername/word-to-json-converter/issues)
- 📖 Full CORS Guide: [CORS_GUIDE.md](CORS_GUIDE.md)

---

**TL;DR:**
1. Mở: https://cors-anywhere.herokuapp.com/corsdemo
2. Click "Request temporary access"
3. Done! Dùng app bình thường

Made with ❤️ by Word to JSON Converter Team

