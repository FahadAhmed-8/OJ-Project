// client/src/pages/ProblemDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questionService from '../api/question.service';

const ProblemDetailPage = () => {
    const { id } = useParams(); // Gets the problem ID from the URL
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                {/* This is the placeholder for the code submission box as per the docs [cite: 36, 152] */}
                <div className="h-96 bg-gray-800 text-white p-4 rounded-md">
                    Your code editor will go here.
                </div>
                <button className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ProblemDetailPage;