import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('點擊按鈕來測試');
  const [currentTime, setCurrentTime] = useState('');
  
  // 新增後端連接相關狀態
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 新增數學題目相關狀態
  const [mathQuestion, setMathQuestion] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answerResult, setAnswerResult] = useState('');

  const handleButtonClick = () => {
    setMessage('按鈕被點擊了！前端運作正常 🎉');
  };

  const showCurrentTime = () => {
    const now = new Date();
    const timeString = now.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    setCurrentTime(timeString);
  };

  // 新增測試後端連接的函數
  const testBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/hello');
      const data = await response.text();
      setBackendMessage(data);
    } catch (error) {
      setBackendMessage('連接失敗: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 獲取隨機數學題目
  const getRandomMathQuestion = async () => {
    setLoadingQuestion(true);
    setSelectedAnswer('');
    setAnswerResult('');
    
    try {
      const response = await fetch('http://localhost:8080/api/math/random');
      if (!response.ok) {
        throw new Error('無法獲取題目');
      }
      const data = await response.json();
      setMathQuestion(data);
    } catch (error) {
      console.error('獲取題目失敗:', error);
      setMathQuestion(null);
    } finally {
      setLoadingQuestion(false);
    }
  };
  
  // 處理答案選擇
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (mathQuestion && answer === mathQuestion.correctAnswer) {
      setAnswerResult('正確！');
    } else {
      setAnswerResult('錯誤！正確答案是 ' + mathQuestion.correctAnswer);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
        {/* 原有的時間顯示功能 */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={showCurrentTime} style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            color: '#282c34',
            marginRight: '10px'
          }}>
            顯示當前時間
          </button>
          
          {/* 新增的後端測試按鈕 */}
          <button 
            onClick={testBackend} 
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: loading ? '#ccc' : '#4CAF50',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              color: 'white',
              marginRight: '10px'
            }}
          >
            {loading ? '連接中...' : '測試後端連接'}
          </button>
          
          {/* 新增獲取隨機數學題目按鈕 */}
          <button 
            onClick={getRandomMathQuestion} 
            disabled={loadingQuestion}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: loadingQuestion ? '#ccc' : '#ff9800',
              border: 'none',
              borderRadius: '5px',
              cursor: loadingQuestion ? 'not-allowed' : 'pointer',
              color: 'white'
            }}
          >
            {loadingQuestion ? '獲取中...' : '隨機數學題目'}
          </button>
          {/* 時間顯示 */}
          {currentTime && (
            <p style={{ marginTop: '10px', fontSize: '18px', color: '#61dafb' }}>
              當前時間：{currentTime}
            </p>
          )}
          
          {/* 後端回應顯示 */}
          {backendMessage && (
            <div style={{ 
              marginTop: '15px', 
              padding: '15px', 
              backgroundColor: '#f8f9fa',
              border: '2px solid #61dafb',
              borderRadius: '10px',
              color: '#282c34'
            }}>
              <strong>🚀 後端回應：</strong> {backendMessage}
    </div>
          )}
          
          {/* 數學題目顯示 */}
          {mathQuestion && (
            <div style={{ 
              marginTop: '20px', 
              padding: '20px', 
              backgroundColor: '#f8f9fa',
              border: '2px solid #ff9800',
              borderRadius: '10px',
              color: '#282c34',
              width: '80%',
              maxWidth: '600px',
              textAlign: 'left'
            }}>
              <h3 style={{ color: '#ff9800', marginTop: '0' }}>題目 #{mathQuestion.questionNumber}</h3>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>{mathQuestion.questionText}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['A', 'B', 'C', 'D'].map((option) => (
                  <button 
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={!!selectedAnswer}
                    style={{
                      padding: '10px',
                      textAlign: 'left',
                      backgroundColor: selectedAnswer === option 
                        ? (option === mathQuestion.correctAnswer ? '#4CAF50' : '#f44336') 
                        : '#fff',
                      color: selectedAnswer === option ? 'white' : '#282c34',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: selectedAnswer ? 'default' : 'pointer'
                    }}
                  >
                    {option}. {mathQuestion[`option${option}`]}
                  </button>
                ))}
              </div>
              
              {answerResult && (
                <p style={{ 
                  marginTop: '15px', 
                  fontWeight: 'bold',
                  color: answerResult.startsWith('正確') ? '#4CAF50' : '#f44336'
                }}>
                  {answerResult}
                </p>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
