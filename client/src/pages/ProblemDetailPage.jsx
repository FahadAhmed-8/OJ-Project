// client/src/pages/ProblemDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import questionService from '../api/question.service';
import submissionService from '../api/submission.service.js';
import toast from 'react-hot-toast';

// --- 1. Import the new Monaco Editor ---
import MonacoEditor from '@monaco-editor/react';

const ProblemDetailPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [code, setCode] = useState(`// Your code here`);
    const [language, setLanguage] = useState('cpp');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Set default code based on language
        const defaultCode = {
            cpp: `#include <iostream>\n\nint main() {\n    // Your code here\n    return 0;\n}`,
            python: `def main():\n    # Your code here\n\nif __name__ == "__main__":\n    main()`,
        };
        setCode(defaultCode[language]);
    }, [language]);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await questionService.getQuestionById(id);
                setQuestion(response.data);
            } catch (err) {
                setError('Failed to fetch question details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [id]);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const promise = submissionService.submitCode({
            questionId: id,
            code,
            language,
        });

        toast.promise(promise, {
            loading: 'Evaluating your submission...',
            success: (response) => `Verdict: ${response.data.verdict}`,
            error: (err) => `Error: ${err.response?.data?.error || 'Submission failed!'}`,
        });

        try {
            await promise;
        } catch {
            // Error is handled by the toast promise
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading question...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!question) return <div className="text-center mt-10">Question not found.</div>;

    return (
        <div className="flex flex-col md:flex-row container mx-auto p-4 gap-4">
            {/* Left side: Problem Details */}
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <Link to="/problems" className="text-blue-500 hover:underline">&larr; Back to Problems</Link>
                </div>
                <h1 className="text-3xl font-bold mb-2">{question.title}</h1>
                <p className={`inline-block px-3 py-1 text-sm rounded-full mb-4 ${
                    question.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                    question.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                }`}>
                    {question.difficulty}
                </p>
                <div className="prose max-w-none">
                   <p style={{ whiteSpace: 'pre-wrap' }}>{question.description}</p>
                </div>
            </div>

            {/* Right side: Code Submission Area */}
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Submit Your Solution</h2>
                <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)} 
                    className="w-full p-2 border rounded mb-2"
                >
                    <option value="cpp">C++</option>
                    {/* --- 2. Use 'python' for Monaco's language mapping --- */}
                    <option value="python">Python</option>
                </select>

                {/* --- 3. Replace the old Editor with the new MonacoEditor --- */}
                <div className="border rounded-md overflow-hidden">
                    <MonacoEditor
                        height="40vh"
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onChange={(newValue) => setCode(newValue)}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                        }}
                    />
                </div>
                <button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting} 
                    className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                >
                    {isSubmitting ? 'Evaluating...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default ProblemDetailPage;