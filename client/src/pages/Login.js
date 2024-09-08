import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      history.push('/');
    } catch (error) {
      setError('Failed to log in: ' + error.message);
    }
  };

  return (
    <div className="login">
      <div className="login__background">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
      </div>
      <div className="login__gradient" />
      <div className="login__body">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {error && <div className="login__error">{error}</div>}
          <input
            type="email"
            placeholder="Email or phone number"
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
          <button type="submit">Sign In</button>
          <div className="login__help">
            <div className="login__remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password">Need help?</Link>
          </div>
          <div className="login__signup">
            <span>New to Netflix? </span>
            <Link to="/signup">Sign up now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
