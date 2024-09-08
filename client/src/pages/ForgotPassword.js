import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError('Failed to reset password: ' + error.message);
    }
  };

  return (
    <div className="forgotPassword">
      <div className="forgotPassword__background">
        <img
          className="forgotPassword__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
      </div>
      <div className="forgotPassword__gradient" />
      <div className="forgotPassword__body">
        <form onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          {error && <div className="forgotPassword__error">{error}</div>}
          {message && <div className="forgotPassword__message">{message}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          <div className="forgotPassword__help">
            <Link to="/login">Back to Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
