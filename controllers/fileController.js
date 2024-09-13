import { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from "../models/file.js";

// Define __dirname
const __dirname=dirname(fileURLToPath(import.meta.url));

export const localFileUpload = async (req, res) => {
  try {
    // Fetch the file from request
    const file = req.files.file;
    console.log("This is the file", file);

    // Define the path where the file will be saved
    let savePath = __dirname+ "/files/"+Date.now().toString()+`.${file.name.split('.')[1]}`;
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
