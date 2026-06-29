import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { KeyRound, Mail, User, AlertCircle, ArrowRight, Check, Zap } from 'lucide-react';

export const Signup: React.FC = () => {
  const { signup, isAuthenticated } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (!fullName) {
      setError('Full Name is required.');
      return false;
    }
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
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
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
      signup(fullName, email);
      setSuccess('Account created successfully! Preparing your custom workspace...');
      setIsSubmitting(false);
      setTimeout(() => {
        navigate('/assessment'); // Send to assessment first for adaptive upskilling!
      }, 1000);
    }, 1200);
  };

  return (
    <div id="signup-page" className="flex flex-col min-h-screen bg-slate-50 font-sans">
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
              Create Your Free Account
            </h2>
            <p className="text-xs text-slate-500">
              Launch your adaptive learning journey and close your technical gaps.
            </p>
          </div>

          {/* Notifications */}
          {error && (
            <div id="signup-error" className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div id="signup-success" className="flex items-start gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
              <Check className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form id="signup-form" className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-3">
              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="full-name" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Pooja Duddeti"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="signup-email" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label htmlFor="signup-password" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Min 6 characters"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label htmlFor="confirm-password" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="signup-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:bg-indigo-400"
              >
                {isSubmitting ? 'Creating Profile...' : 'Create Free Account'}
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link id="link-to-login" to="/login" className="font-bold text-indigo-600 hover:text-indigo-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
