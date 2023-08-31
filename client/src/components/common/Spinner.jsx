import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = ({ inline }) => {
  return (
    <Box height={inline ? "100%" :"100vh"} width={inline ? "inherit" :"100%"} display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>
  )
}

export default Spinner