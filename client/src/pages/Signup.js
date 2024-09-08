import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      await signup(email, password);
      history.push('/');
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    }
  };

  return (
    <div className="signup">
      <div className="signup__background">
        <img
          className="signup__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
      </div>
      <div className="signup__gradient" />
      <div className="signup__body">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          {error && <div className="signup__error">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <div className="signup__login">
            <span>Already have an account? </span>
            <Link to="/login">Sign in now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;