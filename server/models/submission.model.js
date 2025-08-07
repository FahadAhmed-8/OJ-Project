// server/models/submission.model.js
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    verdict: { type: String, enum: ['Pending', 'Accepted', 'Wrong Answer', 'Error', 'Compilation Error', 'Time Limit Exceeded',] , default: 'Pending' },
    submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;