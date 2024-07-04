// src/components/Form.js
import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        age: '',
        rcri_score: '',
        anemia_category_mapped: '',
        preop_egfr: '',
        grade_kidney_disease_mapped: '',
        preop_transfusion: '',
        intraop: '',
        postop_within_30days: '',
        transfusion_intra_postop: '',
        transfusion_category_mapped: '',
        surg_risk_category_mapped: '',
        grade_kidney_category_mapped: '',
        anemia_binned_mapped: '',
        rdw_15_7_mapped: '',
        asa_category_binned_mapped: '',
        male_mapped: '',
        ga_mapped: '',
        emergency_mapped: '',
        race_chinese: '',
        race_indian: '',
        race_malay: '',
        race_others: '',
        creatine_rcri_mapped: '',
        dm_insulin_mapped: '',
        chf_rcri_mapped: '',
        ihd_rcri_mapped: '',
        cva_rcri_mapped: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add form inputs here */}
            <label>
                Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
            </label>
            <label>
                RCRI Score:
                <input type="number" name="rcri_score" value={formData.rcri_score} onChange={handleChange} />
            </label>
            {/* Add other inputs similarly */}
            <button type="submit">Predict</button>
        </form>
    );
};

export default Form;
