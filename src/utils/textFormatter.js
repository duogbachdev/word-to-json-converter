/**
 * Format text to HTML with proper paragraph and list handling
 * @param {string} text - Raw text to format
 * @returns {string} - Formatted HTML string
 */
export const formatDeBaiToHtml = (text) => {
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

