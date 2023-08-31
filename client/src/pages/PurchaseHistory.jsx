import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Toolbar,
  AppBar,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../features/orders/ordersSlice";
import ordersService from "../features/orders/ordersService";

const PurchaseHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  const handleSearch = async () => {
    try {
      const orders = await ordersService.fetchOrdersByDate(user._id, startDate, endDate);
      dispatch(setOrders(orders));
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.error || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await ordersService.fetchOrdersByUserId(user._id);
        dispatch(setOrders(orders));
      } catch (error) {
        console.error(error)
        toast.error(error.response.data.error || "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [dispatch, user._id]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "lightskyblue" }}>
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" color="white">
              <ArrowBack />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Purchase History
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" disabled={!startDate || !endDate} color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 3 }} />
        <Typography variant="h6" gutterBottom>
          Purchase History Results
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{item.productId.title}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.productId.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {!orders.length && !isLoading &&
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default PurchaseHistory;
