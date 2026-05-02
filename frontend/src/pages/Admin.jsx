import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const Admin = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    whyItMatters: '',
    category: 'Tech'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/news', formData);
      await api.post('/notify', {
        title: `🔥 New in ${formData.category}`,
        message: formData.title
      });
      navigate('/');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-[100dvh] w-full bg-zinc-950 flex justify-center overflow-hidden font-sans">
      <div className="w-full max-w-[400px] relative h-full flex flex-col shadow-2xl shadow-black bg-app-bg pb-20">
        
        {/* Header */}
        <div className="pt-8 pb-4 px-6 flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-800">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Create.</h1>
        </div>

        {/* Form Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6">
          <form onSubmit={handleSubmit} className="space-y-6 pb-10">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Category</label>
              <div className="relative">
                <select 
                  className="w-full p-4 bg-app-card rounded-2xl outline-none border border-zinc-800 text-white focus:border-app-accent transition-all appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Tech</option>
                  <option>Business</option>
                  <option>World</option>
                  <option>Finance</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <Sparkles size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Title</label>
              <input 
                className="w-full p-4 bg-app-card rounded-2xl outline-none border border-zinc-800 text-white focus:border-app-accent transition-all placeholder:text-zinc-700"
                placeholder="Catchy headline..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Summary</label>
              <textarea 
                className="w-full p-4 bg-app-card rounded-2xl outline-none border border-zinc-800 text-white focus:border-app-accent transition-all placeholder:text-zinc-700 h-28 resize-none"
                placeholder="A brief overview..."
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Context</label>
              <textarea 
                className="w-full p-4 bg-app-card rounded-2xl outline-none border border-zinc-800 text-white focus:border-app-accent transition-all placeholder:text-zinc-700 h-24 resize-none"
                placeholder="Why it matters..."
                value={formData.whyItMatters}
                onChange={(e) => setFormData({...formData, whyItMatters: e.target.value})}
                required
              />
            </div>

            <button 
              disabled={loading}
              className={`w-full p-5 bg-app-accent text-white font-bold rounded-2xl shadow-lg shadow-app-accent/20 flex items-center justify-center space-x-3 transition-all active:scale-[0.98] ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}`}
            >
              <Send size={20} />
              <span>{loading ? 'Publishing...' : 'Publish & Notify'}</span>
            </button>
          </form>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default Admin;
