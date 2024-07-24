import React, { useState } from 'react';
import { Button, Slider, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
import axios from 'axios';
import '../css/issueForm.css';

const IssueForm = () => {
  const [urgency, setUrgency] = useState(2);
  const [impact, setImpact] = useState(2);
  const [levelOfIssue, setLevelOfIssue] = useState(2);
  const [clientName, setClientName] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [sorted, setSorted] = useState(false);

  const priorityMatrix = {
    1: { 1: 'Low', 2: 'Low', 3: 'Moderate' },
    2: { 1: 'Low', 2: 'Moderate', 3: 'High' },
    3: { 1: 'Moderate', 2: 'High', 3: 'Critical' }
  };

  const calculatePriority = (urgency, impact) => {
    return priorityMatrix[urgency][impact];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urgencyLabels = ["Low", "Medium", "High"];
    const impactLabels = ["Low-Single", "Medium-Multiple", "High-System Wide"];
    const levelOfIssueLabels = ["Basic", "Advanced", "Technical", "On-Site"];

    const priority = calculatePriority(urgency, impact);

    const userId = localStorage.getItem("userId");

    const formData = {
      userId: userId,
      clientName,
      urgency: urgencyLabels[urgency - 1],
      impact: impactLabels[impact - 1],
      levelOfIssue: levelOfIssueLabels[levelOfIssue - 1],
      issueDescription,
      remarks,
      sorted,
      priority
    };

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post('http://localhost:5000/issue/forms', formData, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the headers
        }
      });
      console.log(response.data);
      // Handle successful submission
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const urgencyMarks = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' },
  ];

  const impactMarks = [
    { value: 1, label: 'Low-Single' },
    { value: 2, label: 'Medium-Multiple' },
    { value: 3, label: 'High-System Wide' },
  ];

  const levelOfIssueMarks = [
    { value: 1, label: 'Basic' },
    { value: 2, label: 'Advanced' },
    { value: 3, label: 'Technical' },
    { value: 4, label: 'On-Site' },
  ];

  return (
    <div>
      <br/><br/><br/><br/><br/>
      <form onSubmit={handleSubmit} className="issue-form">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          ISSUE FORM
        </Typography>

        <TextField
          label="Client Name"
          variant="outlined"
          style={{ borderRadius: "50px" }}
          margin="normal"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <div className="slider-container">
          <div className="slider-item">
            <Typography gutterBottom>Urgency</Typography>
            <Slider
              aria-label="Urgency"
              value={urgency}
              onChange={(e, newValue) => setUrgency(newValue)}
              step={1}
              marks={urgencyMarks}
              min={1}
              max={3}
              valueLabelDisplay="auto"
              sx={{ width: '90%' }} // Ensure the slider takes full width of its container
            />
          </div>
          <div className="slider-item">
            <Typography gutterBottom>Impact</Typography>
            <Slider
              aria-label="Impact"
              value={impact}
              onChange={(e, newValue) => setImpact(newValue)}
              step={1}
              marks={impactMarks}
              min={1}
              max={3}
              valueLabelDisplay="auto"
              sx={{ width: '90%' }} // Ensure the slider takes full width of its container
            />
          </div>
        </div>

        <TextField
          label="Issue Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
        />

        <div className="level-upload-container">
          <div className="level-upload-item" style={{ flex: '2' }}>
            <Typography gutterBottom>Level Of Issue</Typography>
            <Slider
              aria-label="Level Of Issue"
              value={levelOfIssue}
              onChange={(e, newValue) => setLevelOfIssue(newValue)}
              step={1}
              marks={levelOfIssueMarks}
              min={1}
              max={4}
              valueLabelDisplay="auto"
              sx={{ width: '80%' }} // Ensure the slider takes full width of its container
            />
          </div>
          <div className="upload-button-wrapper">
            <Button variant="contained" color="primary" className="upload-button">
              Send Upload Link
            </Button>
            <Typography variant="body2" align="center" className="upload-note">
              *you will be able to view files sent via WhatsApp
            </Typography>
          </div>
        </div>

        <TextField
          label="Remarks"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={sorted}
              onChange={(e) => setSorted(e.target.checked)}
            />
          }
          label="Sorted"
        />

        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" type="submit" style={{ marginTop: '0px' }}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
