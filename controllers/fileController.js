import { dirname } from "path";
import { fileURLToPath } from "url";
import User from "../models/file.js";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";

config();

// Define __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

export const localFileUpload = async (req, res) => {
  try {
    // Fetch the file from request
    const file = req.files.file;
    console.log("This is the file", file);

    // Define the path where the file will be saved
    let savePath =
      __dirname +
      "/files/" +
      Date.now().toString() +
      `.${file.name.split(".")[1]}`;
    console.log("This is the path", savePath);

    // Move the file to the path
    file.mv(savePath, (error) => {
      if (error) {
        console.log("This is the error", error);
        return res.status(500).json({
          message: "File not uploaded",
          success: false,
          error: error.message,
        });
      }

      // Send successful response
      res.json({
        message: "File uploaded successfully",
        success: true,
      });
    });
  } catch (error) {
    console.log("This is the error", error);
    res.status(400).json({
      message: "File not uploaded",
      success: false,
      error: error.message,
    });
  }
};

//to check the file type supported
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

//function to upload image to clourinary
async function uploadImageFile(file, folder,quality) {
  
  const options = { folder };
  if(quality){
    options.quality = quality;
  }
  console.log("temp file path", file.tempFilePath);
  options.resource_type = "auto"; 
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload to cloudinary handler
export const imageUpload = async (req, res) => {
  try {
    //data from the request body
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    //fetch the file from the request
    const file = req.files.imageFile;
    console.log(file);

    //validation for file type
    const supportedTypes = ["jpg", "jpeg", "png", "pdf"];

    //check the file type
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("this is file type", fileType);

    //check if the file type is not supported

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        message: "File type not supported",
        success: false,
      });
    }

    //upload the image to cloudinary
    const response = await uploadImageFile(file, "filenfolder");
    console.log(response);

    //create entry in the database

    const fileData = new User({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    await fileData.save();
    //send file response to database

    //send file response
    res.json({
      success: true,
      message: "File uploaded successfully",
      data: response,
    });
  } catch (error) {
    console.log("This is the error", error);
    res.status(400).json({
      message: "File not uploaded",
      success: false,
      error: error.message,
    });
  }
};

export const videoUpload = async (req, res) => {
  try {
    //fetch the information from the request
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    //fetch the file from the request
    const file = req.files.videoFile;

    //validation for file type
    const supportedTypes = ["mp4", "mov"];

    //check the file type
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("this is file type", fileType);

    //check if the file type is not supported

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        message: "File type not supported",
        success: false,
      });
    }

    //upload the video to cloudinary
    console.log("Uploading video to cloudinary");
    const response = await uploadImageFile(file, "filenfolder");
    console.log(response);

    //create entry in the database

    const fileData = new User({
      name,
      tags,
      email,
      videoUrl: response.secure_url,
    });

    await fileData.save();
    //send file response to database
    res.json({
      success:true,
      videoUrl: response.secure_url,
      message: "video uploaded successfully",
    });

  } catch (error) {
    console.log("This is the error", error);
    res.status(400).json({
      message: "File not uploaded",
      success: false,
      error: error.message,
    });
  }
};

export const imageSizeReducer = async (req, res) => {
  const { name, tags, email } = req.body;
  console.log(name, tags, email);

  //fetch the file from the request
  const file = req.files.imageFile;
  console.log(file);

  //validation for file type
  const supportedTypes = ["jpg", "jpeg", "png", "pdf"];

  //check the file type
  const fileType = file.name.split(".")[1].toLowerCase();
  console.log("this is file type", fileType);

  //check if the file type is not supported

  if (!isFileTypeSupported(fileType, supportedTypes)) {
    return res.status(400).json({
      message: "File type not supported",
      success: false,
    });
  }

  //upload the image to cloudinary
  console.log("Uploading image to cloudinary");
  const response = await uploadImageFile(file, "filenfolder",20);
  console.log(response);

  //create entry in the database

  const fileData = new User({
    name,
    tags,
    email,
    imageUrl: response.secure_url,
  });

  await fileData.save();
  //send file response to database

  //send file response
  res.json({
    success: true,
    message: "File uploaded successfully",
    data: response,
  });
};