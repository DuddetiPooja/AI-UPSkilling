import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/AppLayout';
import { 
  User, 
  Settings, 
  Target, 
  Edit3, 
  Save, 
  Check, 
  Sparkles, 
  Flame,
  Clock,
  Briefcase
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [careerGoal, setCareerGoal] = useState(user?.careerGoal || '');
  const [targetMonths, setTargetMonths] = useState(user?.targetMonths || 6);
  const [aiMode, setAiMode] = useState(user?.aiMode || 'Adaptive');
  const [targetHoursWeekly, setTargetHoursWeekly] = useState(user?.targetHoursWeekly || 20);

  const [notif, setNotif] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotif('');

    // Save profile update to AppContext
    setTimeout(() => {
      updateProfile({
        name,
        title,
        avatarUrl,
        careerGoal,
        targetMonths: Number(targetMonths),
        aiMode: aiMode as any,
        targetHoursWeekly: Number(targetHoursWeekly)
      });
      setNotif('Profile configurations synchronized successfully!');
      setIsSubmitting(false);
      setTimeout(() => setNotif(''), 3000);
    }, 1000);
  };

  return (
    <AppLayout>
      <div id="profile-settings-page" className="space-y-6">
        
        {/* Profile Card Header */}
        <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              id="profile-avatar-display"
              src={user.avatarUrl}
              alt={user.name}
              className="w-20 h-20 rounded-xl border-2 border-indigo-500 shadow-md object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  {user.currentLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-semibold">{user.title} • {user.email}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-bold justify-center sm:justify-start">
                <Target className="w-3.5 h-3.5 text-indigo-400" /> Aiming for: {user.careerGoal}
              </div>
            </div>
          </div>
        </div>

        {notif && (
          <div id="profile-success-notif" className="flex items-center gap-2.5 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{notif}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT 8 COLUMNS: Form */}
          <div className="lg:col-span-8 bg-[#0b1329] border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5 pb-4 border-b border-slate-800/60 mb-6">
              <Settings className="w-4 h-4 text-slate-400" /> Account Settings
            </h3>

            <form id="profile-edit-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name input */}
                <div className="space-y-1.5">
                  <label htmlFor="edit-name" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Full Name
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm bg-slate-950 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-semibold"
                  />
                </div>

                {/* Professional Title */}
                <div className="space-y-1.5">
                  <label htmlFor="edit-title" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Professional Title
                  </label>
                  <input
                    id="edit-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm bg-slate-950 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-semibold"
                  />
                </div>
              </div>

              {/* Avatar Url */}
              <div className="space-y-1.5">
                <label htmlFor="edit-avatar" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Profile Picture URL
                </label>
                <input
                  id="edit-avatar"
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="block w-full border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm bg-slate-950 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/60">
                {/* Study hours */}
                <div className="space-y-1.5">
                  <label htmlFor="edit-hours" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Weekly Study Budget (Hours)
                  </label>
                  <input
                    id="edit-hours"
                    type="number"
                    min="5"
                    max="60"
                    value={targetHoursWeekly}
                    onChange={(e) => setTargetHoursWeekly(Number(e.target.value))}
                    className="block w-full border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm bg-slate-950 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-semibold"
                  />
                </div>

                {/* AI Mode dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="edit-mode" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    AI Curricula Adaptation Mode
                  </label>
                  <select
                    id="edit-mode"
                    value={aiMode}
                    onChange={(e) => setAiMode(e.target.value as 'Adaptive' | 'Fast-Track' | 'Deep-Dive')}
                    className="block w-full border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm bg-slate-950 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-semibold"
                  >
                    <option value="Adaptive">Adaptive (Skip Knowns)</option>
                    <option value="Fast-Track">Fast-Track (Core benchmarks only)</option>
                    <option value="Deep-Dive">Deep-Dive (Complete micro-details)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  id="btn-profile-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition-colors shadow-md active:scale-95"
                >
                  <Save className="w-4 h-4" /> {isSubmitting ? 'Syncing...' : 'Save Configuration'}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT 4 COLUMNS: Career Goals Benchmark configurations */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-slate-800/60">
                <Briefcase className="w-4 h-4 text-slate-400" /> Career Goal Config
              </h3>

              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label htmlFor="edit-goal" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Role Goal</label>
                  <input
                    id="edit-goal"
                    type="text"
                    required
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    className="block w-full border border-slate-800 rounded px-2.5 py-1.5 text-xs bg-slate-950 text-white font-semibold focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="edit-months" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Months to Goal</label>
                  <input
                    id="edit-months"
                    type="number"
                    min="1"
                    max="24"
                    value={targetMonths}
                    onChange={(e) => setTargetMonths(Number(e.target.value))}
                    className="block w-full border border-slate-800 rounded px-2.5 py-1.5 text-xs bg-slate-950 text-white font-semibold focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
};
