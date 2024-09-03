import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { makeStyles } from "@mui/styles";
import PostItemService from "../services/PostItemService";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles(() => ({
  uploadIcon: {
    fontSize: "20px",
    cursor: "pointer",
  },
}));

const SoldItems = () => {
  const classes = useStyles();
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const InputFileUpload = () => {
    const fileInputRef = React.useRef(null);

    const handleIconClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    return (
      <div>
        Uploads
        <InsertPhotoIcon
          onClick={handleIconClick}
          className={classes.uploadIcon}
        />
        <VisuallyHiddenInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    );
  };

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

  const handlepostitem = async (e) => {
    e.preventDefault();
    // setLoading(true);
    setOpenBackdrop(true);

    const result = await PostItemService.postItem(
      getLocalStorageUser().user_id,
      name,
      description,
      profilePic
    ).catch((error) => { });
    console.log(`result sold items ${JSON.stringify(result)}`)

    if (result.status === 200) {
      setTimeout(() => {
        setOpenBackdrop(false);
        setSnackbarOpen(true);  
        
          setSnackbarMessage("Item Posted successfully!");
      setSnackbarSeverity("success");
       
      }, 1500);  
      
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div
      className="container"
      style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}
    >
      <div className="layout_padding2">
        <Card
          style={{ padding: "20px", boxShadow: "none", borderRadius: "8px" }}
        >
          <form onSubmit={handlepostitem}>
            <Card.Body>
              <TextField
                id="outlined-basic"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                style={{ width: "100%", marginBottom: "20px" }}
                InputLabelProps={{
                  style: { color: "#000000" },
                }}
                InputProps={{
                  style: { color: "#000000" },
                }}
              />

              <TextField
                id="Description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={8}
                style={{ width: "100%", marginBottom: "20px" }}
                InputLabelProps={{
                  style: { color: "#000000" },
                }}
                InputProps={{
                  style: { color: "#000000" },
                }}
              />

              <InputFileUpload />

              <div style={{ paddingTop: "20px", textAlign: "center" }}>
                <Fab
                  variant="extended"
                  style={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                  }}
                  type="submit"
                >
                  SELL
                </Fab>
              </div>
            </Card.Body>
          </form>
        </Card>
      </div>
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

export default SoldItems;
