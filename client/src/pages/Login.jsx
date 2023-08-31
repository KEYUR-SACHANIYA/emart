import React from "react";
import { Box, Typography } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <Box p={4} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h4">
        Login
      </Typography>
      <LoginForm />
    </Box>
  );
};

export default Login;