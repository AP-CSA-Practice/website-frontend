import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('Click the button to test');
  
  // Backend connection related states
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // AP CSA question states
  const [question, setQuestion] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answerResult, setAnswerResult] = useState('');

  const handleButtonClick = () => {
    setMessage('Button clicked! Frontend is working properly 🎉');
  };

  // Test backend connection function with new API path
  const testBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/current-time');
      const data = await response.text();
      setBackendMessage(data);
    } catch (error) {
      setBackendMessage('Connection failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get random AP CSA question
  const getRandomQuestion = async () => {
    setLoadingQuestion(true);
    setSelectedAnswer('');
    setAnswerResult('');
    
    try {
      const response = await fetch('http://localhost:8080/api/questions/random');
      if (!response.ok) {
        throw new Error('Unable to fetch question');
      }
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error('Failed to get question:', error);
      setQuestion(null);
    } finally {
      setLoadingQuestion(false);
    }
  };
  
  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (question && answer === question.correctAnswer) {
      setAnswerResult('Correct!');
    } else {
      setAnswerResult('Incorrect! The correct answer is ' + question.correctAnswer);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: '#282c34', minHeight: '100vh', color: 'white' }}>
            <div style={{ 
        display: 'flex', 
        flexDirection: 'row',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
            }}>
        {/* Left side - Logo and buttons */}
            <div style={{ 
          flex: '1', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
            }}>
          <img src={logo} className="App-logo" alt="logo" style={{ height: '40vmin' }} />
          
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginBottom: '30px', color: '#61dafb' }}
                  >
            Learn React
          </a>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px', 
            width: '100%', 
            maxWidth: '300px' 
                }}>
            {/* Backend test button */}
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
              {loading ? 'Connecting...' : 'Test Backend Connection'}
            </button>
            
            {/* AP CSA question button */}
            <button 
              onClick={getRandomQuestion} 
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
              {loadingQuestion ? 'Loading...' : 'Random AP CSA Question'}
            </button>
    </div>
        </div>
        
        {/* Right side - Display content */}
        <div style={{ 
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px'
        }}>
          {/* Backend response display */}
          {backendMessage && (
            <div style={{ 
              marginBottom: '20px',
              padding: '15px', 
              backgroundColor: 'white',
              border: '2px solid #61dafb',
              borderRadius: '10px',
              color: '#282c34'
            }}>
              <strong>🚀 Backend Response:</strong> {backendMessage}
            </div>
          )}
          
          {/* AP CSA question display */}
          {question && (
            <div style={{ 
              padding: '20px', 
              backgroundColor: 'white',
              border: '2px solid #ff9800',
              borderRadius: '10px',
              color: '#282c34'
            }}>
              <h3 style={{ color: '#ff9800', marginTop: '0' }}>Question #{question.questionNumber}</h3>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>{question.questionText}</p>
              
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
                        ? (option === question.correctAnswer ? '#4CAF50' : '#f44336') 
                        : '#fff',
                      color: selectedAnswer === option ? 'white' : '#282c34',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: selectedAnswer ? 'default' : 'pointer'
                    }}
                  >
                    {option}. {question[`option${option}`]}
                  </button>
                ))}
              </div>
              
              {answerResult && (
                <p style={{ 
                  marginTop: '15px', 
                  fontWeight: 'bold',
                  color: answerResult.startsWith('Correct') ? '#4CAF50' : '#f44336'
                }}>
                  {answerResult}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
