import { Box, Modal } from "@mui/material";
import React from "react";
import MockPayment from "./MockPayment";

const CheckOutModal = ({ open, handleClose, cartItems }) => {

  const totalAmount = cartItems.reduce((prev, next) => prev += next.quantity * next.productId.price , 0)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 id="modal-title" >Your Bill is : ${totalAmount}</h2>
        <p id="modal-description">
            <MockPayment />
        </p>
      </Box>
    </Modal>
  );
};

export default CheckOutModal;
