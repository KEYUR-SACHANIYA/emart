import React, { useEffect, useState } from 'react';
import { TextField, Grid, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../features/auth/authService';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  console.log("user", user)
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const checkError = () => {
    let hasError = false, errorMessage = '';
    if(!/^[\w\.-]+@[\w\.-]+\.\w+$/.test(email)) {
      hasError = true;
      errorMessage = "Invalid email";
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
        const res = await authService.login({
          email,
          password,
        })
        console.log("res",res)
        dispatch(setUser(res.user))
        toast.success("Login successful")
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
      <Grid item xs={12} >
        <Button variant="contained" disabled={!email || !password} color="primary" sx={{ fontSize: "1rem", fontWeight: "bold" }} onClick={onSubmit}>
          Login
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="p" mt={2}>
          Don't have an account? <Link to="/register">Create</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginForm;