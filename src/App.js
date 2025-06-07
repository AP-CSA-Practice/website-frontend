import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('點擊按鈕來測試');
  const [currentTime, setCurrentTime] = useState('');
  
  // 新增後端連接相關狀態
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
              color: 'white'
            }}
          >
            {loading ? '連接中...' : '測試後端連接'}
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
        </div>
      </header>
    </div>
  );
}

export default App;
