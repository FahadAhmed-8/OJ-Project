import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import questionRoutes from './routes/question.routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// 2. USE THE ROUTES
// This line tells Express: "For any URL starting with /api/auth,
// use the rules defined in the authRoutes file."
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));