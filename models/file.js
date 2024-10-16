import mongoose from "mongoose";
import { config } from "dotenv";
import nodemailer from "nodemailer";

config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//post middleware to send the email
fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC", doc);

    //transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    //send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Ashutosh Sarkar",
      to: doc.email,
      subject: "File uploaded successfully on cloudinary",
      html:` <h2>hii guys</h2> <p>file uploaded view here : <a href="${doc.imageUrl}"> Click Here to Watch</a></p>`,
    });

    console.log("info", info);
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File ", fileSchema);

export default File;
