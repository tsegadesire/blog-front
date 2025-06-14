import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10 space-y-4 p-4 border rounded">
      <h2 className="text-xl font-bold">Register</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 border"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
