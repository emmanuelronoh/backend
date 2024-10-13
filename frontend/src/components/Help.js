import React, { useState, useEffect } from 'react';
import './Help.css'; // Import the CSS file for styling

function Help() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Load the theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        // Save the theme to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <div className={`help-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>


            <h1>Help & Support</h1>
            
            <section className="help-section">
                <h2>Getting Started</h2>
                <p>Welcome to the Note-Taking App! Here’s how to get started:</p>
                <ol>
                    <li><strong>Sign Up:</strong> Click on the "Sign Up" button on the homepage. Enter your email and create a password to create a new account.</li>
                    <li><strong>Log In:</strong> Once you have an account, click on "Log In." Enter your email and password to access your notes.</li>
                    <li><strong>Create a Note:</strong> After logging in, go to the "Notes" section. Click on "Add Note" to start a new note.</li>
                    <li><strong>Edit or Delete Notes:</strong> In the "Notes" section, select a note to edit or delete it. Use the "Edit" or "Delete" buttons to modify or remove your notes.</li>
                    <li><strong>Search Notes:</strong> Use the search bar to quickly find notes by title or content.</li>
                </ol>
            </section>

            <section className="help-section">
                <h2>Features</h2>
                <p>Our app includes the following features:</p>
                <ul>
                    <li><strong>Organize Notes:</strong> Group your notes by tags or categories.</li>
                    <li><strong>Rich Text Editor:</strong> Format your notes with bold, italic, and other text styles.</li>
                    <li><strong>Search Functionality:</strong> Easily find notes with our search feature.</li>
                    <li><strong>Notes Backup:</strong> Your notes are automatically saved to your account.</li>
                </ul>
            </section>

            <section className="help-section">
                <h2>Troubleshooting</h2>
                <p>If you encounter issues, try the following solutions:</p>
                <ul>
                    <li><strong>Cannot Log In:</strong> Ensure your email and password are correct. If you've forgotten your password, use the "Forgot Password" link to reset it.</li>
                    <li><strong>Notes Not Saving:</strong> Check your internet connection. If the problem persists, try logging out and logging back in.</li>
                    <li><strong>App Crashing:</strong> Ensure you are using the latest version of the app. If the issue continues, contact support.</li>
                </ul>
            </section>

            <section className="help-section">
                <h2>Contact Support</h2>
                <p>If you need further assistance, please reach out to our support team:</p>
                <ul>
                    <li><strong>Email:</strong> <a href="mailto:support@notetakingapp.com">support@notetakingapp.com</a></li>
                    <li><strong>Phone:</strong> +254-123-4567</li>
                    <li><strong>Support Hours:</strong> Monday to Friday, 9 AM - 5 PM (PST)</li>
                </ul>
            </section>

            <section className="help-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq">
                    <h3>How do I delete my account?</h3>
                    <p>To delete your account, go to the "Account Settings" page and click "Delete Account." Please note that this action is irreversible.</p>
                    
                    <h3>Can I recover deleted notes?</h3>
                    <p>Currently, once a note is deleted, it cannot be recovered. Please ensure that you want to delete the note before confirming.</p>
                </div>
            </section>
        </div>
    );
}

export default Help;
