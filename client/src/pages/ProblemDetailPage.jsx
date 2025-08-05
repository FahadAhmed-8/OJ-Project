// client/src/pages/ProblemDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questionService from '../api/question.service';
import Editor from 'react-simple-code-editor';
// --- Start of Corrected PrismJS Imports ---
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
// Using a different theme that is often more reliable
import 'prismjs/themes/prism-okaidia.css'; 
// --- End of Corrected PrismJS Imports ---
import submissionService from '../api/submission.service.js';

const ProblemDetailPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [code, setCode] = useState(`#include <iostream>\n\nint main() {\n    // Your code here\n    return 0;\n}`);
    const [language, setLanguage] = useState('cpp');
    const [verdict, setVerdict] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setVerdict('');
        try {
            const response = await submissionService.submitCode({
                questionId: id,
                code,
                language,
            });
            setVerdict(response.data.verdict);
        } catch {
            setVerdict('Error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading question...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!question) return <div className="text-center mt-10">Question not found.</div>;

    return (
        <div className="flex space-x-4 container mx-auto p-4">
            {/* Left side: Problem Details */}
            <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-2">{question.title}</h1>
                <p className={`inline-block px-3 py-1 text-sm rounded-full mb-4 ${
                    question.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                    question.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                }`}>
                    {question.difficulty}
                </p>
                <div className="prose max-w-none">
                   <p>{question.description}</p>
                </div>
            </div>

            {/* Right side: Code Submission Area */}
            <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Submit Your Solution</h2>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-2 border rounded mb-2">
                    <option value="cpp">C++</option>
                    <option value="py">Python</option>
                </select>
                <div className="border rounded bg-[#272822]">
                    <Editor
                        value={code}
                        onValueChange={code => setCode(code)}
                        // --- Use Prism directly for highlighting ---
                        highlight={code => Prism.highlight(code, Prism.languages[language], language)}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 14,
                            minHeight: '300px',
                        }}
                    />
                </div>
                <button onClick={handleSubmit} disabled={isSubmitting} className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300">
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {verdict && (
                    <div className={`mt-4 p-4 rounded text-center font-bold ${verdict === 'Accepted' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        Verdict: {verdict}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemDetailPage;