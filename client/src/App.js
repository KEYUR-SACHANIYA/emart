import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import PurchaseHistory from "./pages/PurchaseHistory";
import Protected from "./components/auth/Protected";
import Private from "./components/auth/Private";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Toaster toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/login" element={<Private><Login /></Private>} />
          <Route path="/register" element={<Private><Register /></Private>} />
          <Route path="/:category" element={<Protected><Home /></Protected>} />
          <Route path="/cart" element={<Protected><Cart /></Protected>} />
          <Route path="/purchase-history" element={<Protected><PurchaseHistory /></Protected>} />
          <Route path="*" element={<Protected><Home /></Protected>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
