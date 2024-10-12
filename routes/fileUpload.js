import express from 'express';
import {localFileUpload} from '../controllers/fileController.js';
import {imageUpload} from '../controllers/fileController.js';
import { videoUpload } from '../controllers/fileController.js';
import {imageSizeReducer} from '../controllers/fileController.js';

const router=express.Router();

router.post('/localFileUpload',localFileUpload);
router.post('/imageUpload',imageUpload);
router.post('/videoUpload',videoUpload);
router.post("/imageSizeReducer",imageSizeReducer);

export default router;