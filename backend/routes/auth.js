const express = require("express");
const {
  authenticateController,
  registerController,
} = require("../controllers/authController");

const {
  setProfileController, displayprofilecontroller
} = require("../controllers/setprofileController");
const multer = require("multer");
const path = require("path"); 
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../ecommerce/src/Components/Images/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});


router.post("/register", registerController);
router.put("/setuploadPic",
  upload.single("profilePic"), 
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }
    next();
  }, setProfileController);
  router.get("/getuploadPic", displayprofilecontroller);
router.post("/authenticate", authenticateController);

module.exports = router;


//getuploadPic