import express from 'express';
import connect from './config/db.js';
import { config } from 'dotenv';
import fileUpload from 'express-fileupload';
import { cloudinaryConnect } from './config/cloud.js';
import upload from './routes/fileUpload.js';
config();

const app=express();
app.use(express.json());
app.use(fileUpload({
     useTempFiles:true,
    tempFileDir:'/tmp/',
}
   
));

cloudinaryConnect();

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});

app.use('/api/v1/',upload);

connect();