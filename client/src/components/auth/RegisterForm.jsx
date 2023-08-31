import React, { useEffect, useState } from 'react';
import { TextField, Grid, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../features/auth/authService';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  console.log("user", user)
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [confirmPassword, setConfirmPassword]= useState("");

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, []);

  const checkError = () => {
    let hasError = false, errorMessage = '';
    if(!/^[\w\.-]+@[\w\.-]+\.\w+$/.test(email)) {
      hasError = true;
      errorMessage = "Invalid email";
    } else if(password !== confirmPassword) {
      hasError = true
      errorMessage = "Passwords do not match"
    }
    if(hasError) {
      toast.error(errorMessage)
    }
    return hasError
  }

  const onSubmit = async () => {
    try {
      if(checkError()) {
        return
      } else {
        const res = await authService.register({
          email,
          password,
          confirmPassword
        })
        dispatch(setUser(res.user))
        toast.success("Registration successful")
        navigate("/");
      }
    } catch(error) {
      console.error(error)
      toast.error(error.response.data.error || "Something went wrong")
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} >
        <Button variant="contained" disabled={!email || !password || !confirmPassword} color="primary" sx={{ fontSize: "1rem", fontWeight: "bold" }} onClick={onSubmit}>
          Create
        </Button>
      </Grid>
      <Grid item xs={12} >
        <Typography variant="p" mt={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;