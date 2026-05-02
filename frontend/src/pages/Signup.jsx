import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/signup', { email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-zinc-950 px-4">
      <div className="w-full max-w-[400px] bg-app-bg p-8 rounded-[2rem] shadow-2xl border border-zinc-800/50 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Join Scroll.</h1>
          <p className="text-zinc-500 text-sm font-medium">Create an account to save stories.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-400 bg-red-400/10 p-3 rounded-xl text-sm text-center font-medium border border-red-400/20">{error}</p>}
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full p-4 rounded-xl bg-app-card border border-zinc-800 text-white focus:border-app-accent focus:ring-1 focus:ring-app-accent outline-none transition-all placeholder:text-zinc-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 rounded-xl bg-app-card border border-zinc-800 text-white focus:border-app-accent focus:ring-1 focus:ring-app-accent outline-none transition-all placeholder:text-zinc-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full p-4 mt-2 bg-app-accent hover:bg-blue-400 text-white font-bold rounded-xl shadow-lg shadow-app-accent/20 transition-all active:scale-[0.98]">
            Create Account
          </button>
        </form>

        <p className="text-center text-zinc-500 text-sm">
          Already have an account? <Link to="/login" className="text-white font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
