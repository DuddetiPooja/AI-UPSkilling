import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { 
  ArrowRight, 
  Layers, 
  Map, 
  Sparkles, 
  Cpu, 
  CheckCircle, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  ChevronRight,
  Database,
  Brain,
  MessageSquare,
  Compass
} from 'lucide-react';

export const Home: React.FC = () => {
  const { isAuthenticated } = useApp();

  return (
    <div id="home-page" className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-6">
          <div className="space-y-8 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-bold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" /> Adaptive Professional Upskilling
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Bridge Your <br />
              Skill Gap with <span className="text-indigo-400 font-bold">AI</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              Assess your skills, identify gaps against industry standards, and receive personalized AI-powered learning roadmaps to achieve your dream career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                id="hero-primary-cta"
                to={isAuthenticated ? "/dashboard" : "/signup"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all hover:translate-x-0.5 w-full sm:w-auto"
              >
                Start Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                id="hero-secondary-cta"
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded font-bold text-sm transition-colors w-full sm:w-auto"
              >
                Explore Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#060a18] border-b border-slate-900 text-white relative">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              An adaptive system, not just another course list
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Every step is generated for you and updated as you progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: AI Skill Assessment */}
            <div className="bg-[#0b1026]/60 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-[#0b1026] p-6 rounded-2xl transition-all duration-200">
              <div className="w-10 h-10 bg-[#161a34] rounded-xl flex items-center justify-center mb-5 border border-indigo-500/20 text-indigo-400">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI Skill Assessment</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Rate your skills across 40+ technologies — we calibrate instantly.
              </p>
            </div>

            {/* Card 2: Gap Analysis (Featured/Active card with elegant purple glowing border) */}
            <div className="bg-[#0b1026]/60 border border-indigo-500/40 hover:border-indigo-500/60 hover:bg-[#0b1026] p-6 rounded-2xl transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.12)]">
              <div className="w-10 h-10 bg-[#161a34] rounded-xl flex items-center justify-center mb-5 border border-indigo-500/30 text-indigo-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Gap Analysis</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                See exactly which skills stand between you and your dream role.
              </p>
            </div>

            {/* Card 3: Smart Recommendations */}
            <div className="bg-[#0b1026]/60 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-[#0b1026] p-6 rounded-2xl transition-all duration-200">
              <div className="w-10 h-10 bg-[#161a34] rounded-xl flex items-center justify-center mb-5 border border-indigo-500/20 text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Smart Recommendations</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Tech, courses, and projects picked for your goal and level.
              </p>
            </div>

            {/* Card 4: Personal Roadmap */}
            <div className="bg-[#0b1026]/60 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-[#0b1026] p-6 rounded-2xl transition-all duration-200">
              <div className="w-10 h-10 bg-[#161a34] rounded-xl flex items-center justify-center mb-5 border border-indigo-500/20 text-indigo-400">
                <Map className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Personal Roadmap</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Multi-phase plan with milestones, hours, and resources.
              </p>
            </div>

            {/* Card 5: Progress Dashboard */}
            <div className="bg-[#0b1026]/60 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-[#0b1026] p-6 rounded-2xl transition-all duration-200">
              <div className="w-10 h-10 bg-[#161a34] rounded-xl flex items-center justify-center mb-5 border border-indigo-500/20 text-indigo-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Progress Dashboard</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Track readiness, completion, and momentum in one place.
              </p>
            </div>

            {/* Card 6: AI Mentor */}
            <div className="bg-[#0b1026]/60 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-[#0b1026] p-6 rounded-2xl transition-all duration-200">
              <div className="w-10 h-10 bg-[#161a34] rounded-xl flex items-center justify-center mb-5 border border-indigo-500/20 text-indigo-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI Mentor</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                A 24/7 mentor that knows your goal and progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">The Process</h2>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Four Steps to Modern Skill Mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative space-y-4 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center mx-auto md:mx-0 shadow-md">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Define Your Goal</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Select your target industry role (e.g., Cloud Architect, Lead AI Engineer) and configure your timeline parameters.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative space-y-4 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto md:mx-0 shadow-md">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Take Adaptive Assessment</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Identify current skill levels across engineering domains, platforms, and methodologies via targeted questions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative space-y-4 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto md:mx-0 shadow-md">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Analyze the Gaps</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Visualize exact missing skills mapped directly to hiring standards, featuring an interactive overall readiness benchmark.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative space-y-4 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto md:mx-0 shadow-md">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900">Follow the Adaptive Path</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Go through structured modular sessions. Completion updates your gap analysis and overall readiness scores in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Why AI Upskilling</h2>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Designed to Maximize Learning Outcomes
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Other programs force you to read long textbooks cover-to-cover. We focus heavily on pinpointing your critical missing skill blocks, slicing overall study time in half.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">No Wasted Energy</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Instantly filter out concepts you already understand. Focus only on the exact building blocks required for system architecture.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Curated Resources</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Each recommendation pulls top-tier references and official documentation so you always study pristine engineering standards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Verified Badging & Metrics</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Earn achievements and share detailed gap analysis scores directly with hiring partners to prove capability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="space-y-6">
                <div className="text-center border-b border-slate-200 pb-6">
                  <span className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-widest block mb-1">Weekly Metrics Highlight</span>
                  <h3 className="text-lg font-bold text-slate-900">Weekly Study Effort Comparison</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-700">AI Upskilling Target Courseware</span>
                      <span className="text-indigo-600">14.2 Hours / week</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-2.5 rounded-full w-[71%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-500">Standard Generic Bootcamp</span>
                      <span className="text-slate-500">40.0 Hours / week</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-slate-400 h-2.5 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <p className="text-xs text-indigo-800 leading-relaxed text-center font-medium">
                    "AI Upskilling reduced my preparation time for AWS Solutions Architect by 60%. I only studied what my gap analyzer identified."
                  </p>
                  <p className="text-[10px] text-indigo-500 font-bold text-center mt-2">
                    — Lead Systems Engineer at CloudTech
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Accelerate Your Career Goal?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Create your profile, enter your target role, and let our adaptive algorithm map your exact skill gaps. Get your custom upskilling roadmap in 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              id="cta-primary-signup"
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded text-sm transition-all hover:translate-x-0.5 shadow-lg shadow-indigo-600/30"
            >
              Sign Up Now <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              id="cta-secondary-login"
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold text-sm border border-slate-700 transition-colors"
            >
              Access Member Portal
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
