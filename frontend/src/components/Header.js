import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Header.css'; 
const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Load dark mode setting from localStorage
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        document.body.classList.toggle('dark-mode', savedMode);

        // Check authentication status from localStorage or session
        const userToken = localStorage.getItem('userToken'); // Adjust based on your implementation
        setIsAuthenticated(!!userToken); // Set authenticated state based on token presence
    }, []);

    const toggleDarkMode = () => {
        // Toggle dark mode and save to localStorage
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.body.classList.toggle('dark-mode', newMode);
    };

    const handleLogout = () => {
        // Clear user token and update authentication status
        localStorage.removeItem('userToken'); // Adjust based on your implementation
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="header">
            <h1 className="header-title">Note-Taking App</h1>
            <nav>
                <ul className="nav-list">
                    <li><Link to="/home" className="nav-link">Home</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
                    <li><Link to="/help" className="nav-link">Help</Link></li>
                    <li><Link to="/notes" className="nav-link">Notes</Link></li>

                    {isAuthenticated ? (
                        <li><button onClick={handleLogout} className="nav-link">Log Out</button></li>
                    ) : (
                        <>
                            <li><Link to="/login" className="nav-link">Log In</Link></li>
                            <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
                        </>
                    )}
                    
                    <li>
                        <button onClick={toggleDarkMode} className="nav-link mode-toggle">
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
