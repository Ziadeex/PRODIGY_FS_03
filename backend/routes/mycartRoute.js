const express = require("express");
const { 
    deleteMyCartcontroller,
    displayMyCartcontroller,
    addMyCartcontroller
} = require("../controllers/myCartController");

const router = express.Router();
 

router.delete("/deleteMyCart", deleteMyCartcontroller);
router.get("/displayMyCart", displayMyCartcontroller);
router.post("/addMyCart", addMyCartcontroller);

  
module.exports = router;


//getuploadPic