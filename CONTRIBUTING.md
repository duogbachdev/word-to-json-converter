# Contributing to Word to JSON Converter

Cảm ơn bạn đã quan tâm đến việc đóng góp cho dự án! 🎉

## 📋 Mục lục

- [Code of Conduct](#code-of-conduct)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Quy tắc coding](#quy-tắc-coding)
- [Component Guidelines](#component-guidelines)
- [Utility Functions](#utility-functions)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

Dự án này tuân theo code of conduct. Bằng việc tham gia, bạn đồng ý tuân theo các quy tắc này.

## Cấu trúc dự án

```
word-to-json-converter/
├── public/
│   ├── index.html          # HTML với SEO meta tags
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
├── src/
│   ├── components/         # React components (UI)
│   │   ├── Header.js
│   │   ├── BatchImport.js
│   │   ├── ConfigForm.js
│   │   ├── ManualInput.js
│   │   ├── JsonOutput.js
│   │   ├── ApiSender.js
│   │   └── Instructions.js
│   ├── utils/              # Business logic
│   │   ├── textFormatter.js
│   │   ├── questionParser.js
│   │   ├── fileHandler.js
│   │   └── apiClient.js
│   ├── App.js              # Main container
│   ├── App.css
│   └── index.js
├── README.md
├── CHANGELOG.md
└── package.json
```

## Quy tắc coding

### 1. React Components

**Luôn sử dụng arrow function (rafce pattern):**

```javascript
import React from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div>
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

**❌ KHÔNG dùng:**
```javascript
export default function MyComponent() { ... }
```

### 2. Props Destructuring

**✅ Đúng:**
```javascript
const MyComponent = ({ title, onSubmit, isLoading }) => {
  // ...
};
```

**❌ Sai:**
```javascript
const MyComponent = (props) => {
  const title = props.title;
  // ...
};
```

### 3. Component Naming

- Component files: PascalCase (`Header.js`, `BatchImport.js`)
- Utility files: camelCase (`textFormatter.js`, `apiClient.js`)
- Component names phải match với file name

### 4. Import Order

```javascript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { Upload, Trash2 } from 'lucide-react';

// 3. Local imports - Components
import Header from './components/Header';

// 4. Local imports - Utils
import { parseQuestion } from './utils/questionParser';

// 5. Styles
import './App.css';
```

### 5. Function Documentation

Tất cả utility functions phải có JSDoc:

```javascript
/**
 * Parse a question and convert to JSON payload
 * @param {string} text - Question text
 * @param {number} questionNumber - Question number
 * @param {number} detectedDangThuc - Question type (1 or 2)
 * @param {object} config - Configuration object with IDs
 * @returns {object} - JSON payload
 */
export const parseQuestion = (text, questionNumber, detectedDangThuc, config) => {
  // Implementation
};
```

## Component Guidelines

### Single Responsibility

Mỗi component chỉ nên làm **một việc**:

- `Header.js` - Chỉ hiển thị header
- `BatchImport.js` - Chỉ xử lý batch import UI
- `ConfigForm.js` - Chỉ hiển thị form cấu hình

### Props Interface

Đặt tên props rõ ràng và consistent:

```javascript
// Event handlers: on + Action
onFileUpload, onConvert, onClearAll

// Data: descriptive names
allQuestions, jsonOutput, debugInfo

// Flags: is/has + Adjective
isLoading, isSending, hasError
```

### State Management

- State nên được đặt ở component cao nhất cần dùng nó
- Truyền callbacks xuống children thay vì lift state lên
- Không duplicate state

## Utility Functions

### Pure Functions

Utility functions phải là **pure functions**:

```javascript
// ✅ Pure function
export const formatDeBaiToHtml = (text) => {
  // Không modify input
  // Không side effects
  // Luôn return cùng output với cùng input
  return formattedText;
};

// ❌ Impure function
let cache = {};
export const formatDeBaiToHtml = (text) => {
  cache[text] = result; // Side effect!
  return result;
};
```

### Error Handling

```javascript
export const parseQuestion = (text, questionNumber, detectedDangThuc, config) => {
  try {
    // Logic
    return payload;
  } catch (error) {
    return { error: error.message };
  }
};
```

## Testing

### Manual Testing Checklist

Trước khi submit PR, test các tính năng sau:

- [ ] Batch import file Word (.docx)
- [ ] Auto-detect DangThuc 1 và 2
- [ ] Manual convert từng câu
- [ ] Navigation giữa các câu (◀️ ▶️)
- [ ] Copy JSON to clipboard
- [ ] Download JSON file
- [ ] API integration với GET method
- [ ] API integration với POST method
- [ ] Clear all functionality
- [ ] Debug info hiển thị đúng

### Browser Testing

Test trên các browsers:

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

## Pull Request Process

### 1. Fork và Clone

```bash
git clone https://github.com/yourusername/word-to-json-converter.git
cd word-to-json-converter
npm install
```

### 2. Tạo Branch

```bash
git checkout -b feature/your-feature-name
# hoặc
git checkout -b fix/bug-description
```

### 3. Commit Messages

Sử dụng conventional commits:

```
feat: add new feature
fix: fix bug description
docs: update documentation
style: format code
refactor: refactor component
test: add tests
chore: update dependencies
```

Ví dụ:
```
feat: add export to Excel functionality
fix: resolve GET method body error
docs: update README with new examples
refactor: split ApiSender into smaller components
```

### 4. Code Review Checklist

Trước khi submit PR:

- [ ] Code follows rafce pattern
- [ ] No console.log() left in code
- [ ] All functions have JSDoc comments
- [ ] No unused imports
- [ ] No unused variables
- [ ] Proper error handling
- [ ] Manual testing completed
- [ ] README updated (if needed)
- [ ] CHANGELOG updated

### 5. Submit PR

1. Push branch lên GitHub
2. Tạo Pull Request
3. Điền template PR:
   - Mô tả thay đổi
   - Screenshots (nếu có UI changes)
   - Testing checklist
   - Breaking changes (nếu có)

## Questions?

Nếu có câu hỏi, hãy:
- Tạo issue trên GitHub
- Email: contact@yourdomain.com

---

Cảm ơn bạn đã đóng góp! 🙏

