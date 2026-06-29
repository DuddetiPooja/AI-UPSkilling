import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, Cpu, LogOut, ArrowRight, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav id="navbar" className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link id="nav-logo" to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-600/20">
                <Zap className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="font-semibold tracking-tight text-xl text-white">AI Upskilling</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              id="nav-home"
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  id="nav-dashboard"
                  to="/dashboard"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  id="nav-profile"
                  to="/profile"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Profile
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-200">{user?.name}</p>
                    <p className="text-[10px] text-slate-400">{user?.careerGoal}</p>
                  </div>
                  <img
                    id="user-avatar-nav"
                    src={user?.avatarUrl}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    id="btn-logout"
                    onClick={handleLogout}
                    className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  id="nav-login"
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  id="nav-signup"
                  to="/signup"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-500 transition-all hover:translate-x-0.5"
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu-container" className="md:hidden bg-slate-900 border-b border-slate-800 px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <Link
            id="mobile-nav-home"
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                id="mobile-nav-dashboard"
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Dashboard
              </Link>
              <Link
                id="mobile-nav-profile"
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Profile
              </Link>
              <div className="pt-4 pb-2 border-t border-slate-800 mt-2">
                <div className="flex items-center px-3">
                  <div className="shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover border border-slate-700"
                      src={user?.avatarUrl}
                      alt={user?.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user?.name}</div>
                    <div className="text-sm font-medium text-slate-400">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2">
                  <button
                    id="mobile-btn-logout"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-white hover:bg-red-600 transition-colors"
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="pt-4 border-t border-slate-800 space-y-2 px-3">
              <Link
                id="mobile-nav-login"
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Sign In
              </Link>
              <Link
                id="mobile-nav-signup"
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full px-3 py-2.5 rounded-md text-base font-semibold bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
