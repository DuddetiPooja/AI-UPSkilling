import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-600/20">
                <Zap className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="font-semibold tracking-tight text-xl text-white">AI Upskilling</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Personalized adaptive technology learning paths designed to bridge career skill gaps and build future-proof expertise.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Skill Assessment</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Adaptive Roadmap</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Skill Gap Analyzer</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Tech Catalog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">System Status</a></li>
              <li><a href="mailto:support@aiupskilling.io" className="hover:text-indigo-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[10px] text-slate-500">
            &copy; {new Date().getFullYear()} AI Upskilling. All rights reserved. Made for professional technology upskilling.
          </p>
          <div className="flex gap-4 text-[10px] text-slate-500">
            <span>Server Time: 2026-06-24 UTC</span>
            <span>•</span>
            <span>Client Platform: Adaptive</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
