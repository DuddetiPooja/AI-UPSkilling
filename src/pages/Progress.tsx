import React from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/AppLayout';
import { 
  Award, 
  Activity, 
  TrendingUp, 
  CheckCircle, 
  BookOpen, 
  Clock, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Lock,
  Trophy,
  Play,
  Circle
} from 'lucide-react';

export const Progress: React.FC = () => {
  const { user, roadmap, badges } = useApp();

  if (!user) return null;

  // Calculate global completion parameters
  const totalSessions = roadmap.flatMap(p => p.sessions).length;
  const completedSessions = roadmap.flatMap(p => p.sessions).filter(s => s.completed).length;
  const remainingSessions = totalSessions - completedSessions;
  const completionPercent = Math.round((completedSessions / totalSessions) * 100);

  // Filter badges
  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

  return (
    <AppLayout>
      <div id="progress-achievements-page" className="space-y-6 text-slate-100">
        
        {/* Header Board */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold">
                <Award className="w-3.5 h-3.5" /> Achievements & Metrics
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Skill Milestones Dashboard
              </h2>
              <p className="text-xs text-slate-400 leading-normal font-semibold">
                Review your active course completion statistics, earned badges, and dynamic upskilling progress.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-slate-950/60 border border-slate-800 px-4 py-2.5 rounded-lg text-center">
                <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Badge unlocks</p>
                <p className="text-lg font-black text-amber-400">{unlockedBadges.length} / {badges.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Statistics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0b1329] p-5 border border-slate-800 rounded-xl shadow-md space-y-2">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Courseware Progress</span>
            <div className="flex justify-between items-baseline">
              <div className="text-3xl font-black text-indigo-400">{completionPercent}%</div>
              <span className="text-xs text-slate-400 font-semibold">{completedSessions} / {totalSessions} Sessions</span>
            </div>
            <div className="w-full bg-slate-950/60 border border-slate-800/40 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-[#0b1329] p-5 border border-slate-800 rounded-xl shadow-md flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Completed Sessions</span>
            <div className="text-2xl font-extrabold text-white mt-1">{completedSessions} Topics</div>
            <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-2">
              <ShieldCheck className="w-3.5 h-3.5" /> All validated on local sandbox env
            </p>
          </div>

          <div className="bg-[#0b1329] p-5 border border-slate-800 rounded-xl shadow-md flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Pending Sessions</span>
            <div className="text-2xl font-extrabold text-white mt-1">{remainingSessions} Topics</div>
            <p className="text-[10px] text-indigo-400 font-bold mt-2">
              Approx. <span className="font-extrabold text-slate-300">{(remainingSessions * 3.5).toFixed(1)} hours</span> study required
            </p>
          </div>
        </div>

        {/* Detailed Phase Progress Report Section */}
        <div id="detailed-phase-progress-report" className="bg-[#0b1329] border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="space-y-1">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Dynamic Phase Progress Report
              </h3>
              <p className="text-xs text-slate-400 font-semibold">
                Full milestone overview from Phase 1 to subsequent Phase 2 & Phase 3 upskilling paths.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-bold bg-slate-950 px-3 py-1.5 border border-slate-850 rounded-lg">
              <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Real-time curriculum sync
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((phase, index) => {
              const completedCount = phase.sessions.filter(s => s.completed).length;
              const totalCount = phase.sessions.length;
              const percent = Math.round((completedCount / totalCount) * 100);
              
              // Calculate status
              let status: 'Completed' | 'In Progress' | 'Up Next' | 'Locked' = 'Locked';
              if (percent === 100) {
                status = 'Completed';
              } else if (percent > 0) {
                status = 'In Progress';
              } else {
                if (index === 0) {
                  status = 'Up Next';
                } else {
                  const prevPhase = roadmap[index - 1];
                  const prevCompleted = prevPhase ? prevPhase.sessions.every(s => s.completed) : false;
                  status = prevCompleted ? 'Up Next' : 'Locked';
                }
              }

              // Card styling depending on status
              const statusColors = {
                Completed: {
                  border: 'border-emerald-500/30',
                  bg: 'bg-emerald-500/5',
                  text: 'text-emerald-400',
                  badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
                  icon: <Trophy className="w-5 h-5 text-emerald-400" />,
                  label: 'Completed'
                },
                'In Progress': {
                  border: 'border-indigo-500/30',
                  bg: 'bg-indigo-500/5',
                  text: 'text-indigo-400',
                  badgeBg: 'bg-indigo-500/10 border-indigo-500/20',
                  icon: <Zap className="w-5 h-5 text-indigo-400 animate-pulse" />,
                  label: 'Active'
                },
                'Up Next': {
                  border: 'border-amber-500/20',
                  bg: 'bg-amber-500/5',
                  text: 'text-amber-400',
                  badgeBg: 'bg-amber-500/10 border-amber-500/20',
                  icon: <Play className="w-5 h-5 text-amber-400" />,
                  label: 'Up Next'
                },
                Locked: {
                  border: 'border-slate-800/80',
                  bg: 'bg-slate-900/10 opacity-60',
                  text: 'text-slate-500',
                  badgeBg: 'bg-slate-950 border-slate-800',
                  icon: <Lock className="w-5 h-5 text-slate-500" />,
                  label: 'Locked'
                }
              }[status];

              return (
                <div 
                  key={phase.id}
                  id={`phase-report-card-p${phase.phaseNumber}`}
                  className={`border rounded-xl p-5 flex flex-col justify-between transition-all ${statusColors.border} ${statusColors.bg}`}
                >
                  <div className="space-y-4">
                    {/* Badge / Icon Header */}
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${statusColors.badgeBg}`}>
                        {statusColors.icon}
                      </div>
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${statusColors.badgeBg} ${statusColors.text}`}>
                        {statusColors.label}
                      </span>
                    </div>

                    {/* Phase Info */}
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Phase {phase.phaseNumber}</p>
                      <h4 className="text-sm font-black text-white leading-snug line-clamp-1">{phase.title}</h4>
                      <p className="text-[11px] text-slate-400 font-semibold line-clamp-2 leading-relaxed">{phase.subtitle}</p>
                    </div>

                    {/* Completion Tracker Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-500">Progress Tracker</span>
                        <span className={statusColors.text}>{completedCount} / {totalCount} Sessions ({percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-950/80 border border-slate-800/40 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            status === 'Completed' ? 'bg-emerald-500' :
                            status === 'In Progress' ? 'bg-indigo-500' :
                            status === 'Up Next' ? 'bg-amber-500' : 'bg-slate-800'
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Sessions Checklist Inside Report Card */}
                  <div className="mt-5 pt-4 border-t border-slate-800/60 space-y-2">
                    <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Syllabus Breakdown</p>
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                      {phase.sessions.map(session => (
                        <div key={session.id} className="flex items-center gap-2 text-[10px] font-semibold text-slate-300">
                          {session.completed ? (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          )}
                          <span className={`truncate ${session.completed ? 'line-through text-slate-500' : ''}`}>
                            {session.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Topics Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT 7 COLUMNS: Achievement Badges */}
          <div className="lg:col-span-7 bg-[#0b1329] border border-slate-800 rounded-xl p-6 shadow-md space-y-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Earned Achievement Badges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  id={`badge-card-${badge.id}`}
                  className={`border rounded-xl p-4 flex gap-4 transition-all ${
                    badge.unlocked 
                      ? 'border-amber-500/20 bg-amber-500/5' 
                      : 'border-slate-850 bg-slate-900/10 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0 ${
                    badge.unlocked ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' : 'bg-slate-950 border border-slate-800 grayscale'
                  }`}>
                    {badge.icon}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                      {badge.title}
                      {badge.unlocked && <Zap className="w-3 h-3 text-amber-400 shrink-0 fill-amber-400" />}
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-normal font-semibold">{badge.description}</p>
                    {badge.unlocked && badge.unlockedDate && (
                      <span className="text-[9px] text-emerald-400 font-bold block mt-1.5">
                        Unlocked {badge.unlockedDate}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: Weekly hours and Curriculum checklist overview */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Weekly Effort Chart */}
            <div className="bg-[#0b1329] text-white border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 text-indigo-400">
                <Activity className="w-4 h-4" /> Weekly Performance Tracking
              </h3>
              
              <div className="flex items-end gap-2.5 h-28 pt-2">
                <div className="flex-1 bg-slate-800/60 rounded-t h-[40%]" title="Mon: 3.5h"></div>
                <div className="flex-1 bg-slate-800/60 rounded-t h-[60%]" title="Tue: 5.5h"></div>
                <div className="flex-1 bg-slate-800/60 rounded-t h-[45%]" title="Wed: 4.0h"></div>
                <div className="flex-1 bg-slate-800/60 rounded-t h-[80%]" title="Thu: 7.5h"></div>
                <div className="flex-1 bg-indigo-500/30 rounded-t h-[90%]" title="Fri: 9.0h"></div>
                <div className="flex-1 bg-indigo-500 rounded-t h-[100%]" title="Sat: 10.0h"></div>
                <div className="flex-1 bg-slate-800/60 rounded-t h-[30%]" title="Sun: 2.5h"></div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pt-1">
                <span>Active Target</span>
                <span>{user.learningHoursWeekly} / {user.targetHoursWeekly} Hours Completed</span>
              </div>
            </div>

            {/* Checklist Overview of Curriculum */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" /> Topics Summary
              </h3>

              <div className="space-y-3.5">
                {roadmap.map((phase) => {
                  const completedCount = phase.sessions.filter(s => s.completed).length;
                  const totalCount = phase.sessions.length;
                  const percent = Math.round((completedCount / totalCount) * 100);

                  return (
                    <div key={phase.id} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-300">
                        <span className="truncate">Phase {phase.phaseNumber}: {phase.title}</span>
                        <span className="text-indigo-400 shrink-0">{completedCount}/{totalCount} Done</span>
                      </div>
                      <div className="w-full bg-slate-950/60 border border-slate-800/40 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-1.5 rounded-full"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
};
