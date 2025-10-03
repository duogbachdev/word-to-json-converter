import React, { useState } from 'react';
import Header from './components/Header';
import BatchImport from './components/BatchImport';
import ConfigForm from './components/ConfigForm';
import ManualInput from './components/ManualInput';
import JsonOutput from './components/JsonOutput';
import ApiSender from './components/ApiSender';
import Instructions from './components/Instructions';
import { parseQuestion } from './utils/questionParser';
import { extractTextFromWord, parseAllQuestions, downloadJson } from './utils/fileHandler';
import { sendToApi } from './utils/apiClient';
import { wrapWithProxy, DEFAULT_PROXY } from './utils/corsProxy';

const WordToJsonConverter = () => {
  // State management
  const [wordText, setWordText] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [thuTu, setThuTu] = useState(1);
  const [dangThuc, setDangThuc] = useState(1);
  const [idDeThi, setIdDeThi] = useState('');
  const [soId, setSoId] = useState('');
  const [idMonHoc, setIdMonHoc] = useState('');
  const [idTrangThai, setIdTrangThai] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [batchMode, setBatchMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allPayloads, setAllPayloads] = useState([]);

  // API Config
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiMethod, setApiMethod] = useState('POST');
  const [apiHeaders, setApiHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [apiResponse, setApiResponse] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [corsProxy, setCorsProxy] = useState(DEFAULT_PROXY); // Default: CORS Anywhere
  const [batchProgress, setBatchProgress] = useState(null);

  // Helper to get config object
  const getConfig = () => ({
    idDeThi,
    soId,
    idMonHoc,
    idTrangThai
  });

  // File upload handler
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await extractTextFromWord(file);

      console.log('Extracted text preview:', text.substring(0, 500));
      setDebugInfo('📝 Text preview:\n' + text.substring(0, 500) + '\n\n...(total: ' + text.length + ' chars)');

      const questions = parseAllQuestions(text);

      if (questions.length === 0) {
        alert('Không tìm thấy câu hỏi nào trong file!\n\nKiểm tra Debug Info để xem text được extract.');
        return;
      }

      setAllQuestions(questions);
      setBatchMode(true);
      setDebugInfo(`✅ Import thành công ${questions.length} câu hỏi!\n\nDangThuc 1: ${questions.filter(q => q.dangThuc === 1).length} câu\nDangThuc 2: ${questions.filter(q => q.dangThuc === 2).length} câu`);
    } catch (error) {
      alert('Lỗi đọc file: ' + error.message);
      setDebugInfo('Lỗi: ' + error.message);
    }
  };

  // Convert all questions to JSON
  const convertAllToJson = () => {
    if (allQuestions.length === 0) {
      alert('Chưa import file nào!');
      return;
    }

    const payloads = allQuestions.map(q =>
      parseQuestion(q.text, q.number, q.dangThuc, getConfig())
    );

    setAllPayloads(payloads);
    setCurrentQuestionIndex(0);
    setJsonOutput(JSON.stringify(payloads[0], null, 2));
    setDebugInfo(`✅ Đã convert ${payloads.length} câu hỏi!\n\n📋 Hiện đang hiển thị: Câu ${payloads[0].ThuTu}/${payloads.length}\n\nDùng nút ◀️ ▶️ để chuyển câu, hoặc click "Xem toàn bộ Array" để xem JSON array.`);
  };

  // Navigation handlers
  const showPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setJsonOutput(JSON.stringify(allPayloads[newIndex], null, 2));
      setDebugInfo(`📋 Câu ${allPayloads[newIndex].ThuTu}/${allPayloads.length}`);
    }
  };

  const showNextQuestion = () => {
    if (currentQuestionIndex < allPayloads.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setJsonOutput(JSON.stringify(allPayloads[newIndex], null, 2));
      setDebugInfo(`📋 Câu ${allPayloads[newIndex].ThuTu}/${allPayloads.length}`);
    }
  };

  const showAllAsArray = () => {
    if (allPayloads.length > 0) {
      setJsonOutput(JSON.stringify(allPayloads, null, 2));
      setDebugInfo(`📋 Hiển thị toàn bộ ${allPayloads.length} câu dưới dạng Array\n\n⚠️ Lưu ý: API không nhận array, chỉ dùng để xem hoặc lưu file!`);
    }
  };

  // Manual convert single question
  const convertToJson = () => {
    try {
      const text = wordText.trim();
      const hasStars = text.includes('**');
      let debug = 'Raw length: ' + text.length + '\n';
      debug += 'Has ** markers: ' + hasStars + '\n';
      debug += 'DangThuc: ' + dangThuc;
      setDebugInfo(debug);

      const payload = parseQuestion(text, thuTu, dangThuc, getConfig());

      setJsonOutput(JSON.stringify(payload, null, 2));

      let finalDebug = debug + '\n\n';
      finalDebug += 'Đề bài found: ' + (payload.DeBai ? 'YES' : 'NO') + '\n';
      finalDebug += 'Đề bài length: ' + (payload.DeBai?.length || 0) + '\n';
      if (dangThuc === 1) {
        finalDebug += 'DapAnA: ' + (payload.DangThuc1?.DapAnA ? 'YES' : 'NO') + '\n';
        finalDebug += 'DapAnB: ' + (payload.DangThuc1?.DapAnB ? 'YES' : 'NO') + '\n';
        finalDebug += 'DapAnC: ' + (payload.DangThuc1?.DapAnC ? 'YES' : 'NO') + '\n';
        finalDebug += 'DapAnD: ' + (payload.DangThuc1?.DapAnD ? 'YES' : 'NO');
      } else {
        finalDebug += 'Options found: ' + (payload.DangThuc2?.length || 0);
      }
      setDebugInfo(finalDebug);
      
    } catch (error) {
      setJsonOutput('Error: ' + error.message);
      setDebugInfo(debugInfo + '\n\nError: ' + error.stack);
    }
  };

  // Utility handlers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    alert('Đã copy JSON vào clipboard!');
  };

  const handleDownloadJson = () => {
    const filename = batchMode ? 'all_questions.json' : 'cau_' + thuTu + '.json';
    downloadJson(jsonOutput, filename);
  };

  const clearAll = () => {
    setWordText('');
    setJsonOutput('');
    setDebugInfo('');
    setAllQuestions([]);
    setAllPayloads([]);
    setBatchMode(false);
    setApiResponse('');
    setCurrentQuestionIndex(0);
  };

  const handleSendToApi = async () => {
    if (!jsonOutput) {
      alert('Chưa có JSON để gửi!');
      return;
    }

    if (!apiEndpoint) {
      alert('Vui lòng nhập API Endpoint!');
      return;
    }

    setIsSending(true);
    setApiResponse('');

    try {
      // Wrap URL với CORS proxy nếu được chọn
      const finalEndpoint = wrapWithProxy(apiEndpoint, corsProxy);

      // Log để debug
      if (corsProxy) {
        console.log('Original URL:', apiEndpoint);
        console.log('Proxied URL:', finalEndpoint);
      }

      const result = await sendToApi(finalEndpoint, apiMethod, apiHeaders, jsonOutput);
      setApiResponse(JSON.stringify(result, null, 2));

      if (result.ok) {
        alert('✅ Gửi API thành công!');
      } else {
        alert('⚠️ API trả về lỗi: ' + result.status);
      }
    } catch (error) {
      const errorResult = {
        error: error.message,
        type: error.name
      };
      setApiResponse(JSON.stringify(errorResult, null, 2));
      alert('❌ Lỗi khi gửi API: ' + error.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleConvertAndNext = () => {
    convertToJson();
    setTimeout(() => {
      setThuTu(thuTu + 1);
      setWordText('');
    }, 100);
  };

  const handleSendBatch = async () => {
    if (!allPayloads || allPayloads.length === 0) {
      alert('Chưa có câu hỏi nào để gửi!');
      return;
    }

    if (!apiEndpoint) {
      alert('Vui lòng nhập API Endpoint!');
      return;
    }

    const confirmSend = window.confirm(
      `Bạn có chắc muốn gửi ${allPayloads.length} câu hỏi?\n\n` +
      `Mỗi câu sẽ được gửi riêng lẻ (không phải array).\n` +
      `Quá trình này có thể mất vài giây.`
    );

    if (!confirmSend) return;

    setIsSending(true);
    setApiResponse('');
    setBatchProgress(null);

    const results = [];
    let successCount = 0;
    let errorCount = 0;
    const startTime = Date.now();

    try {
      // Wrap URL với CORS proxy nếu được chọn
      const finalEndpoint = wrapWithProxy(apiEndpoint, corsProxy);

      // Log để debug
      if (corsProxy) {
        console.log('Original URL:', apiEndpoint);
        console.log('Proxied URL:', finalEndpoint);
      }

      // Loop qua từng câu hỏi
      for (let i = 0; i < allPayloads.length; i++) {
        const payload = allPayloads[i];
        const payloadJson = JSON.stringify(payload);

        // Update progress
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const avgTimePerRequest = i > 0 ? elapsed / i : 0.3;
        const remaining = Math.ceil((allPayloads.length - i) * avgTimePerRequest);

        setBatchProgress({
          current: i,
          total: allPayloads.length,
          elapsed: elapsed,
          remaining: remaining
        });

        try {
          console.log(`Đang gửi câu ${i + 1}/${allPayloads.length}...`);

          const result = await sendToApi(finalEndpoint, apiMethod, apiHeaders, payloadJson);

          results.push({
            index: i + 1,
            thuTu: payload.ThuTu,
            status: result.status,
            ok: result.ok,
            message: result.ok ? 'Success' : 'Failed'
          });

          if (result.ok) {
            successCount++;
          } else {
            errorCount++;
          }

          // Delay nhỏ giữa các requests để tránh rate limit
          if (i < allPayloads.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }

        } catch (error) {
          errorCount++;
          results.push({
            index: i + 1,
            thuTu: payload.ThuTu,
            status: 'ERROR',
            ok: false,
            message: error.message
          });
        }
      }

      // Tính tổng thời gian
      const totalTime = Math.floor((Date.now() - startTime) / 1000);

      // Hiển thị kết quả
      const summary = {
        total: allPayloads.length,
        success: successCount,
        error: errorCount,
        totalTime: `${totalTime}s`,
        avgTimePerRequest: `${(totalTime / allPayloads.length).toFixed(2)}s`,
        results: results
      };

      setApiResponse(JSON.stringify(summary, null, 2));

      alert(
        `✅ Hoàn thành!\n\n` +
        `Tổng: ${allPayloads.length} câu\n` +
        `Thành công: ${successCount} câu\n` +
        `Lỗi: ${errorCount} câu\n` +
        `Thời gian: ${totalTime}s (TB: ${(totalTime / allPayloads.length).toFixed(2)}s/câu)\n\n` +
        `Xem chi tiết trong API Response bên dưới.`
      );

    } catch (error) {
      const errorResult = {
        error: error.message,
        type: error.name,
        results: results
      };
      setApiResponse(JSON.stringify(errorResult, null, 2));
      alert('❌ Lỗi khi gửi batch: ' + error.message);
    } finally {
      setIsSending(false);
      setBatchProgress(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <BatchImport
            allQuestions={allQuestions}
            allPayloads={allPayloads}
            currentQuestionIndex={currentQuestionIndex}
            onFileUpload={handleFileUpload}
            onConvertAll={convertAllToJson}
            onClearAll={clearAll}
            onShowPrevious={showPreviousQuestion}
            onShowNext={showNextQuestion}
            onShowAllAsArray={showAllAsArray}
          />

          <ConfigForm
            thuTu={thuTu}
            dangThuc={dangThuc}
            idDeThi={idDeThi}
            soId={soId}
            idMonHoc={idMonHoc}
            idTrangThai={idTrangThai}
            onThuTuChange={setThuTu}
            onDangThucChange={setDangThuc}
            onIdDeThiChange={setIdDeThi}
            onSoIdChange={setSoId}
            onIdMonHocChange={setIdMonHoc}
            onIdTrangThaiChange={setIdTrangThai}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ManualInput
            wordText={wordText}
            debugInfo={debugInfo}
            onTextChange={setWordText}
            onConvert={convertToJson}
            onConvertAndNext={handleConvertAndNext}
          />

          <div>
            <JsonOutput
              jsonOutput={jsonOutput}
              onCopy={copyToClipboard}
              onDownload={handleDownloadJson}
            />

            <ApiSender
              apiEndpoint={apiEndpoint}
              apiMethod={apiMethod}
              apiHeaders={apiHeaders}
              apiResponse={apiResponse}
              isSending={isSending}
              jsonOutput={jsonOutput}
              corsProxy={corsProxy}
              batchMode={batchMode}
              allPayloads={allPayloads}
              batchProgress={batchProgress}
              onEndpointChange={setApiEndpoint}
              onMethodChange={setApiMethod}
              onHeadersChange={setApiHeaders}
              onCorsProxyChange={setCorsProxy}
              onSend={handleSendToApi}
              onSendBatch={handleSendBatch}
            />
          </div>
        </div>

        <Instructions />
      </div>
    </div>
  );
};

export default WordToJsonConverter;