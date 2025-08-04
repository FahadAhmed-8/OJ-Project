// server/routes/question.routes.js
import express from 'express';
const router = express.Router();
import {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
} from '../controllers/question.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';

// === Public Routes ===
// Anyone can see the list of questions and individual questions
router.route('/').get(getAllQuestions);
router.route('/:id').get(getQuestionById);

// === Admin-Only Routes ===
// To create, update, or delete, you must be logged in AND be an admin.
// We chain the middlewares: first 'protect' checks for a valid token,
// then 'isAdmin' checks for the admin role.
router.route('/').post(protect, isAdmin, createQuestion);
router.route('/:id').put(protect, isAdmin, updateQuestion);
router.route('/:id').delete(protect, isAdmin, deleteQuestion);

export default router;