import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Plus, 
  Edit2, 
  Trash2, 
  TrendingUp, 
  ThumbsUp, 
  Bookmark, 
  X,
  ArrowLeft
} from 'lucide-react';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [allNews, setAllNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    whyItMatters: '',
    category: 'Tech'
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const analyticsRes = await api.get('/news/analytics');
      setAnalytics(analyticsRes.data);
      
      const newsRes = await api.get('/news?limit=50');
      setAllNews(newsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (news) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      summary: news.summary,
      whyItMatters: news.whyItMatters,
      category: news.category
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/news/${id}`);
        fetchData();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await api.put(`/news/${editingNews._id}`, formData);
      } else {
        await api.post('/news', formData);
      }
      setShowModal(false);
      setEditingNews(null);
      fetchData();
    } catch (err) {
      alert('Operation failed');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/')} className="p-2 bg-zinc-900 rounded-full border border-zinc-800">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          </div>
          <button 
            onClick={() => { setEditingNews(null); setFormData({title:'', summary:'', whyItMatters:'', category:'Tech'}); setShowModal(true); }}
            className="flex items-center space-x-2 bg-app-accent hover:bg-blue-400 text-white px-4 py-2 rounded-xl font-bold transition-all"
          >
            <Plus size={20} />
            <span>Create News</span>
          </button>
        </header>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-app-card p-6 rounded-2xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Likes</span>
              <ThumbsUp size={18} />
            </div>
            <p className="text-3xl font-black">{analytics?.stats?.totalLikes || 0}</p>
          </div>
          <div className="bg-app-card p-6 rounded-2xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Saved</span>
              <Bookmark size={18} />
            </div>
            <p className="text-3xl font-black">{analytics?.stats?.totalBookmarks || 0}</p>
          </div>
          <div className="bg-app-card p-6 rounded-2xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Articles</span>
              <BarChart3 size={18} />
            </div>
            <p className="text-3xl font-black">{analytics?.stats?.totalArticles || 0}</p>
          </div>
        </div>

        {/* Article List */}
        <div className="bg-app-card rounded-3xl border border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center space-x-2">
            <TrendingUp size={20} className="text-app-accent" />
            <h2 className="text-xl font-bold">Recent Content</h2>
          </div>
          <div className="divide-y divide-zinc-800">
            {allNews.map((news) => (
              <div key={news._id} className="p-6 flex items-center justify-between hover:bg-zinc-900/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-app-accent bg-app-accent/10 px-2 py-0.5 rounded">
                      {news.category}
                    </span>
                    <span className="text-zinc-500 text-xs">{new Date(news.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold text-lg">{news.title}</h3>
                  <div className="flex items-center space-x-4 text-xs text-zinc-500">
                    <span className="flex items-center space-x-1">
                      <ThumbsUp size={12} />
                      <span>{news.likesCount}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Bookmark size={12} />
                      <span>{news.bookmarksCount}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEdit(news)} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(news._id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-app-card w-full max-w-lg rounded-[2.5rem] border border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{editingNews ? 'Edit Article' : 'New Article'}</h2>
                <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Title</label>
                  <input 
                    className="w-full p-4 bg-zinc-900 rounded-2xl border border-zinc-800 focus:border-app-accent outline-none text-white"
                    placeholder="Headline"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Category</label>
                    <select 
                      className="w-full p-4 bg-zinc-900 rounded-2xl border border-zinc-800 focus:border-app-accent outline-none text-white appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Tech</option>
                      <option>Business</option>
                      <option>Finance</option>
                      <option>World</option>
                      <option>Sports</option>
                      <option>Politics</option>
                      <option>Crypto</option>
                      <option>Startups</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Summary</label>
                  <textarea 
                    className="w-full p-4 bg-zinc-900 rounded-2xl border border-zinc-800 focus:border-app-accent outline-none text-white h-24 resize-none"
                    placeholder="Short description"
                    value={formData.summary}
                    onChange={(e) => setFormData({...formData, summary: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Context (Why it matters)</label>
                  <textarea 
                    className="w-full p-4 bg-zinc-900 rounded-2xl border border-zinc-800 focus:border-app-accent outline-none text-white h-20 resize-none"
                    placeholder="Key impact"
                    value={formData.whyItMatters}
                    onChange={(e) => setFormData({...formData, whyItMatters: e.target.value})}
                    required
                  />
                </div>
                <button className="w-full p-5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-2xl transition-all shadow-xl">
                  {editingNews ? 'Update Post' : 'Publish Article'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
