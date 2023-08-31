import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ordersService from '../../features/orders/ordersService';
import { useSelector } from 'react-redux';

const MockPayment = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePaymentSubmit = async () => {
    setIsLoading(true);
    // Simulate an API call for payment processing
    await ordersService.makePayment(user._id);

    // Simulate successful payment
    setIsPaymentSuccessful(true);
    setIsLoading(false);
    navigate("/")
  };

  const handleCloseSnackbar = () => {
    setIsPaymentSuccessful(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ paddingBottom: 1.5 }}>
          Enter Payment Details
        </Typography>
        <TextField
          label="Card Number"
          fullWidth
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <TextField
          label="Expiry"
          fullWidth
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <TextField
          label="CVV"
          fullWidth
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePaymentSubmit}
          disabled={isLoading || !cardNumber || !expiry || !cvv}
          sx={{ marginTop: 2, padding: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Make Payment'}
        </Button>
      </Paper>
      <Snackbar
        open={isPaymentSuccessful}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Payment successful!"
      />
    </Container>
  );
};

export default MockPayment;