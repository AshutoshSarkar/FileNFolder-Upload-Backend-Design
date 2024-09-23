import express from 'express';
import {localFileUpload} from '../controllers/fileController.js';
import {imageUpload} from '../controllers/fileController.js';

const router=express.Router();

router.post('/localFileUpload',localFileUpload);
router.post('/imageUpload',imageUpload);

export default router;