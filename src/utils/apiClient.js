/**
 * Send JSON data to API endpoint
 * @param {string} endpoint - API endpoint URL
 * @param {string} method - HTTP method
 * @param {string} headersJson - Headers in JSON string format
 * @param {string} body - Request body (JSON string)
 * @returns {Promise<object>} - Response object
 */
export const sendToApi = async (endpoint, method, headersJson, body) => {
  let headers = {};
  try {
    headers = JSON.parse(headersJson);
  } catch (e) {
    throw new Error('Headers không đúng định dạng JSON!');
  }

  // Cấu hình request options
  const requestOptions = {
    method: method,
    headers: headers
  };

  // Chỉ thêm body nếu method không phải GET hoặc HEAD
  if (method !== 'GET' && method !== 'HEAD') {
    requestOptions.body = body;
  }

  const response = await fetch(endpoint, requestOptions);

  const responseText = await response.text();
  let responseData;
  try {
    responseData = JSON.parse(responseText);
  } catch {
    responseData = responseText;
  }

  return {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    data: responseData,
    ok: response.ok
  };
};

