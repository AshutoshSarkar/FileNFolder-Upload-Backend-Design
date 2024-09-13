import express from 'express';
import {localFileUpload} from '../controllers/fileController.js';


const router=express.Router();

router.post('/localFileUpload',localFileUpload);

export default router;