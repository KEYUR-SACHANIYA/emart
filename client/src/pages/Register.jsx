import React from "react";
import { Box, Typography } from "@mui/material";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <Box p={4} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h4">
        Register
      </Typography>
      <RegisterForm />
    </Box>
  );
};

export default Register;
