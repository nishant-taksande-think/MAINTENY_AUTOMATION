import React, { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  Autocomplete,
  FormControlLabel,
  Button,
  Paper,
  Typography,
  Alert,
  Chip
} from '@mui/material';

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'India',
  'Japan',
  'Brazil',
  'Mexico'
];

function App() {
  const [formData, setFormData] = useState({
    email: '',
    country: null,
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    
    if (value && !validateEmail(value)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
    } else {
      const newErrors = { ...errors };
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handleCountryChange = (event, newValue) => {
    setFormData({ ...formData, country: newValue });
    if (newValue) {
      const newErrors = { ...errors };
      delete newErrors.country;
      setErrors(newErrors);
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
    if (e.target.checked) {
      const newErrors = { ...errors };
      delete newErrors.terms;
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setSubmitted(true);
    setErrors({});
  };

  const handleReset = () => {
    setFormData({
      email: '',
      country: null,
      termsAccepted: false
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        p: 2
      }}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
          <Alert severity="success" sx={{ mb: 3 }} data-testid="success-alert">
            Registration Successful!
          </Alert>
          
          <Typography variant="h6" gutterBottom>
            Registration Details:
          </Typography>
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }} data-testid="submitted-email">
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }} data-testid="submitted-country">
              <strong>Country:</strong> {formData.country}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <strong>Terms Accepted:</strong>
              <Chip 
                label="Yes" 
                color="success" 
                size="small"
                data-testid="terms-status"
              />
            </Box>
          </Box>
          
          <Button 
            variant="outlined" 
            onClick={handleReset}
            fullWidth
            data-testid="reset-button"
          >
            Register Another User
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: '#f5f5f5',
      p: 2
    }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          User Registration
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Please fill out the form below to create your account
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="Enter your email"
              inputProps={{
                'data-testid': 'email-input'
              }}
              required
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Autocomplete
              options={COUNTRIES}
              value={formData.country}
              onChange={handleCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  error={!!errors.country}
                  helperText={errors.country}
                  placeholder="Select your country"
                  inputProps={{
                    ...params.inputProps,
                    'data-testid': 'country-input'
                  }}
                  required
                />
              )}
              data-testid="country-autocomplete"
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  inputProps={{
                    'data-testid': 'terms-checkbox'
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  I accept the terms and conditions *
                </Typography>
              }
            />
            {errors.terms && (
              <Typography 
                variant="caption" 
                color="error" 
                display="block" 
                sx={{ ml: 4 }}
                data-testid="terms-error"
              >
                {errors.terms}
              </Typography>
            )}
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            data-testid="submit-button"
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default App;