import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Toolbar
} from "@mui/material";
import Header from "./Header";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  console.log(cartItems, "cartItems");

  return (
    <Box sx={{ display: "flex" }}>
      <Header drawerWidth={0}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <h2>Your Cart</h2>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.title} (x${item.quantity})`}
                secondary={`Total: $${item.totalPrice}`}
              />
              <Button
                color="secondary"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
        <h3>Total Amount: ${totalAmount}</h3>
        <Button variant="contained" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
