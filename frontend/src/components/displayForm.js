import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Slider, TextField, Typography } from '@mui/material';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useParams } from 'react-router-dom';
import '../css/issueForm.css';
import { useNavigate } from 'react-router-dom';


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

const DisplayForm = () => {
  const { logId } = useParams(); // Use useParams to get the logId
  const navigate = useNavigate();
  const [urgency, setUrgency] = useState(2);
  const [impact, setImpact] = useState(2);
  const [levelOfIssue, setLevelOfIssue] = useState(2);
  const [clientName, setClientName] = useState('');
  const [agentId, setAgentId] = useState('');
  const [agentName, setAgentName] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    if (logId) {
      const fetchLogDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/calls/logs/${logId}`);
          const {
            formData: {
              clientName,
              urgency,
              impact,
              levelOfIssue,
              issueDescription,
              remarks,
              sorted,
            },
            agentId,
            agentName,
          } = response.data;
  
          // Set the state with the fetched data
          setClientName(clientName);
          setUrgency(convertUrgencyLevel(urgency));
          setImpact(convertImpactLevel(impact));
          setLevelOfIssue(convertLevelOfIssue(levelOfIssue));
          setIssueDescription(issueDescription);
          setRemarks(remarks);
          setSorted(sorted);
  
          // Set agent information
          setAgentId(agentId);
          setAgentName(agentName);
        } catch (error) {
          console.error('Error fetching log details:', error);
        }
      };
  
      fetchLogDetails();
    }
  }, [logId]);
  
  const handleFollowUp = () => {
    // Navigate to the follow-up form
    navigate(`/follow-up/${logId}`);
  };

  // const urgencyMarks = [
  //   { value: 1, label: 'Low' },
  //   { value: 2, label: 'Medium' },
  //   { value: 3, label: 'High' },
  // ];

  // const impactMarks = [
  //   { value: 1, label: 'Low' },
  //   { value: 2, label: 'Medium' },
  //   { value: 3, label: 'High' },
  // ];

  // const levelOfIssueMarks = [
  //   { value: 1, label: 'Basic' },
  //   { value: 2, label: 'Advanced' },
  //   { value: 3, label: 'Technical' },
  //   { value: 4, label: 'On-Site' },
  // ];

  const convertUrgencyLevel = (urgency) => {
    switch (urgency) {
      case 'Low':
        return 1;
      case 'Medium':
        return 2;
      case 'High':
        return 3;
      default:
        return 2; // Default to Medium if unknown
    }
  };

  const convertImpactLevel = (impact) => {
    switch (impact) {
      case 'Low':
        return 1;
      case 'Medium':
        return 2;
      case 'High':
        return 3;
      default:
        return 2; // Default to Medium if unknown
    }
  };

  const convertLevelOfIssue = (levelOfIssue) => {
    switch (levelOfIssue) {
      case 'Basic':
        return 1;
      case 'Advanced':
        return 2;
      case 'Technical':
        return 3;
      case 'On-Site':
        return 4;
      default:
        return 2; // Default to Advanced if unknown
    }
  };

  return (
    <div>
      <br /><br /><br /><br />
      <div className="issue-form-container" style={{ display: "flex", width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <form className="issue-form">
          <Typography variant="h5" component="h2" gutterBottom align="left" style={{ fontWeight: 'bold' }}>
            Details
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
              <Typography variant="h6" style={{ marginRight: "16px" }}>Agent ID</Typography>
              <TextField
                value={agentId}
                InputProps={{
                  readOnly: true,
                  style: {
                    boxShadow: "inset 0px -2px 5px rgba(0, 0, 0, 0.2)",
                    minWidth: "150px",
                  },
                }}
                style={{
                  minWidth: "150px", color: 'white'
                }}
              />
              <Typography variant="h6" style={{ marginRight: "16px", marginLeft: "16px" }}>Agent Name</Typography>
              <TextField
                value={agentName}
                InputProps={{
                  readOnly: true,
                  style: {
                    boxShadow: "inset 0px -2px 5px rgba(0, 0, 0, 0.2)",
                    minWidth: "200px",
                  },
                }}
                style={{
                  minWidth: "200px", color: 'white'
                }}
              />
              <Typography variant="h6" style={{ marginRight: "16px", marginLeft: "16px" }}>Client Name</Typography>
              <TextField
                value={clientName}
                InputProps={{
                  readOnly: true,
                  style: {
                    boxShadow: "inset 0px -2px 5px rgba(0, 0, 0, 0.2)",
                    minWidth: "300px",
                  },
                }}
                style={{
                  minWidth: "300px", color: 'white'
                }}
              />
            </div>
          </div>
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
                  valueLabelDisplay="auto"
                  disabled // Make the slider non-movable
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: '2px',
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
                  valueLabelDisplay="auto"
                  disabled // Make the slider non-movable
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: '2px',
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
            InputProps={{
              readOnly: true,
              style: {
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
                marginRight: '40px'
              }}>
                <PrettoSlider
                  value={levelOfIssue}
                  step={1}
                  min={1}
                  max={4}
                  valueLabelDisplay="auto"
                  disabled // Make the slider non-movable
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: '2px',
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
                Images of the Issue
              </Button>
            </div>
          </div>

          <TextField
            label="Remarks"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={remarks}
            InputProps={{
              readOnly: true,
              style: {
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
          <div style={{ textAlign: 'left', marginTop: "10px" }}>
            <ToggleButtonGroup
              value={sorted ? 'sorted' : 'unsorted'}
              exclusive
              onChange={async (event, newAlignment) => {
                if (newAlignment !== null) {
                  const newSorted = newAlignment === 'sorted';
                  setSorted(newSorted);

                  try {
                    await axios.put(`http://localhost:5000/calls/logs/${logId}`, { sorted: newSorted });
                  } catch (error) {
                    console.error('Error updating sorted state:', error);
                  }
                }
              }}
            >
              <ToggleButton value="sorted">Sorted</ToggleButton>
              <ToggleButton value="unsorted">Unsorted</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {/* {!sorted && (
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleFollowUp}
              style={{ marginTop: '20px' }}
            >
              Follow Up
            </Button>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default DisplayForm;
