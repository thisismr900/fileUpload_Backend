const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
        required:true
    }

})

//post middlewares    !!!!MUST USE BEFORE CREATING MODEL using the fileSchema
//npm i nodemailer
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC :",doc);

        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        //send mail
        let info = await transporter.sendMail({
            from:`master900`,
            to:doc.email,
            subject: "New File uploaded on Cloudinary",
            html:`<h2> Hi </h2>  <p> File uploaded</p>`,
        });

        console.log(info);


    }catch(error){
        console.error(error);

    }
})


const File=mongoose.model("File", fileSchema);
model.emports=File;