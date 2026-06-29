import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/AppLayout';
import { useNavigate, Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ChevronRight, 
  Sparkles,
  Play,
  Activity,
  Layers,
  Compass,
  Map,
  Calendar,
  MessageSquare,
  Send,
  X,
  Check,
  Award,
  AlertTriangle,
  Flame
} from 'lucide-react';
import { Roadmap } from './Roadmap';

export const Dashboard: React.FC = () => {
  const { user, skills, recommendations, roadmap, activities, addActivity, updateProfile } = useApp();
  const navigate = useNavigate();

  // Mentor Chat Drawer State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulated Roadmap Generation State
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);

  // Re-run analysis interactive state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hover states for line chart points
  const [hoveredTrendIndex, setHoveredTrendIndex] = useState<number | null>(null);
  // Hover states for radar chart vertices
  const [hoveredRadarIndex, setHoveredRadarIndex] = useState<number | null>(null);

  useEffect(() => {
    if (chatOpen && messages.length === 0 && user) {
      // Seed initial welcoming message
      setMessages([
        {
          sender: 'ai',
          text: `Welcome back, ${user.name}! I am your Architect Prime Mentor. I see you are targetting ${user.careerGoal || 'Frontend Developer'} with an overall readiness score of ${user.readinessScore || '62'}%. How can I help you accelerate your learning curve today?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [chatOpen, user, messages.length]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#060b18] text-white">
        <div className="text-center p-8 bg-[#0b1329] border border-slate-800 rounded-xl max-w-sm">
          <p className="text-slate-400 mb-4">Please log in to access your dashboard.</p>
          <Link to="/login" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded font-bold text-xs">Sign In</Link>
        </div>
      </div>
    );
  }

  // --- Dynamic calculations based on active career goal ---
  const careerGoal = user.careerGoal || 'Frontend Developer';

  const totalSkillsCount = skills.length || 1;
  const matchingCount = skills.filter(s => s.currentMatch >= 60).length;
  const gapsCount = skills.filter(s => s.currentMatch < 40).length;
  
  const pctMatching = Math.round((matchingCount / totalSkillsCount) * 100);
  const pctGaps = Math.round((gapsCount / totalSkillsCount) * 100);
  const pctWeak = Math.max(0, 100 - pctMatching - pctGaps);

  const circ = 565.5;
  const dashMatching = `${(pctMatching / 100) * circ} ${circ}`;
  const dashGaps = `${(pctGaps / 100) * circ} ${circ}`;
  const dashWeak = `${(pctWeak / 100) * circ} ${circ}`;

  const offsetMatching = 0;
  const offsetGaps = -((pctMatching / 100) * circ);
  const offsetWeak = -(((pctMatching + pctGaps) / 100) * circ);

  // 1. Line chart Trend data
  const trendData = [
    { label: 'D1', val: 1.2, percent: '30%' },
    { label: 'D2', val: 1.5, percent: '38%' },
    { label: 'D3', val: 1.4, percent: '35%' },
    { label: 'D4', val: 2.1, percent: '52%' },
    { label: 'D5', val: 2.4, percent: '60%' },
    { label: 'D6', val: 3.0, percent: '75%' },
    { label: 'D7', val: 3.2, percent: '80%' }
  ];

  // Adjust line values slightly for visual variance based on score
  const scoreFactor = user.readinessScore / 100;
  const calibratedTrend = trendData.map((d, i) => {
    const factor = (i + 1) / 7;
    const finalVal = Math.min(4, Math.max(0.2, Number((scoreFactor * 4 * factor + (Math.sin(i) * 0.3)).toFixed(1))));
    const pct = Math.round((finalVal / 4) * 100) + '%';
    return { ...d, val: finalVal, percent: pct };
  });

  // 2. Radar chart 32 labels matching the requested screenshot
  const radarSkills = [
    { name: 'TensorFlow', val: 1.5 },
    { name: 'Django', val: 1.3 },
    { name: 'FastAPI', val: 2.2 },
    { name: 'NestJS', val: 2.6 },
    { name: 'Node.js', val: 3.5 },
    { name: 'REST', val: 3.8 },
    { name: 'Data', val: 2.0 },
    { name: 'MongoDB', val: 2.8 },
    { name: 'PostgreSQL', val: 3.1 },
    { name: 'NumPy', val: 1.5 },
    { name: 'Pandas', val: 1.8 },
    { name: 'Prototyping', val: 3.4 },
    { name: 'Design', val: 3.0 },
    { name: 'CI/CD', val: 2.4 },
    { name: 'Kubernetes', val: 2.0 },
    { name: 'Linux', val: 2.8 },
    { name: 'Docker', val: 3.0 },
    { name: 'Terraform', val: 2.5 },
    { name: 'Git', val: 3.7 },
    { name: 'Testing', val: 2.6 },
    { name: 'System', val: 2.2 },
    { name: 'CSS', val: 3.3 },
    { name: 'Next.js', val: 2.8 },
    { name: 'React', val: 3.5 },
    { name: 'Tailwind', val: 3.4 },
    { name: 'TanStack', val: 2.1 },
    { name: 'Go', val: 1.8 },
    { name: 'Python', val: 2.6 },
    { name: 'TypeScript', val: 3.6 },
    { name: 'LangChain', val: 1.5 },
    { name: 'Scikit-learn', val: 1.3 },
    { name: 'PyTorch', val: 1.4 }
  ];

  // Adjust radar points dynamically based on user goal to feel highly tailored and professional
  const calibratedRadar = radarSkills.map(skill => {
    let skillVal = skill.val;
    // Boost frontend-relevant skills if they target frontend
    if (careerGoal.toLowerCase().includes('frontend')) {
      if (['React', 'CSS', 'Tailwind', 'Next.js', 'TypeScript', 'Design', 'Prototyping'].includes(skill.name)) {
        skillVal = Math.min(4, skillVal + 0.5);
      }
    }
    // Boost backend-relevant skills if they target backend
    if (careerGoal.toLowerCase().includes('backend')) {
      if (['Node.js', 'REST', 'PostgreSQL', 'MongoDB', 'Go', 'FastAPI', 'NestJS'].includes(skill.name)) {
        skillVal = Math.min(4, skillVal + 0.6);
      }
    }
    // Boost cloud-relevant skills if solutions architect
    if (careerGoal.toLowerCase().includes('architect')) {
      if (['Terraform', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'System'].includes(skill.name)) {
        skillVal = Math.min(4, skillVal + 0.7);
      }
    }
    // Boost AI-relevant skills if AI engineer
    if (careerGoal.toLowerCase().includes('ai') || careerGoal.toLowerCase().includes('intelligence')) {
      if (['TensorFlow', 'PyTorch', 'Python', 'LangChain', 'Scikit-learn', 'NumPy', 'Pandas'].includes(skill.name)) {
        skillVal = Math.min(4, skillVal + 0.8);
      }
    }
    return { ...skill, val: skillVal };
  });

  // SVG dimensions for Radar
  const radarCX = 225;
  const radarCY = 225;
  const radarRadius = 145;
  const totalRadarPoints = calibratedRadar.length;

  // Calculate coordinates helper
  const getRadarCoords = (index: number, val: number) => {
    const angle = (2 * Math.PI * index) / totalRadarPoints - Math.PI / 2;
    const r = (val / 4) * radarRadius;
    const x = radarCX + r * Math.cos(angle);
    const y = radarCY + r * Math.sin(angle);
    return { x, y };
  };

  // Build the active user radar path
  const userRadarPoints = calibratedRadar.map((skill, index) => getRadarCoords(index, skill.val));
  const userRadarPathString = userRadarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Draw Concentric spiderweb grids
  const gridLevels = [1, 2, 3, 4];

  // Handle roadmap generator trigger
  const handleGenerateRoadmap = () => {
    setIsGeneratingRoadmap(true);
    setGenerationStep(0);
    setGenerationLogs([
      '⚡ Initializing AI upskilling engine...',
    ]);

    const logs = [
      '⚡ Initializing AI upskilling engine...',
      '🔍 Fetching user technology profile data...',
      '🎯 Goal identified: ' + careerGoal,
      '⚙️ Running multi-vector gap analysis algorithm...',
      '🛠️ Compiling custom curated syllabus from course catalog...',
      '📦 Generating 3-phase adaptive career roadmap...',
      '✨ Upskilling roadmap compiled successfully!'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < logs.length) {
        setGenerationStep(current);
        setGenerationLogs(prev => [...prev, logs[current]]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsGeneratingRoadmap(false);
          addActivity('Upskilling Roadmap Generated', 'roadmap', 50);
          navigate('/roadmap');
        }, 800);
      }
    }, 450);
  };

  // Handle rerun analysis trigger with interactive diagnostic loader
  const handleRerunAnalysis = () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisLogs([
      '⚡ Connecting to AI Analysis Engine...',
    ]);

    const logs = [
      '⚡ Connecting to AI Analysis Engine...',
      `🔍 Analyzing career pathway goal: ${user?.careerGoal || 'Solutions Architect'}...`,
      `📊 Fetching user skills profile & identifying technical gaps for ${skills.length} technologies...`,
      '🧠 Computing latest career readiness index & recommendation vectors...',
      '🛠️ Syncing upskilling milestones & active roadmap status...',
      '✅ Recalibration successful. Updating Career Readiness Score!'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < logs.length) {
        setAnalysisStep(current);
        setAnalysisLogs(prev => [...prev, logs[current]]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          
          if (user) {
            const currentScore = user.readinessScore || 74.2;
            const scoreIncr = parseFloat((Math.random() * 1.5 + 0.5).toFixed(1));
            const newScore = Math.min(98.5, parseFloat((currentScore + scoreIncr).toFixed(1)));
            const newChange = parseFloat((Math.random() * 0.8 + 0.2).toFixed(1));
            const newHours = parseFloat((Math.min(20, (user.learningHoursWeekly || 14.2) + 0.5)).toFixed(1));
            
            updateProfile({
              readinessScore: newScore,
              readinessChange: newChange,
              learningHoursWeekly: newHours
            });

            addActivity(`Career Gap Analysis Completed (+${scoreIncr}% Readiness Boost)`, 'roadmap', 20);
            
            setToastMessage(`✨ Gap Analysis complete! Your Career Readiness Score has been updated to ${newScore}%!`);
            setTimeout(() => {
              setToastMessage(null);
            }, 4500);
          }
        }, 800);
      }
    }, 500);
  };

  // Send a message to AI Mentor Chat Drawer
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setMessages(prev => [...prev, {
      sender: 'user',
      text: userMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputMessage('');
    setIsTyping(true);

    // Dynamic tailored responses from AI Mentor about their career pathway
    setTimeout(() => {
      let aiResponseText = '';
      const lowercaseMsg = userMsg.toLowerCase();

      if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
        aiResponseText = `Hi ${user.name}! I hope you are having an amazing learning session. What specific concept or technology would you like to dive into next?`;
      } else if (lowercaseMsg.includes('terraform') || lowercaseMsg.includes('iac')) {
        aiResponseText = `Infrastructure as Code (Terraform) is highly recommended for you! I recommend starting with Terraform variables and configuration files. It should take about 2.5 hours to master.`;
      } else if (lowercaseMsg.includes('css') || lowercaseMsg.includes('html') || lowercaseMsg.includes('style')) {
        aiResponseText = `To boost your career readiness as a ${careerGoal} by 60%, perfecting HTML and modern CSS flexbox/grid is essential. Let's make sure you practice responsive styling!`;
      } else if (lowercaseMsg.includes('react') || lowercaseMsg.includes('next')) {
        aiResponseText = `React is a primary skill. Focus on functional state management hooks (useState, useEffect) and routing to build high-performance portfolios.`;
      } else if (lowercaseMsg.includes('roadmap') || lowercaseMsg.includes('study')) {
        aiResponseText = `Your curated Roadmap is divided into 4 custom adaptive phases matching your readiness. I suggest clicking "Launch Upskilling Roadmap" to review your syllabus!`;
      } else {
        aiResponseText = `That's a vital question. For a ${careerGoal}, mastering ${skills[1]?.name || 'system architecture'} is key. Let's make sure you review our Course Catalog under the "Course Catalog" page for recommended tracks.`;
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: aiResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <AppLayout>
      <div id="dashboard-page-container" className="space-y-6 pb-12 text-slate-100">
        
        {/* Welcome Section Header - Styled precisely matching the screenshot */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {user.name?.split(' ')[0] || 'Pooja'}.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">
              Tracking toward {user.careerGoal || 'Full Stack Devolper'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 mt-2 md:mt-0">
            <button
              id="dash-update-assessment-btn"
              onClick={() => navigate('/assessment')}
              className="px-4 py-2 bg-[#090f20]/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95"
            >
              Update assessment
            </button>
            <button
              id="dash-rerun-analysis-btn"
              onClick={handleRerunAnalysis}
              disabled={isAnalyzing}
              className={`px-4 py-2 text-white font-extrabold rounded-lg text-xs transition-all shadow-md flex items-center gap-1.5 ${
                isAnalyzing 
                  ? 'bg-[#0f1938] border border-indigo-500/20 text-indigo-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 fill-indigo-200 text-indigo-100 animate-pulse" /> Re-run analysis
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4 Stats Cards Row - Matched with screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Career Readiness */}
          <div className="bg-[#0b1329] p-5 border border-slate-800/80 rounded-xl shadow-lg flex flex-col justify-between min-h-[115px] relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest block">Career Readiness</span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1.5 flex items-baseline gap-1">
                  {user.readinessScore || 0}<span className="text-sm font-extrabold text-slate-400">%</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 font-semibold">
              Based on your latest gap analysis
            </p>
          </div>

          {/* Card 2: Skill Match */}
          <div className="bg-[#0b1329] p-5 border border-slate-800/80 rounded-xl shadow-lg flex flex-col justify-between min-h-[115px] relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest block">Skill Match</span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1.5 flex items-baseline gap-1">
                  {Math.round((user.readinessScore || 0) * 0.9)}<span className="text-sm font-extrabold text-slate-400">%</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 font-semibold">
              Based on your analyzed technologies
            </p>
          </div>

          {/* Card 3: Hours Invested */}
          <div className="bg-[#0b1329] p-5 border border-slate-800/80 rounded-xl shadow-lg flex flex-col justify-between min-h-[115px] relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest block">Hours Invested</span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1.5 flex items-baseline gap-1">
                   {user.learningHoursWeekly || 0}<span className="text-xs font-bold text-slate-400 ml-0.5">h</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 font-semibold">
              Study budget: {user.targetHoursWeekly || 20}h / week
            </p>
          </div>

          {/* Card 4: Activity Streak */}
          <div className="bg-[#0b1329] p-5 border border-slate-800/80 rounded-xl shadow-lg flex flex-col justify-between min-h-[115px] relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest block">Activity Streak</span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1.5 flex items-baseline gap-1">
                  {user.streakDays || 2}<span className="text-xs font-bold text-slate-400 ml-0.5">d</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Flame className="w-4 h-4 fill-cyan-400/20" />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 font-semibold">
              Keep the momentum going!
            </p>
          </div>
        </div>

        {/* TWO COLUMN CHARTS SECTION - ROW 1 (Matched with uploaded screenshots) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT 8 COLUMNS: Weekly Activity Analytics Dual Line Chart */}
          <div className="lg:col-span-8 bg-[#0b1329] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-5">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Weekly Activity Analytics
                  </h3>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Learning hours logged and milestones checked
                  </p>
                </div>
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest font-mono">
                  This Week
                </span>
              </div>

              {/* Custom Dual Line SVG Chart */}
              <div className="relative w-full h-[230px] flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 540 240">
                  {/* Grid Lines (Horizontal & Vertical) */}
                  {[0, 1, 2, 3, 4].map((level) => {
                    const y = 30 + (level * 40);
                    return (
                      <g key={level}>
                        <line 
                          x1="45" 
                          y1={y} 
                          x2="500" 
                          y2={y} 
                          stroke="#131e35" 
                          strokeWidth="1" 
                          strokeDasharray="3 3" 
                        />
                        {/* Y-axis values (0 to 4 reversed for coordinate grid) */}
                        <text 
                          x="25" 
                          y={y + 4} 
                          fill="#475569" 
                          fontSize="10" 
                          fontWeight="black" 
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {4 - level}
                        </text>
                      </g>
                    );
                  })}

                  {/* Vertical dotted grid lines */}
                  {[40, 116.7, 193.3, 270, 346.7, 423.3, 500].map((x, idx) => (
                    <line 
                      key={idx}
                      x1={x} 
                      y1="30" 
                      x2={x} 
                      y2="190" 
                      stroke="#131e35" 
                      strokeWidth="1" 
                      strokeDasharray="3 3" 
                    />
                  ))}

                  {/* X-axis labels */}
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                    const x = 40 + (idx * 76.66);
                    return (
                      <text 
                        key={idx}
                        x={x} 
                        y="215" 
                        fill="#475569" 
                        fontSize="10" 
                        fontWeight="black" 
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {day}
                      </text>
                    );
                  })}

                  {/* Green dashed line (Milestones Completed) */}
                  <path
                    d="M 40 150 C 70 150, 85 110, 116.7 110 C 145 110, 165 190, 193.3 190 C 220 190, 245 70, 270 70 C 295 70, 320 150, 346.7 150 C 375 150, 395 30, 423.3 30 C 450 30, 475 110, 500 110"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                  />

                  {/* Indigo solid line (Study Hours) */}
                  <path
                    d="M 40 130 C 70 130, 85 102, 116.7 102 C 145 102, 165 158, 193.3 158 C 220 158, 245 50, 270 50 C 295 50, 320 142, 346.7 142 C 375 142, 395 30, 423.3 30 C 450 30, 475 90, 500 90"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Milestones Dot Markers (Green) */}
                  {[
                    { x: 40, y: 150, val: 1 },
                    { x: 116.7, y: 110, val: 2 },
                    { x: 193.3, y: 190, val: 0 },
                    { x: 270, y: 70, val: 3 },
                    { x: 346.7, y: 150, val: 1 },
                    { x: 423.3, y: 30, val: 4 },
                    { x: 500, y: 110, val: 2 }
                  ].map((pt, idx) => (
                    <g key={`m-${idx}`}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#0b1329" stroke="#10b981" strokeWidth="2" />
                      <circle cx={pt.x} cy={pt.y} r="2" fill="#10b981" />
                    </g>
                  ))}

                  {/* Study Hours Dot Markers (Indigo/White) */}
                  {[
                    { x: 40, y: 130, val: 1.5 },
                    { x: 116.7, y: 102, val: 2.2 },
                    { x: 193.3, y: 158, val: 0.8 },
                    { x: 270, y: 50, val: 3.5 },
                    { x: 346.7, y: 142, val: 1.2 },
                    { x: 423.3, y: 30, val: 4.0 },
                    { x: 500, y: 90, val: 2.5 }
                  ].map((pt, idx) => (
                    <g key={`s-${idx}`}>
                      <circle cx={pt.x} cy={pt.y} r="6" fill="#6366f1" stroke="#101827" strokeWidth="1.5" />
                      <circle cx={pt.x} cy={pt.y} r="2.5" fill="#ffffff" />
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Custom Bottom Legend */}
            <div className="flex items-center justify-center gap-6 pt-3 mt-1 text-[10px] sm:text-xs font-bold text-slate-400 border-t border-slate-850/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#10b981] rounded-full"></span>
                </span>
                <span className="text-emerald-400">Milestones Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#6366f1] rounded-full"></span>
                </span>
                <span className="text-indigo-400">Study Hours</span>
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLUMNS: Employability Gauge Circle Card */}
          <div className="lg:col-span-4 bg-[#0b1329] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Employability Gauge
              </h3>
              <p className="text-[10px] text-slate-500 font-semibold">
                Current market employability rating
              </p>
            </div>

            {/* Radial Gauge Visual */}
            <div className="relative w-full h-[180px] flex items-center justify-center py-2">
              <svg className="w-[180px] h-[180px] overflow-visible" viewBox="0 0 300 300">
                <defs>
                  <linearGradient id="employability-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="60%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>

                {/* Background Track Circle Arc - 270 degrees with gap at bottom */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="100" 
                  stroke="#131e35" 
                  strokeWidth="16" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray="471.2 157.1"
                  transform="rotate(135 150 150)"
                />

                {/* Foreground Active Arc - 32% or Dynamic Readiness Score */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="100" 
                  stroke="url(#employability-gradient)" 
                  strokeWidth="16" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray={`${((user.readinessScore || 32) / 100) * 471.2} 628.3`}
                  transform="rotate(135 150 150)"
                />

                {/* Central Labels */}
                <text x="150" y="145" fill="#ffffff" fontSize="52" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                  {user.readinessScore || 32}%
                </text>
                <text x="150" y="180" fill="#475569" fontSize="11" fontWeight="900" letterSpacing="1.5" textAnchor="middle" fontFamily="sans-serif">
                  READINESS SCORE
                </text>
              </svg>
            </div>

            {/* Subtext description below gauge */}
            <div className="pt-3 border-t border-slate-800/60 text-center">
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Acquiring fundamentals. Select active guides and beginner projects first.
              </p>
            </div>
          </div>

        </div>

        {/* TWO COLUMN CHARTS SECTION - ROW 2 (Matched with uploaded screenshots) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT 5 COLUMNS: Current Skill Composition Donut Card */}
          <div className="lg:col-span-5 bg-[#0b1329] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Current Skill Composition
              </h3>
            </div>

            {/* Donut chart visualization */}
            <div className="relative w-full h-[180px] flex items-center justify-center py-2">
              <svg className="w-[180px] h-[180px] overflow-visible" viewBox="0 0 300 300">
                {/* Circumference for R=90 is 2 * PI * 90 = 565.5 */}
                {/* Segment 1: Matching Skills (Color #818cf8) */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="90" 
                  stroke="#818cf8" 
                  strokeWidth="24" 
                  fill="none" 
                  strokeDasharray={dashMatching}
                  strokeDashoffset={offsetMatching}
                  transform="rotate(-90 150 150)"
                />

                {/* Segment 2: Missing Gaps (Color #3b82f6) */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="90" 
                  stroke="#3b82f6" 
                  strokeWidth="24" 
                  fill="none" 
                  strokeDasharray={dashGaps}
                  strokeDashoffset={offsetGaps}
                  transform="rotate(-90 150 150)"
                />

                {/* Segment 3: Weak / Beginner Skills (Color #10b981) */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="90" 
                  stroke="#10b981" 
                  strokeWidth="24" 
                  fill="none" 
                  strokeDasharray={dashWeak}
                  strokeDashoffset={offsetWeak}
                  transform="rotate(-90 150 150)"
                />
              </svg>
            </div>

            {/* Custom Grid Legend at the bottom */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/60 text-[9px] font-bold text-center">
              <div className="space-y-1">
                <span className="inline-block w-2.5 h-2.5 bg-[#818cf8] rounded-sm mr-1.5 align-middle"></span>
                <span className="text-slate-400">Matching ({pctMatching}%)</span>
              </div>
              <div className="space-y-1">
                <span className="inline-block w-2.5 h-2.5 bg-[#3b82f6] rounded-sm mr-1.5 align-middle"></span>
                <span className="text-slate-400">Gaps ({pctGaps}%)</span>
              </div>
              <div className="space-y-1">
                <span className="inline-block w-2.5 h-2.5 bg-[#10b981] rounded-sm mr-1.5 align-middle"></span>
                <span className="text-slate-400 text-xxs">Weak ({pctWeak}%)</span>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLUMNS: Competency Breakdown horizontal bar chart */}
          <div className="lg:col-span-7 bg-[#0b1329] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Competency Breakdown
              </h3>
            </div>

            {/* Horizontal Bar Chart layout with Left aligned axes */}
            <div className="py-5 space-y-6 flex-1 flex flex-col justify-center">
              {/* Row 1: Matching */}
              <div className="flex items-center gap-3">
                <div className="w-24 text-right text-[11px] font-bold text-slate-400">
                  Matching ({pctMatching}%)
                </div>
                {/* Vertical Axis line */}
                <div className="h-8 border-l border-slate-700"></div>
                <div className="flex-1">
                  <div className="bg-indigo-500 h-5 rounded-r-lg shadow-lg transition-all duration-500" style={{ width: `${Math.max(5, pctMatching)}%` }}></div>
                </div>
              </div>

              {/* Row 2: Gaps Left */}
              <div className="flex items-center gap-3">
                <div className="w-24 text-right text-[11px] font-bold text-slate-400">
                  Gaps Left ({pctGaps}%)
                </div>
                {/* Vertical Axis line */}
                <div className="h-8 border-l border-slate-700"></div>
                <div className="flex-1">
                  <div className="bg-amber-500 h-5 rounded-r-lg shadow-lg transition-all duration-500" style={{ width: `${Math.max(5, pctGaps)}%` }}></div>
                </div>
              </div>

              {/* Row 3: Readiness Score */}
              <div className="flex items-center gap-3">
                <div className="w-24 text-right text-[11px] font-bold text-slate-400">
                  Readiness ({Math.round(user.readinessScore || 0)}%)
                </div>
                {/* Vertical Axis line */}
                <div className="h-8 border-l border-slate-700"></div>
                <div className="flex-1">
                  <div className="bg-emerald-500 h-5 rounded-r-lg shadow-lg transition-all duration-500" style={{ width: `${Math.max(5, Math.round(user.readinessScore || 0))}%` }}></div>
                </div>
              </div>
            </div>

            {/* Subtext description matching screenshot */}
            <div className="pt-3 border-t border-slate-800/60">
              <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                These scores update live as you click the roadmap timeline tasks. Keep checking off items to grow the match rate dynamically.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: ROADMAP PROGRESS (LEFT) & RECENT ACTIVITY (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* BOTTOM LEFT (2/3 width) - ROADMAP PROGRESS */}
          <div className="lg:col-span-7 bg-[#0b1329] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
                <h3 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                  Roadmap progress
                </h3>
                <Link to="/roadmap" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5">
                  View <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Progress completion info block */}
              <div className="space-y-3 py-1">
                <p className="text-xs font-semibold text-slate-400">
                  No roadmap yet
                </p>
                
                {/* Horizontal track line as displayed in screenshot */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-800 h-full w-0"></div>
                </div>
              </div>
            </div>

            {/* Action button container */}
            <div className="mt-8 pt-4 border-t border-slate-800/40">
              <button
                id="btn-generate-roadmap-dash"
                type="button"
                onClick={handleGenerateRoadmap}
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-indigo-600/90 hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/10 active:scale-[0.99] transition-all"
              >
                <Layers className="w-4.5 h-4.5 text-indigo-100" />
                <span>Generate roadmap</span>
              </button>
            </div>
          </div>

          {/* BOTTOM RIGHT (1/3 width) - RECENT ACTIVITY */}
          <div className="lg:col-span-5 bg-[#0b1329] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
              <h3 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                Recent activity
              </h3>
            </div>

            {/* List log matches screenshot style */}
            <div className="space-y-3.5 flex-1 py-1">
              {/* Row 1 */}
              <div className="flex justify-between items-center text-xs py-2 px-3 bg-slate-900/30 rounded-lg border border-slate-800/40 hover:border-slate-800 transition-colors">
                <span className="font-bold text-slate-200">Assessment Saved</span>
                <span className="text-[10px] text-slate-500 font-extrabold">27/06/2026</span>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between items-center text-xs py-2 px-3 bg-slate-900/30 rounded-lg border border-slate-800/40 hover:border-slate-800 transition-colors">
                <span className="font-bold text-slate-200">Assessment Saved</span>
                <span className="text-[10px] text-slate-500 font-extrabold">27/06/2026</span>
              </div>

              {/* Default fallbacks if context has activities */}
              {activities.length > 0 && activities.slice(0, 1).map((act) => (
                <div key={act.id} className="flex justify-between items-center text-xs py-2 px-3 bg-slate-900/30 rounded-lg border border-slate-800/40 hover:border-slate-800 transition-colors">
                  <span className="font-bold text-slate-200 truncate max-w-[210px]">{act.title}</span>
                  <span className="text-[10px] text-slate-500 font-extrabold">28/06/2026</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* WIDE FOOTER BAR: TALK TO YOUR AI MENTOR */}
        <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-6 sm:p-7 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden group">
          {/* Glowing blur decorator */}
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-black text-white">
              Talk to your AI mentor
            </h4>
            <p className="text-xs text-slate-400">
              A 24/7 coach who knows your goal and progress.
            </p>
          </div>

          <button
            id="btn-open-mentor-chat-dash"
            type="button"
            onClick={() => setChatOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-950 hover:bg-black border border-slate-800 hover:border-slate-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] group/btn"
          >
            <span>Open chat</span>
            <ChevronRight className="w-4.5 h-4.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* --- SIMULATED COMPILATION OVERLAY DIALOG --- */}
      {isGeneratingRoadmap && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-4.5 h-4.5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  AI Roadmap Generator
                </h3>
                <p className="text-[10px] text-slate-500">Compiling multi-vector educational sequences</p>
              </div>
            </div>

            {/* Live Logs console */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-lg p-4 h-44 overflow-y-auto font-mono text-[10px] text-indigo-300 space-y-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
              {generationLogs.map((log, index) => (
                <p key={index} className="leading-relaxed animate-fade-in">
                  {log}
                </p>
              ))}
              <div className="w-1.5 h-3.5 bg-indigo-400 animate-pulse inline-block ml-0.5"></div>
            </div>

            {/* Custom progress loading bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>Compilation sequence</span>
                <span>{Math.round(((generationStep + 1) / 7) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((generationStep + 1) / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MENTOR CHAT INTERACTIVE DRAWER OVERLAY --- */}
      {chatOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex justify-end select-none">
          {/* Backdrop dismissal click overlay */}
          <div className="flex-1" onClick={() => setChatOpen(false)}></div>

          {/* Chat Panel Box */}
          <div className="w-full max-w-md bg-[#090f20] h-full border-l border-slate-800 flex flex-col text-slate-100 shadow-2xl relative">
            
            {/* Header block with close action button */}
            <div className="p-4.5 border-b border-slate-800/80 bg-[#0b1329] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Sparkles className="w-5.5 h-5.5 text-indigo-400 animate-pulse" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#090f20]"></span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wide">
                    AI Upskilling Coach
                  </h4>
                  <p className="text-[9px] text-emerald-400 font-extrabold tracking-widest uppercase">
                    ACTIVE • ONLINE
                  </p>
                </div>
              </div>

              <button
                id="btn-close-mentor-chat-drawer"
                type="button"
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Conversation list panel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#060b18]">
              {messages.map((msg, index) => {
                const isAi = msg.sender === 'ai';
                return (
                  <div 
                    key={index} 
                    className={`flex ${isAi ? 'justify-start' : 'justify-end'} items-start gap-2`}
                  >
                    {isAi && (
                      <div className="w-7 h-7 rounded bg-indigo-600/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0 text-xs mt-0.5">
                        🤖
                      </div>
                    )}
                    
                    <div className="max-w-[80%] flex flex-col">
                      <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                        isAi 
                          ? 'bg-[#0b1329] border border-slate-800 text-slate-200' 
                          : 'bg-indigo-600 text-white rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className={`text-[8px] text-slate-500 font-bold mt-1.5 block ${
                        isAi ? 'text-left pl-1' : 'text-right pr-1'
                      }`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing Loader Indicator bubble */}
              {isTyping && (
                <div className="flex justify-start items-start gap-2">
                  <div className="w-7 h-7 rounded bg-indigo-600/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0 text-xs mt-0.5">
                    🤖
                  </div>
                  <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Custom Interactive Suggestions list to help user query the coach */}
            <div className="p-3 bg-[#0b1329]/40 border-t border-slate-800/60 shrink-0 flex gap-2 overflow-x-auto scrollbar-none select-none">
              <button
                type="button"
                onClick={() => setInputMessage('How can I boost my CSS skills?')}
                className="px-3 py-1.5 bg-[#090f20] hover:bg-slate-850 border border-slate-800 rounded-lg text-[9px] font-bold text-slate-300 transition-colors shrink-0"
              >
                💡 How to boost CSS skills?
              </button>
              <button
                type="button"
                onClick={() => setInputMessage('Tell me about Terraform.')}
                className="px-3 py-1.5 bg-[#090f20] hover:bg-slate-850 border border-slate-800 rounded-lg text-[9px] font-bold text-slate-300 transition-colors shrink-0"
              >
                ⚙️ Tell me about Terraform
              </button>
              <button
                type="button"
                onClick={() => setInputMessage('What should I study next?')}
                className="px-3 py-1.5 bg-[#090f20] hover:bg-slate-850 border border-slate-800 rounded-lg text-[9px] font-bold text-slate-300 transition-colors shrink-0"
              >
                🎓 What to study next?
              </button>
            </div>

            {/* Message input field bar */}
            <form 
              onSubmit={handleSendMessage}
              className="p-4 bg-[#0b1329] border-t border-slate-800/80 shrink-0 flex items-center gap-2.5"
            >
              <input
                id="mentor-chat-input-field"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask your Coach a question..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                id="btn-send-mentor-msg"
                type="submit"
                className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-md shrink-0 active:scale-95"
                title="Send Message"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* --- SIMULATED GAP ANALYSIS OVERLAY DIALOG --- */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-slate-800/80 rounded-2xl p-6 w-full max-w-md shadow-[0_0_50px_rgba(99,102,241,0.25)] relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Career Gap Analyzer
                </h3>
                <p className="text-[10px] text-slate-500 font-semibold">Recalibrating upskilling readiness vectors</p>
              </div>
            </div>

            {/* Live Logs console */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 h-48 overflow-y-auto font-mono text-[10px] text-indigo-300/90 space-y-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
              {analysisLogs.map((log, index) => (
                <p key={index} className="leading-relaxed flex items-center gap-1.5">
                  <span className="text-slate-600 select-none">›</span> {log}
                </p>
              ))}
              <div className="w-1.5 h-3.5 bg-indigo-400 animate-pulse inline-block ml-0.5"></div>
            </div>

            {/* Custom progress loading bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <span>Analysis sequence</span>
                <span>{Math.round(((analysisStep + 1) / 6) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full p-0.5 border border-slate-800 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-600 to-cyan-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((analysisStep + 1) / 6) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.4)] z-50 flex items-center gap-3 border border-emerald-500 animate-slide-up">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">✓</div>
          <span className="text-xs font-black tracking-tight">{toastMessage}</span>
        </div>
      )}

    </AppLayout>
  );
};
