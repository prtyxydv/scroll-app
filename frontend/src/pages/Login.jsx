import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      navigate('/');
    } catch (err) {
      console.error(err);
      if (!err.response) {
        setError('Cannot reach server. It might be waking up, please try again in 30 seconds.');
      } else {
        setError(err.response?.data?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-zinc-950 px-4">
      <div className="w-full max-w-[400px] bg-app-bg p-8 rounded-[2rem] shadow-2xl border border-zinc-800/50 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight leading-none">Welcome back.</h1>
          <p className="text-zinc-500 text-sm font-medium pt-2">Enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-400 bg-red-400/10 p-4 rounded-2xl text-xs font-bold border border-red-400/20 leading-relaxed animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Identity</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-4 rounded-2xl bg-app-card border border-zinc-800 text-white focus:border-app-accent focus:ring-1 focus:ring-app-accent outline-none transition-all placeholder:text-zinc-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Access Key</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 rounded-2xl bg-app-card border border-zinc-800 text-white focus:border-app-accent focus:ring-1 focus:ring-app-accent outline-none transition-all placeholder:text-zinc-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button 
            disabled={loading}
            className={`w-full p-5 mt-2 bg-zinc-100 hover:bg-white text-zinc-950 font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl transition-all active:scale-[0.98] ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Connecting...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-zinc-500 text-xs font-bold uppercase tracking-widest">
          No account? <Link to="/signup" className="text-white hover:underline ml-1">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
