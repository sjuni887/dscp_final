// src/components/Result.js
import React from 'react';

function Result({ result }) {
    return (
        <div>
            <h2>Prediction Result</h2>
            <div style={{ border: '2px solid', borderColor: result.death_prediction === 1 ? 'red' : 'green', padding: '10px', borderRadius: '10px' }}>
                <h3 style={{ color: result.death_prediction === 1 ? 'red' : 'green' }}>
                    {result.death_prediction === 1 ? 'Death expectancy in 30 days is likely' : 'Death expectancy in 30 days is unlikely'}
                </h3>
                <p><strong>Probability:</strong> {result.death_probability}</p>
            </div>
            <div style={{ border: '2px solid', borderColor: result.icu_prediction === 1 ? 'red' : 'green', padding: '10px', borderRadius: '10px', marginTop: '20px' }}>
                <h3 style={{ color: result.icu_prediction === 1 ? 'red' : 'green' }}>
                    {result.icu_prediction === 1 ? 'ICU admission is likely' : 'ICU admission is unlikely'}
                </h3>
                <p><strong>Probability:</strong> {result.icu_probability}</p>
            </div>
        </div>
    );
}

export default Result;
