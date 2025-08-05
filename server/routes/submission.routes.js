// server/routes/submission.routes.js
import express from 'express';
import { handleSubmission } from '../controllers/submission.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').post(protect, handleSubmission);

export default router;