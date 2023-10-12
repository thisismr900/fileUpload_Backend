//npm i express-fileupload
const File = require("../models/File")
const cloudinary=require("cloudinary").v2

//localFileUpload -> handle function
//client ke pc se data lekar Server mein kisi path par upload kar dega

exports.localFileUpload = async (req,res) =>{
    try{
        //fetch file from request
        const file=req.files.file;
        console.log("File aagyi->",file);

        let serverPath = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[0]}`  ; //PENDING: ADD extentsion
        console.log("ServerPath->",serverPath)

        file.mv(serverPath , (err)=>{
            console.log(err);
        } )

        res.json({
            success:true,
            message:"Local File Uploaded Successfully in Server"
        })
        
    }catch(error){
        console.log(error)
    }
}





function isFileTypeSupported(type,supportedTypes)
{
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality)
{
    const options= {folder};
    if(quality){  //using quality , image is reduced
        options.quality=quality;
    }

    // 0
    
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}


//imageUpload handler
exports.imageFileUpload = async (req,res) =>{
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email)

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg","jpeg ","png"]
        const fileType=file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format unsupported"})
        }
        //file format is supported
        const response = await uploadFileToCloudinary(file , "master");
        console.log(response);

        // db mein entry save krni
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Uploaded to Cloudinary & Database "
        })

    }catch(error){
        console.log("Error in Image Upload")
        res.status(404).json({
            success:false,
            message:"Image Uploading error "
        })
    }
}




//video upload
exports.videoUpload = async (req,res) =>{

    try{
        //fetch data from req
        const {name,tags,email} = req.body;

        const file=req.files.videoFile;

        //validation
        const supportedTypes=["mp4","mov"];
        const fileType= file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)){
            res.status(404).json({
                    success:false,
                    message:"File format not supported "
                })
        }

        //file format is supported
        console.log("Uploading to master cloud in cloudinary");
        const response= await uploadFileToCloudinary(file,"master");

        //db mein entry save karni hai
        const fileData = await File.create({
            name,tags,email,imageUrl: response.secure_url
        })

    }catch(error){
        console.log("Error in Video Upload")
        res.status(404).json({
            success:false,
            message:"Video Uploading error "
        })
    }
}



//imageSizeReducer
exports.imageSizeReducer = async (req,res) =>{
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg","jpeg ","png"]
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format unsupported"})
        }
        //file format is supported
        
        const response = await uploadFileToCloudinary(file , "master",30);
        console.log(response);

        // db mein entry save krni
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Uploaded to Cloudinary & Database "
        })
    }catch(error){
        console.log("Error in Recuced Image Upload")
        res.status(404).json({
            success:false,
            message:"Reduced Image Uploading error "
        })
    }
}
