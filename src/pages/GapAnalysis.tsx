import React from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/AppLayout';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Check, 
  X, 
  AlertTriangle, 
  Lightbulb,
  CheckCircle2,
  Calendar,
  Zap,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export const GapAnalysis: React.FC = () => {
  const { user, skills } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  // Format the current date nicely for the subtitle
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // Determine current career goal configuration based on user's active goal
  const careerGoalNormalized = user.careerGoal || 'Frontend Developer';

  // Comprehensive configuration dictionary for all 18 selectable career paths
  const careerGoalConfigs: Record<string, {
    targetGoal: string;
    goalDescription: string;
    skillMatchPercentage: number;
    readinessScore: string;
    readinessStatus: string;
    matchingStrengths: string[];
    missingGaps: string[];
    weakSkills: string[];
    insight1: string;
    insight2: string;
    insight3: string;
    techCard1Title: string;
    techCard2Title: string;
    techCard3Title: string;
  }> = {
    'frontend developer': {
      targetGoal: 'Frontend Developer',
      goalDescription: 'Specialize in building user-facing web applications using interactive visual frameworks, styling tools, and clean architectures.',
      skillMatchPercentage: 40,
      readinessScore: '32/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['JavaScript', 'Git'],
      missingGaps: ['HTML', 'CSS', 'React'],
      weakSkills: ['JavaScript', 'Git'],
      insight1: 'You match 2 out of 5 required skills for Frontend Developer.',
      insight2: 'Learning HTML and CSS would boost your career readiness by 60%.',
      insight3: 'Focusing on hands-on practical development projects will build strong credibility for portfolios.',
      techCard1Title: 'DOM & Web APIs',
      techCard2Title: 'HTML & CSS Layouts',
      techCard3Title: 'React Components'
    },
    'backend developer': {
      targetGoal: 'Backend Developer',
      goalDescription: 'Focuses on server-side logic, database architectures, building APIs, application security, and server scaling configurations.',
      skillMatchPercentage: 50,
      readinessScore: '48/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['SQL', 'REST APIs', 'Git'],
      missingGaps: ['Node.js', 'Spring Boot', 'PostgreSQL'],
      weakSkills: ['SQL', 'REST APIs'],
      insight1: 'You match 3 out of 6 required skills for Backend Developer.',
      insight2: 'Mastering Node.js and Spring Boot will bridge your core architectural deficits.',
      insight3: 'Designing robust relational databases will enhance your API performance metrics.',
      techCard1Title: 'Relational Databases',
      techCard2Title: 'Node.js Execution',
      techCard3Title: 'Spring Boot Microservices'
    },
    'full stack developer': {
      targetGoal: 'Full Stack Developer',
      goalDescription: 'A versatile generalist developer capable of working across both the frontend and backend of web applications, managing deployments, and databases.',
      skillMatchPercentage: 33,
      readinessScore: '35/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['HTML', 'Git'],
      missingGaps: ['React', 'Node.js', 'SQL'],
      weakSkills: ['HTML', 'Git'],
      insight1: 'You match 2 out of 6 required skills for Full Stack Developer.',
      insight2: 'Integrating React frontend with Node.js backend would raise match by 50%.',
      insight3: 'Building full-stack deployment pipelines will solidify your architectural capability.',
      techCard1Title: 'Express.js Rest APIs',
      techCard2Title: 'React Single Page Apps',
      techCard3Title: 'SQL Database Systems'
    },
    'mern stack developer': {
      targetGoal: 'MERN Stack Developer',
      goalDescription: 'Build full stack JavaScript applications specifically using MongoDB, Express.js, React, and Node.js.',
      skillMatchPercentage: 40,
      readinessScore: '38/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['JavaScript', 'Git'],
      missingGaps: ['MongoDB', 'Express.js', 'React'],
      weakSkills: ['JavaScript', 'Git'],
      insight1: 'You match 2 out of 5 core MERN skills.',
      insight2: 'Adding MongoDB cluster integration raises your backend flexibility.',
      insight3: 'Building reusable React context states improves multi-user application flow.',
      techCard1Title: 'MongoDB Atlas',
      techCard2Title: 'Express Routing',
      techCard3Title: 'React Hooks'
    },
    'java full stack developer': {
      targetGoal: 'Java Full Stack Developer',
      goalDescription: 'Develop enterprise full-stack applications with robust Java Spring Boot backends and modern frontend frameworks.',
      skillMatchPercentage: 35,
      readinessScore: '38/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Java', 'Git'],
      missingGaps: ['Spring Boot', 'React', 'SQL'],
      weakSkills: ['Java', 'Git'],
      insight1: 'You match 2 out of 5 required skills for Java Full Stack Developer.',
      insight2: 'Building Hibernate/JPA models will boost your backend data integration capability.',
      insight3: 'Integrating Spring Security OAuth2 with your frontend guarantees secure user sessions.',
      techCard1Title: 'Spring Boot MVC',
      techCard2Title: 'React UI Integration',
      techCard3Title: 'JPA/Hibernate Mapping'
    },
    'python full stack developer': {
      targetGoal: 'Python Full Stack Developer',
      goalDescription: 'Utilize Django or Flask combined with modern single-page frontend frameworks to build performant, data-centric platforms.',
      skillMatchPercentage: 35,
      readinessScore: '36/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Python', 'Git'],
      missingGaps: ['Django', 'React', 'PostgreSQL'],
      weakSkills: ['Python', 'Git'],
      insight1: 'You match 2 out of 5 required skills for Python Full Stack Developer.',
      insight2: 'Deploying Django REST Framework APIs bridges your application data gaps.',
      insight3: 'Focusing on PostgreSQL connection pools optimizes multi-query execution speeds.',
      techCard1Title: 'Django Rest Framework',
      techCard2Title: 'React Frontend Integration',
      techCard3Title: 'PostgreSQL Optimization'
    },
    'software engineer': {
      targetGoal: 'Software Engineer',
      goalDescription: 'Apply engineering principles to design, develop, test, and maintain large-scale software systems across varied environments.',
      skillMatchPercentage: 45,
      readinessScore: '42/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Data Structures', 'Algorithms', 'Git'],
      missingGaps: ['System Design', 'Testing', 'Linux'],
      weakSkills: ['Data Structures', 'Algorithms'],
      insight1: 'You match 3 out of 6 core skills for Software Engineer.',
      insight2: 'Learning scalable System Design concepts is crucial for high-load systems.',
      insight3: 'Adding robust unit and integration testing workflows ensures enterprise code quality.',
      techCard1Title: 'System Design Patterns',
      techCard2Title: 'Automated Testing Suites',
      techCard3Title: 'Linux System Management'
    },
    'ai engineer': {
      targetGoal: 'AI Engineer',
      goalDescription: 'Designs and builds intelligent systems, fine-tunes artificial intelligence models, processes complex datasets, and implements machine learning solutions.',
      skillMatchPercentage: 30,
      readinessScore: '28/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Python', 'Git', 'Statistics'],
      missingGaps: ['TensorFlow', 'Deep Learning', 'AI/ML'],
      weakSkills: ['Python', 'Statistics'],
      insight1: 'You match 3 out of 10 required skills for AI Engineer.',
      insight2: 'Deploying Deep Learning neural networks can accelerate your technical eligibility.',
      insight3: 'Practicing data prep Pipelines and fine-tuning LLMs is highly recommended.',
      techCard1Title: 'Deep Neural Networks',
      techCard2Title: 'TensorFlow & PyTorch',
      techCard3Title: 'Model Deployment APIs'
    },
    'machine learning engineer': {
      targetGoal: 'Machine Learning Engineer',
      goalDescription: 'Specialize in training, deploying, and optimizing predictive ML pipelines, deep learning models, and complex data infrastructures.',
      skillMatchPercentage: 33,
      readinessScore: '30/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Python', 'Git', 'NumPy'],
      missingGaps: ['Scikit-learn', 'Deep Learning', 'PyTorch'],
      weakSkills: ['Python', 'NumPy'],
      insight1: 'You match 3 out of 6 core Machine Learning skills.',
      insight2: 'Integrating PyTorch model training speeds up complex deep learning features.',
      insight3: 'Implementing custom Scikit-learn pipelines organizes data ingestion flows beautifully.',
      techCard1Title: 'PyTorch Neural Models',
      techCard2Title: 'Scikit-learn Pipelines',
      techCard3Title: 'MLOps Containerization'
    },
    'data scientist': {
      targetGoal: 'Data Scientist',
      goalDescription: 'Analyze complex datasets using statistical modeling, machine learning, and data mining techniques to drive business decisions.',
      skillMatchPercentage: 40,
      readinessScore: '38/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Python', 'Statistics', 'Pandas'],
      missingGaps: ['Machine Learning', 'Data Science', 'Scikit-learn'],
      weakSkills: ['Python', 'Statistics'],
      insight1: 'You match 3 out of 6 key skills for Data Scientist.',
      insight2: 'Deploying Scikit-learn models bridges predictive analytics deficits.',
      insight3: 'Enhancing multivariate statistical models boosts analytics credibility.',
      techCard1Title: 'Machine Learning Models',
      techCard2Title: 'Data Wrangling',
      techCard3Title: 'Statistical Significance'
    },
    'data analyst': {
      targetGoal: 'Data Analyst',
      goalDescription: 'Translate raw data into actionable dashboards and insights using tools like SQL, Python, Excel, and BI tools.',
      skillMatchPercentage: 50,
      readinessScore: '45/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Excel', 'SQL', 'Git'],
      missingGaps: ['Data Analytics', 'Pandas', 'Figma'],
      weakSkills: ['SQL', 'Git'],
      insight1: 'You match 3 out of 6 skills for Data Analyst.',
      insight2: 'Mastering Pandas dataframe aggregations automates custom data analysis pipelines.',
      insight3: 'Creating dynamic BI dashboards presents complex key performance indicators gracefully.',
      techCard1Title: 'BI Dashboard Toolsets',
      techCard2Title: 'Pandas Aggregations',
      techCard3Title: 'SQL Window Operators'
    },
    'cloud engineer': {
      targetGoal: 'Cloud Engineer',
      goalDescription: 'Design, maintain, and scale highly available, secure, and resilient cloud architectures on AWS, Azure, or GCP.',
      skillMatchPercentage: 45,
      readinessScore: '42/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Cloud Computing', 'Git', 'Linux'],
      missingGaps: ['AWS', 'Docker', 'Kubernetes'],
      weakSkills: ['Cloud Computing', 'Linux'],
      insight1: 'You match 3 out of 6 core skills for Cloud Engineer.',
      insight2: 'Gaining mastery in Docker and Kubernetes orchestration can raise your readiness score by 40%.',
      insight3: 'Automating infrastructure configuration and learning AWS architectures is highly recommended.',
      techCard1Title: 'AWS Cloud Architecture',
      techCard2Title: 'Docker Containerization',
      techCard3Title: 'Kubernetes Cluster Setup'
    },
    'devops engineer': {
      targetGoal: 'DevOps Engineer',
      goalDescription: 'Automate deployment infrastructure, maintain CI/CD pipelines, containerize applications, and manage system operations.',
      skillMatchPercentage: 35,
      readinessScore: '38/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Docker', 'Git', 'Linux'],
      missingGaps: ['Kubernetes', 'CI/CD', 'Terraform (IaC)'],
      weakSkills: ['Docker', 'Linux'],
      insight1: 'You match 3 out of 6 key DevOps skills.',
      insight2: 'Writing automated CI/CD deployment pipelines speeds up delivery lifecycles.',
      insight3: 'Mastering Terraform declarative resource models secures multi-environment state management.',
      techCard1Title: 'Terraform Infrastructure',
      techCard2Title: 'CI/CD Automated Runners',
      techCard3Title: 'Kubernetes Control Plane'
    },
    'cybersecurity engineer': {
      targetGoal: 'Cybersecurity Engineer',
      goalDescription: 'Protect applications, networks, and cloud infrastructures from vulnerabilities, breaches, and unauthorized access.',
      skillMatchPercentage: 30,
      readinessScore: '32/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Linux', 'Git'],
      missingGaps: ['Cyber Security', 'Network Security', 'OWASP Rules'],
      weakSkills: ['Linux', 'Git'],
      insight1: 'You match 2 out of 5 required Cybersecurity skills.',
      insight2: 'Auditing web applications against the OWASP Top 10 ensures client session token integrity.',
      insight3: 'Configuring secure network traffic handshakes and firewall rule blocks is highly recommended.',
      techCard1Title: 'OWASP Vulnerability Audit',
      techCard2Title: 'Network Cryptography',
      techCard3Title: 'Secure Access Management'
    },
    'mobile app developer': {
      targetGoal: 'Mobile App Developer',
      goalDescription: 'Design and build cross-platform or native mobile applications for iOS and Android using modern environments.',
      skillMatchPercentage: 40,
      readinessScore: '36/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['JavaScript', 'Git'],
      missingGaps: ['Flutter', 'React Native', 'Mobile Development'],
      weakSkills: ['JavaScript', 'Git'],
      insight1: 'You match 2 out of 5 key Mobile Developer skills.',
      insight2: 'Implementing React Native component hierarchies bridges cross-platform delivery gaps.',
      insight3: 'Managing asynchronous mobile state containers with local SQLite storage is recommended.',
      techCard1Title: 'React Native / Flutter',
      techCard2Title: 'Asynchronous Mobile State',
      techCard3Title: 'Mobile Device Permissions'
    },
    'ui/ux designer': {
      targetGoal: 'UI/UX Designer',
      goalDescription: 'Create clean wireframes, high-fidelity prototypes, interactive layouts, and user experiences using tools like Figma.',
      skillMatchPercentage: 50,
      readinessScore: '42/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Figma', 'Git'],
      missingGaps: ['UI/UX Design', 'User Psychology', 'Figma components'],
      weakSkills: ['Figma', 'Git'],
      insight1: 'You match 2 out of 5 essential design skills.',
      insight2: 'Practicing Gestalt design guidelines organizes layout grids cleanly.',
      insight3: 'Structuring fully componentized interactive wireframes simplifies developer handoffs.',
      techCard1Title: 'Grid Layout Systems',
      techCard2Title: 'Interactive Prototyping',
      techCard3Title: 'Figma Components Kit'
    },
    'product engineer': {
      targetGoal: 'Product Engineer',
      goalDescription: 'Work at the intersection of product management, engineering, and design to build features optimized for user engagement.',
      skillMatchPercentage: 40,
      readinessScore: '38/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['JavaScript', 'Git', 'Figma'],
      missingGaps: ['React', 'System Design', 'User Psychology'],
      weakSkills: ['JavaScript', 'Figma'],
      insight1: 'You match 3 out of 6 target Product Engineer skills.',
      insight2: 'Bridging frontend React state logic with user-centric behavioral designs optimizes delivery flows.',
      insight3: 'Focusing on modular, scalable architectures keeps release cycles fast and feature-complete.',
      techCard1Title: 'React Frontend Views',
      techCard2Title: 'UX Wireframe Flows',
      techCard3Title: 'System Design Patterns'
    },
    'blockchain developer': {
      targetGoal: 'Blockchain Developer',
      goalDescription: 'Design and develop decentralized applications, secure smart contracts, and cryptographic ledger systems.',
      skillMatchPercentage: 30,
      readinessScore: '28/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['Cryptography', 'Git'],
      missingGaps: ['Blockchain', 'Smart Contracts', 'Solidity'],
      weakSkills: ['Cryptography', 'Git'],
      insight1: 'You match 2 out of 5 required Blockchain skills.',
      insight2: 'Writing Solidity smart contracts is crucial for reliable automated transactions.',
      insight3: 'Building secure decentralized application (dApp) routing layers guarantees distributed trust.',
      techCard1Title: 'Smart Contract Solidity',
      techCard2Title: 'Distributed dApp Routing',
      techCard3Title: 'Cryptographic Signatures'
    },
    'solutions architect': {
      targetGoal: 'Solutions Architect',
      goalDescription: 'Calibrate enterprise cloud integrations, design resilient system topologies, and manage infrastructure automated deployments.',
      skillMatchPercentage: 42,
      readinessScore: '40/100',
      readinessStatus: 'Developing',
      matchingStrengths: ['AWS Architecture', 'Git'],
      missingGaps: ['Terraform (IaC)', 'Kubernetes Orchestration', 'Docker'],
      weakSkills: ['AWS Architecture', 'Git'],
      insight1: 'You match 2 out of 5 required skills for Solutions Architect.',
      insight2: 'Learning Terraform and Kubernetes will bridge your cloud architecture gaps.',
      insight3: 'Focusing on hands-on infrastructure-as-code exercises builds strong portfolio credibility.',
      techCard1Title: 'Terraform Infrastructure',
      techCard2Title: 'Kubernetes Orchestration',
      techCard3Title: 'AWS Architecture Services'
    }
  };

  // Find the closest configuration matching normalized key
  const matchKey = Object.keys(careerGoalConfigs).find(key => 
    careerGoalNormalized.toLowerCase().includes(key) || 
    key.includes(careerGoalNormalized.toLowerCase())
  ) || 'frontend developer';

  const config = careerGoalConfigs[matchKey];

  const targetGoal = config.targetGoal;
  const goalDescription = config.goalDescription;

  // DYNAMIC CALCULATIONS BASED ON ACTIVE SKILLS STATE
  const matchingStrengths = skills.filter(s => s.currentMatch >= 60).map(s => s.name);
  const missingGaps = skills.filter(s => s.currentMatch < 60).map(s => s.name);
  // Weak skills are those that are on track but not mastered (e.g. currentMatch between 40 and 80)
  const weakSkills = skills.filter(s => s.currentMatch >= 40 && s.currentMatch < 80).map(s => s.name);

  const skillMatchPercentage = skills.length > 0 ? Math.round((matchingStrengths.length / skills.length) * 100) : config.skillMatchPercentage;
  const readinessScore = `${Math.round(user.readinessScore || 62)}/100`;
  const readinessStatus = user.readinessScore >= 80 ? 'Advanced' : user.readinessScore >= 55 ? 'Developing' : 'Beginner';

  const insight1 = `You match ${matchingStrengths.length} out of ${skills.length} core required skills for ${targetGoal}.`;
  const insight2 = missingGaps.length > 0 
    ? `Mastering ${missingGaps[0]} and ${missingGaps[1] || 'remaining technologies'} will boost your career readiness by ${Math.round(100 - user.readinessScore)}%.`
    : "You have matched all core required skills for this domain! Keep revising.";
  const insight3 = config.insight3;

  const techCard1Title = skills[0]?.name || config.techCard1Title;
  const techCard2Title = skills[1]?.name || config.techCard2Title;
  const techCard3Title = skills[2]?.name || config.techCard3Title;

  // Calculate SVG circular gauge properties
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skillMatchPercentage / 100) * circumference;

  return (
    <AppLayout>
      <div id="gap-analysis-page" className="space-y-6">
        
        {/* Top AI Toast Banner */}
        <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-4 flex items-center gap-3 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles className="w-4.5 h-4.5 text-indigo-400 animate-pulse" />
          </div>
          <div className="text-xs sm:text-sm font-bold text-indigo-300">
            AI recommendation model completed successfully! Roadmap compiled.
          </div>
        </div>

        {/* Career Goal Alignment Analytics Widget */}
        <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left side circular matching gauge & titles */}
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
              {/* Circular SVG Gauge */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center select-none">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Outer background ring */}
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Progress color ring (using gorgeous warning/amber glow matching screenshot) */}
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="stroke-amber-400"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.3))' }}
                  />
                </svg>
                {/* Score text absolute center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black text-white leading-none">
                    {skillMatchPercentage}%
                  </span>
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">
                    Skill Match
                  </span>
                </div>
              </div>

              {/* Title & Description Column */}
              <div className="text-center sm:text-left space-y-1.5 flex-1 min-w-0">
                <span className="text-[10px] text-indigo-400 font-black tracking-widest uppercase block">
                  Career Goal Analysis
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {targetGoal} Alignment
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                  {goalDescription}
                </p>
              </div>
            </div>

            {/* Right side Career Readiness and score meters */}
            <div className="flex items-center gap-6 sm:gap-12 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-800 justify-around lg:justify-end shrink-0">
              
              {/* Readiness status */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-extrabold tracking-wider uppercase block">
                  Career Readiness Meter
                </span>
                <div className="text-lg sm:text-xl font-black text-rose-400 tracking-tight">
                  {readinessStatus}
                </div>
              </div>

              {/* Dividing vertical bar */}
              <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>

              {/* Score number */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-extrabold tracking-wider uppercase block">
                  Readiness Score
                </span>
                <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {readinessScore}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Three Column Comparison Boards (Matching, Missing Gaps, Weak Skills) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Box 1: Matching Strengths */}
          <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold text-white">
                Matching Strengths ({matchingStrengths.length})
              </h4>
            </div>

            <div className="space-y-2.5 flex-1">
              {matchingStrengths.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-[#080d1a] border border-emerald-500/10 rounded-lg p-3.5 flex items-center gap-3 hover:border-emerald-500/25 transition-all"
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full shrink-0"></span>
                  <span className="text-xs font-bold text-emerald-400 truncate">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Box 2: Missing Skill Gaps */}
          <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
              <span className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold text-white">
                Missing Skill Gaps ({missingGaps.length})
              </h4>
            </div>

            <div className="space-y-2.5 flex-1">
              {missingGaps.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-[#080d1a] border border-rose-950/20 rounded-lg p-3.5 flex items-center justify-between gap-3 hover:border-rose-900/30 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0 animate-pulse"></span>
                    <span className="text-xs font-bold text-rose-300 truncate">
                      {skill}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 bg-rose-500/10 border border-rose-500/25 rounded text-[8px] font-extrabold text-rose-400 tracking-wider uppercase shrink-0">
                    Deficit
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Box 3: Weak Skills */}
          <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold text-white">
                Weak Skills ({weakSkills.length})
              </h4>
            </div>

            <div className="space-y-2.5 flex-1">
              {weakSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-[#080d1a] border border-amber-500/10 rounded-lg p-3.5 flex items-center justify-between gap-3 hover:border-amber-500/25 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0"></span>
                    <span className="text-xs font-bold text-amber-300 truncate">
                      {skill}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/25 rounded text-[8px] font-extrabold text-amber-400 tracking-wider uppercase shrink-0">
                    Needs Practice
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* AI Adaptive Core Insights & Next Step block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Insights Column (2/3 width) */}
          <div className="lg:col-span-2 bg-[#0b1329] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl flex flex-col space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Lightbulb className="w-4.5 h-4.5" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-white tracking-wide uppercase">
                AI Adaptive Core Insights
              </h4>
            </div>

            <div className="space-y-4">
              {/* Insight 1 */}
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {insight1}
                </p>
              </div>

              {/* Insight 2 */}
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {insight2}
                </p>
              </div>

              {/* Insight 3 */}
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {insight3}
                </p>
              </div>
            </div>
          </div>

          {/* Right Next Step Box (1/3 width, solid purple box matching second screenshot) */}
          <div className="bg-gradient-to-br from-indigo-650 to-indigo-850 text-white rounded-xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            {/* Background glowing circle decorator */}
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-300"></div>

            <div className="space-y-4">
              <span className="text-[10px] text-indigo-200 font-black uppercase tracking-widest block bg-white/10 px-2.5 py-1 rounded-md w-max">
                Next Step
              </span>
              <h4 className="text-lg sm:text-xl font-black text-white leading-tight">
                Personalized Learning Roadmap Ready
              </h4>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Our recommendation engine mapped your custom pathway from Beginner to Advanced to eliminate these skill deficits.
              </p>
            </div>

            <button
              id="btn-launch-roadmap-gap"
              type="button"
              onClick={() => navigate('/roadmap')}
              className="mt-6 w-full py-3 px-4 bg-slate-950 hover:bg-black border border-slate-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.99] group/btn shrink-0"
            >
              <span>Launch Upskilling Roadmap</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* AI Core Target Technologies board matching the third screenshot */}
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                AI Core Target Technologies
              </h4>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last analysis: {formattedDate}</span>
            </div>
          </div>

          {/* Cards list matching third screenshot layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Target Tech Card 1 */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between min-h-[190px]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-white">
                    {techCard1Title}
                  </span>
                  <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/25 rounded text-[8px] font-extrabold text-rose-400 tracking-wider uppercase shrink-0">
                    High Priority
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  {insight1}
                </p>
              </div>

              {/* Card Stats block matching bottom indicators */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 mt-4 text-[10px]">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">DIFFICULTY</span>
                  <span className="text-slate-300 font-black">Intermediate</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">EST. TIME</span>
                  <span className="text-slate-300 font-black">2 weeks</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">CAREER IMPACT</span>
                  <span className="text-indigo-400 font-black">High</span>
                </div>
              </div>
            </div>

            {/* Target Tech Card 2 */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between min-h-[190px]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-white">
                    {techCard2Title}
                  </span>
                  <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/25 rounded text-[8px] font-extrabold text-rose-400 tracking-wider uppercase shrink-0">
                    High Priority
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  {insight2}
                </p>
              </div>

              {/* Card Stats block matching bottom indicators */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 mt-4 text-[10px]">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">DIFFICULTY</span>
                  <span className="text-slate-300 font-black">Intermediate</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">EST. TIME</span>
                  <span className="text-slate-300 font-black">2 weeks</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">CAREER IMPACT</span>
                  <span className="text-indigo-400 font-black">High</span>
                </div>
              </div>
            </div>

            {/* Target Tech Card 3 */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between min-h-[190px]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-white">
                    {techCard3Title}
                  </span>
                  <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/25 rounded text-[8px] font-extrabold text-rose-400 tracking-wider uppercase shrink-0">
                    High Priority
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  {insight3}
                </p>
              </div>

              {/* Card Stats block matching bottom indicators */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 mt-4 text-[10px]">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">DIFFICULTY</span>
                  <span className="text-slate-300 font-black">Intermediate</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">EST. TIME</span>
                  <span className="text-slate-300 font-black">2 weeks</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">CAREER IMPACT</span>
                  <span className="text-indigo-400 font-black">High</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
};
