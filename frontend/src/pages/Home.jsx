import React, { useEffect, useState, useRef, useCallback } from 'react';
import api from '../api/axios';
import NewsCard from '../components/NewsCard';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import { LogOut, Sun, Coins, TrendingUp, ChevronDown } from 'lucide-react';

const categories = ['All', 'Tech', 'Business', 'Finance', 'World', 'Sports', 'Politics', 'Crypto', 'Startups'];

const Home = () => {
  const [news, setNews] = useState([]);
  const [trending, setTrending] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [likedNews, setLikedNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [weather, setWeather] = useState(null);
  const [goldPrice, setGoldPrice] = useState(151363);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const { user, logout } = useAuth();
  const containerRef = useRef(null);

  const fetchTrending = async () => {
    try {
      const { data } = await api.get('/news/trending');
      setTrending(data);
    } catch (err) {
      console.error('Trending fetch error', err);
    }
  };

  const fetchNews = useCallback(async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    
    setLoading(true);
    const targetPage = reset ? 1 : page;
    
    try {
      const url = activeCategory === 'All' 
        ? `/news?page=${targetPage}&limit=5`
        : `/news?page=${targetPage}&limit=5&category=${activeCategory}`;
      
      const { data } = await api.get(url);
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setNews(prev => reset ? data : [...prev, ...data]);
        setPage(targetPage + 1);
      }
    } catch (err) {
      console.error('News fetch error', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, page, loading, hasMore]);

  const fetchUserInteractions = async () => {
    try {
      const profileRes = await api.get('/auth/me');
      setLikedNews(profileRes.data.likedNews || []);
      setBookmarks(profileRes.data.bookmarks || []);
    } catch (err) {
      console.error('Interactions fetch error', err);
    }
  };

  const fetchWeather = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await res.json();
        setWeather(data.current_weather);
      }, async () => {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&current_weather=true');
        const data = await res.json();
        setWeather(data.current_weather);
      });
    } catch (err) {
      console.error('Weather fetch error', err);
    }
  };

  const fetchGoldPrice = async () => {
    try {
      const res = await fetch('https://api.metals.live/v1/spot/gold');
      const data = await res.json();
      if (data?.[0]?.price) {
        const inr = (data[0].price * 83.5) / 2.83495;
        setGoldPrice(Math.round(inr));
      }
    } catch (err) {
      console.error('Gold fetch error', err);
    }
  };

  // Initial and category change load
  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    // Use a small timeout to let the state clear before initial fetch
    const timer = setTimeout(() => {
      fetchNews(true);
      fetchTrending();
      fetchWeather();
      fetchGoldPrice();
      if (user) fetchUserInteractions();
    }, 50);
    return () => clearTimeout(timer);
  }, [activeCategory, user]);

  const handleLike = async (id) => {
    try {
      const { data } = await api.post(`/news/${id}/like`);
      if (data.liked) {
        setLikedNews(prev => [...prev, id]);
      } else {
        setLikedNews(prev => prev.filter(newsId => newsId !== id));
      }
      setNews(prev => prev.map(n => n._id === id ? { ...n, likesCount: data.likesCount } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookmark = async (id) => {
    try {
      const { data } = await api.post(`/bookmarks/${id}`);
      if (data.bookmarked) {
        setBookmarks(prev => [...prev, id]);
      } else {
        setBookmarks(prev => prev.filter(newsId => newsId !== id));
      }
      setNews(prev => prev.map(n => n._id === id ? { ...n, bookmarksCount: data.bookmarksCount } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // For snap-y mandatory, we trigger earlier to prevent "blank" screens at the end
    if (scrollHeight - scrollTop <= clientHeight * 2) {
      fetchNews();
    }
  };

  return (
    <div className="relative h-[100dvh] w-full bg-zinc-950 flex justify-center overflow-hidden">
      <div className="w-full max-w-[400px] relative h-full flex flex-col shadow-2xl shadow-black bg-app-bg border-x border-white/5">
        
        {/* Universal Sticky Header */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-app-bg/60 backdrop-blur-xl border-b border-white/5 pt-4 pb-3 px-6 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">Scroll.</h1>
            <div className="flex space-x-2">
              {user && (
                <button onClick={logout} className="p-2 bg-zinc-900/50 rounded-full border border-white/5 text-zinc-500">
                  <LogOut size={14} />
                </button>
              )}
            </div>
          </div>
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-editorial-white text-zinc-950 shadow-lg scale-105' 
                  : 'bg-zinc-900 text-zinc-500 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="snap-y-container h-full w-full no-scrollbar"
        >
          
          {/* Dashboard Section */}
          <div className="snap-card flex flex-col pt-32 px-6 pb-24 shrink-0">
            <div className="flex-1 flex flex-col space-y-8">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 space-y-3">
                  <div className="flex items-center justify-between text-app-accent">
                    <Sun size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50 text-white">Sky</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-white tracking-tighter">{weather?.temperature || '--'}°C</span>
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Local</span>
                  </div>
                </div>
                
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 space-y-3">
                  <div className="flex items-center justify-between text-yellow-600">
                    <Coins size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50 text-white">Spot</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white tracking-tighter">₹{goldPrice.toLocaleString('en-IN')}</span>
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest text-nowrap">Gold 10g</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-app-accent">
                  <TrendingUp size={16} />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Hottest Right Now</h2>
                </div>
                <div className="flex overflow-x-auto no-scrollbar -mx-6 px-6 space-x-4 pb-4">
                  {trending.map(item => (
                    <NewsCard 
                      key={`trending-${item._id}`} 
                      news={item} 
                      isTrending 
                    />
                  ))}
                  {trending.length === 0 && <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest py-4">Loading Trends...</p>}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center space-y-3 opacity-30">
                <span className="text-[8px] font-black uppercase tracking-[0.6em] text-zinc-500">Scroll Down</span>
                <div className="animate-bounce p-2">
                  <ChevronDown size={20} className="text-zinc-500" />
                </div>
              </div>

            </div>
          </div>

          {/* News Feed Section */}
          {news.length > 0 ? (
            news.map((item) => (
              <NewsCard 
                key={item._id} 
                news={item} 
                onLike={handleLike}
                onBookmark={handleBookmark}
                isLiked={likedNews.includes(item._id)}
                isBookmarked={bookmarks.includes(item._id)}
              />
            ))
          ) : (
            !loading && <div className="snap-card flex items-center justify-center text-zinc-600 text-xs uppercase font-black tracking-widest">Searching Knowledge...</div>
          )}
          
          {loading && (
            <div className="snap-card w-full flex items-center justify-center shrink-0">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-app-accent"></div>
            </div>
          )}
          
          {!hasMore && news.length > 0 && (
             <div className="snap-card flex flex-col items-center justify-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] shrink-0 opacity-50">
               <div className="w-12 h-px bg-zinc-800 mb-4" />
               Knowledge Complete
             </div>
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default Home;
