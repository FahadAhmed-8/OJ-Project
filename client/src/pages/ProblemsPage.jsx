// client/src/pages/ProblemsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionService from '../api/question.service';

const ProblemsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await questionService.getAllQuestions();
                setQuestions(response.data);
            } catch (err) {
                setError('Failed to fetch problems.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading problems...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">All Problems</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                <ul>
                    {questions.map((question) => (
                        <li key={question._id} className="border-b last:border-b-0 py-3">
                            <Link
                                to={`/problems/${question._id}`}
                                className="flex justify-between items-center hover:bg-gray-50 p-2 rounded"
                            >
                                <span className="font-medium text-lg text-blue-600 hover:underline">
                                    {question.title}
                                </span>
                                <span className={`px-2 py-1 text-sm rounded-full ${
                                    question.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                                    question.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                                    'bg-red-200 text-red-800'
                                }`}>
                                    {question.difficulty}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProblemsPage;