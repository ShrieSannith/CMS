// Profile.js
import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Paper, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    branch: '',
    bio: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from backend using the token stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/getuserfromtoken', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userData = await response.json();
      if (response.ok) {
        // Set user data in the state
        setProfileDetails(userData);
      } else {
        console.error('Failed to fetch user data:', userData.error);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setProfileDetails(prevDetails => ({
      ...prevDetails,
      [field]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log('Form Submitted:', profileDetails);
    // Add logic to handle form submission
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ backgroundColor: 'white', padding: '20px', minHeight: '100vh', marginTop: '150px' }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2, position: 'relative' }}>
          <IconButton onClick={handleEditClick} sx={{ position: 'absolute', top: 10, right: 10 }}>
            <EditIcon />
          </IconButton>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Profile Details</Typography>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <TextField label="Name" value={profileDetails.name} onChange={(e) => handleInputChange(e, 'name')} fullWidth sx={{ marginBottom: '10px' }} />
              <TextField label="Email" value={profileDetails.email} fullWidth disabled />
              {/* Disable the email field so it cannot be edited */}
              {/* Add other fields here if needed */}
              <Button variant="contained" color="primary" onClick={handleSaveClick} startIcon={<SaveIcon />} sx={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                Save
              </Button>
            </div>
          ) : (
            <>
              <Typography sx={{ marginBottom: '10px', textAlign: 'left', width: '100%' }}>Name: {profileDetails.name}</Typography>
              <Typography sx={{ marginBottom: '10px', textAlign: 'left', width: '100%' }}>Email: {profileDetails.email}</Typography>
              {/* Add other fields here if needed */}
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
