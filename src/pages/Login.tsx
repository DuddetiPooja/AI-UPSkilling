import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { KeyRound, Mail, AlertCircle, ArrowRight, Check, Zap } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    if (!email) {
      setError('Email address is required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return false;
    }
    if (!password) {
      setError('Password is required.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      login(email);
      setSuccess('Sign-in successful! Redirecting to dashboard...');
      setIsSubmitting(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    }, 1000);
  };

  const handleForgotPassword = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter your valid email address first to reset password.');
      return;
    }
    setSuccess(`Password reset link dispatched to ${email}! Check your inbox.`);
    setError('');
  };

  return (
    <div id="login-page" className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl relative z-10">
          <div className="text-center space-y-2">
            <div className="mx-auto w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Sign In to AI Upskilling
            </h2>
            <p className="text-xs text-slate-500">
              Enter your credentials to continue your upskilling journey.
            </p>
          </div>

          {/* Notifications */}
          {error && (
            <div id="login-error" className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div id="login-success" className="flex items-start gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
              <Check className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form id="login-form" className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div className="space-y-1.5">
                <label htmlFor="email-address" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Password
                  </label>
                  <button
                    id="forgot-password-btn"
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-400"
              >
                {isSubmitting ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <Link id="link-to-signup" to="/signup" className="font-bold text-indigo-600 hover:text-indigo-500">
                Create a Free Account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
