import React, { useState } from 'react';
import './Login.css'; 
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Store token in localStorage
                setIsSubmitted(true);
                setError('');
                setUsername(''); // Clear input fields
                setPassword('');
            } else {
                setError(data.error || 'Login failed. Check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred while logging in. Please try again later.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotPasswordEmail }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Password reset link has been sent to your email.');
                setShowForgotPassword(false);
                setForgotPasswordEmail(''); // Clear input
            } else {
                alert(data.error || 'Failed to send password reset link. Check the email address.');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            alert('An error occurred while sending the password reset link. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            {!isSubmitted ? (
                <div className="login-form">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="forgot-password-link" onClick={() => setShowForgotPassword(true)}>
                        Forgot Password?
                    </p>
                    <p className="signup-link">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                </div>
            ) : (
                <div className="login-success">
                    <p>You have successfully logged in!</p>
                    <p><a href="/home">Go to Home</a></p>
                </div>
            )}

            {showForgotPassword && (
                <div className="forgot-password-form">
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleForgotPassword}>
                        <label htmlFor="forgot-email">Email</label>
                        <input
                            id="forgot-email"
                            name="forgot-email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        />
                        <button type="submit">Send Reset Link</button>
                        <p className="cancel-link" onClick={() => setShowForgotPassword(false)}>
                            Cancel
                        </p>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Login;
