// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';

// export default function Logout() {
//   const navigate = useNavigate();
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   const handleLogout = async () => {
//     try {
//       // Fetch the logout endpoint to perform server-side logout
//       const response = await fetch('http://localhost:5000/auth/logout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token for authentication
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to log out');
//       }

//       // Remove token and user ID from local storage
//       localStorage.removeItem('token');
//       localStorage.removeItem('userId');

//       setSnackbar({
//         open: true,
//         message: 'Logged out successfully!',
//         severity: 'success',
//       });

//       // Navigate to login page after logout
//       setTimeout(() => {
//         navigate('/login');
//       }, 1000);
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: error.message,
//         severity: 'error',
//       });
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={handleLogout}>
//         Logout
//       </Button>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }
