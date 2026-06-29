import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/AppLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Check, 
  Plus, 
  Clock, 
  ExternalLink,
  Code,
  Layers,
  Wrench,
  RotateCw,
  Info,
  Calendar
} from 'lucide-react';

// Type definitions for our dynamic recommendations data
interface TechItem {
  id: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  description: string;
}

interface CourseItem {
  title: string;
  provider: string;
  duration: string;
  description: string;
  url: string;
}

interface ProjectItem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
}

interface GoalConfig {
  technologies: TechItem[];
  courses: CourseItem[];
  projects: ProjectItem[];
}

// Comprehensive configurations for all 18 selectable career paths
const recommendationsByGoal: Record<string, GoalConfig> = {
  'frontend developer': {
    technologies: [
      { id: 'tech-react', name: 'React 19 & State Management', level: 'ADVANCED', description: 'Modern functional components, hooks, concurrent rendering, and server-side integration.' },
      { id: 'tech-tailwind', name: 'Tailwind CSS v4', level: 'ADVANCED', description: 'Utility-first utility styling, custom configurations, responsive grids, and clean design tokens.' },
      { id: 'tech-js', name: 'JavaScript (ES6+)', level: 'INTERMEDIATE', description: 'Asynchronous event queues, closures, promises, DOM manipulation, and dynamic standard library.' },
      { id: 'tech-ts', name: 'TypeScript', level: 'INTERMEDIATE', description: 'Type interfaces, generics, compilation configs, static checking, and modern tooling standards.' },
      { id: 'tech-git', name: 'Git & GitHub Workflow', level: 'BEGINNER', description: 'Branch management, pull requests, rebase, and automated CI/CD checks.' }
    ],
    courses: [
      { title: 'The Complete React Developer Course', provider: 'Udemy (Maximilian Schwarzmüller)', duration: '45h', description: 'Deep dive into React 19, Redux, Context API, and CSS design tools.', url: 'https://react.dev' },
      { title: 'Advanced CSS and Responsive Web Design', provider: 'Frontend Masters', duration: '20h', description: 'Master flexbox, grid, custom layout calculations, and animations.', url: 'https://frontendmasters.com' },
      { title: 'Modern JavaScript from the Beginning', provider: 'freeCodeCamp', duration: '30h', description: 'Master pure JS with dynamic DOM interfaces, asynchronous fetching, and ES6+ modules.', url: 'https://javascript.info' }
    ],
    projects: [
      { title: 'Interactive Kanban Board', difficulty: 'Medium', description: 'Build a fully responsive Kanban board with drag-and-drop mechanics using React and Tailwind.' },
      { title: 'SaaS Analytics Dashboard', difficulty: 'Hard', description: 'Create a responsive visualization stage utilizing Recharts, featuring full filters and real-time updates.' }
    ]
  },
  'backend developer': {
    technologies: [
      { id: 'tech-node', name: 'Node.js & Express API Development', level: 'ADVANCED', description: 'Event-driven, non-blocking asynchronous rest API design and database middleware integrations.' },
      { id: 'tech-spring', name: 'Spring Boot Microservices', level: 'ADVANCED', description: 'Java enterprise backends, dependency injection, service meshes, and scalable data endpoints.' },
      { id: 'tech-postgres', name: 'PostgreSQL Database Systems', level: 'INTERMEDIATE', description: 'Relational schema design, database indexing, join optimization, and ACID compliance.' },
      { id: 'tech-rest', name: 'RESTful API Standards', level: 'INTERMEDIATE', description: 'Standard HTTP method structures, secure JSON responses, validation, and standard route design.' },
      { id: 'tech-redis', name: 'Redis Caching Services', level: 'BEGINNER', description: 'Key-value cache systems, eviction policies, and scaling server response times.' }
    ],
    courses: [
      { title: 'Node.js, Express, and MongoDB Bootcamp', provider: 'Udemy (Andrew Mead)', duration: '35h', description: 'Build real-world backend applications with REST, security, and database triggers.', url: 'https://nodejs.org' },
      { title: 'Spring Boot Microservices and Security', provider: 'Coursera (Google Cloud)', duration: '40h', description: 'Enterprise architectural patterns, JWT auth, cloud gateways, and container hosting.', url: 'https://spring.io' },
      { title: 'PostgreSQL Boot Camp & Query Optimization', provider: 'Udemy (Colt Steele)', duration: '25h', description: 'Master relational schemas, indexes, execution plans, and performance tuning.', url: 'https://www.postgresqltutorial.com' }
    ],
    projects: [
      { title: 'Scalable RESTful API Server', difficulty: 'Medium', description: 'Build an Express API with full JWT auth, PostgreSQL query filters, and automated testing.' },
      { title: 'Microservice E-Commerce Backend', difficulty: 'Hard', description: 'Create a Java Spring Boot system coordinating cart services, payment gateways, and order logging.' }
    ]
  },
  'full stack developer': {
    technologies: [
      { id: 'tech-next', name: 'Next.js App Router', level: 'ADVANCED', description: 'Server components, client transitions, page routing, and edge-native serverless endpoints.' },
      { id: 'tech-react', name: 'React 19 Frontend UI', level: 'INTERMEDIATE', description: 'Interactive states, custom hooks, reusable design systems, and fast layout rendering.' },
      { id: 'tech-node', name: 'Node.js Backend Runtimes', level: 'INTERMEDIATE', description: 'Scalable event-loops, file streaming, socket communication, and robust API handling.' },
      { id: 'tech-postgres', name: 'PostgreSQL & SQL Queries', level: 'INTERMEDIATE', description: 'Relational data design, sub-queries, joins, and database security practices.' },
      { id: 'tech-git', name: 'Git Version Management', level: 'BEGINNER', description: 'Collaborative development, branching, conflicts, and GitHub integrations.' }
    ],
    courses: [
      { title: 'Full Stack Open: Deep Dive into Modern Web Dev', provider: 'University of Helsinki', duration: '80h', description: 'Gold-standard full-stack curriculum covering React, Redux, Node, GraphQL, and CI/CD.', url: 'https://fullstackopen.com' },
      { title: 'The Complete Full-Stack Web Development Bootcamp', provider: 'Udemy (Angela Yu)', duration: '65h', description: 'Comprehensive coverage of web fundamentals, database integration, and modern frameworks.', url: 'https://google.com' },
      { title: 'Next.js 14 Complete Developer Course', provider: 'Udemy (Maximilian Schwarzmüller)', duration: '30h', description: 'Master SSR, Server Actions, edge routing, and cloud databases with Next.js.', url: 'https://nextjs.org' }
    ],
    projects: [
      { title: 'Collaborative PM Dashboard', difficulty: 'Hard', description: 'A project management center with live task boards, user permissions, and comment logging.' },
      { title: 'Modern SaaS Marketplace', difficulty: 'Medium', description: 'Build an open marketplace with secure Stripe checkouts, user accounts, and image uploads.' }
    ]
  },
  'mern stack developer': {
    technologies: [
      { id: 'tech-mongodb', name: 'MongoDB Database', level: 'INTERMEDIATE', description: 'Document-oriented databases, schema-less indexing, clusters, and aggregation pipelines.' },
      { id: 'tech-express', name: 'Express.js Framework', level: 'ADVANCED', description: 'Minimalist RESTful routers, JWT authentication, error handling, and request validation.' },
      { id: 'tech-react', name: 'React UI Library', level: 'INTERMEDIATE', description: 'State management, custom hooks, React Router, and context-based state synchronization.' },
      { id: 'tech-node', name: 'Node.js Server Runtimes', level: 'INTERMEDIATE', description: 'Scalable event-driven execution, network protocols, and process management.' }
    ],
    courses: [
      { title: 'MERN Stack E-Commerce from Scratch', provider: 'Udemy (Brad Traversy)', duration: '45h', description: 'Build a fully operational e-commerce store with PayPal checkout and custom admin controls.', url: 'https://google.com' },
      { title: 'MongoDB Basics & Aggregation Mastery', provider: 'MongoDB University', duration: '20h', description: 'Learn BSON schemas, queries, secondary indexes, and high-performance aggregation.', url: 'https://university.mongodb.com' },
      { title: 'Advanced React Design Patterns', provider: 'Pluralsight', duration: '30h', description: 'Master compound components, custom render props, state reducers, and context-based APIs.', url: 'https://react.dev' }
    ],
    projects: [
      { title: 'Social Media Workspace Platform', difficulty: 'Medium', description: 'Develop a social portal supporting real-time chat, profile customization, and post aggregations.' },
      { title: 'Bento Grid Personal Journal', difficulty: 'Easy', description: 'Build a modular, rich-text dashboard where notes can be categorized and filtered dynamically.' }
    ]
  },
  'java full stack developer': {
    technologies: [
      { id: 'tech-java', name: 'Java Platform (JDK 17+)', level: 'ADVANCED', description: 'Object-oriented programming, concurrency utilities, functional interfaces, and stream processing.' },
      { id: 'tech-spring', name: 'Spring Boot & Spring Cloud', level: 'ADVANCED', description: 'Enterprise backend web services, security filters, dependency injections, and REST routing.' },
      { id: 'tech-react', name: 'React UI Development', level: 'INTERMEDIATE', description: 'Client-side rendering, layout components, hook hooks, and REST client calls.' },
      { id: 'tech-hibernate', name: 'Hibernate & JPA ORM', level: 'INTERMEDIATE', description: 'Object-relational mappings, database persistence, transaction controls, and query tuning.' }
    ],
    courses: [
      { title: 'Java Programming Masterclass for Developers', provider: 'Udemy (Tim Buchalka)', duration: '80h', description: 'Deep conceptual and hands-on Java course covering core syntax, collections, and lambdas.', url: 'https://oracle.com' },
      { title: 'Full Stack Java Developer with Spring Boot & React', provider: 'Udemy (Chad Darby)', duration: '50h', description: 'A direct guide linking Spring Boot enterprise API endpoints with interactive React pages.', url: 'https://spring.io' },
      { title: 'Hibernate and JPA Fundamentals', provider: 'Pluralsight', duration: '25h', description: 'Master relational caching, entity mapping strategies, and performance optimization.', url: 'https://hibernate.org' }
    ],
    projects: [
      { title: 'Secure Corporate Asset Tracker', difficulty: 'Medium', description: 'Build a robust asset tracker with multi-role login, audit tables, and complex SQL joins.' },
      { title: 'Enterprise Banking Web Portal', difficulty: 'Hard', description: 'A highly secured financial ledger with transaction verification, concurrency locks, and logs.' }
    ]
  },
  'python full stack developer': {
    technologies: [
      { id: 'tech-python', name: 'Python Systems & Scripting', level: 'ADVANCED', description: 'Object-oriented Python, decorators, generator expressions, and robust standard library.' },
      { id: 'tech-django', name: 'Django & Django REST Framework', level: 'ADVANCED', description: 'Batteries-included full-stack backend, ORM, secure auth, and automated API serializers.' },
      { id: 'tech-react', name: 'React Frontend stage', level: 'INTERMEDIATE', description: 'Responsive interface states, modular structures, and state managers.' },
      { id: 'tech-postgres', name: 'PostgreSQL Integration', level: 'INTERMEDIATE', description: 'Database configurations, migration workflows, and optimized query operations.' }
    ],
    courses: [
      { title: 'Python and Django Full Stack Bootcamp', provider: 'Udemy (Jose Portilla)', duration: '40h', description: 'Build modern web applications with Django template backends, SQL, and CSS integrations.', url: 'https://djangoproject.com' },
      { title: 'Django REST Framework & React Integration', provider: 'freeCodeCamp', duration: '30h', description: 'Complete REST framework architecture, serializers, viewsets, and React frontend clients.', url: 'https://www.django-rest-framework.org' },
      { title: 'Advanced Python OOP & Code Standards', provider: 'RealPython', duration: '20h', description: 'Master decorators, custom context managers, unit-testing, and dynamic typing.', url: 'https://realpython.com' }
    ],
    projects: [
      { title: 'SaaS Property Finder Portal', difficulty: 'Medium', description: 'A web catalog with advanced search algorithms, photo hosting, and automated email messaging.' },
      { title: 'B2B Client Feedback Hub', difficulty: 'Hard', description: 'A client ticketing hub with automated sentiment analysis pipelines powered by custom Python functions.' }
    ]
  },
  'ai engineer': {
    technologies: [
      { id: 'tech-python', name: 'Python for AI/ML', level: 'ADVANCED', description: 'Vectorized computing, algorithm modeling, mathematical scripts, and data handling libraries.' },
      { id: 'tech-pytorch', name: 'PyTorch Deep Learning', level: 'INTERMEDIATE', description: 'Tensor operations, neural networks, custom loss functions, and backpropagation.' },
      { id: 'tech-tensorflow', name: 'TensorFlow Ecosystem', level: 'ADVANCED', description: 'Production-grade AI models, model saving, graph execution, and web browser deployment.' },
      { id: 'tech-genai', name: 'Generative AI & LLMs', level: 'INTERMEDIATE', description: 'Prompt engineering, context windows, vector database lookups, and retrieval systems (RAG).' }
    ],
    courses: [
      { title: 'Deep Learning Specialization', provider: 'Coursera (DeepLearning.AI)', duration: '80h', description: 'Andrew Ng\'s master series on neural networks, backpropagation, CNNs, RNNs, and optimization.', url: 'https://www.deeplearning.ai' },
      { title: 'Generative AI with Large Language Models', provider: 'Coursera (AWS)', duration: '30h', description: 'Master prompt engineering, fine-tuning LLMs, RLHF alignment, and orchestrating RAG pipelines.', url: 'https://aws.amazon.com/training' },
      { title: 'PyTorch for Deep Learning Bootcamp', provider: 'Udemy (Daniel Bourke)', duration: '45h', description: 'Complete course on building and deploying computer vision and NLP models using PyTorch.', url: 'https://pytorch.org' }
    ],
    projects: [
      { title: 'Custom Document Search Engine (RAG)', difficulty: 'Hard', description: 'Build an AI tool that indexes corporate PDFs into a vector database and answers natural queries.' },
      { title: 'Computer Vision Defect Detector', difficulty: 'Medium', description: 'Implement a CNN classifier that identifies manufacturing defects in structural image feeds.' }
    ]
  },
  'machine learning engineer': {
    technologies: [
      { id: 'tech-python', name: 'Python Language', level: 'INTERMEDIATE', description: 'Core programming syntax, object orientation, custom modules, and algorithmic routines.' },
      { id: 'tech-pandas', name: 'Pandas Data Wrangling', level: 'ADVANCED', description: 'High-dimensional dataframes, data cleaning, aggregation matrices, and series transforms.' },
      { id: 'tech-scikit', name: 'Scikit-learn Algorithms', level: 'INTERMEDIATE', description: 'Supervised regression, classification classifiers, unsupervised clustering, and evaluation.' },
      { id: 'tech-numpy', name: 'NumPy Vector Computing', level: 'BEGINNER', description: 'Matrix operations, broadcasting rules, dimensional indexing, and fast numeric arrays.' },
      { id: 'tech-sql', name: 'SQL Query Operations', level: 'INTERMEDIATE', description: 'Data extraction, relational table joins, filters, and schema parsing.' }
    ],
    courses: [
      { title: 'Machine Learning Specialization', provider: 'Coursera (DeepLearning.AI)', duration: '80h', description: 'Supervised and unsupervised learning, classification, decision trees, and recommendation systems.', url: 'https://www.deeplearning.ai' },
      { title: 'Practical Deep Learning for Coders', provider: 'fast.ai', duration: '70h', description: 'Top-down approach to PyTorch, deep learning, training neural nets, and modern AI pipelines.', url: 'https://www.fast.ai' },
      { title: 'Data Analysis with Python', provider: 'freeCodeCamp', duration: '30h', description: 'Numerical computing with NumPy, complex data structures with Pandas, and beautiful plots.', url: 'https://freecodecamp.org' },
      { title: 'SQL for Data Science', provider: 'Coursera (UC Davis)', duration: '15h', description: 'Filtering, joining, subqueries, and database schema navigation for analytics.', url: 'https://coursera.org' },
      { title: 'Python for Data Science & ML Bootcamp', provider: 'Udemy (Jose Portilla)', duration: '25h', description: 'Comprehensive coverage of NumPy, Pandas, Matplotlib, Seaborn, and Scikit-learn.', url: 'https://udemy.com' }
    ],
    projects: [
      { title: 'Customer Churn Predictor', difficulty: 'Medium', description: 'Build an end-to-end ML model utilizing Scikit-learn to classify and forecast consumer churn.' },
      { title: 'Predictive Price Model Engine', difficulty: 'Easy', description: 'Create a multivariate linear regression model to predict housing prices using Pandas and NumPy.' }
    ]
  },
  'data scientist': {
    technologies: [
      { id: 'tech-python', name: 'Python Programming', level: 'INTERMEDIATE', description: 'Statistical coding routines, modular calculations, and script setups.' },
      { id: 'tech-pandas', name: 'Pandas & NumPy Stack', level: 'ADVANCED', description: 'Multivariate array data operations, missing value filtering, and data cleaning.' },
      { id: 'tech-scikit', name: 'Scikit-learn Pipelines', level: 'INTERMEDIATE', description: 'Data preprocessing, model pipelines, cross-validation, and parameter tuning.' },
      { id: 'tech-stats', name: 'Statistics & Probability', level: 'BEGINNER', description: 'Hypothesis testing, distributions, confidence levels, and statistical sign-tests.' },
      { id: 'tech-sql', name: 'SQL Database Queries', level: 'INTERMEDIATE', description: 'Aggregating large database matrices, joins, and data warehouse queries.' }
    ],
    courses: [
      { title: 'Data Science Micromasters Program', provider: 'edX (UC San Diego)', duration: '90h', description: 'Master mathematical formulations, statistical modeling, machine learning, and Spark.', url: 'https://edx.org' },
      { title: 'Applied Data Science with Python', provider: 'Coursera (University of Michigan)', duration: '75h', description: 'Learn text mining, chart visualization, social network analysis, and ML toolkit.', url: 'https://coursera.org' },
      { title: 'Statistics and Probability for Data Science', provider: 'Khan Academy', duration: '35h', description: 'Build strong foundations in probability, distributions, Z-scores, and hypothesis testing.', url: 'https://www.khanacademy.org' }
    ],
    projects: [
      { title: 'A/B Test Evaluation Engine', difficulty: 'Medium', description: 'Design a statistical evaluator that calculates p-values, power, and confidence ranges for landing pages.' },
      { title: 'Housing Market Insight Pipeline', difficulty: 'Hard', description: 'Build a full predictive pipeline aggregating census details, cleaning outliers, and training models.' }
    ]
  },
  'data analyst': {
    technologies: [
      { id: 'tech-sql', name: 'SQL & Relational DBs', level: 'INTERMEDIATE', description: 'Grouping aggregations, window functions, complex join paths, and views.' },
      { id: 'tech-excel', name: 'Advanced Microsoft Excel', level: 'ADVANCED', description: 'Pivot tables, lookup routines, logic formulas, data models, and macros.' },
      { id: 'tech-pandas', name: 'Pandas for Analysts', level: 'INTERMEDIATE', description: 'Basic data parsing, table summaries, dynamic plotting, and clean exports.' },
      { id: 'tech-powerbi', name: 'PowerBI & Tableau', level: 'BEGINNER', description: 'Designing interactive dashboard visuals, data charts, story telling, and publishing.' }
    ],
    courses: [
      { title: 'Google Data Analytics Professional Certificate', provider: 'Coursera (Google)', duration: '120h', description: 'Learn spreadsheet macros, SQL data cleansing, R programming, and Tableau dashboards.', url: 'https://grow.google/certificates/data-analytics/' },
      { title: 'Data Analysis with Python and Pandas', provider: 'freeCodeCamp', duration: '30h', description: 'Wrangle high-dimensional tabular datasets and present clear statistical insights.', url: 'https://freecodecamp.org' },
      { title: 'SQL for Data Analytics Tutorial Guide', provider: 'Mode Analytics', duration: '20h', description: 'Interactive course focusing on real-world business queries, metrics, and KPI aggregations.', url: 'https://mode.com/sql-tutorial/' }
    ],
    projects: [
      { title: 'Executive Sales Dashboard', difficulty: 'Medium', description: 'Create a Tableau dashboard detailing quarterly revenue, visual trends, and user segmentations.' },
      { title: 'Marketing Campaign ROI Analyzer', difficulty: 'Easy', description: 'Wrangle campaign clicks and spending in Excel to identify key high-converting channels.' }
    ]
  },
  'cloud engineer': {
    technologies: [
      { id: 'tech-aws', name: 'Amazon Web Services (AWS)', level: 'INTERMEDIATE', description: 'Cloud services like EC2 compute, S3 storage buckets, VPC networking, and IAM controls.' },
      { id: 'tech-docker', name: 'Docker Containerization', level: 'ADVANCED', description: 'Writing custom Dockerfiles, compiling image layers, and container security controls.' },
      { id: 'tech-k8s', name: 'Kubernetes Orchestration', level: 'INTERMEDIATE', description: 'Pod configurations, ingress routing, state services, and auto-scaling setups.' },
      { id: 'tech-linux', name: 'Linux System Administration', level: 'BEGINNER', description: 'Shell navigation, package installation, cron-jobs, permissions, and network sockets.' }
    ],
    courses: [
      { title: 'AWS Certified Solutions Architect Associate', provider: 'Udemy (Stephane Maarek)', duration: '35h', description: 'Deep AWS architectural prep covering storage, serverless, databases, and networks.', url: 'https://aws.amazon.com/training/' },
      { title: 'Docker & Kubernetes: The Practical Guide', provider: 'Udemy (Maximilian Schwarzmüller)', duration: '24h', description: 'Learn to compile, cluster, scale, and orchestrate containers in production environments.', url: 'https://docker.com' },
      { title: 'Linux Administration Bootcamp', provider: 'Udemy (Jason Cannon)', duration: '18h', description: 'Master standard Linux operations, shell scripts, and system security fundamentals.', url: 'https://linux.org' }
    ],
    projects: [
      { title: 'Multi-Tier AWS Infrastructure', difficulty: 'Medium', description: 'Set up an elastic cluster on AWS featuring load-balancers, DB clusters, and secure subnets.' },
      { title: 'Containerized CI/CD Deployment', difficulty: 'Hard', description: 'Dockerize a React backend and configure Kubernetes deployment manifests for local hosting.' }
    ]
  },
  'devops engineer': {
    technologies: [
      { id: 'tech-k8s', name: 'Docker & Kubernetes', level: 'INTERMEDIATE', description: 'Automating deployment clusters, load scheduling, service routing, and configs.' },
      { id: 'tech-terraform', name: 'Terraform Infrastructure (IaC)', level: 'ADVANCED', description: 'Declarative cluster configs, state management, variables, and cloud setups.' },
      { id: 'tech-cicd', name: 'CI/CD Pipelines (GitHub Actions)', level: 'INTERMEDIATE', description: 'Writing custom YAML workflow automations, compiling builds, tests, and auto-deployments.' },
      { id: 'tech-linux', name: 'Linux Shell Scripting', level: 'BEGINNER', description: 'Bash variables, looping automations, file pipes, and infrastructure logs.' }
    ],
    courses: [
      { title: 'Terraform on AWS with IAC DevOps', provider: 'Udemy (Kalyan Reddy)', duration: '20h', description: 'Provision enterprise AWS architecture declarative using Terraform modules and variables.', url: 'https://terraform.io' },
      { title: 'Kubernetes Certified Administrator (CKA)', provider: 'KodeKloud (Mumshad Mannambeth)', duration: '40h', description: 'Gold-standard preparation for Kubernetes administration, storage, and networking.', url: 'https://kubernetes.io' },
      { title: 'CI/CD Pipelines with Jenkins & GitHub Actions', provider: 'Udemy', duration: '25h', description: 'Build automated delivery chains integrating unit tests, style checks, and Docker releases.', url: 'https://github.com/features/actions' }
    ],
    projects: [
      { title: 'GitOps Continuous Deployment Pipeline', difficulty: 'Hard', description: 'Create an automated pipeline where git commits trigger linting, testing, and Docker deployments.' },
      { title: 'Multi-Cloud Terraform Setup', difficulty: 'Medium', description: 'Write reusable Terraform code to deploy elastic server instances across Amazon Web Services.' }
    ]
  },
  'cybersecurity specialist': {
    technologies: [
      { id: 'tech-netsec', name: 'Network Security Protocols', level: 'INTERMEDIATE', description: 'Firewall rules, secure ports, SSL/TLS handshakes, packet filters, and SSH setups.' },
      { id: 'tech-pentest', name: 'Penetration Testing Tools', level: 'ADVANCED', description: 'Vulnerability scanners, dynamic ports mapping, password cracking, and vulnerability logs.' },
      { id: 'tech-linsec', name: 'Linux OS Security', level: 'INTERMEDIATE', description: 'File permissions, system access rules, logs monitoring, and firewall setups.' },
      { id: 'tech-owasp', name: 'OWASP Top 10 Hardening', level: 'BEGINNER', description: 'Preventing SQL injections, cross-site scripting (XSS), insecure credentials, and data leaks.' }
    ],
    courses: [
      { title: 'CompTIA Security+ Certification Prep', provider: 'Udemy (Jason Dion)', duration: '40h', description: 'In-depth coverage of security architecture, threat intelligence, and risk assessment standards.', url: 'https://comptia.org' },
      { title: 'Practical Ethical Hacking (PEH)', provider: 'TCM Security (Heath Adams)', duration: '25h', description: 'Ethical hacking course covering system recon, web app hacking, active directory, and scripting.', url: 'https://tcm-sec.com' },
      { title: 'Google Cybersecurity Certificate', provider: 'Coursera (Google)', duration: '90h', description: 'Foundations of network defense, security logs parsing with Python, and incident triage.', url: 'https://grow.google' }
    ],
    projects: [
      { title: 'Network Traffic Threat Scanner', difficulty: 'Hard', description: 'Build a Python packet listener that classifies and flags abnormal IP request logs.' },
      { title: 'OWASP Security Audit Portal', difficulty: 'Medium', description: 'Conduct a comprehensive security audit on a mock web application and build a hardening script.' }
    ]
  },
  'mobile developer': {
    technologies: [
      { id: 'tech-reactnative', name: 'React Native Platform', level: 'INTERMEDIATE', description: 'Cross-platform JavaScript applications, native rendering bridges, and component styling.' },
      { id: 'tech-flutter', name: 'Flutter SDK & Dart', level: 'ADVANCED', description: 'Single-codebase reactive UI compiles, layout engines, and native assets integrations.' },
      { id: 'tech-swift', name: 'Swift UI & Kotlin APIs', level: 'INTERMEDIATE', description: 'Native iOS Swift panels and Android Kotlin lifecycles and background activities.' },
      { id: 'tech-mobilesec', name: 'Mobile App Security', level: 'BEGINNER', description: 'Local keychain databases storage, token verification, and secure API handshakes.' }
    ],
    courses: [
      { title: 'React Native: The Practical Guide', provider: 'Udemy (Maximilian Schwarzmüller)', duration: '38h', description: 'Compile native mobile interfaces, use camera features, locate coordinates, and push alerts.', url: 'https://reactnative.dev' },
      { title: 'Flutter & Dart - The Complete Guide', provider: 'Udemy (Maximilian Schwarzmüller)', duration: '42h', description: 'Master Dart programming, state management, animations, and cross-platform publishing.', url: 'https://flutter.dev' },
      { title: 'iOS & Swift - The Complete Bootcamp', provider: 'Udemy (Angela Yu)', duration: '55h', description: 'Master native iOS app development from scratch, using Swift and Xcode.', url: 'https://developer.apple.com/swift/' }
    ],
    projects: [
      { title: 'Real-time Chat Mobile App', difficulty: 'Hard', description: 'Build a cross-platform chat app using React Native, complete with user profiles and push notifications.' },
      { title: 'Personal Fitness Habit Tracker', difficulty: 'Medium', description: 'A sleek Flutter application utilizing sqlite local databases to log daily streaks and records.' }
    ]
  },
  'ui/ux designer': {
    technologies: [
      { id: 'tech-figma', name: 'Figma UI/UX Design Pro', level: 'INTERMEDIATE', description: 'Dynamic vector layers, typography grids, component variants, and interactive prototyping.' },
      { id: 'tech-prototype', name: 'Interactive Prototyping', level: 'ADVANCED', description: 'Wireframe user flows, micro-interactions, clickable click paths, and feedback iterations.' },
      { id: 'tech-usability', name: 'User Research & Psychology', level: 'INTERMEDIATE', description: 'Conducting usability feedback loops, card sorting, user interviews, and user personas.' },
      { id: 'tech-designsys', name: 'Scalable Design Systems', level: 'BEGINNER', description: 'Creating consistent typography scales, color grids, and UI design component libraries.' }
    ],
    courses: [
      { title: 'Google UX Design Professional Certificate', provider: 'Coursera (Google)', duration: '100h', description: 'Learn complete UX lifecycle: empathy mapping, wireframing, high-fidelity prototypes, and portfolio projects.', url: 'https://grow.google' },
      { title: 'Figma UI/UX Design Masterclass', provider: 'Udemy (Daniel Walter Scott)', duration: '22h', description: 'In-depth Figma guide: layout grids, responsive design, components, and interactive prototypes.', url: 'https://figma.com' },
      { title: 'User Experience Design Fundamentals', provider: 'Udemy', duration: '15h', description: 'Learn the core principles of psychology-driven user experience and conversions.', url: 'https://interaction-design.org' }
    ],
    projects: [
      { title: 'SaaS Tool Dashboard Design System', difficulty: 'Hard', description: 'Create a massive Figma library featuring modular UI widgets, dark/light presets, and full layouts.' },
      { title: 'Mobile Travel App Redesign Wireframes', difficulty: 'Medium', description: 'Map out full interactive user wireframes, conducting user interviews to optimize the click path.' }
    ]
  },
  'product manager': {
    technologies: [
      { id: 'tech-agile', name: 'Agile & Scrum Frameworks', level: 'INTERMEDIATE', description: 'Managing backlogs, sprint planning, ticket writing, and roadmap tracking.' },
      { id: 'tech-pm-analytics', name: 'Product Analytics', level: 'ADVANCED', description: 'Defining customer retention indexes, funnels, cohort analysis, and click trends.' },
      { id: 'tech-wireframe', name: 'Wireframing & Prototyping', level: 'BEGINNER', description: 'Quickly sketching product mocks, flow interfaces, and visual blueprints.' },
      { id: 'tech-techbasics', name: 'Tech Stack Fundamentals', level: 'INTERMEDIATE', description: 'Understanding database systems, APIs, frontends, and backend hosting frameworks.' }
    ],
    courses: [
      { title: 'One Week PM Course & Certification', provider: 'Product Manager HQ', duration: '10h', description: 'Learn requirements gathering, agile routines, wireframing, and user stories writing.', url: 'https://productmanagerhq.com' },
      { title: 'Brand and Product Management Specialization', provider: 'Coursera (IE Business School)', duration: '18h', description: 'Master market lifecycle, competitive audits, metrics, and customer empathy logs.', url: 'https://coursera.org' },
      { title: 'Product Analytics with Amplitude & Mixpanel', provider: 'Amplitude Academy', duration: '12h', description: 'Master behavioral user tracking, feature funnels, retention, and custom analytics.', url: 'https://amplitude.com' }
    ],
    projects: [
      { title: 'New Feature Product Spec (PRD)', difficulty: 'Medium', description: 'Draft a full Product Requirement Document detailing user stories, tech specs, and metrics for a chat portal.' },
      { title: 'Growth Funnel Optimization Audit', difficulty: 'Hard', description: 'Evaluate user dropoffs in a SaaS checkout flow and create a visual mock to increase conversions.' }
    ]
  },
  'blockchain developer': {
    technologies: [
      { id: 'tech-solidity', name: 'Solidity Programming', level: 'INTERMEDIATE', description: 'Writing smart contract logic, secure variables management, and event emits on EVM.' },
      { id: 'tech-ethereum', name: 'Ethereum & Web3.js', level: 'ADVANCED', description: 'Linking web frontends with contract calls, gas optimization, and wallet connect handshakes.' },
      { id: 'tech-crypto', name: 'Cryptographic Hashing', level: 'INTERMEDIATE', description: 'Public/private key mechanics, SHA256 hashing, signing, and ledger security.' },
      { id: 'tech-audit', name: 'Smart Contract Audits', level: 'BEGINNER', description: 'Mitigating reentrancy bugs, overflows, access controls, and compiling gas reports.' }
    ],
    courses: [
      { title: 'Ethereum Blockchain Developer Bootcamp', provider: 'Udemy (Ravinder Deol)', duration: '24h', description: 'Master Solidity, build distributed apps (dApps), and integrate with Web3.js frontends.', url: 'https://ethereum.org' },
      { title: 'Smart Contract Auditing & Security Masterclass', provider: 'Cyfrin Updraft (Patrick Collins)', duration: '20h', description: 'Learn to audit contracts, secure code, and prevent millions in exploits using security testing.', url: 'https://cyfrin.io' },
      { title: 'Blockchain Specialization Certificate', provider: 'Coursera (University at Buffalo)', duration: '35h', description: 'Master distributed consensus, mining, cryptography, and private Hyperledgers.', url: 'https://coursera.org' }
    ],
    projects: [
      { title: 'Decentralized Crowdfunding Platform', difficulty: 'Hard', description: 'Build an EVM dApp with Solidity contract triggers, user campaigns, and web interface integrations.' },
      { title: 'Multi-Signature DAO Vault', difficulty: 'Medium', description: 'Compile an on-chain ledger requiring multiple private key approvals to execute tokens transfers.' }
    ]
  },
  'solutions architect': {
    technologies: [
      { id: 'tech-aws-ent', name: 'AWS Cloud Systems', level: 'INTERMEDIATE', description: 'Architecting VPC tunnels, elastic caches, load balance nodes, and IAM vaults.' },
      { id: 'tech-sysdesign', name: 'Enterprise System Design', level: 'ADVANCED', description: 'Microservices, database sharding, caching, messaging, and event architectures.' },
      { id: 'tech-terraform', name: 'Terraform IaC Scripting', level: 'BEGINNER', description: 'Provisioning multi-tier cloud stacks declarative using code models.' },
      { id: 'tech-ha-dr', name: 'HA & Disaster Recovery', level: 'INTERMEDIATE', description: 'Setting up active-active failovers, database replication, backups, and edge routing.' }
    ],
    courses: [
      { title: 'AWS Certified Solutions Architect Professional', provider: 'Udemy (Stephane Maarek)', duration: '55h', description: 'Master-level preparation covering security, scaling, multi-account structures, and cost optimization.', url: 'https://aws.amazon.com/training/' },
      { title: 'Designing Distributed Systems Blueprint', provider: 'O\'Reilly Learning', duration: '25h', description: 'Deep conceptual structures on patterns, locks, sidecars, queues, and persistent ledgers.', url: 'https://oreilly.com' },
      { title: 'Enterprise Cloud Architecture & VPC Security', provider: 'Coursera (Google Cloud)', duration: '20h', description: 'Learn enterprise hybrid networks, secure VPC peering, and transit gateway configurations.', url: 'https://coursera.org' }
    ],
    projects: [
      { title: 'Multi-Region HA Infrastructure Blueprint', difficulty: 'Hard', description: 'Draft a system blueprint featuring global failovers, active DB replication, and latency routing.' },
      { title: 'Microservices Integration Audit', difficulty: 'Medium', description: 'Design an event-driven system coordinating API endpoints, message queues, and analytical warehouses.' }
    ]
  }
};

export const Recommendations: React.FC = () => {
  const { user, roadmap, enrollTech } = useApp();
  const navigate = useNavigate();

  // Determine matched config key based on interest domain ("daoma") or career goal
  let matchedConfigKey = '';
  
  if (user?.interests && user.interests.length > 0) {
    const interest = user.interests[0];
    const interestMapping: Record<string, string> = {
      'Web Development': 'frontend developer',
      'Frontend Development': 'frontend developer',
      'Backend Development': 'backend developer',
      'Full Stack Development': 'full stack developer',
      'Web Architecture': 'solutions architect',
      'API Development': 'backend developer',
      'Database Design': 'backend developer',
      'Cloud Infrastructure': 'cloud engineer',
      'DevOps Engineering': 'devops engineer',
      'Machine Learning': 'machine learning engineer',
      'Artificial Intelligence': 'ai engineer',
      'Generative AI': 'ai engineer',
      'Data Science': 'data scientist',
      'Data Analytics': 'data analyst',
      'Mobile Development': 'mobile developer',
      'Cybersecurity Protocols': 'cybersecurity specialist',
      'UI/UX Interactive Designs': 'ui/ux designer',
      'Software Architecture': 'solutions architect',
      'System Design': 'solutions architect',
      'Automation Testing': 'devops engineer'
    };
    
    if (interestMapping[interest]) {
      matchedConfigKey = interestMapping[interest];
    }
  }
  
  if (!matchedConfigKey) {
    const activeGoal = user?.careerGoal || 'Frontend Developer';
    const normGoal = activeGoal.toLowerCase().trim();
    
    matchedConfigKey = Object.keys(recommendationsByGoal).find(
      key => normGoal.includes(key) || key.includes(normGoal)
    ) || '';
    
    if (!matchedConfigKey) {
      if (normGoal.includes('cyber') || normGoal.includes('security')) {
        matchedConfigKey = 'cybersecurity specialist';
      } else if (normGoal.includes('product')) {
        matchedConfigKey = 'product manager';
      } else if (normGoal.includes('solutions') || normGoal.includes('architect')) {
        matchedConfigKey = 'solutions architect';
      } else if (normGoal.includes('software engineer')) {
        matchedConfigKey = 'backend developer';
      } else {
        matchedConfigKey = 'frontend developer';
      }
    }
  }
  
  const currentRecommendations = recommendationsByGoal[matchedConfigKey] || recommendationsByGoal['frontend developer'];
  const activeGoal = user?.interests && user.interests.length > 0 ? user.interests[0] : (user?.careerGoal || 'Frontend Developer');

  // States
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'all' | 'tech' | 'courses' | 'projects'>('all');
  
  // Simulated dynamic AI regeneration sequence
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenLogs, setRegenLogs] = useState<string[]>([]);
  const [showRegenSuccess, setShowRegenSuccess] = useState(false);

  // Triggering simulated regeneration to give that tailored AI feel
  const handleRegenerate = () => {
    setIsRegenerating(true);
    setRegenLogs([]);
    setShowRegenSuccess(false);

    const logMessages = [
      `🤖 Initializing AI Recommendations Engine for: "${activeGoal}"`,
      `🔍 Scanning active student skill competencies...`,
      `📊 Comparing against top-tier market job requirements...`,
      `❌ Identified ${user?.readinessScore ? Math.round(100 - user.readinessScore) : 45}% upskilling gap.`,
      `🎓 Sifting online curricula catalogs (Coursera, fast.ai, freeCodeCamp)...`,
      `🛠️ Selecting high-impact hands-on sandbox project blueprints...`,
      `✨ Compiling optimal technologies & certifications matrix...`,
      `✅ Career Recommendations Successfully Tailored!`
    ];

    logMessages.forEach((msg, idx) => {
      setTimeout(() => {
        setRegenLogs(prev => [...prev, msg]);
        if (idx === logMessages.length - 1) {
          setTimeout(() => {
            setIsRegenerating(false);
            setShowRegenSuccess(true);
            setTimeout(() => setShowRegenSuccess(false), 4000);
          }, 800);
        }
      }, (idx + 1) * 450);
    });
  };

  // Check enrollment in the context's roadmap
  const isEnrolledInContext = (techId: string) => {
    return roadmap.some(phase => phase.id === `p-rec-${techId}`);
  };

  // Filters
  const filteredTech = currentRecommendations.technologies.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(search.toLowerCase()) || 
                          tech.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'All' || tech.level === levelFilter.toUpperCase();
    return matchesSearch && matchesLevel;
  });

  const filteredCourses = currentRecommendations.courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                          course.description.toLowerCase().includes(search.toLowerCase()) ||
                          course.provider.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'All' || 
                         (levelFilter === 'Beginner' && course.duration.replace('h', '') <= '20') ||
                         (levelFilter === 'Intermediate' && course.duration.replace('h', '') > '20' && course.duration.replace('h', '') <= '45') ||
                         (levelFilter === 'Advanced' && course.duration.replace('h', '') > '45');
    return matchesSearch && matchesLevel;
  });

  const filteredProjects = currentRecommendations.projects.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(search.toLowerCase()) || 
                          proj.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'All' || proj.difficulty === levelFilter;
    return matchesSearch && matchesLevel;
  });

  if (!user) return null;

  return (
    <AppLayout>
      <div id="recommendations-page-container" className="space-y-6 pb-12 text-slate-100">
        
        {/* --- HEADER BOARD STYLED PRECISELY TO SCREENSHOTS --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0b1329] border border-slate-800/80 p-6 rounded-xl shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              AI recommendations
            </h1>
            <p className="text-xs text-slate-400 font-semibold">
              Tech, courses, and projects tailored to your gap.
            </p>
          </div>

          <button
            id="btn-regenerate-recommendations"
            type="button"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-black text-xs rounded-xl shadow-lg active:scale-[0.98] transition-all duration-300 disabled:opacity-50 shrink-0 self-start md:self-auto"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate Recommendations</span>
          </button>
        </div>

        {/* --- REGENERATING OVERLAY / DIALOG LOG CONSOLE --- */}
        <AnimatePresence>
          {isRegenerating && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#0b1329] border border-indigo-500/30 rounded-xl p-5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-indigo-400/20">
                <Sparkles className="w-24 h-24 animate-pulse" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Upskilling Compiler Engine</h3>
              </div>
              
              <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 h-48 overflow-y-auto font-mono text-[10px] text-indigo-300 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
                {regenLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-1.5">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- REGENERATE SUCCESS SUCCESS BANNER --- */}
        {showRegenSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3 text-emerald-400 text-xs font-bold shadow-md"
          >
            <Check className="w-5 h-5 bg-emerald-500 text-slate-950 rounded-full p-0.5 shrink-0" />
            <div>
              <p className="text-white">Profile Sync Complete!</p>
              <p className="text-[11px] text-emerald-400/80 font-semibold mt-0.5">Your upskilling recommendations have been compiled live against the required skills for "{activeGoal}".</p>
            </div>
          </motion.div>
        )}

        {/* --- CONTROLS: SEARCH & LEVEL FILTER --- */}
        <div className="bg-[#0b1329] border border-slate-800 rounded-xl p-4 shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              id="recs-search"
              type="text"
              placeholder="Search technologies, courses, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs font-semibold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Level Selector */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Level:</span>
              <select
                id="recs-level-filter"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="border border-slate-800 bg-slate-950/80 rounded-md px-2.5 py-1 text-slate-200 font-bold text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-950/80 rounded-lg p-1 border border-slate-800/60 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tech')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${activeTab === 'tech' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Technologies
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('courses')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${activeTab === 'courses' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Courses
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${activeTab === 'projects' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Projects
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN RECOMMENDATIONS GRID DISPLAY --- */}
        <div className="space-y-8">
          
          {/* 1. TECHNOLOGIES SECTION */}
          {(activeTab === 'all' || activeTab === 'tech') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-800/40">
                <Wrench className="w-5 h-5 text-indigo-400 shrink-0" />
                <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">Technologies Required</h2>
              </div>

              {filteredTech.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTech.map((tech) => {
                    const isEnrolled = isEnrolledInContext(tech.id);
                    let levelBadge = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
                    if (tech.level === 'ADVANCED') levelBadge = 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
                    else if (tech.level === 'INTERMEDIATE') levelBadge = 'bg-blue-500/10 text-blue-400 border border-blue-500/20';

                    return (
                      <div 
                        key={tech.id} 
                        id={`tech-card-${tech.id}`}
                        className={`bg-[#0b1329] border p-5 rounded-xl shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between ${
                          isEnrolled 
                            ? 'border-indigo-500/40 bg-indigo-950/5' 
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-xs sm:text-sm font-black text-white leading-tight">{tech.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black shrink-0 ${levelBadge}`}>
                              {tech.level}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                            {tech.description}
                          </p>
                        </div>

                        {/* Action section inside Tech card */}
                        <div className="mt-5 pt-3.5 border-t border-slate-800/40 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-extrabold flex items-center gap-1">
                            <Info className="w-3 h-3 text-slate-600" /> Syllabus Active
                          </span>
                          
                          <button
                            id={`btn-enroll-tech-${tech.id}`}
                            type="button"
                            onClick={() => {
                              // We trigger context enrollment directly, adding a dynamic phase to their roadmap
                              enrollTech(tech.id);
                            }}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold shadow transition-all ${
                              isEnrolled
                                ? 'bg-emerald-600/90 text-white hover:bg-emerald-600'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:translate-x-0.5'
                            }`}
                          >
                            {isEnrolled ? (
                              <>
                                <Check className="w-3 h-3" /> Enrolled
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" /> Enroll in Path
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 bg-slate-900/10 border border-slate-800 rounded-xl text-center text-slate-500 text-xs">
                  No technologies match your search criteria.
                </div>
              )}
            </div>
          )}

          {/* 2. COURSES SECTION */}
          {(activeTab === 'all' || activeTab === 'courses') && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-800/40">
                <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
                <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">Courses</h2>
              </div>

              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCourses.map((course, idx) => (
                    <div 
                      key={idx} 
                      id={`course-card-${idx}`}
                      className="bg-[#0b1329] border border-slate-800 p-5 rounded-xl shadow-lg hover:shadow-indigo-500/5 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xs sm:text-sm font-black text-white leading-tight">{course.title}</h3>
                            <p className="text-[10px] text-indigo-400 font-extrabold mt-1">{course.provider}</p>
                          </div>
                          <span className="bg-slate-900/80 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-black shrink-0 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {course.duration}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                          {course.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-slate-800/40 flex justify-end">
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-slate-950/80 hover:bg-black border border-slate-800 text-indigo-400 text-[10px] font-bold rounded-lg transition-colors"
                        >
                          <span>Explore Syllabus</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-slate-900/10 border border-slate-800 rounded-xl text-center text-slate-500 text-xs">
                  No online courses match your search criteria.
                </div>
              )}
            </div>
          )}

          {/* 3. PRACTICAL PROJECTS SECTION */}
          {(activeTab === 'all' || activeTab === 'projects') && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-800/40">
                <Code className="w-5 h-5 text-indigo-400 shrink-0" />
                <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">Hands-on Projects</h2>
              </div>

              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((proj, idx) => (
                    <div 
                      key={idx} 
                      id={`project-card-${idx}`}
                      className="bg-[#0b1329] border border-slate-800 p-5 rounded-xl shadow-lg hover:shadow-indigo-500/5 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs sm:text-sm font-black text-white leading-tight">{proj.title}</h3>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                            proj.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            proj.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {proj.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                          {proj.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-slate-800/40 flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Self-Paced Sandbox</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigate('/mentor');
                          }}
                          className="text-indigo-400 hover:text-indigo-300 hover:underline"
                        >
                          Ask Mentor for Guidance ➔
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-slate-900/10 border border-slate-800 rounded-xl text-center text-slate-500 text-xs">
                  No sandbox projects match your search criteria.
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </AppLayout>
  );
};
