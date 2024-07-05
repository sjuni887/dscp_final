// src/components/Form.js
import React, { useState } from 'react';
import './Form.css'; // Create this CSS file for additional styling if needed

function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    indexno: '',
    age: 0,
    rcri_score: 0,
    gender: 'Male',
    race: 'Chinese',
    surgery_priority: 'Elective',
    anesthesia_type: 'GA',
    preop_egfr: 0,
    grade_kidney_disease: 'G1',
    grade_kidney_category: 'G1',
    anemia_category: 'none',
    anemia_binned: 'none',
    rdw_15_7: '<=15.7',
    preop_transfusion: 0,
    transfusion_intra_postop: 0,
    transfusion_category: '0 units',
    intraop: 0,
    postop_within_30days: 0,
    surg_risk_category: 'Low',
    asa_category_binned: 'I',
    dm_insulin: 'No',
    chf_rcri: 'No',
    ihd_rcri: 'No',
    cva_rcri: 'No',
    creatine_rcri: 'No'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mappedData = {
      ...formData,
      anemia_category_mapped: mapAnemiaCategory(formData.anemia_category),
      grade_kidney_disease_mapped: mapGradeKidney(formData.grade_kidney_disease),
      transfusion_category_mapped: mapTransfusion(formData.transfusion_category),
      surg_risk_category_mapped: mapSurgRisk(formData.surg_risk_category),
      grade_kidney_category_mapped: mapGradeKidney(formData.grade_kidney_category),
      anemia_binned_mapped: mapAnemiaBinned(formData.anemia_binned),
      rdw_15_7_mapped: mapRDW(formData.rdw_15_7),
      asa_category_binned_mapped: mapASA(formData.asa_category_binned),
      male_mapped: formData.gender === 'Male' ? 1 : 0,
      ga_mapped: formData.anesthesia_type === 'GA' ? 1 : 0,
      emergency_mapped: formData.surgery_priority === 'Emergency' ? 1 : 0,
      race_chinese: formData.race === 'Chinese' ? 1 : 0,
      race_indian: formData.race === 'Indian' ? 1 : 0,
      race_malay: formData.race === 'Malay' ? 1 : 0,
      race_others: formData.race === 'Others' ? 1 : 0,
      creatine_rcri_mapped: formData.creatine_rcri === 'Yes' ? 1 : 0,
      dm_insulin_mapped: formData.dm_insulin === 'Yes' ? 1 : 0,
      chf_rcri_mapped: formData.chf_rcri === 'Yes' ? 1 : 0,
      ihd_rcri_mapped: formData.ihd_rcri === 'Yes' ? 1 : 0,
      cva_rcri_mapped: formData.cva_rcri === 'Yes' ? 1 : 0
    };

    console.log(mappedData); // For debugging

    onSubmit(mappedData);
  };

  const mapAnemiaCategory = (value) => ({ none: 0, mild: 1, moderate: 2, severe: 3 })[value];
  const mapGradeKidney = (value) => ({ G1: 1, G2: 2, G3: 3, G4: 4, G5: 5 })[value];
  const mapTransfusion = (value) => ({ '0 units': 0, '1 unit': 1, '2 or more units': 2 })[value];
  const mapSurgRisk = (value) => ({ Low: 0, Moderate: 1, High: 2 })[value];
  const mapAnemiaBinned = (value) => ({ none: 0, mild: 1, 'moderate/severe': 2 })[value];
  const mapRDW = (value) => ({ '<=15.7': 1, '>15.7': 0 })[value];
  const mapASA = (value) => ({ I: 0, II: 1, III: 2, 'IV-VI': 3 })[value];

  return (
    <form onSubmit={handleSubmit}>
      <h2>Risk Calculator</h2>
      <div>
        <label>Index Number:</label>
        <input type="text" name="indexno" value={formData.indexno} onChange={handleChange} />
      </div>
      <div>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </div>
      <div>
        <label>RCRI score:</label>
        <input type="number" name="rcri_score" value={formData.rcri_score} onChange={handleChange} />
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label>Race:</label>
        <select name="race" value={formData.race} onChange={handleChange}>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Malay">Malay</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div>
        <label>Surgery Priority:</label>
        <select name="surgery_priority" value={formData.surgery_priority} onChange={handleChange}>
          <option value="Elective">Elective</option>
          <option value="Emergency">Emergency</option>
        </select>
      </div>
      <div>
        <label>Anesthesia Type:</label>
        <select name="anesthesia_type" value={formData.anesthesia_type} onChange={handleChange}>
          <option value="GA">GA</option>
          <option value="RA">RA</option>
        </select>
      </div>
      <div>
        <label>PreopEGFRMDRD:</label>
        <input type="number" name="preop_egfr" value={formData.preop_egfr} onChange={handleChange} />
      </div>
      <div>
        <label>Grade of Kidney Disease:</label>
        <select name="grade_kidney_disease" value={formData.grade_kidney_disease} onChange={handleChange}>
          <option value="G1">G1</option>
          <option value="G2">G2</option>
          <option value="G3">G3</option>
          <option value="G4">G4</option>
          <option value="G5">G5</option>
        </select>
      </div>
      <div>
        <label>Grade of Kidney Category:</label>
        <select name="grade_kidney_category" value={formData.grade_kidney_category} onChange={handleChange}>
          <option value="G1">G1</option>
          <option value="G2">G2</option>
          <option value="G3">G3</option>
          <option value="G4">G4</option>
          <option value="G5">G5</option>
        </select>
      </div>
      <div>
        <label>Anemia category:</label>
        <select name="anemia_category" value={formData.anemia_category} onChange={handleChange}>
          <option value="none">none</option>
          <option value="mild">mild</option>
          <option value="moderate">moderate</option>
          <option value="severe">severe</option>
        </select>
      </div>
      <div>
        <label>Anemia Category Binned:</label>
        <select name="anemia_binned" value={formData.anemia_binned} onChange={handleChange}>
          <option value="none">none</option>
          <option value="mild">mild</option>
          <option value="moderate/severe">moderate/severe</option>
        </select>
      </div>
      <div>
        <label>RDW15.7:</label>
        <select name="rdw_15_7" value={formData.rdw_15_7} onChange={handleChange}>
          <option value="<=15.7">{'<=15.7'}</option>
          <option value=">15.7">{'>15.7'}</option>
        </select>
      </div>
      <div>
        <label>Preoptransfusion within 30 days:</label>
        <input type="number" name="preop_transfusion" value={formData.preop_transfusion} onChange={handleChange} />
      </div>
      <div>
        <label>Transfusion intra and postop:</label>
        <input type="number" name="transfusion_intra_postop" value={formData.transfusion_intra_postop} onChange={handleChange} />
      </div>
      <div>
        <label>Transfusion Intra and Postop Category:</label>
        <select name="transfusion_category" value={formData.transfusion_category} onChange={handleChange}>
          <option value="0 units">0 units</option>
          <option value="1 unit">1 unit</option>
          <option value="2 or more units">2 or more units</option>
        </select>
      </div>
      <div>
        <label>Intraop:</label>
        <input type="number" name="intraop" value={formData.intraop} onChange={handleChange} />
      </div>
      <div>
        <label>Postop within 30 days:</label>
        <input type="number" name="postop_within_30days" value={formData.postop_within_30days} onChange={handleChange} />
      </div>
      <div>
        <label>Surgical Risk Category:</label>
        <select name="surg_risk_category" value={formData.surg_risk_category} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>ASA Category Binned:</label>
        <select name="asa_category_binned" value={formData.asa_category_binned} onChange={handleChange}>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV-VI">IV-VI</option>
        </select>
      </div>
      <div>
        <label>DM Insulin Category:</label>
        <select name="dm_insulin" value={formData.dm_insulin} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>CHF RCRI Category:</label>
        <select name="chf_rcri" value={formData.chf_rcri} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>IHD RCRI Category:</label>
        <select name="ihd_rcri" value={formData.ihd_rcri} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>CVA RCRI Category:</label>
        <select name="cva_rcri" value={formData.cva_rcri} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>Creatine RCRI Category:</label>
        <select name="creatine_rcri" value={formData.creatine_rcri} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
