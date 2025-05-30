import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('點擊按鈕來測試');
  const [currentTime, setCurrentTime] = useState(''); // 新增時間狀態

  const handleButtonClick = () => {
    setMessage('按鈕被點擊了！前端運作正常 🎉');
  };

  // 新增顯示時間的函數
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
        
        {/* 新增的按鈕和時間顯示 */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={showCurrentTime} style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            color: '#282c34'
          }}>
            顯示當前時間
          </button>
          {currentTime && (
            <p style={{ marginTop: '10px', fontSize: '18px', color: '#61dafb' }}>
              當前時間：{currentTime}
            </p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;