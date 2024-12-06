import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';

const ChangeEmail = () => {
  const [currentEmail, setCurrentEmail] = useState('example@gmail.com'); // Replace with the actual email
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!newEmail || !confirmEmail) {
      setError('Please fill in all fields.');
      return;
    }
    if (newEmail !== confirmEmail) {
      setError('New email and confirm email do not match.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate success response
    setSuccess('Email changed successfully.');
    setNewEmail('');
    setConfirmEmail('');
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
      <CardHeader
        title="Change Email"
        sx={{ textAlign: 'center', borderBottom: '1px solid #eee' }}
      />
      <CardContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Current Email: <strong>{currentEmail}</strong>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="New Email"
              type="email"
              fullWidth
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Confirm New Email"
              type="email"
              fullWidth
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </Box>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ mb: 2 }}>
              {success}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Change Email
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangeEmail;
