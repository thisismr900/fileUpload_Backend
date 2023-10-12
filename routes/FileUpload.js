//express ka instance se router le ao
const express = require("express")
const router= express.Router();

const {localFileUpload,imageFileUpload, videoUpload,imageSizeReducer} = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload",localFileUpload);
router.post("/imageFileUpload",imageFileUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageSizeReducer",imageSizeReducer);


module.exports=router;