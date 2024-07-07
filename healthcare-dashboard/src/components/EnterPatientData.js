import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EnterPatientData.css';

const EnterPatientData = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    IndexNo: '',
    Age: 17,
    'RCRI score': 0,
    'Anemia category': '',
    PreopEGFRMDRD: 0,
    'Grade of Kidney Disease': '',
    'Preoptransfusion within 30 days': 0,
    Intraop: 0,
    'Postop within 30 days': 0,
    'Transfusion intra and postop': 0,
    'Transfusion Intra and Postop Category': '',
    'Surgical Risk Category': '',
    'Grade of Kidney Category': '',
    'Anemia Category Binned': '',
    RDW15_7: '',
    'ASA Category Binned': '',
    Gender: '',
    'Anaesthesia Type': '',
    'Surgery Priority': '',
    Race: '',
    'Creatine RCRI Category': '',
    'DM Insulin Category': '',
    'CHF RCRI Category': '',
    'IHD RCRI Category': '',
    'CVA RCRI Category': ''
  });

  const fetchPatients = async () => {
    const response = await axios.get('http://localhost:5000/patients');
    setPatients(response.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPatient = async () => {
    await axios.post('http://localhost:5000/patients', formData);
    fetchPatients();
    setFormData({
      IndexNo: '',
      Age: 17,
      'RCRI score': 0,
      'Anemia category': '',
      PreopEGFRMDRD: 0,
      'Grade of Kidney Disease': '',
      'Preoptransfusion within 30 days': 0,
      Intraop: 0,
      'Postop within 30 days': 0,
      'Transfusion intra and postop': 0,
      'Transfusion Intra and Postop Category': '',
      'Surgical Risk Category': '',
      'Grade of Kidney Category': '',
      'Anemia Category Binned': '',
      RDW15_7: '',
      'ASA Category Binned': '',
      Gender: '',
      'Anaesthesia Type': '',
      'Surgery Priority': '',
      Race: '',
      'Creatine RCRI Category': '',
      'DM Insulin Category': '',
      'CHF RCRI Category': '',
      'IHD RCRI Category': '',
      'CVA RCRI Category': ''
    });
  };

  const handleEditPatient = async (index) => {
    const editedPatient = patients[index];
    await axios.put(`http://localhost:5000/patients/${editedPatient.IndexNo}`, editedPatient);
    fetchPatients();
  };

  return (
    <div className="enter-patient-data-container">
      <h2>Enter Patient Data</h2>
      <form className="patient-form">
        <label>Index Number:</label>
        <input type="text" name="IndexNo" value={formData.IndexNo} onChange={handleChange} placeholder="Index Number" />
        
        <label>Surgery Priority:</label>
        <select name="Surgery Priority" value={formData['Surgery Priority']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Elective">Elective</option>
          <option value="Emergency">Emergency</option>
        </select>
        
        <label>Age:</label>
        <input type="range" name="Age" value={formData.Age} onChange={(e) => handleSliderChange('Age', e.target.value)} min="17" max="120" />
        
        <label>Anaesthesia Type:</label>
        <select name="Anaesthesia Type" value={formData['Anaesthesia Type']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="GA">GA</option>
          <option value="RA">RA</option>
        </select>
        
        <label>RCRI score:</label>
        <input type="range" name="RCRI score" value={formData['RCRI score']} onChange={(e) => handleSliderChange('RCRI score', e.target.value)} min="0" max="6" />
        
        <label>Gender:</label>
        <select name="Gender" value={formData.Gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        
        <label>Race:</label>
        <select name="Race" value={formData.Race} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Chinese">Chinese</option>
          <option value="Malay">Malay</option>
          <option value="Indian">Indian</option>
          <option value="Others">Others</option>
        </select>
        
        <label>PreopEGFRMDRD:</label>
        <input type="range" name="PreopEGFRMDRD" value={formData.PreopEGFRMDRD} onChange={(e) => handleSliderChange('PreopEGFRMDRD', e.target.value)} min="0" max="1000" />
        
        <label>Grade of Kidney Category:</label>
        <select name="Grade of Kidney Category" value={formData['Grade of Kidney Category']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="G1">G1</option>
          <option value="G2">G2</option>
          <option value="G3">G3</option>
          <option value="G4">G4</option>
          <option value="G5">G5</option>
        </select>
        
        <label>Grade of Kidney Disease:</label>
        <select name="Grade of Kidney Disease" value={formData['Grade of Kidney Disease']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="G1">G1</option>
          <option value="G2">G2</option>
          <option value="G3">G3</option>
          <option value="G4">G4</option>
          <option value="G5">G5</option>
        </select>
        
        <label>Anemia category:</label>
        <select name="Anemia category" value={formData['Anemia category']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="None">None</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>
        
        <label>Anemia Category Binned:</label>
        <select name="Anemia Category Binned" value={formData['Anemia Category Binned']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="None">None</option>
          <option value="Mild">Mild</option>
          <option value="Moderate/Severe">Moderate/Severe</option>
        </select>
        
        <label>RDW15.7:</label>
        <select name="RDW15_7" value={formData.RDW15_7} onChange={handleChange}>
          <option value="">Select</option>
          <option value="<=15.7">≤15.7</option>
          <option value=">15.7">15.7</option>
        </select>
        
        <label>Preoptransfusion within 30 days:</label>
        <input type="range" name="Preoptransfusion within 30 days" value={formData['Preoptransfusion within 30 days']} onChange={(e) => handleSliderChange('Preoptransfusion within 30 days', e.target.value)} min="0" max="10" />
        
        <label>Transfusion intra and postop:</label>
        <input type="range" name="Transfusion intra and postop" value={formData['Transfusion intra and postop']} onChange={(e) => handleSliderChange('Transfusion intra and postop', e.target.value)} min="0" max="10" />
        
        <label>Transfusion Intra and Postop Category:</label>
        <select name="Transfusion Intra and Postop Category" value={formData['Transfusion Intra and Postop Category']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="0 units">0 units</option>
          <option value="1 unit">1 unit</option>
          <option value="2 or more units">2 or more units</option>
        </select>
        
        <label>Intraop:</label>
        <input type="range" name="Intraop" value={formData.Intraop} onChange={(e) => handleSliderChange('Intraop', e.target.value)} min="0" max="10" />
        
        <label>Postop within 30 days:</label>
        <input type="range" name="Postop within 30 days" value={formData['Postop within 30 days']} onChange={(e) => handleSliderChange('Postop within 30 days', e.target.value)} min="0" max="10" />
        
        <label>Surgical Risk Category:</label>
        <select name="Surgical Risk Category" value={formData['Surgical Risk Category']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
        
        <label>ASA Category Binned:</label>
        <select name="ASA Category Binned" value={formData['ASA Category Binned']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV-VI">IV-VI</option>
        </select>
        
        <label>DM Insulin Category:</label>
        <select name="DM Insulin Category" value={formData['DM Insulin Category']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        
        <label>CHF RCRI Category:</label>
        <select name="CHF RCRI Category" value={formData['CHF RCRI Category']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        
        <label>IHD RCRI Category:</label>
        <select name="IHD RCRI Category" value={formData['IHD RCRI Category']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        
        <label>CVA RCRI Category:</label>
        <select name="CVA RCRI Category" value={formData['CVA RCRI Category']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        
        <label>Creatine RCRI Category:</label>
        <select name="Creatine RCRI Category" value={formData['Creatine RCRI Category']} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        
        <button type="button" onClick={handleAddPatient}>Add Patient</button>
      </form>
      <h2>Edit Patient Data</h2>
      <table className="patient-table">
        <thead>
          <tr>
            {Object.keys(formData).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              {Object.keys(formData).map((key) => (
                <td key={key}>
                  <input
                    type="text"
                    value={patient[key]}
                    onChange={(e) => {
                      const newPatients = [...patients];
                      newPatients[index][key] = e.target.value;
                      setPatients(newPatients);
                    }}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => handleEditPatient(index)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnterPatientData;
