// src/App.js
import React, { useState } from 'react';
import Form from './components/Form';
import Result from './components/Result';
import PowerBIReport from './components/PowerBIReport';
import './App.css';

function App() {
    const [result, setResult] = useState(null);

    const handleFormSubmit = async (formData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h1>Healthcare Dashboard</h1>
            <Form onSubmit={handleFormSubmit} />
            {result && <Result result={result} />}
            <PowerBIReport />
        </div>
    );
}

export default App;
