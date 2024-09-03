import express from 'express';
import connect from './config/db.js';
import { config } from 'dotenv';

config();

const app=express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});

connect();