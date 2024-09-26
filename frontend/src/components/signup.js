import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        agentId: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
    });

    const [errors, setErrors] = useState({
        agentId: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Reset error message when user starts typing
        setErrors({
            ...errors,
            [name]: '',
        });
        setErrorMessage('');
    };

    const handleShowPassword = (field) => {
        setFormData({
            ...formData,
            [field]: !formData[field],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Client-side validation
        let hasError = false;
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Please enter a valid email address',
            }));
            hasError = true;
        }

        if (formData.password.length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password should be at least 8 characters long',
            }));
            hasError = true;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Passwords do not match',
            }));
            hasError = true;
        }

        if (!formData.phoneNumber) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phoneNumber: 'Please enter a phone number',
            }));
            hasError = true;
        }

        if (hasError) return;

        try {
            const response = await fetch("http://localhost:5000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);
            if (result.error) {
                setErrorMessage(result.error);

                if (result.error === 'The email address is already in use.') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: 'This email is already in use',
                    }));
                } else if (result.error === 'The name is already in use.') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        name: 'This name is already taken',
                    }));
                }

            } else {
                navigate("/signin");
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                agentId: '',
                showPassword: false,
                showConfirmPassword: false,
            });
        }

        // Display agentId in the console
        console.log(`Agent ID: ${formData.agentId}`);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ marginTop: '100px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {errorMessage && (
                        <Typography variant="body1" color="error" gutterBottom>
                            {errorMessage}
                        </Typography>
                    )}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    autoFocus
                                    fullWidth
                                    name="agentId"
                                    label="Agent ID"
                                    id="agentId"
                                    autoComplete="agent-id"
                                    value={formData.agentId}
                                    onChange={handleInputChange}
                                    error={!!errors.agentId}
                                    helperText={errors.agentId}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phoneNumber"
                                    label="Phone Number"
                                    id="phoneNumber"
                                    autoComplete="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={formData.showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleShowPassword('showPassword')}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {formData.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={formData.showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleShowPassword('showConfirmPassword')}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {formData.showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
