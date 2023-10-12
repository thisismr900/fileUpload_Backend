const mongoose= require("mongoose");  //npm i mongoose 

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL, 
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then(console.log("DB connection successful"))
        .catch( (error)=>{
            console.log("DB connecting issue");
            console.error(error);
            process.exit(1);
        })
}
