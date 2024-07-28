import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Slider, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
import '../css/issueForm.css';
import axios from 'axios';

// Custom styled Slider with gradient and rounded thumb
const PrettoSlider = styled(Slider)({
  height: 20,
  '& .MuiSlider-track': {
    border: 'none',
    height: '20px',
    background: 'linear-gradient(90deg, #58C5F4 0%, #297CC9 100%)',
  },
  '& .MuiSlider-thumb': {
    height: 25,
    width: 25,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#297CC9',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const IssueForm = () => {
  const [urgency, setUrgency] = useState(2);
  const [impact, setImpact] = useState(2);
  const [levelOfIssue, setLevelOfIssue] = useState(2);
  const [clientName, setClientName] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [sorted, setSorted] = useState(false);
  const [callDetails, setCallDetails] = useState(null); // State to store call details

  const priorityMatrix = {
    1: { 1: 'Low', 2: 'Low', 3: 'Moderate' },
    2: { 1: 'Low', 2: 'Moderate', 3: 'High' },
    3: { 1: 'Moderate', 2: 'High', 3: 'Critical' }
  };

  const calculatePriority = (urgency, impact) => {
    return priorityMatrix[urgency][impact];
  };

  useEffect(() => {
    const fetchCallDetails = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/calls/active/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCallDetails(response.data); // Store call details in state
      } catch (error) {
        console.error('Error fetching call details:', error);
      }
    };

    fetchCallDetails();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urgencyLabels = ["Low", "Medium", "High"];
    const impactLabels = ["Low-Single", "Medium-Multiple", "High-System Wide"];
    const levelOfIssueLabels = ["Basic", "Advanced", "Technical", "On-Site"];

    const priority = calculatePriority(urgency, impact);

    const userId = localStorage.getItem("userId");

    // Ensure that the callLogId is included in the formData
    const formData = {
        callLogId: callDetails ? callDetails._id : '', // Include callLogId if needed
        formData: {
            userId: userId,
            clientName,
            urgency: urgencyLabels[urgency - 1],
            impact: impactLabels[impact - 1],
            levelOfIssue: levelOfIssueLabels[levelOfIssue - 1],
            issueDescription,
            remarks,
            sorted,
            priority
        }
    };

    try {
        const response = await axios.post('http://localhost:5000/api/calls/submit', formData, {
            headers: {
                'Content-Type': 'application/json' // Ensure the content type is set to JSON
            }
        });
        console.log(response.data);
        // Handle successful submission
    } catch (error) {
        console.error('Error submitting form data:', error);
        // Handle error
    }
};

  

  const urgencyMarks = [
    { value: 1, label: '' },
    { value: 2, label: '' },
    { value: 3, label: '' },
  ];

  const impactMarks = [
    { value: 1, label: '' },
    { value: 2, label: '' },
    { value: 3, label: '' },
  ];

  const levelOfIssueMarks = [
    { value: 1, label: '' },
    { value: 2, label: '' },
    { value: 3, label: '' },
    { value: 4, label: '' },
  ];

  return (
    <div>
      <br/><br/><br/><br/>
      <div className="issue-form-container" style={{ display:"flex", width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} className="issue-form">
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="left"
          style={{ fontWeight: 'bold' }}
        >
          Call Details
        </Typography>
        <div className="call-details">
          <div className="call-item">
            <Typography>Incoming Phone No</Typography>
            <TextField
              name="phoneNo"
              value={callDetails ? callDetails.phoneNumber : ''}
              style={{ backgroundColor: '#c0c0c0' }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="call-item">
            <Typography>Agent ID</Typography>
            <TextField
              name="agentId"
              value={callDetails ? callDetails.uniqueId : ''}
              style={{ backgroundColor: '#c0c0c0' }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="call-item">
            <Typography>Date</Typography>
            <TextField
              name="date"
              value={callDetails ? callDetails.date : ''}
              style={{ backgroundColor: '#c0c0c0' }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="call-item">
            <Typography>Time</Typography>
            <TextField
              name="time"
              value={callDetails ? callDetails.time : ''}
              style={{ backgroundColor: '#c0c0c0' }}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <hr />
        <br />
        <Typography variant="h5" component="h2" gutterBottom align="left" style={{ fontWeight: 'bold' }}>
          Issue Form
          </Typography>
          <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
               <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}>
            <Typography variant="h6" style={{ marginRight: "16px" }}>Client Name</Typography>
        <TextField
          label="Client Name"
          variant="outlined"
          margin="normal"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          InputProps={{
            style: {
              borderRadius: "30px",
              boxShadow: "inset 0px -2px 5px rgba(0, 0, 0, 0.2)",
              minWidth: "300px",
            },
          }}
          style={{
            borderRadius: "30px",
            minWidth: "300px",
          }}
        />
        </div></div>
        <div className="slider-container">
          <div className="slider-item">
            <Typography variant="h6" gutterBottom>Urgency</Typography>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '10px',
            }}>
              <PrettoSlider
                step={1}
                min={1}
                max={3}
                value={urgency}
                onChange={(e, newValue) => setUrgency(newValue)}
                valueLabelDisplay="auto"
                marks={urgencyMarks}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '2px', // Space between the slider and the marks
              }}>
                <Typography variant="h8">Low</Typography>
                <Typography variant="h8">Medium</Typography>
                <Typography variant="h8">High</Typography>
              </div>
              
            </div>
          </div>
          <div className="slider-item">
            <Typography variant="h6" gutterBottom>Impact</Typography>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '10px',
            }}>
              <PrettoSlider
                step={1}
                min={1}
                max={3}
                value={impact}
                onChange={(e, newValue) => setImpact(newValue)}
                valueLabelDisplay="auto"
                marks={impactMarks}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '2px', // Space between the slider and the marks
              }}>
                <Typography variant="h8">Low</Typography>
                <Typography variant="h8">Medium</Typography>
                <Typography variant="h8">High</Typography>
              </div>
            </div>
          </div>
        </div>

        <TextField
          label="Issue Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          InputProps={{
            style: {
              borderRadius: '30px',
              boxShadow: 'inset 0px -2px 5px rgba(0, 0, 0, 0.2)',
              minWidth: '300px',
            },
          }}
          variant="outlined"
          style={{
            borderRadius: '30px',
            minWidth: '300px',
          }}
        />

        <div className="level-upload-container">
          <div className="level-upload-item">
              <Typography variant="h6" gutterBottom>Level Of Issue</Typography>
              <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '10px', 
              marginRight:'40px'// Margin below the slider
            }}>
            <PrettoSlider
                value={levelOfIssue}
              onChange={(e, newValue) => setLevelOfIssue(newValue)}
              step={1}
              min={1}
              max={4}
              valueLabelDisplay="auto"
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '2px', // Space between the slider and the marks
              }}>
                <Typography variant="h8">Basic</Typography>
                <Typography variant="h8">Advanced</Typography>
                <Typography variant="h8">Technical</Typography>
                <Typography variant="h8">On-Site</Typography>
              </div>
              </div>
              </div>
            
          <div className="upload-button-wrapper">
            <Button variant="contained" color="primary" className="upload-button">
              Send Upload Link
            </Button>
            {/* <Typography variant="body2" align="center" className="upload-note">
              *you will be able to view files sent via WhatsApp
            </Typography> */}
          </div>
        </div>

        <TextField
          label="Remarks"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          InputProps={{
            style: {
              borderRadius: '30px',
              boxShadow: 'inset 0px -2px 5px rgba(0, 0, 0, 0.2)',
              minWidth: '300px',
            },
          }}
          variant="outlined"
          style={{
            borderRadius: '30px',
            minWidth: '300px',
          }}
        />
<div style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={sorted}
              onChange={(e) => setSorted(e.target.checked)}
            />
          }
          label="Sorted"
        />
</div>
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" type="submit" style={{ marginTop: '16px' }}>
            Submit
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default IssueForm;
