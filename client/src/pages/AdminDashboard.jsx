// client/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import questionService from "../api/question.service";
import QuestionForm from "../components/QuestionForm"; // Import the new form

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionService.getAllQuestions();
      setQuestions(response.data);
    } catch {
      setError("Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async (questionToEdit = null) => {
    if (questionToEdit) {
      try {
        // Fetch the full, latest details of the question
        const response = await questionService.getQuestionById(
          questionToEdit._id
        );
        setEditingQuestion(response.data); // Set the full data for the form
      } catch {
        setError("Could not fetch question details.");
        return; // Stop if there's an error
      }
    } else {
      // This is for creating a new question, so no initial data
      setEditingQuestion(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editingQuestion) {
        // Update existing question
        await questionService.updateQuestion(editingQuestion._id, formData);
      } else {
        // Create new question
        await questionService.createQuestion(formData);
      }
      fetchQuestions(); // Refresh the list
      handleCloseModal();
    } catch {
      setError("Failed to save question.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await questionService.deleteQuestion(id);
        fetchQuestions(); // Refresh the list
      } catch {
        setError("Failed to delete question.");
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Question
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Manage Questions</h2>
        <ul>
          {questions.map((question) => (
            <li
              key={question._id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-medium">{question.title}</p>
                <p className="text-sm text-gray-500">{question.difficulty}</p>
              </div>
              <div>
                <button
                  onClick={() => handleOpenModal(question)}
                  className="text-sm bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(question._id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <QuestionForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitForm}
        initialData={editingQuestion}
      />
    </div>
  );
};

export default AdminDashboard;
