import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Grid,
  Avatar,
  Typography,
  Box,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit"; // Import edit icon
import { styled } from "@mui/material/styles";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import UserService from "../services/UserService";
import PostItemService from "../services/PostItemService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const useStyles = {
  profilePhotos: {
    width: 150,
    height: 150,
    border: "2px solid white",
  },
  uploadIcon: {
    cursor: "pointer",
    color: "white",
  },
  settingsIcon: {
    cursor: "pointer",
    color: "white",
    marginLeft: "10px",
  },
  editIcon: {
    cursor: "pointer",
    color: "red",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
  },
  viewOverlay: {
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover .mask": {
      opacity: 1,
    },
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    transition: "opacity 0.3s",
  },
  flexMenu: {
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    padding: 0,
  },
  flexMenuItem: {
    marginRight: "10px",
    color: "black",
  },
};

const ProfileCard = () => {
  const [profilePic, setProfilePic] = useState("");
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const user_id = getLocalStorageUser().user_id;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    setOpenBackdrop(true);
    setTimeout(() => {
      setOpenBackdrop(false);
      fetchUserProfileAndItems();
    }, 800);
   
  }, []);

  const fetchUserProfileAndItems = () => {
    const userId = getLocalStorageUser().user_id;

    UserService.getUserProfilePic(userId)
      .then((response) => {
        const imageUrl = require(`../Components/Images/${response.data.profilePic}`);
        setProfilePic(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
      });

    PostItemService.displayItemsu(userId)
      .then((response) => {
        const itemsWithImages = response.data.items.result.map((item) => {
          try {
            // Use require to load the image
            item.image = require(`../Components/PostImages/${item.image}`);
          } catch (error) {
            console.error(`Error loading image ${item.image}:`, error);
            item.image = null; // Handle missing image
          }
          return item;
        });
        setItems(itemsWithImages);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const user_id = getLocalStorageUser().user_id;
      const result = await UserService.setUserProfilePic(user_id, file);
      if (result.status === 200) {
        const updatedImageUrl = URL.createObjectURL(file);
        setProfilePic(updatedImageUrl);
      }
    }
  };

  const InputFileUpload = () => {
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    return (
      <div>
        <InsertPhotoIcon
          onClick={handleIconClick}
          style={useStyles.uploadIcon}
        />
        <VisuallyHiddenInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    );
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditedName(item.name);
    setEditedDescription(item.description);
    setPreviewImage(item.image);
    setOpenModal(true);
  };

  const handleSaveEdit = async () => {
    setOpenBackdrop(true);
    const formData = new FormData();
    formData.append("name", editedName);
    formData.append("description", editedDescription);
    if (editedImage) {
      formData.append("image", editedImage);
    }

    try {
      const response = await PostItemService.updateUserPost(editItem.post_id, formData, user_id);
      if (response.data.items.status === 200) {
        setOpenModal(false);
        setTimeout(() => {
          setOpenBackdrop(false);
          setSnackbarOpen(true);  
          fetchUserProfileAndItems();
         
            setSnackbarMessage("Item edited successfully!");
        setSnackbarSeverity("success");
         
        }, 1500);  
       
      } else {
        console.error("Error updating item:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };


  return (
    <main>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item md={20} sx={{ textAlign: "center" }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar src={profilePic} alt="" sx={useStyles.profilePhotos} />
              <Box sx={{ position: "absolute", bottom: 20, right: 25 }}>
                <InputFileUpload />
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            md={91}
            sx={{ justifyContent: "center", textAlign: "center" }}
          >
            <Typography variant="h4" component="h2">
              {getLocalStorageUser().username}
            </Typography>
            <ul style={useStyles.flexMenu}>
              <li style={useStyles.flexMenuItem}>
                <strong>{items.length}</strong> items
              </li>
            </ul>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Box sx={useStyles.viewOverlay}>
                {item.image ? (
                  <img
                    src={item.image}
                    style={{ width: "100%", height: "270px" }}
                    alt={item.name}
                  />
                ) : (
                  <Typography variant="subtitle1" color="error">
                    Image not found
                  </Typography>
                )}
                <Box sx={useStyles.mask}>
                  <ul style={useStyles.flexMenu}>
                    <li style={useStyles.flexMenuItem}>
                      <Typography style={{ color: "white" }}>
                        {item.name}
                      </Typography>
                      <SettingsIcon
                        style={useStyles.settingsIcon}
                        onClick={() => handleEditClick(item)}
                      />
                    </li>
                  </ul>
                </Box>
                <EditIcon
                  style={useStyles.editIcon}
                  onClick={() => handleEditClick(item)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={useStyles.modalStyle}>
          <Typography variant="h6" gutterBottom>
            Edit Item
          </Typography>
          <TextField
            label="Name"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" component="label">
            Upload Image
            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
          </Button>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={handleSaveEdit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
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
    </main>
  );
};

export default ProfileCard;
