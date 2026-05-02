import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Bookmark, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/feed', icon: LayoutGrid, label: 'Feed' },
    { path: '/bookmarks', icon: Bookmark, label: 'Saved' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', icon: PlusCircle, label: 'Admin' });
  }

  return (
    <div className="absolute bottom-0 w-full max-w-[400px] bg-app-bg/90 backdrop-blur-xl border-t border-zinc-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-app-accent' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
