# Problem Statement
Allowing users to upload images and video files into a server

# How it is Achieved
 Used Node.JS server application.
 It uses express and express-file-uploader middleware so as to handle FILE UPLOADs.
 
 The uploaded files are then stored on CLOUDINARY (a cloud based image and video management service)

The application also sends an email who uploaded the file containing a link to the uploaded file
