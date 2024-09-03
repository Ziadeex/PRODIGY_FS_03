const express = require("express");
const { 
    setItemController,
    displayItemcontroller,displayItemcontrolleru,displayItemcontrollerue
} = require("../controllers/itemController");

 
const multer = require("multer");
const path = require("path"); 
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../ecommerce/src/Components/PostImages/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});


router.post("/postItem",
  upload.single("profilePic"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "Nothing received" });
    }
    next();
  }, setItemController);
router.get("/displayItems", displayItemcontroller);

router.put(`/updateitem`, upload.single("image"),
displayItemcontrollerue);
router.get("/displayItemsu", displayItemcontrolleru);
  
module.exports = router;


//getuploadPic