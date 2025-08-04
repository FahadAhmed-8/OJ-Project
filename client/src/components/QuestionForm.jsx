// client/src/components/QuestionForm.jsx
import React, { useState, useEffect } from 'react';

const QuestionForm = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('Easy');
    const [testCases, setTestCases] = useState([{ input: '', output: '' }]);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setDifficulty(initialData.difficulty || 'Easy');
            setTestCases(initialData.testCases.length > 0 ? initialData.testCases : [{ input: '', output: '' }]);
        } else {
            // Reset form for creating a new question
            setTitle('');
            setDescription('');
            setDifficulty('Easy');
            setTestCases([{ input: '', output: '' }]);
        }
    }, [initialData, isOpen]);

    const handleTestCaseChange = (index, event) => {
        const values = [...testCases];
        values[index][event.target.name] = event.target.value;
        setTestCases(values);
    };

    const addTestCase = () => {
        setTestCases([...testCases, { input: '', output: '' }]);
    };

    const removeTestCase = (index) => {
        const values = [...testCases];
        values.splice(index, 1);
        setTestCases(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, difficulty, testCases });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Question' : 'Add New Question'}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" rows="4" required></textarea>
                    </div>
                    {/* Difficulty */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Difficulty</label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 border rounded">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    {/* Test Cases */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
                        {testCases.map((testCase, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2 p-2 border rounded">
                                <textarea name="input" placeholder="Input" value={testCase.input} onChange={(e) => handleTestCaseChange(index, e)} className="w-1/2 p-2 border rounded" rows="2" required></textarea>
                                <textarea name="output" placeholder="Output" value={testCase.output} onChange={(e) => handleTestCaseChange(index, e)} className="w-1/2 p-2 border rounded" rows="2" required></textarea>
                                <button type="button" onClick={() => removeTestCase(index)} className="bg-red-500 text-white p-2 rounded">-</button>
                            </div>
                        ))}
                        <button type="button" onClick={addTestCase} className="bg-green-500 text-white px-3 py-1 rounded">Add Test Case</button>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuestionForm;