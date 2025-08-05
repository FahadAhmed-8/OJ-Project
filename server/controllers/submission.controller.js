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

    let submission;
    let finalVerdict = 'Pending';
    let filePath;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Create the temporary file for the user's code
        filePath = generateFile(language, code);

        // Assume "Accepted" until a test case fails
        finalVerdict = 'Accepted';

        for (const testCase of question.testCases) {
            try {
                const { input, output: expectedOutput } = testCase;
                const actualOutput = await executeCode(filePath, input, language);

                if (actualOutput.trim() !== expectedOutput.trim()) {
                    finalVerdict = 'Wrong Answer';
                    break; // Stop on the first wrong answer
                }
            } catch (executionError) {
                // This catch block handles errors from executeCode (e.g., compilation errors)
                finalVerdict = 'Compilation Error';
                // Use the stderr from the execution error if available, otherwise a generic message
                console.error("Execution/Compilation Error:", executionError.stderr || executionError);
                break; // Stop on the first error
            }
        }
        
        // Save the final result to the database
        submission = await Submission.create({
            userId,
            questionId,
            code,
            language,
            verdict: finalVerdict
        });

        res.status(201).json({ verdict: finalVerdict, submission });

    } catch (error) {
        // This outer catch block handles other errors (e.g., database issues)
        console.error("Server Error:", error);
        // If a submission document was created but an error happened later, update it
        if (submission) {
            submission.verdict = 'Error';
            await submission.save();
        }
        res.status(500).json({ verdict: "Error", error: "An internal server error occurred." });
    }
};