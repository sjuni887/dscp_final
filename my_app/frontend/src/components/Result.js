// src/components/Result.js
import React from 'react';

const Result = ({ result }) => {
    return (
        <div>
            <h2>Prediction Results</h2>
            <p>Death Prediction: {result.death_prediction}</p>
            <p>Death Probability: {result.death_probability}</p>
            <p>ICU Prediction: {result.icu_prediction}</p>
            <p>ICU Probability: {result.icu_probability}</p>
        </div>
    );
};

export default Result;
