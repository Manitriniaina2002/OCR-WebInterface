import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignIn from './components/SignInForm';
import SignUp from './components/SignupForm';
import Acceuil from './pages/Acceuil';
import ScannerPage from './pages/Scanner';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <Routes>
            <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/acceuil" element={<Acceuil />} />
            <Route path="/scanner" element={<ScannerPage />} />
          </Routes>
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-3xl">Bienvenue dans l'application OCR !</h1>
        </div>
      )}
    </div>
  );
}

export default App;


