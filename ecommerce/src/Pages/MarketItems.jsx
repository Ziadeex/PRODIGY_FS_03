import {
  React,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
} from "../Components/resuables/style";
import PostItemService from "../services/PostItemService";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";  
import CartService from "../services/myCartService";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
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

const ItemCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
       
        const response = await PostItemService.displayItems();
         
        setItems(response.data.items);
        console.log(`jsonddfkjd   ${JSON.stringify(response.data.status_s)}`)
        if (response.data.status_s === 200) {
          console.log(`pass`)
         
        }
      } catch (error) {
        console.error("Failed to fetch items", error);
      }
    };
    setOpenBackdrop(true);
    setTimeout(() => {
      setOpenBackdrop(false);
        fetchItems();
    }, 1500);
   
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = async (postID) => {
    setOpenBackdrop(true);
   
    
    try {
      const response = await CartService.addcart(
        getLocalStorageUser().user_id,
        postID
      );
      if (response.status === 200) {
        setTimeout(() => {
          setOpenBackdrop(false);
          setSnackbarMessage("Item Added successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        }, 1800);
        console.log(`Item ${postID} added to cart successfully.`);
      } else {
        console.log(`Failed to add item ${postID} to cart.`);
      }
    } catch (error) {
      console.error("Failed to add item to cart", error);
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
      {Array.isArray(items) ? (
        items.map((item) => (
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
                onClick={() => handleAddToCart(item.post_id)}
              >
                <AddIcon sx={{ color: "white" }} />
              </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <Card
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
                {items.name[0]}
              </Avatar>
            }
            title={
              <Typography variant="h6" sx={{ color: "white" }}>
                {items.name}
              </Typography>
            }
          />
          <CardMedia
            component="img"
            height="194"
            image={`../Components/PostImages/${items.image}`} // Adjust image path as needed
            alt={items.name}
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: "white" }}>
              {items.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
            <IconButton
              aria-label="add"
              onClick={() => console.log(`Add ${items.name}`)}
            >
              <AddIcon sx={{ color: "white" }} />
            </IconButton>
          </CardActions>
        </Card>
      )}
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

export default ItemCard;
