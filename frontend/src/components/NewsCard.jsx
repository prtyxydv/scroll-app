import React from 'react';
import { ThumbsUp, Bookmark, User as UserIcon } from 'lucide-react';

const NewsCard = ({ news, onLike, onBookmark, isLiked, isBookmarked, isSmall = false, isTrending = false }) => {
  if (isTrending) {
    return (
      <div className="flex-shrink-0 w-72 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 mr-4 space-y-3 shadow-xl">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-app-accent px-2 py-1 bg-app-accent/10 rounded">
            {news.category}
          </span>
          <div className="flex items-center space-x-1 text-[9px] text-zinc-500 font-bold">
            <UserIcon size={10} />
            <span>{news.postedBy?.email?.split('@')[0] || 'staff'}</span>
          </div>
        </div>
        <h3 className="font-bold text-lg leading-tight line-clamp-3 text-zinc-100">{news.title}</h3>
        <div className="flex items-center space-x-4 text-[10px] text-zinc-500 font-black uppercase tracking-widest">
          <span className="flex items-center space-x-1">
            <ThumbsUp size={12} className={isLiked ? 'text-app-accent' : ''} />
            <span>{news.likesCount}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Bookmark size={12} className={isBookmarked ? 'text-white' : ''} />
            <span>{news.bookmarksCount}</span>
          </span>
        </div>
      </div>
    );
  }

  // Optimized for full-screen knowledge depth with snap-to-page logic
  return (
    <div className={`snap-card relative flex flex-col justify-end w-full h-[100dvh] bg-app-bg`}>
      {/* Immersive background glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-20%] w-[140%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="relative z-10 w-full px-6 pb-28 pt-10 h-full flex flex-col justify-end">
        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-7 animate-in fade-in slide-in-from-bottom-12 duration-700">
          <div className="flex justify-between items-start">
            <div className="flex flex-col space-y-1">
              <span className="w-fit px-3 py-1 bg-zinc-800 text-zinc-300 text-[10px] font-black rounded-full uppercase tracking-[0.2em]">
                {news.category}
              </span>
              <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest ml-1">
                Post by {news.postedBy?.email?.split('@')[0] || 'Staff'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onLike(news._id)}
                className={`p-3 rounded-full transition-all active:scale-75 ${isLiked ? 'bg-app-accent/20 text-app-accent shadow-lg shadow-app-accent/20' : 'bg-zinc-800/50 text-zinc-500 hover:text-zinc-300'}`}
              >
                <ThumbsUp size={22} fill={isLiked ? 'currentColor' : 'none'} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => onBookmark(news._id)}
                className={`p-3 rounded-full transition-all active:scale-75 ${isBookmarked ? 'bg-white text-zinc-950 shadow-lg' : 'bg-zinc-800/50 text-zinc-500 hover:text-zinc-300'}`}
              >
                <Bookmark size={22} fill={isBookmarked ? 'currentColor' : 'none'} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold text-zinc-100 leading-[1.1] tracking-tight">
              {news.title}
            </h2>
            <p className="text-[18px] text-zinc-400 leading-relaxed font-medium">
              {news.summary}
            </p>
          </div>
          
          <div className="pt-6 border-t border-white/5 space-y-3">
            <div className="flex items-center space-x-2">
               <div className="w-1 h-1 bg-app-accent rounded-full animate-pulse" />
               <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Deep Analysis</p>
            </div>
            <p className="text-base text-zinc-300 leading-snug italic font-medium">
              {news.whyItMatters}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
