import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form-register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('https://127.0.0.1:8000/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, department }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      navigate('/login');
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left-side">
        <div className="register-welcome-container">
          <div className="register-text-container">
            <h2 className="register-title">Welcome to the Community!</h2>
            <p className="register-subtitle">Create an account to get started</p>
          </div>
        </div>
      </div>

      <div className="register-right-side">
        <div className="register-form-container">
          <h2 className="register-form-header">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="register-input-group">
              <label htmlFor="name" className="register-input-label">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="register-input"
                required
              />
            </div>

            <div className="register-input-group">
              <label htmlFor="email" className="register-input-label">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
                required
              />
            </div>

            <div className="register-input-group">
              <label htmlFor="department" className="register-input-label">Department</label>
              <input
                type="text"
                id="department"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="register-input"
                required
              />
            </div>

            <div className="register-input-group">
              <label htmlFor="password" className="register-input-label">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
                required
              />
            </div>

            <button type="submit" className="register-sign-in-button">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
