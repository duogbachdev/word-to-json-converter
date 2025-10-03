import { formatDeBaiToHtml } from './textFormatter';

/**
 * Parse DangThuc 1 question (A, B, C, D format)
 * @param {string} text - Question text
 * @param {boolean} hasStars - Whether text has ** markers
 * @returns {object} - Parsed question data
 */
const parseDangThuc1 = (text, hasStars) => {
  let deBai = '';
  
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
    
    return {
      deBai,
      dangThuc1: {
        IdCapDo: null,
        DapAnA: answers.DapAnA || null,
        DapAnB: answers.DapAnB || null,
        DapAnC: answers.DapAnC || null,
        DapAnD: answers.DapAnD || null,
        Diem: 0.25,
        DapAn: null
      }
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
    
    return {
      deBai,
      dangThuc1: {
        IdCapDo: null,
        DapAnA: answers.DapAnA || null,
        DapAnB: answers.DapAnB || null,
        DapAnC: answers.DapAnC || null,
        DapAnD: answers.DapAnD || null,
        Diem: 0.25,
        DapAn: null
      }
    };
  }
};

/**
 * Parse DangThuc 2 question (a, b, c, d format)
 * @param {string} text - Question text
 * @param {boolean} hasStars - Whether text has ** markers
 * @returns {object} - Parsed question data
 */
const parseDangThuc2 = (text, hasStars) => {
  let deBai = '';
  const dangThuc2 = [];
  
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
  
  return { deBai, dangThuc2 };
};

/**
 * Parse a question and convert to JSON payload
 * @param {string} text - Question text
 * @param {number} questionNumber - Question number
 * @param {number} detectedDangThuc - Question type (1 or 2)
 * @param {object} config - Configuration object with IDs
 * @returns {object} - JSON payload
 */
export const parseQuestion = (text, questionNumber, detectedDangThuc, config) => {
  try {
    text = text.trim();
    const hasStars = text.includes('**');
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    let deBai = '';
    let dangThuc1 = null;
    let dangThuc2 = [];
    
    if (detectedDangThuc === 1) {
      const result = parseDangThuc1(text, hasStars);
      deBai = result.deBai;
      dangThuc1 = result.dangThuc1;
    } else if (detectedDangThuc === 2) {
      const result = parseDangThuc2(text, hasStars);
      deBai = result.deBai;
      dangThuc2 = result.dangThuc2;
    }

    const payload = {
      Active: true,
      NgayTao: new Date().toISOString().split('.')[0],
      IdDeThi: config.idDeThi,
      SoId: config.soId,
      IdMonHoc: config.idMonHoc,
      DangThuc: detectedDangThuc,
      PhanDongDapAn: 1,
      ThuTu: questionNumber,
      IdTrangThai: config.idTrangThai,
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

