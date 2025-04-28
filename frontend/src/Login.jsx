import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form-register.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate('/coal');
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className="register-container">
      {/* Left side of the login page (for welcome text) */}
      <div className="register-left-side">
        <div className="register-welcome-container">
          <div className="register-text-container">
            <div className="register-title">Welcome Back!</div>
            <div className="register-subtitle">
              Please log in to continue accessing your dashboard.
            </div>
          </div>
          <div className="register-footer">
            &copy; 2025 JSW
          </div>
        </div>
      </div>

      {/* Right side for the login form */}
      <div className="register-right-side">
        <div className="register-form-container">
          <div className="register-form-header">Sign In</div>
          {/* <div className="register-subtitle">Enter your email and password</div> */}

          <form className="register-form" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="register-input-group">
              <label className="register-input-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
                required
              />
            </div>

            {/* Password Input */}
            <div className="register-input-group">
              <label className="register-input-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="register-sign-in-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
