import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import NewTripPage from "./pages/NewTripPage";
import ParentPage from "./pages/ParentPage";
import { setAuthToken } from "./api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (userData, token) => {
        setUser(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setAuthToken(token);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setAuthToken(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
            setAuthToken(token);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <Router>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Routes>
                {!user ? (
                    <>
                        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Dashboard user={user} onLogout={handleLogout} />} />
                        <Route path="/new-trip" element={<NewTripPage />} />
                        <Route path="/parent" element={<ParentPage user={user} onLogout={handleLogout} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;