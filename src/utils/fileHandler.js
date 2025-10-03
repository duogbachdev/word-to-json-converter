import * as mammoth from 'mammoth';

/**
 * Extract text from Word document
 * @param {File} file - Word file to process
 * @returns {Promise<string>} - Extracted text
 */
export const extractTextFromWord = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

/**
 * Parse all questions from extracted text
 * @param {string} text - Extracted text from Word
 * @returns {Array} - Array of question objects
 */
export const parseAllQuestions = (text) => {
  const questionPattern = /(?:\*\*)?Câu\s+(\d+)\.(?:\s*\*\*)?/g;
  const matches = [...text.matchAll(questionPattern)];
  
  if (matches.length === 0) {
    return [];
  }

  const questions = [];
  for (let i = 0; i < matches.length; i++) {
    const startIdx = matches[i].index;
    const endIdx = i < matches.length - 1 ? matches[i + 1].index : text.length;
    const questionText = text.substring(startIdx, endIdx).trim();
    const questionNumber = parseInt(matches[i][1]);
    
    // Auto-detect DangThuc
    let detectedDangThuc = 1;
    if (questionText.match(/\n\s*[a-d]\)/)) {
      detectedDangThuc = 2;
    }
    
    questions.push({
      number: questionNumber,
      text: questionText,
      dangThuc: detectedDangThuc
    });
  }
  
  return questions;
};

/**
 * Download JSON as file
 * @param {string} jsonString - JSON string to download
 * @param {string} filename - Name of the file
 */
export const downloadJson = (jsonString, filename) => {
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

