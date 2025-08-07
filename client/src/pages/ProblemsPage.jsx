// client/src/pages/ProblemsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionService from '../api/question.service';

const ProblemsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for search and filter
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('All');

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

    // Apply filters and search to the list of questions
    const filteredQuestions = questions
        .filter(question => 
            question.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(question => 
            difficultyFilter === 'All' || question.difficulty === difficultyFilter
        );

    if (loading) return <div className="text-center mt-10">Loading problems...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">All Problems</h1>

            {/* Filter and Search Controls */}
             <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Bar */}
                    <input 
                        type="text"
                        placeholder="Search by title..."
                        className="flex-grow p-2 border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* Difficulty Filters */}
                    <div className="flex items-center space-x-2 flex-wrap">
                        <span className="font-medium">Difficulty:</span>
                        {['All', 'Easy', 'Medium', 'Hard'].map(level => (
                            <button
                                key={level}
                                onClick={() => setDifficultyFilter(level)}
                                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                    difficultyFilter === level 
                                        ? 'bg-blue-500 text-white shadow' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Problems List */}
            <div className="bg-gray-800 shadow-md rounded-lg p-4">
                <ul>
                    {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((question) => (
                            <li key={question._id} className="border-b last:border-b-0 py-3">
                                <Link
                                    to={`/problems/${question._id}`}
                                    className="flex justify-between items-center hover:bg-gray-400 p-2 rounded-2xl transition-colors"
                                >
                                    <span className="font-medium text-lg text-white hover:underline">
                                        {question.title}
                                    </span>
                                    <span className={`px-2 py-1 text-sm rounded-full font-medium ${
                                        question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                        question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {question.difficulty}
                                    </span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 py-4">No problems found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ProblemsPage;