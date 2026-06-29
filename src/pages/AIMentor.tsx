import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/AppLayout';
import { 
  Send, 
  Sparkles, 
  Check, 
  HelpCircle, 
  Brain,
  Terminal,
  Cpu,
  ChevronRight
} from 'lucide-react';

export const AIMentor: React.FC = () => {
  const { user } = useApp();
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setIsTyping(true);

    // Simulate AI response based on topic
    setTimeout(() => {
      let responseText = '';
      const query = textToSend.toLowerCase();

      if (query.includes('typescript generics') || query.includes('generics')) {
        responseText = `TypeScript Generics are a powerful tool to build highly reusable, type-safe components. Here is a guided learning path to master them:

1. **Understand the "Why"**:
   Instead of using \`any\` (which throws away type safety), Generics act as a variable for types. It allows you to pass in any type while maintaining strict compiler checks.

2. **Basic Syntax**:
   Start with simple identity functions:
   \`\`\`typescript
   function identity<T>(arg: T): T {
     return arg;
   }
   \`\`\`
   Here, \`T\` is the type parameter that TypeScript captures when the function is invoked.

3. **Generic Constraints**:
   Sometimes you need to limit what types can be passed. Use the \`extends\` keyword:
   \`\`\`typescript
   interface Lengthwise {
     length: number;
   }
   function loggingIdentity<T extends Lengthwise>(arg: T): T {
     console.log(arg.length); // Safe!
     return arg;
   }
   \`\`\`

4. **Generic Interfaces & Classes**:
   Create highly reusable schemas:
   \`\`\`typescript
   interface APIResponse<Data> {
     status: 'success' | 'error';
     payload: Data;
     timestamp: number;
   }
   \`\`\`

5. **Next Steps**:
   Practice building a custom generic state manager or an API fetch wrapper to solidify your understanding!`;
      } else if (query.includes('interview prep') || query.includes('interview checklist') || query.includes('backend roles')) {
        responseText = `Here is an actionable, high-yield prep checklist for Backend Engineer interviews, ordered by core priorities:

### 1. System Design & Architecture (The differentiator)
- [ ] **Load Balancing & Scaling**: Round-robin, least connections, consistent hashing, horizontal vs vertical scaling.
- [ ] **Caching**: Redis/Memcached. Cache-aside, write-through, eviction policies (LRU, LFU).
- [ ] **Databases**: SQL vs NoSQL trade-offs, indexing strategies, ACID transactions, database sharding.
- [ ] **Message Queues**: RabbitMQ/Kafka for asynchronous, event-driven task processing.

### 2. Core API Protocols & Security
- [ ] **RESTful Standards**: Proper HTTP status codes, stateless design, idempotent methods (GET, PUT, DELETE).
- [ ] **GraphQL & gRPC**: When to use them instead of REST.
- [ ] **Security**: JWT, OAuth2, Rate limiting, CORS, HTTPS/TLS, preventing SQL injection & XSS.

### 3. Coding & Data Structures
- [ ] **Concurrency**: Multithreading, async/await event loops (Node.js/Go channels).
- [ ] **Key Algorithms**: Graph traversals (BFS/DFS), Hash map operations, Sorting, Sliding Window, Dynamic Programming fundamentals.

### 4. Practice Scenario
*Try explaining how you would design a URL shortener (TinyURL) or a real-time notification system. I can mock-interview you on this anytime!*`;
      } else if (query.includes('react + postgresql') || query.includes('postgresql') || query.includes('project should i build')) {
        responseText = `To stand out to recruiters, avoid generic todo lists. Build a **Real-Time Collaborative Project Management Hub** (like a micro-Jira or Trello with live sync). 

Here is how you can architect it to demonstrate master-level proficiency:

### 🏗️ Backend & Database (PostgreSQL)
- **Schema Design**: Create multi-table schemas with proper relations (Users, workspaces, projects, tasks, comments, activity logs).
- **Performance**: Write complex SQL queries with \`JOINs\`, optimize retrieval with indexes on \`project_id\` and \`user_id\`, and implement server-side pagination.
- **Transactions**: Use database transactions to ensure that when a task is deleted, its sub-tasks and activity logs are safely cleared or archived.

### 🎨 Frontend (React + Tailwind CSS)
- **Interactive UI**: A drag-and-drop Kanban Board (using \`@hello-pangea/dnd\` or \`dnd-kit\`).
- **State Optimization**: Use Context API or Zustand to coordinate workspace tasks efficiently without prop-drilling.
- **Real-Time Feed**: Implement live notifications when teammates edit a task (utilize WebSockets or polling).

### 🌟 Portfolio Talking Points
- How you handled database migrations as your features grew.
- How you solved racing conditions when two users updated the same Kanban card simultaneously.
- Techniques used to keep rendering times low under heavy loads (memoization, virtualization).`;
      } else if (query.includes('hello') || query.includes('hi ') || query.includes('hey')) {
        responseText = `Hello! I am your AI Upskilling Mentor. As you work toward becoming a expert in your career, I can help you demystify syntax, optimize database queries, or outline customized step-by-step roadmaps. Ask me anything!`;
      } else if (query.includes('roadmap') || query.includes('gap') || query.includes('assessment')) {
        responseText = `Your tailored career upskilling roadmap is active based on your latest gaps. It outlines concrete milestones and skills to develop. Would you like me to walk you through any particular tech stacks, like Node.js or Terraform?`;
      } else {
        responseText = `That's a very helpful question. To help you master ${user?.careerGoal || 'Full Stack Development'} faster, I recommend breaking this down into modular components: practicing the core layout in the browser first, setting up clean schema relations, and refining API response codes. 

Would you like me to generate a complete, copyable TypeScript code example or mock-interview you on this topic?`;
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 900);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const text = inputMessage;
    setInputMessage('');
    handleSendMessage(text);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!user) return null;

  return (
    <AppLayout>
      <div id="ai-mentor-page-container" className="max-w-5xl mx-auto space-y-6 pb-12 text-slate-100 pt-2">
        
        {/* Header Section styled precisely to screenshot */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-indigo-400 shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Mentor
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold">
            Ask about your roadmap, technologies, interviews, or specific concepts.
          </p>
        </div>

        {/* Sleek Chat Box / Console */}
        <div className="bg-[#0b1329]/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[500px] shadow-xl relative overflow-hidden">
          
          {/* Main message viewer area */}
          <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-1 max-h-[480px] custom-scrollbar">
            {messages.length === 0 ? (
              /* Try Suggestions Placeholder matching the screenshot */
              <div className="space-y-4 pt-4">
                <p className="text-sm font-semibold text-slate-400">
                  Try:
                </p>
                <ul className="space-y-4 list-none pl-1">
                  {[
                    "Explain how I should learn TypeScript generics",
                    "Give me an interview prep checklist for backend roles",
                    "What project should I build to prove I know React + PostgreSQL?"
                  ].map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(item)}
                        className="text-left text-xs sm:text-sm font-semibold hover:text-indigo-400 transition-colors flex items-start gap-3 py-1 group"
                      >
                        <span className="text-indigo-500 font-black text-base group-hover:scale-125 transition-transform">•</span>
                        <span className="text-slate-300 group-hover:text-white font-semibold">
                          "{item}"
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              /* Conversation Messages list */
              <div className="space-y-5">
                {messages.map((msg, index) => {
                  const isAi = msg.sender === 'ai';
                  return (
                    <div key={index} className={`flex ${isAi ? 'justify-start' : 'justify-end'} items-start gap-3`}>
                      {isAi && (
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                          <Brain className="w-4.5 h-4.5" />
                        </div>
                      )}
                      <div className="max-w-[85%] space-y-1">
                        <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                          isAi 
                            ? 'bg-[#080d1c] border border-slate-800 text-slate-200' 
                            : 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/10'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[8px] font-bold text-slate-500 block px-1.5">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <Brain className="w-4.5 h-4.5" />
                    </div>
                    <div className="bg-[#080d1c] border border-slate-800 rounded-2xl p-4 flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Interactive Send Input Bar at bottom */}
          <form onSubmit={handleFormSubmit} className="flex items-center gap-3 pt-3 border-t border-slate-800/40">
            <input
              id="ai-mentor-input-page"
              type="text"
              required
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask your mentor..."
              className="flex-1 bg-[#090f20]/90 border border-slate-800/80 focus:border-slate-700 rounded-full px-5 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              id="ai-mentor-send-btn-page"
              type="submit"
              className="p-3 bg-[#6366f1] hover:bg-indigo-500 text-white rounded-full transition-all shrink-0 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95 flex items-center justify-center"
              title="Send to mentor"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>

        </div>

      </div>
    </AppLayout>
  );
};
