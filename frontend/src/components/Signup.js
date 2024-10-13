import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file for styling

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setIsSubmitted(true);
            setError('');
        } else {
            setError(data.error || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
                {!isSubmitted ? (
                    <>
                        <h1>Sign Up</h1>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error">{error}</p>}
                        <button type="submit">Sign up</button>
                    </>
                ) : (
                    <p>Signup successful! You can now log in.</p>
                )}
            </form>
        </div>
    );
}

export default Signup;
