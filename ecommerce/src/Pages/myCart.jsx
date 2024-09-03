import React, { useState, useEffect } from "react";
import CartService from "../services/myCartService";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  CardActions,
} from "../Components/resuables/style";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  justifyContent: "flex-start",
};

const cardStyle = {
  flex: "1 1 calc(33.333% - 16px)",
  boxSizing: "border-box",
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const fetchCartItems = async () => {
    try {
      const response = await CartService.displaycart(
        getLocalStorageUser().user_id
      );
       
      if (response.data.status === 200) {
        setCartItems(response.data.myCart);
      } else {
        console.log("Failed to fetch cart items.");
      }
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  useEffect(() => {
    setOpenBackdrop(true);
    setTimeout(() => {
      setOpenBackdrop(false);
      fetchCartItems();
    }, 800);
    
  }, []);
  const handledeleteitem = async (postID, userID) => {
    setOpenBackdrop(true);
    setTimeout(() => {
      setOpenBackdrop(false);
      setSnackbarOpen(true);  
      fetchCartItems();
     
        setSnackbarMessage("Item deleted successfully!");
    setSnackbarSeverity("success");
     
    }, 1500);  
    try {
      const response = await CartService.deletecart(
        getLocalStorageUser().user_id,
        postID
      );
      if (response.status === 200) {
      
       
        console.log(`Item ${postID} deleted from the cart successfully.`);
      } else {
        console.log(`Failed to delete item ${postID} to cart.`);
      }
    } catch (error) {
      console.error("Failed to delete item to cart", error);
    }
  };

  
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };


  return (
    <div style={containerStyle}>
      {cartItems.map((item) => (
        <Card
          key={item.post_id}
          sx={{
            ...cardStyle,
            maxWidth: 345,
            marginBottom: 2,
            backgroundColor: "#252523",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {item.name[0]}
              </Avatar>
            }
            title={
              <Typography variant="h6" sx={{ color: "white" }}>
                {item.name}
              </Typography>
            }
          />
          <CardMedia
            component="img"
            height="194"
            image={require(`../Components/PostImages/${item.image}`)} // Adjust image path as needed
            alt={item.name}
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: "white" }}>
              {item.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
            <IconButton
              aria-label="add"
              onClick={() => handledeleteitem(item.post_id, item.user_id)}
            >
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </CardActions>
        </Card>
      ))}
         <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
