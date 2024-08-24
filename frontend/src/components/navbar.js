import * as React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/logo.png'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {  useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const logoStyle = {
  width: '30px',
  margin: '20px',
  marginBottom: '25px',
  height: 'auto',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    const userId = localStorage.getItem('userId'); // Get userId from local storage

    if (!userId) {
        console.error('No userId found');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }), // Send userId in the request body
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Logout failed');
        }

        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');

    } catch (error) {
        console.error('Logout failed:', error.message);
    }
};

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img src={logo} style={logoStyle} alt="logo of sitemark" />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem>
                  <a href="/#" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="text.primary">
                      IDEAEDU
                    </Typography>
                  </a>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {token ? (
                // If token exists, render Logout button
                <div>
                  <a href = "/form" style={{textDecoration:"none"}}>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    
                    sx={{ marginLeft: '10px', marginRight: '10px' }}
                  >
                    FORMS
                  </Button></a>
                  <a href = "/logs" style={{textDecoration:"none"}}>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    
                    sx={{ marginLeft: '10px', marginRight: '10px' }}
                  >
                    LOGS
                  </Button></a>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={handleLogout}
                    sx={{ marginLeft: '10px', marginRight: '10px' }}
                  >
                    LOGOUT
                  </Button>
                  {/* <Avatar alt="Remy Sharp" size="small" src={profile} /> */}
                </div>
              ) : (
                // If token does not exist, render Login button
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/signin"
                >
                  LOGIN
                </Button>
              )}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <MenuItem>
                      {token ? (
                        <div>
                          <div style={{ display: 'block', marginBottom: '10px' }}>
                            <Button
                              color="primary"
                              variant="outlined"
                              component="a"
                              sx={{ width: '100%' }}
                              onClick={handleLogout}
                            >
                              LOGOUT
                            </Button>
                          </div>
                          <div style={{ display: 'block', width: '100%' }}></div>
                        </div>
                      ) : (
                        // If token does not exist, render Login button
                        <Button
                          color="primary"
                          variant="outlined"
                          component="a"
                          sx={{ width: '100%' }}
                          href="/signin"
                        >
                          LOGIN
                        </Button>
                      )}
                    </MenuItem>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;