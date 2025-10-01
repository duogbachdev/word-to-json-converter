import React, { useState } from 'react';
import { Copy, FileText, Download, AlertCircle, Plus, Minus, Upload, Trash2 } from 'lucide-react';
import * as mammoth from 'mammoth';

export default function WordToJsonConverter() {
  const [wordText, setWordText] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [thuTu, setThuTu] = useState(1);
  const [dangThuc, setDangThuc] = useState(1);
  const [idDeThi, setIdDeThi] = useState('7b3a818d-4b4e-4ca6-8e8f-0acd786cd0e7');
  const [idMonHoc, setIdMonHoc] = useState('dcb84ca0-0b97-4091-afab-6d6ca8ce1f44');
  const [idTrangThai, setIdTrangThai] = useState('0233ba05-9121-41a6-8d2b-325a4e8b7a41');
  const [allQuestions, setAllQuestions] = useState([]);
  const [batchMode, setBatchMode] = useState(false);

  const formatDeBaiToHtml = (text) => {
    text = text.replace(/\t/g, '            ');
    const lines = text.split('\n');
    let html = '';
    let inList = false;
    
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      
      const isNumberedItem = /^(\d+\.|\(\d+\))/.test(line);
      
      if (isNumberedItem) {
        if (!inList) {
          html += '<ol>\n';
          inList = true;
        }
        const content = line.replace(/^(\d+\.|\(\d+\))\s*/, '');
        html += '<li>' + content + '</li>\n';
      } else {
        if (inList) {
          html += '</ol>\n';
          inList = false;
        }
        html += '<p>' + line + '</p>\n';
      }
    }
    
    if (inList) {
      html += '</ol>\n';
    }
    
    return html.trim();
  };

  const parseQuestion = (text, questionNumber, detectedDangThuc) => {
    try {
      text = text.trim();
      const hasStars = text.includes('**');
      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      
      let deBai = '';
      let dangThuc1 = null;
      let dangThuc2 = [];
      
      if (detectedDangThuc === 1) {
        if (hasStars) {
          const firstAnswerIndex = text.search(/\*\*A\.\*\*/);
          if (firstAnswerIndex > 0) {
            let questionText = text.substring(0, firstAnswerIndex).trim();
            questionText = questionText.replace(/^\*\*Câu\s*\d+\.\*\*\s*/, '');
            deBai = formatDeBaiToHtml(questionText);
          }
          
          const answers = {};
          const letters = ['A', 'B', 'C', 'D'];
          
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            const nextLetter = letters[i + 1];
            const startMarker = '**' + letter + '.**';
            const startIndex = text.indexOf(startMarker);
            
            if (startIndex === -1) continue;
            
            let endIndex;
            if (nextLetter) {
              const nextMarker = '**' + nextLetter + '.**';
              endIndex = text.indexOf(nextMarker);
              if (endIndex === -1) endIndex = text.length;
            } else {
              endIndex = text.length;
            }
            
            const answerText = text.substring(startIndex + startMarker.length, endIndex).trim();
            answers['DapAn' + letter] = '<p>' + answerText + '</p>';
          }
          
          dangThuc1 = {
            IdCapDo: null,
            DapAnA: answers.DapAnA || null,
            DapAnB: answers.DapAnB || null,
            DapAnC: answers.DapAnC || null,
            DapAnD: answers.DapAnD || null,
            DapAn: null
          };
        } else {
          const firstAnswerMatch = text.match(/\n\s*A[\.\)]/);
          if (firstAnswerMatch) {
            const firstAnswerIndex = firstAnswerMatch.index;
            let questionText = text.substring(0, firstAnswerIndex).trim();
            questionText = questionText.replace(/^Câu\s*\d+\.\s*/, '');
            deBai = formatDeBaiToHtml(questionText);
          }
          
          const answers = {};
          const letters = ['A', 'B', 'C', 'D'];
          
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            const nextLetter = letters[i + 1];
            const startRegex = new RegExp('\\n\\s*' + letter + '[\\.\\)]\\s*', 'g');
            const startMatch = startRegex.exec(text);
            
            if (!startMatch) continue;
            
            const startIndex = startMatch.index + startMatch[0].length;
            let endIndex;
            if (nextLetter) {
              const nextRegex = new RegExp('\\n\\s*' + nextLetter + '[\\.\\)]\\s*');
              const nextMatch = text.substring(startIndex).match(nextRegex);
              if (nextMatch) {
                endIndex = startIndex + nextMatch.index;
              } else {
                endIndex = text.length;
              }
            } else {
              endIndex = text.length;
            }
            
            const answerText = text.substring(startIndex, endIndex).trim();
            answers['DapAn' + letter] = '<p>' + answerText + '</p>';
          }
          
          dangThuc1 = {
            IdCapDo: null,
            DapAnA: answers.DapAnA || null,
            DapAnB: answers.DapAnB || null,
            DapAnC: answers.DapAnC || null,
            DapAnD: answers.DapAnD || null,
            DapAn: null
          };
        }
      } else if (detectedDangThuc === 2) {
        if (hasStars) {
          const firstOptionIndex = text.search(/\*\*a\)\*\*/);
          if (firstOptionIndex > 0) {
            let questionText = text.substring(0, firstOptionIndex).trim();
            questionText = questionText.replace(/^\*\*Câu\s*\d+\.\*\*\s*/, '');
            deBai = formatDeBaiToHtml(questionText);
          }
          
          const letters = ['a', 'b', 'c', 'd'];
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            const nextLetter = letters[i + 1];
            const startMarker = '**' + letter + ')**';
            const startIndex = text.indexOf(startMarker);
            
            if (startIndex === -1) continue;
            
            let endIndex;
            if (nextLetter) {
              const nextMarker = '**' + nextLetter + ')**';
              endIndex = text.indexOf(nextMarker);
              if (endIndex === -1) endIndex = text.length;
            } else {
              endIndex = text.length;
            }
            
            const optionText = text.substring(startIndex + startMarker.length, endIndex).trim();
            dangThuc2.push({
              IdCapDo: null,
              LenhHoi: '<p>' + optionText + '</p>',
              DapAn: null,
              ThuTu: letter
            });
          }
        } else {
          const firstOptionMatch = text.match(/\n\s*a\)/);
          if (firstOptionMatch) {
            const firstOptionIndex = firstOptionMatch.index;
            let questionText = text.substring(0, firstOptionIndex).trim();
            questionText = questionText.replace(/^Câu\s*\d+\.\s*/, '');
            deBai = formatDeBaiToHtml(questionText);
          }
          
          const letters = ['a', 'b', 'c', 'd'];
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            const nextLetter = letters[i + 1];
            const startRegex = new RegExp('\\n\\s*' + letter + '\\)\\s*', 'g');
            const startMatch = startRegex.exec(text);
            
            if (!startMatch) continue;
            
            const startIndex = startMatch.index + startMatch[0].length;
            let endIndex;
            if (nextLetter) {
              const nextRegex = new RegExp('\\n\\s*' + nextLetter + '\\)\\s*');
              const nextMatch = text.substring(startIndex).match(nextRegex);
              if (nextMatch) {
                endIndex = startIndex + nextMatch.index;
              } else {
                endIndex = text.length;
              }
            } else {
              endIndex = text.length;
            }
            
            const optionText = text.substring(startIndex, endIndex).trim();
            dangThuc2.push({
              IdCapDo: null,
              LenhHoi: '<p>' + optionText + '</p>',
              DapAn: null,
              ThuTu: letter
            });
          }
        }
      }

      const payload = {
        Active: true,
        NgayTao: new Date().toISOString().split('.')[0],
        IdDeThi: idDeThi,
        IdMonHoc: idMonHoc,
        DangThuc: detectedDangThuc,
        PhanDongDapAn: 1,
        ThuTu: questionNumber,
        IdTrangThai: idTrangThai,
        DeBai: deBai,
        AnhMinhHoa: ""
      };

      if (detectedDangThuc === 1) {
        payload.DangThuc1 = dangThuc1;
      } else if (detectedDangThuc === 2) {
        payload.DangThuc2 = dangThuc2;
      }

      return payload;
    } catch (error) {
      return { error: error.message };
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;
      
      // DEBUG: Show first 500 chars
      console.log('Extracted text preview:', text.substring(0, 500));
      setDebugInfo('📝 Text preview:\n' + text.substring(0, 500) + '\n\n...(total: ' + text.length + ' chars)');
      
      // Split by "Câu" pattern - flexible regex to match: **Câu 1.** or **Câu 1. ** or Câu 1.
      const questionPattern = /(?:\*\*)?Câu\s+(\d+)\.(?:\s*\*\*)?/g;
      const matches = [...text.matchAll(questionPattern)];
      
      if (matches.length === 0) {
        alert('Không tìm thấy câu hỏi nào trong file!\n\nKiểm tra Debug Info để xem text được extract.');
        return;
      }

      const questions = [];
      for (let i = 0; i < matches.length; i++) {
        const startIdx = matches[i].index;
        const endIdx = i < matches.length - 1 ? matches[i + 1].index : text.length;
        const questionText = text.substring(startIdx, endIdx).trim();
        const questionNumber = parseInt(matches[i][1]);
        
        // Auto-detect DangThuc
        let detectedDangThuc = 1;
        // More robust detection - check for lowercase letter patterns
        if (questionText.match(/\n\s*[a-d]\)/)) {
          detectedDangThuc = 2;
        }
        
        questions.push({
          number: questionNumber,
          text: questionText,
          dangThuc: detectedDangThuc
        });
      }
      
      setAllQuestions(questions);
      setBatchMode(true);
      setDebugInfo(`✅ Import thành công ${questions.length} câu hỏi!\n\nDangThuc 1: ${questions.filter(q => q.dangThuc === 1).length} câu\nDangThuc 2: ${questions.filter(q => q.dangThuc === 2).length} câu`);
    } catch (error) {
      alert('Lỗi đọc file: ' + error.message);
      setDebugInfo('Lỗi: ' + error.message);
    }
  };  

  const convertAllToJson = () => {
    if (allQuestions.length === 0) {
      alert('Chưa import file nào!');
      return;
    }

    const allPayloads = allQuestions.map(q => 
      parseQuestion(q.text, q.number, q.dangThuc)
    );
    
    setJsonOutput(JSON.stringify(allPayloads, null, 2));
    setDebugInfo(`✅ Đã convert ${allPayloads.length} câu hỏi thành công!`);
  };

  const convertToJson = () => {
    try {
      let text = wordText.trim();
      const hasStars = text.includes('**');
      let debug = 'Raw length: ' + text.length + '\n';
      debug += 'Has ** markers: ' + hasStars + '\n';
      debug += 'DangThuc: ' + dangThuc;
      setDebugInfo(debug);
      
      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      let deBai = '';
      let dangThuc1 = null;
      let dangThuc2 = [];
      
      if (dangThuc === 1) {
        if (hasStars) {
          const firstAnswerIndex = text.search(/\*\*A\.\*\*/);
          if (firstAnswerIndex > 0) {
            let questionText = text.substring(0, firstAnswerIndex).trim();
            questionText = questionText.replace(/^\*\*Câu\s*\d+\.\*\*\s*/, '');
            deBai = formatDeBaiToHtml(questionText);
          }
          
          const answers = {};
          const letters = ['A', 'B', 'C', 'D'];
          
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            const nextLetter = letters[i + 1];
            const startMarker = '**' + letter + '.**';
            const startIndex = text.indexOf(startMarker);
            
            if (startIndex === -1) continue;
            
            let endIndex;
            if (nextLetter) {
              const nextMarker = '**' + nextLetter + '.**';
              endIndex = text.indexOf(nextMarker);
              if (endIndex === -1) endIndex = text.length;
            } else {
              endIndex = text.length;
            }
            
            const answerText = text.substring(startIndex + startMarker.length, endIndex).trim();
            answers['DapAn' + letter] = '<p>' + answerText + '</p>';
          }
          
          dangThuc1 = {
            IdCapDo: null,
            DapAnA: answers.DapAnA || null,
            DapAnB: answers.DapAnB || null,
            DapAnC: answers.DapAnC || null,
            DapAnD: answers.DapAnD || null,
            DapAn: null
          };
        } else {
          const firstAnswerMatch = text.match(/\n\s*A[\.\)]/);
          if (firstAnswerMatch) {
            const firstAnswerIndex = firstAnswerMatch.index;
            let questionText = text.substring(0, firstAnswerIndex).trim();
            questionText = questionText.replace(/^Câu\s*\d+\.\s*/, '');
            deBai = formatDeBaiToHtml(questionText);
          }
          
          const answers = {};
          const letters = ['A', 'B', 'C', 'D'];
          
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            const nextLetter = letters[i + 1];
            const startRegex = new RegExp('\\n\\s*' + letter + '[\\.\\)]\\s*', 'g');
            const startMatch = startRegex.exec(text);
            
            if (!startMatch) continue;
            
            const startIndex = startMatch.index + startMatch[0].length;
            let endIndex;
            if (nextLetter) {
              const nextRegex = new RegExp('\\n\\s*' + nextLetter + '[\\.\\)]\\s*');
              const nextMatch = text.substring(startIndex).match(nextRegex);
              if (nextMatch) {
                endIndex = startIndex + nextMatch.index;
              } else {
                endIndex = text.length;
              }
            } else {
              endIndex = text.length;
            }
            
            const answerText = text.substring(startIndex, endIndex).trim();
            answers['DapAn' + letter] = '<p>' + answerText + '</p>';
          }
          
          dangThuc1 = {
            IdCapDo: null,
            DapAnA: answers.DapAnA || null,
            DapAnB: answers.DapAnB || null,
            DapAnC: answers.DapAnC || null,
            DapAnD: answers.DapAnD || null,
            DapAn: null
          };
        }
      } else if (dangThuc === 2) {
        if (hasStars) {
          const firstOptionIndex = text.search(/\*\*a\)\*\*/);
          if (firstOptionIndex > 0) {
            let questionText = text.substring(0, firstOptionIndex).trim();
            questionText = questionText.replace(/^\*\*Câu\s*\d+\.\*\*\s*/, '');
            deBai = formatDeBaiToHtml(questionText);
          }
          
          const letters = ['a', 'b', 'c', 'd'];
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            const nextLetter = letters[i + 1];
            const startMarker = '**' + letter + ')**';
            const startIndex = text.indexOf(startMarker);
            
            if (startIndex === -1) continue;
            
            let endIndex;
            if (nextLetter) {
              const nextMarker = '**' + nextLetter + ')**';
              endIndex = text.indexOf(nextMarker);
              if (endIndex === -1) endIndex = text.length;
            } else {
              endIndex = text.length;
            }
            
            const optionText = text.substring(startIndex + startMarker.length, endIndex).trim();
            dangThuc2.push({
              IdCapDo: null,
              LenhHoi: '<p>' + optionText + '</p>',
              DapAn: null,
              ThuTu: letter
            });
          }
        } else {
          const firstOptionMatch = text.match(/\n\s*a\)/);
          if (firstOptionMatch) {
            const firstOptionIndex = firstOptionMatch.index;
            let questionText = text.substring(0, firstOptionIndex).trim();
            questionText = questionText.replace(/^Câu\s*\d+\.\s*/, '');
            deBai = formatDeBaiToHtml(questionText);
          }
          
          const letters = ['a', 'b', 'c', 'd'];
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            const nextLetter = letters[i + 1];
            const startRegex = new RegExp('\\n\\s*' + letter + '\\)\\s*', 'g');
            const startMatch = startRegex.exec(text);
            
            if (!startMatch) continue;
            
            const startIndex = startMatch.index + startMatch[0].length;
            let endIndex;
            if (nextLetter) {
              const nextRegex = new RegExp('\\n\\s*' + nextLetter + '\\)\\s*');
              const nextMatch = text.substring(startIndex).match(nextRegex);
              if (nextMatch) {
                endIndex = startIndex + nextMatch.index;
              } else {
                endIndex = text.length;
              }
            } else {
              endIndex = text.length;
            }
            
            const optionText = text.substring(startIndex, endIndex).trim();
            dangThuc2.push({
              IdCapDo: null,
              LenhHoi: '<p>' + optionText + '</p>',
              DapAn: null,
              ThuTu: letter
            });
          }
        }
      }

      const payload = {
        Active: true,
        NgayTao: new Date().toISOString().split('.')[0],
        IdDeThi: idDeThi,
        IdMonHoc: idMonHoc,
        DangThuc: dangThuc,
        PhanDongDapAn: 1,
        ThuTu: thuTu,
        IdTrangThai: idTrangThai,
        DeBai: deBai,
        AnhMinhHoa: ""
      };

      if (dangThuc === 1) {
        payload.DangThuc1 = dangThuc1;
      } else if (dangThuc === 2) {
        payload.DangThuc2 = dangThuc2;
      }

      setJsonOutput(JSON.stringify(payload, null, 2));
      
      let finalDebug = debug + '\n\n';
      finalDebug += 'Đề bài found: ' + (deBai ? 'YES' : 'NO') + '\n';
      finalDebug += 'Đề bài length: ' + deBai.length + '\n';
      if (dangThuc === 1) {
        finalDebug += 'DapAnA: ' + (dangThuc1?.DapAnA ? 'YES' : 'NO') + '\n';
        finalDebug += 'DapAnB: ' + (dangThuc1?.DapAnB ? 'YES' : 'NO') + '\n';
        finalDebug += 'DapAnC: ' + (dangThuc1?.DapAnC ? 'YES' : 'NO') + '\n';
        finalDebug += 'DapAnD: ' + (dangThuc1?.DapAnD ? 'YES' : 'NO');
      } else {
        finalDebug += 'Options found: ' + dangThuc2.length;
      }
      setDebugInfo(finalDebug);
      
    } catch (error) {
      setJsonOutput('Error: ' + error.message);
      setDebugInfo(debugInfo + '\n\nError: ' + error.stack);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    alert('Đã copy JSON vào clipboard!');
  };

  const downloadJson = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = batchMode ? 'all_questions.json' : 'cau_' + thuTu + '.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setWordText('');
    setJsonOutput('');
    setDebugInfo('');
    setAllQuestions([]);
    setBatchMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Word to API JSON Converter</h1>
          </div>
          
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
                onChange={handleFileUpload}
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
                <div className="flex gap-3">
                  <button
                    onClick={convertAllToJson}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
                  >
                    🎯 Convert All ({allQuestions.length} câu)
                  </button>
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                    Clear All
                  </button>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thứ tự câu hỏi (Manual mode)
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setThuTu(Math.max(1, thuTu - 1))}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={thuTu}
                  onChange={(e) => setThuTu(parseInt(e.target.value) || 1)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center font-bold"
                />
                <button
                  onClick={() => setThuTu(thuTu + 1)}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dạng thức (Manual mode)
              </label>
              <select
                value={dangThuc}
                onChange={(e) => setDangThuc(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value={1}>DangThuc 1 (A, B, C, D)</option>
                <option value={2}>DangThuc 2 (a, b, c, d)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IdDeThi
              </label>
              <input
                type="text"
                value={idDeThi}
                onChange={(e) => setIdDeThi(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IdMonHoc
              </label>
              <input
                type="text"
                value={idMonHoc}
                onChange={(e) => setIdMonHoc(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IdTrangThai
              </label>
              <input
                type="text"
                value={idTrangThai}
                onChange={(e) => setIdTrangThai(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Manual Input</h2>
            <textarea
              value={wordText}
              onChange={(e) => setWordText(e.target.value)}
              placeholder="Paste một câu hỏi để convert thủ công..."
              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm"
            />
            <button
              onClick={convertToJson}
              className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
            >
              Convert Single
            </button>
            
            {debugInfo && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs font-mono whitespace-pre-wrap">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-1" />
                  <div className="text-yellow-800">{debugInfo}</div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">JSON Output</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!jsonOutput}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={downloadJson}
                  disabled={!jsonOutput}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={jsonOutput}
              readOnly
              placeholder="JSON output sẽ xuất hiện ở đây..."
              className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}