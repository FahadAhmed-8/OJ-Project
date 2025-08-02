import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      {/* Set the register page as the default route for now */}
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Add a placeholder for a protected dashboard page */}
      <Route path="/dashboard" element={<div>Welcome! You are logged in.</div>} />
    </Routes>
  );
}

export default App;