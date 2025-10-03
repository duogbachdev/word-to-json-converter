# 🧪 Testing Checklist - Word to JSON Converter

## 📋 Pre-deployment Testing

Sử dụng checklist này trước khi deploy hoặc merge PR.

---

## 🚀 Startup & Build

- [ ] `npm install` chạy thành công không có lỗi
- [ ] `npm start` khởi động dev server thành công
- [ ] Không có console errors khi load trang
- [ ] Không có console warnings quan trọng
- [ ] `npm run build` build production thành công
- [ ] Build size hợp lý (< 2MB)

---

## 🎨 UI/UX Testing

### Header
- [ ] Logo và title hiển thị đúng
- [ ] Description text hiển thị đầy đủ
- [ ] Responsive trên mobile

### Batch Import Section
- [ ] File input hiển thị đúng
- [ ] Có thể chọn file .docx
- [ ] Reject file không phải .docx
- [ ] Progress indicator khi đang xử lý
- [ ] Success message sau khi import
- [ ] Hiển thị số câu hỏi đã import
- [ ] Hiển thị breakdown DangThuc 1 và 2

### Config Form
- [ ] Tất cả input fields hiển thị
- [ ] ThuTu có nút +/- hoạt động
- [ ] Dropdown DangThuc có 2 options
- [ ] Có thể nhập text vào các fields
- [ ] Placeholder text rõ ràng

### Manual Input
- [ ] Textarea hiển thị và có thể nhập
- [ ] Placeholder text hiển thị
- [ ] Nút "Convert" hoạt động
- [ ] Nút "Convert & Next" hoạt động
- [ ] Debug info hiển thị sau convert

### JSON Output
- [ ] Textarea hiển thị JSON
- [ ] JSON được format đẹp (indented)
- [ ] Nút Copy hoạt động
- [ ] Nút Download hoạt động
- [ ] Disabled state khi chưa có JSON

### API Sender
- [ ] Method dropdown có đủ options
- [ ] Endpoint input hoạt động
- [ ] Headers textarea hoạt động
- [ ] Nút Send Request hoạt động
- [ ] Loading state khi đang gửi
- [ ] Response hiển thị đúng

### Instructions
- [ ] Tất cả sections hiển thị
- [ ] Text dễ đọc
- [ ] Icons hiển thị đúng

---

## ⚙️ Functional Testing

### Batch Import Flow

**Test Case 1: Import file Word hợp lệ**
- [ ] Chọn file .docx có câu hỏi
- [ ] File được đọc thành công
- [ ] Số câu hỏi hiển thị đúng
- [ ] DangThuc được detect đúng
- [ ] Debug info hiển thị preview

**Test Case 2: Import file không hợp lệ**
- [ ] Chọn file .txt hoặc .pdf
- [ ] Hiển thị error message
- [ ] Không crash app

**Test Case 3: Convert All**
- [ ] Click "Convert All"
- [ ] JSON được generate
- [ ] Hiển thị câu đầu tiên
- [ ] Navigation buttons xuất hiện
- [ ] Debug info cập nhật

**Test Case 4: Navigation**
- [ ] Nút "Trước" disabled ở câu đầu
- [ ] Nút "Sau" disabled ở câu cuối
- [ ] Click "Trước" chuyển câu đúng
- [ ] Click "Sau" chuyển câu đúng
- [ ] Counter hiển thị đúng (X/Y)

**Test Case 5: View Array**
- [ ] Click "Xem Array"
- [ ] JSON hiển thị dạng array
- [ ] Warning message hiển thị
- [ ] Có thể quay lại view single

**Test Case 6: Clear All**
- [ ] Click "Clear All"
- [ ] Tất cả data bị xóa
- [ ] Form reset về trạng thái ban đầu
- [ ] Không có lỗi

### Manual Convert Flow

**Test Case 7: Convert DangThuc 1**
- [ ] Paste câu hỏi DangThuc 1
- [ ] Chọn DangThuc = 1
- [ ] Click Convert
- [ ] JSON đúng format
- [ ] DapAnA, B, C, D có giá trị

**Test Case 8: Convert DangThuc 2**
- [ ] Paste câu hỏi DangThuc 2
- [ ] Chọn DangThuc = 2
- [ ] Click Convert
- [ ] JSON đúng format
- [ ] DangThuc2 array có 4 items

**Test Case 9: Convert & Next**
- [ ] Click "Convert & Next"
- [ ] JSON được generate
- [ ] ThuTu tăng lên 1
- [ ] Input được clear
- [ ] Sẵn sàng cho câu tiếp theo

**Test Case 10: Config Fields**
- [ ] Nhập IdDeThi
- [ ] Nhập IdMonHoc
- [ ] Nhập IdTrangThai
- [ ] Convert
- [ ] JSON chứa đúng các IDs

### JSON Output Flow

**Test Case 11: Copy to Clipboard**
- [ ] Generate JSON
- [ ] Click Copy
- [ ] Alert hiển thị
- [ ] Paste vào notepad → JSON đúng

**Test Case 12: Download JSON**
- [ ] Generate JSON (single)
- [ ] Click Download
- [ ] File được download
- [ ] Tên file: `cau_X.json`
- [ ] Nội dung đúng

**Test Case 13: Download Array**
- [ ] Convert All
- [ ] View Array
- [ ] Click Download
- [ ] File được download
- [ ] Tên file: `all_questions.json`
- [ ] Nội dung là array

### API Integration Flow

**Test Case 14: GET Request**
- [ ] Chọn method = GET
- [ ] Nhập endpoint URL
- [ ] Nhập headers (với token)
- [ ] Click Send Request
- [ ] Response hiển thị
- [ ] Status code đúng
- [ ] Không có body error

**Test Case 15: POST Request**
- [ ] Generate JSON
- [ ] Chọn method = POST
- [ ] Nhập endpoint URL
- [ ] Nhập headers
- [ ] Click Send Request
- [ ] JSON được gửi trong body
- [ ] Response hiển thị

**Test Case 16: PUT/PATCH Request**
- [ ] Generate JSON
- [ ] Chọn method = PUT hoặc PATCH
- [ ] Nhập endpoint
- [ ] Click Send Request
- [ ] Body được gửi đúng

**Test Case 17: Invalid Headers**
- [ ] Nhập headers không phải JSON
- [ ] Click Send Request
- [ ] Error message hiển thị
- [ ] Không crash

**Test Case 18: Network Error**
- [ ] Nhập endpoint không tồn tại
- [ ] Click Send Request
- [ ] Error được handle
- [ ] Error message hiển thị

---

## 🌐 Browser Compatibility

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet

### Responsive Design
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 🔍 SEO Testing

### Meta Tags
- [ ] View page source
- [ ] Title tag đúng
- [ ] Description meta tag có
- [ ] Keywords meta tag có
- [ ] OG tags đầy đủ
- [ ] Twitter card tags có

### Structured Data
- [ ] JSON-LD script có trong HTML
- [ ] Valid JSON-LD format
- [ ] Test với Google Rich Results Test

### PWA
- [ ] manifest.json load được
- [ ] Icons có trong manifest
- [ ] Theme color áp dụng
- [ ] Can install as PWA

---

## ⚡ Performance Testing

- [ ] Initial load < 3 seconds
- [ ] File import < 2 seconds (file 100 câu)
- [ ] Convert All < 1 second (100 câu)
- [ ] Navigation instant (< 100ms)
- [ ] No memory leaks sau 10 phút sử dụng
- [ ] Smooth scrolling
- [ ] No layout shifts

---

## 🐛 Edge Cases

- [ ] File Word rỗng
- [ ] File Word chỉ có 1 câu
- [ ] File Word có 1000+ câu
- [ ] Câu hỏi không có đáp án
- [ ] Câu hỏi có ký tự đặc biệt
- [ ] Câu hỏi có emoji
- [ ] Câu hỏi có công thức toán
- [ ] Input rất dài (10000 chars)
- [ ] Spam click buttons
- [ ] Offline mode

---

## ✅ Final Checklist

- [ ] Tất cả tests passed
- [ ] No console errors
- [ ] No console warnings (critical)
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Git commit messages clear
- [ ] Ready for deployment

---

## 📝 Test Results

**Tester:** _______________  
**Date:** _______________  
**Version:** _______________  
**Browser:** _______________  
**OS:** _______________  

**Overall Result:** ⬜ PASS / ⬜ FAIL

**Notes:**
```
[Ghi chú về bugs hoặc issues phát hiện]
```

---

**Signature:** _______________

