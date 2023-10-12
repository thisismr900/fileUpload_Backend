//npm init -y; npm i express ; npm i mongoose ;  npm i nodemon ; npm i dotenv

//app create
const express=require("express"); 
const app = express();

//PORT FIND
require("dotenv").config();
const PORT=process.env.PORT || 3000;


//add middleware
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//db connect
const db  = require("./config/database");
db.connect();

//cloud connect
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();

//api route mount
const Upload = require("./routes/FileUpload")
app.use('/api/v1/upload',  Upload);

//activate server

app.listen( PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})




