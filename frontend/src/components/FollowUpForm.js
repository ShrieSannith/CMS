import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Slider, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const FollowUpForm = () => {
  const { logId } = useParams(); // Get logId from the route params
  const [urgency, setUrgency] = useState(2);
  const [impact, setImpact] = useState(2);
  const [levelOfIssue, setLevelOfIssue] = useState(2);
  const [clientName, setClientName] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [newRemarks, setNewRemarks] = useState('');
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
          } = response.data;

          // Set the state with the fetched data
          setClientName(clientName);
          setUrgency(urgency);
          setImpact(impact);
          setLevelOfIssue(levelOfIssue);
          setIssueDescription(issueDescription);
          setRemarks(remarks);
          setSorted(sorted);
        } catch (error) {
          console.error('Error fetching log details:', error);
        }
      };

      fetchLogDetails();
    }
  }, [logId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/calls/follow-up`, {
        logId,
        urgency,
        impact,
        levelOfIssue,
        newRemarks,
        sorted,
      });

      console.log('Follow-up submitted:', response.data);
      // Handle successful submission, e.g., navigate to another page or show a success message
    } catch (error) {
      console.error('Error submitting follow-up:', error);
    }
  };

  return (
    <div className="issue-form-container">
      <form className="issue-form" onSubmit={handleSubmit}>
        <Typography variant="h5" component="h2" gutterBottom align="left" style={{ fontWeight: 'bold' }} sx={{ mt: 10 }}>
          Follow Up Issue Form
        </Typography>

        <TextField
          label="Client Name"
          fullWidth
          margin="normal"
          value={clientName}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

        <TextField
          label="Issue Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={issueDescription}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

        <div className="slider-container">
          <div className="slider-item">
            <Typography variant="h6" gutterBottom>Urgency</Typography>
            <PrettoSlider
              step={1}
              min={1}
              max={3}
              value={urgency}
              onChange={(e, newValue) => setUrgency(newValue)}
              valueLabelDisplay="auto"
            />
          </div>

          <div className="slider-item">
            <Typography variant="h6" gutterBottom>Impact</Typography>
            <PrettoSlider
              step={1}
              min={1}
              max={3}
              value={impact}
              onChange={(e, newValue) => setImpact(newValue)}
              valueLabelDisplay="auto"
            />
          </div>

          <div className="slider-item">
            <Typography variant="h6" gutterBottom>Level Of Issue</Typography>
            <PrettoSlider
              step={1}
              min={1}
              max={4}
              value={levelOfIssue}
              onChange={(e, newValue) => setLevelOfIssue(newValue)}
              valueLabelDisplay="auto"
            />
          </div>
        </div>

        <TextField
          label="Current Remarks"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={remarks}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

        <TextField
          label="Add New Remarks"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={newRemarks}
          onChange={(e) => setNewRemarks(e.target.value)}
          variant="outlined"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={sorted}
              onChange={(e) => setSorted(e.target.checked)}
              name="sorted"
              color="primary"
            />
          }
          label="Sorted"
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FollowUpForm;
