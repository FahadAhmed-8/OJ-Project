// server/controllers/submission.controller.js
import Question from '../models/question.model.js';
import Submission from '../models/submission.model.js';
import { generateFile } from '../compiler/generateFile.js';
import { executeCode } from '../compiler/executeCode.js';

export const handleSubmission = async (req, res) => {
    const { language = 'cpp', code, questionId } = req.body;
    const userId = req.user._id;

    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code!" });
    }

    let filePath;
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        filePath = generateFile(language, code);
        let finalVerdict = 'Accepted';

        for (const testCase of question.testCases) {
            try {
                const { input, output: expectedOutput } = testCase;
                const actualOutput = await executeCode(filePath, input, language);

                if (actualOutput.trim() !== expectedOutput.trim()) {
                    finalVerdict = 'Wrong Answer';
                    break;
                }
            } catch (executionError) {
                // Check for the specific Time Limit Exceeded error string
                if (executionError === "Time Limit Exceeded") {
                    finalVerdict = "Time Limit Exceeded";
                } else {
                    finalVerdict = 'Compilation Error';
                }
                console.error("Execution/Compilation Error:", executionError.stderr || executionError);
                break;
            }
        }
        
        const submission = await Submission.create({
            userId,
            questionId,
            code,
            language,
            verdict: finalVerdict
        });

        res.status(201).json({ verdict: finalVerdict, submission });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ verdict: "Error", error: "An internal server error occurred." });
    }
};