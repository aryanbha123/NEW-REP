import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';

const FeedbackForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      return toast.error('Please fill in all fields.');
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/mail/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Feedback submitted!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.error || 'Something went wrong.');
      }
    } catch (err) {
      toast.error('Failed to send feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={4} sx={{ padding: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom>
          Send Us Your Feedback 🌿
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Your Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Your Email"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Your Message"
            name="message"
            multiline
            rows={4}
            fullWidth
            value={formData.message}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
            disabled={loading}
            color="success"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Feedback'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FeedbackForm;
