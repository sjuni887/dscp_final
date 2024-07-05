import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'How may I assist you today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.1);
  const [topP, setTopP] = useState(0.9);
  const [maxLength, setMaxLength] = useState(512);
  const [replicateApiToken, setReplicateApiToken] = useState(localStorage.getItem('REPLICATE_API_TOKEN') || '');

  useEffect(() => {
    if (replicateApiToken) {
      localStorage.setItem('REPLICATE_API_TOKEN', replicateApiToken);
    }
  }, [replicateApiToken]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input.trim() || !replicateApiToken) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      setLoading(true);
      console.log('Sending request to backend...');
      const response = await axios.post(
        'http://localhost:5000/llm_response',
        {
          prompt: generatePrompt(newMessages),
          temperature: temperature,
          top_p: topP,
          max_length: maxLength,
          replicate_api_token: replicateApiToken,
        }
      );

      console.log('Response from backend:', response.data);

      if (response.data.output) {
        const fullResponse = response.data.output.join('');
        setMessages([...newMessages, { role: 'assistant', content: fullResponse }]);
      } else {
        console.error('No output from the API');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePrompt = (msgs) => {
    let stringDialogue = "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as 'Assistant'.";
    msgs.forEach((msg) => {
      if (msg.role === 'user') {
        stringDialogue += `User: ${msg.content}\n\n`;
      } else {
        stringDialogue += `Assistant: ${msg.content}\n\n`;
      }
    });
    return stringDialogue;
  };

  const clearChatHistory = () => {
    setMessages([{ role: 'assistant', content: 'How may I assist you today?' }]);
  };

  const handleSaveToken = () => {
    console.log("Saving token:", replicateApiToken);
    localStorage.setItem('REPLICATE_API_TOKEN', replicateApiToken);
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h2>Configurations</h2>
        <div>
          <label>Temperature</label>
          <input type="number" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} step="0.01" min="0" max="1" />
        </div>
        <div>
          <label>Top P</label>
          <input type="number" value={topP} onChange={(e) => setTopP(parseFloat(e.target.value))} step="0.01" min="0" max="1" />
        </div>
        <div>
          <label>Max Length</label>
          <input type="number" value={maxLength} onChange={(e) => setMaxLength(parseInt(e.target.value))} step="1" min="1" max="512" />
        </div>
        <div>
          <label>Replicate API Token</label>
          <input
            type="password"
            value={replicateApiToken}
            onChange={(e) => setReplicateApiToken(e.target.value)}
            placeholder="Enter Replicate API token"
          />
          <button onClick={handleSaveToken}>Save Token</button>
        </div>
        <button onClick={clearChatHistory}>Clear Chat History</button>
      </div>
      <div className="chat-main">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
          {loading && <div className="chat-message assistant">Thinking...</div>}
        </div>
        <div className="chat-input">
          <input type="text" value={input} onChange={handleInputChange} placeholder="Type your message..." disabled={loading} />
          <button onClick={handleSend} disabled={loading}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
