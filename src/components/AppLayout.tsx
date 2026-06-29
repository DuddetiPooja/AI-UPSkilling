import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Menu, 
  X, 
  LayoutDashboard, 
  Compass, 
  Layers, 
  BookOpen, 
  Map, 
  Sparkles, 
  Award,
  Settings, 
  LogOut, 
  Bell, 
  Flame 
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Nav items exactly as displayed in the screenshots:
  // 1. Dashboard
  // 2. Assessment
  // 3. Skill Gap
  // 4. Recommendations
  // 5. Roadmap
  // 6. AI Mentor
  // 7. Profile
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
    { name: 'Assessment', path: '/assessment', icon: <Compass className="w-4.5 h-4.5" /> },
    { name: 'Skill Gap', path: '/gap-analysis', icon: <Layers className="w-4.5 h-4.5 text-emerald-400" /> },
    { name: 'Recommendations', path: '/recommendations', icon: <BookOpen className="w-4.5 h-4.5 text-indigo-400" /> },
    { name: 'Roadmap', path: '/roadmap', icon: <Map className="w-4.5 h-4.5" /> },
    { name: 'Progress', path: '/progress', icon: <Award className="w-4.5 h-4.5 text-amber-500 animate-pulse" /> },
    { name: 'AI Mentor', path: '/mentor', icon: <Sparkles className="w-4.5 h-4.5 text-amber-400" /> },
    { name: 'Profile', path: '/profile', icon: <Settings className="w-4.5 h-4.5" /> }
  ];

  const currentItem = navItems.find(item => location.pathname === item.path);
  const breadcrumbName = currentItem ? currentItem.name : 'Architect Prime Dashboard';

  const streakValue = user?.streakDays || 3;

  return (
    <div className="flex h-screen w-full bg-[#060b18] text-slate-100 font-sans overflow-hidden">
      
      {/* Desktop Sidebar (Left Panel, matched with first screenshot) */}
      <aside className="hidden lg:flex w-64 bg-[#090f20] text-slate-100 flex-col border-r border-slate-800/80 shrink-0 select-none">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/60 flex items-center gap-3">
          {/* Glowing Bolt icon block */}
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="font-black tracking-tight text-base text-white block">
              Future Skills
            </span>
            <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest block -mt-0.5">
              AI UPSKILLING
            </span>
          </div>
        </div>

        {/* User Card matching first screenshot */}
        <div className="px-4 py-4.5 border-b border-slate-800/50">
          <div className="bg-[#0b142d]/80 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  id="user-profile-avatar-sidebar"
                  src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
                  alt={user?.name || "John Doe"}
                  className="w-10 h-10 rounded-lg border border-slate-700/80 object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Active status indicator green dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#090f20]"></span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate leading-tight">
                  {user?.name || 'John Doe'}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                  Student
                </p>
              </div>
            </div>

            {/* Notification Bell Icon */}
            <button 
              id="sidebar-bell-btn"
              type="button" 
              className="relative p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Navigation Sidebar */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                id={`sidebar-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-bold transition-all ${
                  active 
                    ? 'bg-indigo-600/15 border border-indigo-500/20 text-indigo-400' 
                    : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Settings & Logout links */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/20 space-y-1">
          <button 
            id="sidebar-btn-logout"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-left"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer (drawer popup overlay for phone viewport) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/80 backdrop-blur-sm">
          <div className="relative flex flex-col w-64 bg-[#090f20] text-slate-100 border-r border-slate-800">
            <div className="absolute top-4 right-4">
              <button 
                id="close-mobile-sidebar"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 border-b border-slate-800/60 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Zap className="w-4.5 h-4.5 fill-white" />
              </div>
              <div>
                <span className="font-black tracking-tight text-sm text-white block">Future Skills</span>
                <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest block">AI UPSKILLING</span>
              </div>
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-bold transition-all ${
                      active 
                        ? 'bg-indigo-600/15 border border-indigo-500/20 text-indigo-400' 
                        : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800 bg-slate-950/20 space-y-1">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold text-slate-400 hover:text-red-400 text-left"
              >
                <LogOut className="w-4.5 h-4.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Viewport content display area on right side */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header Navigation bar */}
        <header className="h-16 bg-[#090f20]/90 border-b border-slate-800/60 px-4 sm:px-8 flex items-center justify-between shrink-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              id="open-mobile-sidebar-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 lg:hidden focus:outline-none"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Breadcrumbs pathway */}
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-semibold">
              <span className="text-slate-500 hidden sm:inline">Upskill Engine</span> 
              <span className="text-slate-600 hidden sm:inline">/</span> 
              <span className="text-slate-200 font-extrabold">{breadcrumbName}</span>
            </div>
          </div>

          {/* Quick Header status information */}
          <div className="flex items-center gap-4">

            <Link to="/profile" className="flex items-center gap-2 group cursor-pointer" title="Manage Profile Settings">
              <img
                id="header-user-avatar"
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
                alt={user?.name || "John Doe"}
                className="w-8 h-8 rounded-lg border border-slate-700 hover:border-indigo-500 transition-colors object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-black text-slate-300 hidden sm:inline group-hover:text-white transition-colors">
                {user?.name?.split(' ')[0]}
              </span>
            </Link>
          </div>
        </header>

        {/* Content Panel Scroll area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#060b18]">
          {children}
        </main>

      </div>
    </div>
  );
};
