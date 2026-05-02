import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import BottomNav from '../components/BottomNav';
import { Bookmark, Trash2 } from 'lucide-react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const { data } = await api.get('/bookmarks');
      setBookmarks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemove = async (newsId) => {
    try {
      await api.post(`/bookmarks/${newsId}`);
      setBookmarks(prev => prev.filter(item => item._id !== newsId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative h-[100dvh] w-full bg-zinc-950 flex justify-center overflow-hidden">
      <div className="w-full max-w-[400px] relative h-full flex flex-col shadow-2xl shadow-black bg-app-bg pb-16">
        
        {/* Header */}
        <div className="pt-8 pb-4 px-6 border-b border-zinc-800/50 bg-app-bg">
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Saved</h1>
          <p className="text-zinc-500 text-sm mt-1">{bookmarks.length} stories</p>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
          {loading ? (
             <div className="flex justify-center py-10">
               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-app-accent"></div>
             </div>
          ) : bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
              <Bookmark size={48} className="text-zinc-600" />
              <p className="text-zinc-400">You haven't saved any stories yet.</p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div key={item._id} className="bg-app-card rounded-2xl p-5 border border-zinc-800/50 flex flex-col space-y-3 relative group">
                <span className="text-[10px] font-bold uppercase tracking-wider text-app-accent">
                  {item.category}
                </span>
                <h3 className="font-semibold text-white leading-snug">
                  {item.title}
                </h3>
                <button 
                  onClick={() => handleRemove(item._id)}
                  className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-400/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default Bookmarks;
