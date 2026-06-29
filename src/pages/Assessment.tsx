import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/AppLayout';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Plus, 
  X, 
  Zap, 
  Clock, 
  Cpu, 
  Sparkles, 
  Flame, 
  DollarSign 
} from 'lucide-react';

const techSections = [
  {
    title: 'Programming Languages',
    options: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'C#', 'Go']
  },
  {
    title: 'Frontend & UI Frameworks',
    options: ['HTML', 'CSS', 'React', 'Next.js', 'Angular', 'Vue.js', 'Tailwind CSS', 'Bootstrap']
  },
  {
    title: 'Backend, Frameworks & APIs',
    options: ['Node.js', 'Express.js', 'Spring Boot', 'Django', 'Flask', '.NET', 'REST APIs', 'GraphQL']
  },
  {
    title: 'Databases & Storage',
    options: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Database Design']
  },
  {
    title: 'AI, Machine Learning & Data Science',
    options: [
      'AI/ML', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 
      'Generative AI', 'Data Science', 'Data Analytics', 'Statistics', 
      'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'
    ]
  },
  {
    title: 'Cloud & Infrastructure',
    options: ['Cloud Computing', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD']
  },
  {
    title: 'Tools & Systems',
    options: ['Git', 'GitHub', 'Linux', 'Data Structures', 'Algorithms', 'System Design']
  },
  {
    title: 'Security, Testing & Specialized Domains',
    options: [
      'Cyber Security', 'Network Security', 'Testing', 'Automation Testing', 
      'Blockchain', 'Mobile Development', 'Flutter', 'React Native', 
      'UI/UX Design', 'Figma'
    ]
  }
];

const techOptions = techSections.reduce<string[]>((acc, section) => [...acc, ...section.options], []);

const interestOptions = [
  'Web Development',
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Web Architecture',
  'API Development',
  'Database Design',
  'Cloud Infrastructure',
  'DevOps Engineering',
  'Machine Learning',
  'Artificial Intelligence',
  'Generative AI',
  'Data Science',
  'Data Analytics',
  'Mobile Development',
  'Cybersecurity Protocols',
  'UI/UX Interactive Designs',
  'Software Architecture',
  'System Design',
  'Automation Testing'
];

interface CareerGoalPath {
  title: string;
  level: 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  levelColor: string;
  levelBg: string;
  description: string;
  salary: string;
}

const careerPaths: CareerGoalPath[] = [
  {
    title: 'Frontend Developer',
    level: 'INTERMEDIATE',
    levelColor: 'text-emerald-400',
    levelBg: 'bg-emerald-500/10 border-emerald-500/20',
    description: 'Specialize in building user-facing web applications using interactive visual frameworks, styling tools, and clean architectures.',
    salary: '$85,000 - $130,000'
  },
  {
    title: 'Backend Developer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Focuses on server-side logic, database architectures, building APIs, application security, and server scaling configurations.',
    salary: '$90,000 - $140,000'
  },
  {
    title: 'Full Stack Developer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'A versatile generalist developer capable of working across both the frontend and backend of web applications, managing deployments, and databases.',
    salary: '$100,000 - $160,000'
  },
  {
    title: 'MERN Stack Developer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Build full stack JavaScript applications specifically using MongoDB, Express.js, React, and Node.js.',
    salary: '$100,000 - $150,000'
  },
  {
    title: 'Java Full Stack Developer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Develop enterprise full-stack applications with robust Java Spring Boot backends and modern frontend frameworks.',
    salary: '$105,000 - $165,000'
  },
  {
    title: 'Python Full Stack Developer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Utilize Django or Flask combined with modern single-page frontend frameworks to build performant, data-centric platforms.',
    salary: '$105,000 - $160,000'
  },
  {
    title: 'Software Engineer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Apply engineering principles to design, develop, test, and maintain large-scale software systems across varied environments.',
    salary: '$110,000 - $170,000'
  },
  {
    title: 'AI Engineer',
    level: 'EXPERT',
    levelColor: 'text-purple-400',
    levelBg: 'bg-purple-500/10 border-purple-500/20',
    description: 'Designs and builds intelligent systems, fine-tunes artificial intelligence models, processes complex datasets, and implements machine learning solutions.',
    salary: '$120,000 - $200,000'
  },
  {
    title: 'Machine Learning Engineer',
    level: 'EXPERT',
    levelColor: 'text-purple-400',
    levelBg: 'bg-purple-500/10 border-purple-500/20',
    description: 'Specialize in training, deploying, and optimizing predictive ML pipelines, deep learning models, and complex data infrastructures.',
    salary: '$125,000 - $210,000'
  },
  {
    title: 'Data Scientist',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Analyze complex datasets using statistical modeling, machine learning, and data mining techniques to drive business decisions.',
    salary: '$110,000 - $180,000'
  },
  {
    title: 'Data Analyst',
    level: 'INTERMEDIATE',
    levelColor: 'text-emerald-400',
    levelBg: 'bg-emerald-500/10 border-emerald-500/20',
    description: 'Translate raw data into actionable dashboards and insights using tools like SQL, Python, Excel, and BI tools.',
    salary: '$75,000 - $115,000'
  },
  {
    title: 'Cloud Engineer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Design, maintain, and scale highly available, secure, and resilient cloud architectures on AWS, Azure, or GCP.',
    salary: '$110,000 - $165,000'
  },
  {
    title: 'DevOps Engineer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Automate deployment infrastructure, maintain CI/CD pipelines, containerize applications, and manage system operations.',
    salary: '$115,000 - $175,000'
  },
  {
    title: 'Cybersecurity Engineer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Protect applications, networks, and cloud infrastructures from vulnerabilities, breaches, and unauthorized access.',
    salary: '$115,000 - $180,000'
  },
  {
    title: 'Mobile App Developer',
    level: 'INTERMEDIATE',
    levelColor: 'text-emerald-400',
    levelBg: 'bg-emerald-500/10 border-emerald-500/20',
    description: 'Design and build cross-platform or native mobile applications for iOS and Android using modern environments.',
    salary: '$85,000 - $135,000'
  },
  {
    title: 'UI/UX Designer',
    level: 'INTERMEDIATE',
    levelColor: 'text-emerald-400',
    levelBg: 'bg-emerald-500/10 border-emerald-500/20',
    description: 'Create clean wireframes, high-fidelity prototypes, interactive layouts, and user experiences using tools like Figma.',
    salary: '$80,000 - $125,000'
  },
  {
    title: 'Product Engineer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Work at the intersection of product management, engineering, and design to build features optimized for user engagement.',
    salary: '$110,000 - $175,000'
  },
  {
    title: 'Blockchain Developer',
    level: 'ADVANCED',
    levelColor: 'text-amber-400',
    levelBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Design and develop decentralized applications, secure smart contracts, and cryptographic ledger systems.',
    salary: '$120,000 - $190,000'
  }
];

export const Assessment: React.FC = () => {
  const { user, submitAssessment } = useApp();
  const navigate = useNavigate();

  // Multi-step form state (Steps 1 to 4)
  const [step, setStep] = useState(1); // Start at step 1 for natural flow
  const [fullName, setFullName] = useState(user?.name || 'Pooja Duddeti');
  const [email, setEmail] = useState(user?.email || 'poojaduddeti@gmail.com');
  const [education, setEducation] = useState('Bachelor of Science (Computer Science)');
  const [experienceTier, setExperienceTier] = useState('Student (Pre-professional / Intern)');
  const [techExperienceLevel, setTechExperienceLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  const [currentLevel, setCurrentLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [weeklyCommitment, setWeeklyCommitment] = useState(20);
  const [learningStyle, setLearningStyle] = useState<'Adaptive' | 'Fast-Track' | 'Deep-Dive'>('Adaptive');
  
  // Step 2 state: Technologies
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  
  // Step 3 state: Excited areas and Custom framework tags
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [frameworkInput, setFrameworkInput] = useState('');
  const [customFrameworks, setCustomFrameworks] = useState<string[]>([]);
  
  // Step 4 state: Target career path selection
  const [selectedCareerPath, setSelectedCareerPath] = useState<string>('Frontend Developer');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  // Toggle single tech
  const handleTechToggle = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech) 
        : [...prev, tech]
    );
  };

  // Select all / None
  const handleSelectAllTech = () => {
    if (selectedTechs.length === techOptions.length) {
      setSelectedTechs([]);
    } else {
      setSelectedTechs([...techOptions]);
    }
  };

  // Toggle interest domain (restricted to selecting exactly one domain)
  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? [] : [interest]
    );
    setStepError(null);
  };

  // Add framework tag
  const handleAddFramework = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = frameworkInput.trim();
    if (clean && !customFrameworks.includes(clean)) {
      setCustomFrameworks(prev => [...prev, clean]);
      setFrameworkInput('');
    }
  };

  const handleKeyDownFramework = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFramework();
    }
  };

  const handleRemoveFramework = (indexToRemove: number) => {
    setCustomFrameworks(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleNext = () => {
    if (step === 3 && selectedInterests.length !== 1) {
      setStepError("Please choose exactly one domain of interest before proceeding.");
      return;
    }
    setStepError(null);
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setStepError(null);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length !== 1) {
      setStepError("Please choose exactly one domain of interest before proceeding.");
      setStep(3);
      return;
    }
    setFormSubmitted(true);

    // Map career level nicely
    let levelSelection: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' = techExperienceLevel as any;
    const selectedPathObj = careerPaths.find(p => p.title === selectedCareerPath);
    if (selectedPathObj) {
      if (selectedPathObj.level === 'INTERMEDIATE') levelSelection = 'Intermediate';
      if (selectedPathObj.level === 'ADVANCED') levelSelection = 'Advanced';
      if (selectedPathObj.level === 'EXPERT') levelSelection = 'Expert';
    }

    // Submit assessment metadata to state provider (no fallback defaults for skills or interests)
    submitAssessment({
      currentLevel: levelSelection,
      careerGoal: selectedCareerPath,
      selectedSkills: selectedTechs,
      interests: selectedInterests,
      weeklyHoursCommitment: weeklyCommitment
    });

    // Simulate model adapting and navigate back
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {formSubmitted ? (
          /* Celebration State */
          <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-12 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-indigo-500/20 border border-indigo-500/30 rounded-full flex items-center justify-center mx-auto text-indigo-400 animate-bounce">
              <Zap className="w-8 h-8 fill-indigo-400/20" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Recalculating Skill Gap Matrix</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Our adaptive engineering model is syncing your profile. Overriding curriculum benchmarks to optimize roadmap phases...
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 py-2.5 px-5 rounded-full">
              <Sparkles className="w-4 h-4 animate-spin text-indigo-400" /> Adjusting customized learning roadmap...
            </div>
          </div>
        ) : (
          /* Main Multi-Step Dark Card */
          <div className="bg-[#0b1329] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Form Header */}
            <div className="p-6 sm:p-8 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600/15 border border-indigo-500/30 rounded-lg flex items-center justify-center text-indigo-400 shrink-0">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Intelligent Skills Profile Assessment
                  </h2>
                  {step !== 1 && (
                    <p className="text-[11px] text-slate-400">
                      Calibrate your experience benchmarks & align with standard industry rubrics.
                    </p>
                  )}
                </div>
              </div>

              {/* Step indicator badge */}
              <div className="self-start sm:self-auto px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full text-[11px] font-bold tracking-wider">
                Step {step} of 4
              </div>
            </div>

            {/* Inner Content Area */}
            <div className="p-6 sm:p-8 flex-1 min-h-[360px]">
              
              {/* STEP 1: Basic Profile Setup & Learning Budget */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn text-slate-300">
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                    Provide your foundational academic background and current professional experience tier so our AI can accurately position your recommendations.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="input-fullname" className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                        Full Name
                      </label>
                      <input
                        id="input-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="block w-full bg-[#070d19]/80 border border-slate-800 hover:border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email (Optional) */}
                    <div className="space-y-2">
                      <label htmlFor="input-email" className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                        Email (Optional)
                      </label>
                      <input
                        id="input-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full bg-[#070d19]/80 border border-slate-800 hover:border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
                        placeholder="Enter your email"
                      />
                    </div>

                    {/* Education Level */}
                    <div className="space-y-2">
                      <label htmlFor="select-education" className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                        Education / Credential Level
                      </label>
                      <select
                        id="select-education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="block w-full bg-[#070d19]/80 border border-slate-800 hover:border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-semibold cursor-pointer"
                      >
                        <option value="Bachelor of Science (Computer Science)">Bachelor of Science (Computer Science)</option>
                        <option value="Master of Science (Computer Science / Data Science)">Master of Science (Computer Science / Data Science)</option>
                        <option value="Bachelor of Engineering (ECE / IT)">Bachelor of Engineering (ECE / IT)</option>
                        <option value="Self-Taught / Bootcamp Graduate">Self-Taught / Bootcamp Graduate</option>
                        <option value="High School Diploma / Other">High School Diploma / Other</option>
                      </select>
                    </div>

                    {/* Professional Experience Tier */}
                    <div className="space-y-2">
                      <label htmlFor="select-experience-tier" className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                        Professional Experience Tier
                      </label>
                      <select
                        id="select-experience-tier"
                        value={experienceTier}
                        onChange={(e) => setExperienceTier(e.target.value)}
                        className="block w-full bg-[#070d19]/80 border border-slate-800 hover:border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-semibold cursor-pointer"
                      >
                        <option value="Student (Pre-professional / Intern)">Student (Pre-professional / Intern)</option>
                        <option value="Junior Developer (0-2 years experience)">Junior Developer (0-2 years experience)</option>
                        <option value="Mid-Level Developer (2-5 years experience)">Mid-Level Developer (2-5 years experience)</option>
                        <option value="Senior Developer (5+ years experience)">Senior Developer (5+ years experience)</option>
                        <option value="Career Transitioner (Non-tech to Tech)">Career Transitioner (Non-tech to Tech)</option>
                      </select>
                    </div>
                  </div>

                  {/* Overall Tech Experience Level Buttons */}
                  <div className="space-y-3 pt-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                      Overall Tech Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => {
                        const isSelected = techExperienceLevel === level;
                        return (
                          <button
                            key={level}
                            id={`btn-tech-exp-${level.toLowerCase()}`}
                            type="button"
                            onClick={() => setTechExperienceLevel(level)}
                            className={
                              isSelected
                                ? "w-full py-3.5 px-4 rounded-lg border border-indigo-500 bg-[#161a34] text-indigo-200 font-black text-sm tracking-wide text-center transition-all duration-150 shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                                : "w-full py-3.5 px-4 rounded-lg border border-slate-800 bg-[#070d19]/40 hover:bg-[#070d19] hover:border-slate-700 text-slate-400 hover:text-slate-200 text-sm font-semibold tracking-wide text-center transition-all duration-150"
                            }
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT KNOWN TECHNOLOGIES */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">
                      Identify the core technical languages, packages, frameworks, and databases you already have basic or working knowledge of.
                    </p>
                  </div>

                  {/* Select row count & Select All link */}
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
                      SELECT KNOWN TECHNOLOGIES ({selectedTechs.length})
                    </span>
                    <button
                      id="btn-select-all-tech"
                      type="button"
                      onClick={handleSelectAllTech}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {selectedTechs.length === techOptions.length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>

                  {/* Categorized Tech Options by Section */}
                  <div className="space-y-6 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                    {techSections.map((section) => (
                      <div key={section.title} className="space-y-2.5">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pb-1 border-b border-slate-900/50">
                          {section.title}
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {section.options.map((tech) => {
                            const isSelected = selectedTechs.includes(tech);
                            return (
                              <button
                                key={tech}
                                id={`tech-select-btn-${tech.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                type="button"
                                onClick={() => handleTechToggle(tech)}
                                className={`group flex items-center justify-between p-3 rounded-lg border text-left text-xs transition-all duration-150 ${
                                  isSelected 
                                    ? 'bg-indigo-600/10 border-indigo-500/80 text-white font-bold' 
                                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                                }`}
                              >
                                <span className="truncate pr-1">{tech}</span>
                                
                                {/* Selection indicator circle */}
                                <div className={`w-4.5 h-4.5 rounded-full border shrink-0 flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'border-indigo-500 bg-indigo-500 text-white shadow-[0_0_8px_rgba(99,102,241,0.5)]' 
                                    : 'border-slate-700 bg-slate-950 group-hover:border-slate-600'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: EXCITED AREAS OF TECHNOLOGY & CUSTOM FRAMEWORK ADDER */}
              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">
                      Choose exactly one primary domain of interest that excites you the most. You must choose one domain before going to the next step.
                    </p>
                  </div>

                  {stepError && (
                    <div id="step-validation-error" className="p-3.5 bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-bold rounded-lg animate-pulse flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 animate-ping"></span>
                      <span>{stepError}</span>
                    </div>
                  )}

                  {/* Select row count & Select All link */}
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
                      SELECT PRIMARY INTEREST DOMAIN ({selectedInterests.length > 0 ? '1 SELECTED' : '0 SELECTED'})
                    </span>
                    <span className="text-xs font-bold text-indigo-400">
                      Choose exactly one domain
                    </span>
                  </div>

                  {/* Interests select boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {interestOptions.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          id={`interest-select-btn-${interest.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                          type="button"
                          onClick={() => handleInterestToggle(interest)}
                          className={`group flex items-center p-3.5 rounded-lg border text-left text-xs transition-all duration-150 ${
                            isSelected 
                              ? 'bg-indigo-600/10 border-indigo-500/80 text-white font-bold' 
                              : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          {/* Circle on Left as per Screenshot 2 */}
                          <div className={`w-4.5 h-4.5 rounded-full border shrink-0 flex items-center justify-center mr-3.5 transition-all ${
                            isSelected 
                              ? 'border-indigo-500 bg-indigo-500 text-white shadow-[0_0_8px_rgba(99,102,241,0.5)]' 
                              : 'border-slate-700 bg-slate-950 group-hover:border-slate-600'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>

                          <span className="truncate">{interest}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Framework input tag manager as per Screenshot 2 */}
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <label htmlFor="framework-adder-input" className="text-xs font-extrabold text-slate-400 uppercase tracking-wide block">
                      Preferred Specific Frameworks / Libraries
                    </label>

                    <div className="flex gap-2">
                      <input
                        id="framework-adder-input"
                        type="text"
                        value={frameworkInput}
                        onChange={(e) => setFrameworkInput(e.target.value)}
                        onKeyDown={handleKeyDownFramework}
                        placeholder="e.g. PyTorch, Next.js, Redux (Press Enter to add)"
                        className="flex-1 bg-slate-900/80 border border-slate-800 hover:border-slate-750 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        id="btn-add-framework"
                        type="button"
                        onClick={() => handleAddFramework()}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 text-white rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4 text-slate-400" /> Add
                      </button>
                    </div>

                    {/* Framework Tags Container */}
                    {customFrameworks.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {customFrameworks.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1 bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            <span>{tag}</span>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveFramework(idx)}
                              className="hover:text-red-400 p-0.5"
                              title="Remove"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: SELECT TARGET CAREER PATH */}
              {step === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">
                      Select your desired target career path. Our AI Recommendations engine will perform a gap analysis against this specific role's current industry-required stack.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs font-extrabold text-slate-400 tracking-wider uppercase block pb-1 border-b border-slate-800">
                      DESIRED CAREER GOAL PATH
                    </span>

                    {/* Vertical list layout of path options matching Screenshot 3 with max-height and scrolling */}
                    <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                      {careerPaths.map((path) => {
                        const isSelected = selectedCareerPath === path.title;
                        return (
                          <button
                            key={path.title}
                            id={`career-path-btn-${path.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            type="button"
                            onClick={() => setSelectedCareerPath(path.title)}
                            className={`w-full flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border text-left transition-all duration-200 ${
                              isSelected 
                                ? 'bg-indigo-650/10 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                                : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/70'
                            }`}
                          >
                            {/* Left description details */}
                            <div className="space-y-1.5 md:max-w-2xl">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                                  {path.title}
                                </span>
                                <span className={`px-2 py-0.5 border text-[9px] font-extrabold rounded ${path.levelBg} ${path.levelColor}`}>
                                  {path.level}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                                {path.description}
                              </p>
                            </div>

                            {/* Right Salary Info box matching Screenshot 3 */}
                            <div className="mt-3 md:mt-0 text-left md:text-right shrink-0 bg-slate-900/60 md:bg-transparent p-2.5 md:p-0 rounded border border-slate-800 md:border-transparent">
                              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                                EST. MARKET SALARY
                              </p>
                              <p className="text-xs sm:text-sm font-black text-indigo-400 mt-0.5">
                                {path.salary}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Buttons Bar */}
            <div className="p-6 border-t border-slate-800/80 bg-slate-950/40 flex justify-between items-center">
              
              {/* Back button */}
              {step > 1 ? (
                <button
                  id="btn-assessment-prev"
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div></div> /* spacing spacer */
              )}

              {/* Next/Submit Button */}
              {step < 4 ? (
                <button
                  id="btn-assessment-next"
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all hover:translate-x-0.5"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="btn-assessment-submit"
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 px-7 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 hover:scale-[1.01]"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              )}

            </div>

          </div>
        )}

      </div>
    </AppLayout>
  );
};
