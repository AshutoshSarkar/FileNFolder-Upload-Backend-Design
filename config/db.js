import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connect = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log("error connecting to database");
      console.error(error);
      process.exit(1);
    });
};

export default connect;
