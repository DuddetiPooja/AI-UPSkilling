import React from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/AppLayout';
import { 
  CheckCircle, 
  Circle, 
  Lock, 
  MapPin, 
  Clock, 
  Play, 
  Award, 
  BookOpen,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const Roadmap: React.FC = () => {
  const { roadmap, toggleSession, user } = useApp();

  if (!user) return null;

  return (
    <AppLayout>
      <div id="roadmap-page" className="space-y-6">
        
        {/* Page Title Header card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" /> Learning Roadmap
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Curriculum Blueprint for {user.careerGoal}
              </h2>
              <p className="text-xs text-slate-500 leading-normal max-w-2xl">
                Check off sessions as you study. Your overall readiness scores and weekly statistics will automatically recalculate.
              </p>
            </div>

            {/* Micro stats banner */}
            <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-center flex flex-row sm:flex-col justify-between sm:justify-center gap-2 items-center min-w-[120px]">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">Readiness</span>
              <span className="text-xl font-black text-indigo-600">{user.readinessScore}%</span>
            </div>
          </div>
        </div>

        {/* Roadmap Phases Loop */}
        <div className="space-y-8 relative">
          {/* Vertical connecting timeline bar (desktop only) */}
          <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-slate-200 hidden md:block"></div>

          {roadmap.map((phase) => {
            const isCompleted = phase.status === 'Completed';
            const isInProgress = phase.status === 'In Progress';
            const isLocked = phase.status === 'Locked';

            // Phase indicator badge/header color
            let badgeBgColor = 'bg-slate-100 border-slate-200 text-slate-500';
            let phaseAccentColor = 'border-slate-200';
            if (isCompleted) {
              badgeBgColor = 'bg-indigo-600 border-indigo-600 text-white shadow-md';
              phaseAccentColor = 'border-indigo-200 bg-white';
            } else if (isInProgress) {
              badgeBgColor = 'bg-indigo-50 border-indigo-500 text-indigo-600 ring-2 ring-indigo-500/10';
              phaseAccentColor = 'border-indigo-500/60 bg-white ring-1 ring-indigo-500/5';
            }

            return (
              <div 
                key={phase.id} 
                id={`roadmap-phase-${phase.phaseNumber}`}
                className={`relative md:pl-16 transition-all ${isLocked ? 'opacity-65' : ''}`}
              >
                {/* Visual timeline circle indicator (desktop only) */}
                <div className="absolute left-4 top-1.5 hidden md:block z-10">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                    isCompleted ? 'bg-indigo-600 border-indigo-600 text-white' :
                    isInProgress ? 'bg-indigo-100 border-indigo-600 text-indigo-600' :
                    'bg-white border-slate-300 text-slate-400'
                  }`}>
                    {isCompleted ? '✓' : phase.phaseNumber}
                  </div>
                </div>

                {/* Main phase box container */}
                <div className={`border rounded-xl p-5 sm:p-6 shadow-sm ${phaseAccentColor}`}>
                  
                  {/* Phase header area */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-slate-100 mb-5">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Phase {phase.phaseNumber} Blueprint</span>
                      <h3 className="text-base font-bold text-slate-900">{phase.title}</h3>
                      <p className="text-xs text-slate-500 leading-normal">{phase.subtitle}</p>
                    </div>

                    <span className={`inline-flex self-start sm:self-auto px-2.5 py-1 border text-[10px] font-bold rounded-full ${
                      isCompleted ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                      isInProgress ? 'bg-amber-50 text-amber-800 border-amber-200' :
                      'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {isLocked ? (
                        <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Locked</span>
                      ) : phase.status}
                    </span>
                  </div>

                  {/* Sessions details checklist */}
                  {isLocked ? (
                    <div className="p-4 bg-slate-50 rounded-lg text-center flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold">
                      <Lock className="w-4 h-4 shrink-0" /> Complete previous phases to unlock these sessions.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.sessions.map((session) => (
                        <div 
                          key={session.id}
                          id={`session-item-${session.id}`}
                          className={`p-3.5 rounded-lg border transition-all flex justify-between items-center gap-4 ${
                            session.completed 
                              ? 'bg-slate-50/50 border-slate-200 text-slate-500' 
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50/80 hover:border-slate-300'
                          }`}
                        >
                          <div className="space-y-1 min-w-0">
                            <p className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                              {session.type} session
                            </p>
                            <h4 className={`text-xs font-bold leading-tight truncate ${session.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                              {session.title}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                              <Clock className="w-3.5 h-3.5" /> {session.durationHours} hours
                            </div>
                          </div>

                          {/* Completing check mark trigger */}
                          <button
                            id={`btn-toggle-session-${session.id}`}
                            type="button"
                            onClick={() => toggleSession(phase.id, session.id)}
                            className="shrink-0 p-1 rounded-full text-slate-400 hover:text-indigo-600 focus:outline-none"
                            title={session.completed ? "Mark Incomplete" : "Mark Completed"}
                          >
                            {session.completed ? (
                              <CheckCircle className="w-6 h-6 text-indigo-500" />
                            ) : (
                              <Circle className="w-6 h-6 text-slate-300 hover:text-indigo-500" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </AppLayout>
  );
};
