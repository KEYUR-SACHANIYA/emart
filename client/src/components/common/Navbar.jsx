import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { History } from '@mui/icons-material'
import { ExitToApp } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { resetUser } from "../../features/auth/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "lightskyblue" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h4" component="div" onClick={() => {
            navigate("/"); 
            setValue(null);
          }}>
            E-Mart
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab
              value="two"
              label="Mobile"
              LinkComponent={Link}
              to="/mobile"
            />
            <Tab
              value="three"
              label="Laptop"
              LinkComponent={Link}
              to="/laptop"
            />
          </Tabs>
          <Box display="flex" gap={1}>
            <Link to="/cart">
              <ShoppingCartIcon sx={{ fontSize: "35px", color: "white" }} />
            </Link>
            <Link to="/purchase-history">
              <History sx={{ fontSize: "35px", color: "white" }} />
            </Link>
            <Link to="/login" onClick={() => dispatch(resetUser())}>
              <ExitToApp  sx={{ fontSize: "35px", color: "white" }} />
            </Link>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
