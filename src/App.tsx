import { useState, type FormEvent } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Code, 
  Database, 
  Laptop, 
  Smartphone, 
  Check, 
  ChevronDown, 
  Users, 
  Award, 
  Sparkles,
  CheckCircle2,
  MessageSquare,
  Search
} from 'lucide-react';
import './index.css';

interface Program {
  id: string;
  title: string;
  icon: any;
  duration: string;
  description: string;
  skills: string[];
  syllabus: { week: string; title: string; topics: string }[];
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  // Waitlist Form State
  const [formData, setFormData] = useState({ fullName: '', email: '', interest: 'Fullstack Engineering' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Mock Showcase IDE State
  const [activeFile, setActiveFile] = useState<'App.tsx' | 'server.js' | 'schema.sql'>('App.tsx');
  const [activeChannel, setActiveChannel] = useState<'#general' | '#code-help' | '#cohort-projects'>('#general');

  // Programs Data
  const programs: Program[] = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: GlobeIcon,
      duration: '12 Weeks',
      description: 'Master the art of building responsive, performant, and accessible user interfaces. Harness state management and modern web tooling.',
      skills: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'REST/GraphQL APIs'],
      syllabus: [
        { week: 'Week 1-3', title: 'Modern JavaScript & TypeScript Essentials', topics: 'ES6+ features, TS interfaces, types, generics, and compilation settings.' },
        { week: 'Week 4-6', title: 'React 19 Foundations & Hooks', topics: 'Component lifecycles, custom hooks, context API, portaling, and rendering optimizations.' },
        { week: 'Week 7-9', title: 'Next.js App Router, Styling & UI Libraries', topics: 'Server components, client components, API routes, SEO best practices, and Tailwind CSS.' },
        { week: 'Week 10-12', title: 'State Management, Web Security & Performance', topics: 'Zustand state store, Cross-Site Scripting (XSS) prevention, and asset optimization.' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend & Systems',
      icon: Database,
      duration: '12 Weeks',
      description: 'Design robust database models, scale server architectures, secure RESTful & GraphQL endpoints, and deploy full applications to the cloud.',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
      syllabus: [
        { week: 'Week 1-3', title: 'Node.js Core & Async Programming', topics: 'Event loop, buffer/streams, filesystem API, async/await, and error boundaries.' },
        { week: 'Week 4-6', title: 'Express API Architecture & Databases', topics: 'Middleware design, relational database schemas, migrations, and Knex/Prisma ORMs.' },
        { week: 'Week 7-9', title: 'Security, JWT Authentication & Caching', topics: 'Bcrypt hashing, JSON Web Tokens, OAuth, Redis caching, and rate limiting.' },
        { week: 'Week 10-12', title: 'DevOps, Containers & Cloud Deployment', topics: 'Dockerizing apps, CI/CD with GitHub Actions, and deploying to AWS EC2 & RDS.' }
      ]
    },
    {
      id: 'fullstack',
      title: 'Full-Stack Engineering',
      icon: Laptop,
      duration: '16 Weeks',
      description: 'Our flagship program. Bridge frontend styling with backend servers. Build end-to-end architectures and master git-based agile workflows.',
      skills: ['React 19', 'Node.js', 'PostgreSQL', 'TypeScript', 'System Design', 'DevOps'],
      syllabus: [
        { week: 'Week 1-4', title: 'Advanced Frontend with TS & Tailwind', topics: 'Complex state trees, custom rendering hooks, component patterns, and atomic styling.' },
        { week: 'Week 5-8', title: 'Server Design, Relational DBs & Core API', topics: 'Schema normalization, indexing, transaction query optimizations, and secure auth systems.' },
        { week: 'Week 9-12', title: 'System Design, Message Queues & Real-time', topics: 'Vertical vs horizontal scaling, RabbitMQ integration, and server pushes via WebSockets.' },
        { week: 'Week 13-16', title: 'Agile Capstone: Team Development', topics: 'Building a production SaaS, git merge conflict resolution, CI/CD audits, and live launch.' }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: Smartphone,
      duration: '10 Weeks',
      description: 'Create cross-platform mobile apps for iOS and Android from a single React codebase. Focus on native hardware integration and offline support.',
      skills: ['React Native', 'Expo', 'React Navigation', 'Zustand', 'App Store Deployments'],
      syllabus: [
        { week: 'Week 1-3', title: 'React Native & Expo Foundations', topics: 'Flexbox layouts, Native elements, stylesheet optimizations, and compiling with EAS.' },
        { week: 'Week 4-6', title: 'Navigation, Camera & Native Integrations', topics: 'Expo Router, nested navigation stacks, location tracking, camera access, and file systems.' },
        { week: 'Week 7-8', title: 'Global State, SQLite & Push Notifications', topics: 'Zustand, offline database replication, native token generation, and push notification payloads.' },
        { week: 'Week 9-10', title: 'Performance Optimization & Store Launch', topics: 'Memory leak debugging, image compression, TestFlight distribution, and App Store submission.' }
      ]
    }
  ];

  // FAQ Data
  const faqs = [
    {
      q: 'Do I need prior programming experience to join?',
      a: 'While having basic exposure to HTML, CSS, and elementary JavaScript is helpful, our curriculums are structured to start from fundamental building blocks before scaling to complex enterprise design patterns. We also offer pre-work packages to get you fully prepped.'
    },
    {
      q: 'What is the schedule for the cohorts?',
      a: 'Our cohorts are part-time and built to accommodate working professionals or university students. We have live workshops on weekday evenings (e.g. Tuesday & Thursday at 7:00 PM UTC+1) and collaborative project hack-sessions on Saturdays. All sessions are recorded.'
    },
    {
      q: 'How does the 1-on-1 mentorship work?',
      a: 'You are placed in a cohort of 10 peers supervised by an industry-expert mentor. You get a weekly 20-minute private check-in to review code, unblock concepts, and talk career goals, plus direct chat support in our Discord channels.'
    },
    {
      q: 'Is there a tuition cost to join the academy?',
      a: 'Waitlist entry is 100% free and guarantees priority application access. DevHub Academy offers flexible, affordable payment models including interest-free monthly installments and partial diversity scholarships. We do not use predatory ISAs.'
    }
  ];

  // Mentors Data
  const mentors = [
    {
      name: 'Ebenezer Bankole',
      role: 'Lead Fullstack Instructor',
      bio: 'Software Architect with extensive experience in React ecosystems, scalable APIs, and serverless engineering. Community builder.',
      github: '#',
      linkedin: '#'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Mobile Engineering Lead',
      bio: 'Senior iOS/Android architect with 7+ years of experience. Formerly built mobile systems at scale in fintech startups.',
      github: '#',
      linkedin: '#'
    },
    {
      name: 'David Kojo',
      role: 'DevOps & Systems Expert',
      bio: 'Cloud Architect specialized in Kubernetes clusters, Docker scaling, database profiling, and secure CI/CD build engines.',
      github: '#',
      linkedin: '#'
    }
  ];

  // Code editor snippets based on selected tab
  const codeSnippets = {
    'App.tsx': `// React 19 Client Component
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="card-glow">
      <h3>DevHub Cohort Tracker</h3>
      <p>Active Students: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Simulate Student Join
      </button>
    </div>
  );
}`,
    'server.js': `// Express API Endpoint
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/waitlist', async (req, res) => {
  const { name, email, path } = req.body;
  const user = await db.insert({ name, email, path });
  
  // Trigger email notification
  await mailer.sendWaitlistConfirmation(email);
  res.status(201).json({ success: true, user });
});

app.listen(5000, () => console.log('Server live!'));`,
    'schema.sql': `-- Relational Postgres Schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  track VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);`
  };

  // Mock Chat Feed based on channel selection
  const chatMessages = {
    '#general': [
      { user: 'alex_dev', text: 'Hey guys! Just completed the pre-work for the React cohort. Super excited to get started!' },
      { user: 'lead_ebenezer', text: 'Welcome Alex! Great to have you. The kickoff live session is scheduled for Tuesday at 7 PM.' },
      { user: 'tariq_m', text: 'Looking forward to building in a team. Working on Git branch workflows tonight.' }
    ],
    '#code-help': [
      { user: 'lucy_s', text: 'Does anyone know why my custom hook returns undefined when accessing state context?' },
      { user: 'lead_ebenezer', text: 'Make sure your hook is called inside the Context.Provider tree. Check line 24 of App.tsx!' },
      { user: 'lucy_s', text: 'Ah! I forgot to wrap the outer dashboard layout. Thank you, that fixed it!' }
    ],
    '#cohort-projects': [
      { user: 'sam_wright', text: 'Just pushed our group capstone demo. We built a real-time Kanban board with WebSockets!' },
      { user: 'david_ops', text: 'Excellent system architecture, Sam! The Docker Compose build looks clean.' }
    ]
  };

  const handleHeroSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    // Set waitlist form details and transition to registration details
    const el = document.getElementById('waitlist-form-container');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWaitlistSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <header className="header">
        <a href="#" className="logo">
          <span className="logo-text">DevHub</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#features">About Us</a>
          <a href="#journey">Journey</a>
          <a href="#programs">Courses</a>
          <a href="#mentors">Mentors</a>
          <a href="#faq">FAQ</a>
        </nav>
        
        <div className="header-actions">
          <button className="btn-primary" onClick={() => {
            const el = document.getElementById('waitlist-form-container');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}>Register</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav>
            <a href="#" className="active" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)}>About Us</a>
            <a href="#journey" onClick={() => setIsMenuOpen(false)}>Journey</a>
            <a href="#programs" onClick={() => setIsMenuOpen(false)}>Courses</a>
            <a href="#mentors" onClick={() => setIsMenuOpen(false)}>Mentors</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
          </nav>
          <div className="mobile-menu-actions">
            <button className="btn-primary w-full" onClick={() => {
              setIsMenuOpen(false);
              const el = document.getElementById('waitlist-form-container');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}>Register</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Best Tech Skills<br />
                Learning Community<br />
                <span className="gradient-text">For Aspiring Devs</span>
              </h1>
              
              <p className="subtitle">
                DevHub Academy is a premier cohort-first tech training platform. Work in collaborative agile groups, code production applications, and secure direct mentorship from industry experts.
              </p>
              
              {/* Search-style waitlist input */}
              <form onSubmit={handleHeroSubmit} className="search-wrapper">
                <div className="search-input-container">
                  <Search size={20} />
                  <input 
                    type="email" 
                    placeholder="Enter your email to join waitlist..." 
                    className="search-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="search-btn">
                  Join Waitlist
                </button>
              </form>
            </div>

            {/* Overlapping images & badge replicated from screenshot */}
            <div className="hero-images-col">
              <div className="hero-images-container">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=750&q=80" 
                  alt="TypeScript Developer Setup" 
                  className="hero-img-left"
                />
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=750&q=80" 
                  alt="Developers Collaborating" 
                  className="hero-img-right"
                />
                
                {/* Floating Benefits Badge */}
                <div className="floating-badge">
                  <div className="badge-item">
                    <Check size={16} /> 1-on-1 industry mentors
                  </div>
                  <div className="badge-item">
                    <Check size={16} /> Team-based active cohorts
                  </div>
                  <div className="badge-item">
                    <Check size={16} /> Real production projects
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium CSS-based IDE Dashboard Mockup */}
          <div className="showcase-container">
            <div className="dashboard-mock">
              <div className="window-header">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="window-title">devhub-workspace ~ terminal</div>
              </div>
              
              <div className="dashboard-content">
                {/* Mock Workspace channels */}
                <div className="mock-sidebar">
                  <div className="sidebar-section-title">Workspace</div>
                  <div className="sidebar-links">
                    <a 
                      href="#showcase" 
                      className={activeChannel === '#general' ? 'active' : ''}
                      onClick={(e) => { e.preventDefault(); setActiveChannel('#general'); }}
                    >
                      <MessageSquare size={16} /> #general
                    </a>
                    <a 
                      href="#showcase" 
                      className={activeChannel === '#code-help' ? 'active' : ''}
                      onClick={(e) => { e.preventDefault(); setActiveChannel('#code-help'); }}
                    >
                      <Code size={16} /> #code-help
                    </a>
                    <a 
                      href="#showcase" 
                      className={activeChannel === '#cohort-projects' ? 'active' : ''}
                      onClick={(e) => { e.preventDefault(); setActiveChannel('#cohort-projects'); }}
                    >
                      <Sparkles size={16} /> #cohort-projects
                    </a>
                  </div>
                  
                  <div className="sidebar-section-title" style={{ marginTop: '1rem' }}>Active Call</div>
                  <div className="video-mock">
                    <div className="video-avatar">EB</div>
                    <div className="video-label">🔴 Ebenezer (Presenter)</div>
                  </div>
                </div>

                {/* Mock Code editor */}
                <div className="mock-code-panel">
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                    <span 
                      style={{ color: activeFile === 'App.tsx' ? 'white' : '#64748b', cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => setActiveFile('App.tsx')}
                    >
                      App.tsx
                    </span>
                    <span 
                      style={{ color: activeFile === 'server.js' ? 'white' : '#64748b', cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => setActiveFile('server.js')}
                    >
                      server.js
                    </span>
                    <span 
                      style={{ color: activeFile === 'schema.sql' ? 'white' : '#64748b', cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => setActiveFile('schema.sql')}
                    >
                      schema.sql
                    </span>
                  </div>
                  <pre style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
                    <code>
                      {codeSnippets[activeFile]}
                    </code>
                  </pre>
                </div>

                {/* Mock Sidebar Chat Feed */}
                <div className="mock-feed">
                  <div style={{ fontWeight: 700, color: 'white', marginBottom: '0.75rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Live Feed ({activeChannel})
                  </div>
                  
                  <div className="chat-box">
                    {chatMessages[activeChannel].map((msg, i) => (
                      <div key={i} className="chat-bubble">
                        <div className="chat-user">@{msg.user}</div>
                        <div className="chat-text">{msg.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">95%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">10+</div>
              <div className="stat-label">Industry Mentors</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">12-16</div>
              <div className="stat-label">Weeks Per Cohort</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">15+</div>
              <div className="stat-label">Real Portfolio Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why DevHub Features Section */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">High Impact Learning</span>
            <h2 className="section-title">Designed for Engineers</h2>
            <p className="section-desc">
              Forget standard videos. DevHub is engineered around practical building, direct team collaboration, and accountability.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Sparkles size={24} />
              </div>
              <h3 className="feature-title">Cohort Learning Model</h3>
              <p className="feature-desc">
                Learn alongside a small group of motivated peers. Team up for hackathons, review each others pull requests, and solve bugs together.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Users size={24} />
              </div>
              <h3 className="feature-title">1-on-1 Mentorship</h3>
              <p className="feature-desc">
                Receive customized review sessions and professional guidance from senior software engineers who work at leading global tech organizations.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Award size={24} />
              </div>
              <h3 className="feature-title">Production Projects</h3>
              <p className="feature-desc">
                Build and deploy fully functional, complex applications. Build a Github portfolio that recruiter parsing bots and hiring managers love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section" id="programs" style={{ background: '#f8fafc', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Learning Pathways</span>
            <h2 className="section-title">Select Your Specialty</h2>
            <p className="section-desc">
              Choose the program that aligns with your engineering career goals. Curriculums are regularly updated for React 19, TypeScript, and modern system design.
            </p>
          </div>

          <div className="programs-grid">
            {programs.map((program) => (
              <div key={program.id} className="program-card">
                <div className="program-header">
                  <div className="program-icon">
                    <program.icon size={24} />
                  </div>
                  <span className="program-duration">{program.duration}</span>
                </div>
                <h3 className="program-title">{program.title}</h3>
                <p className="program-desc">{program.description}</p>
                
                <div className="program-skills">
                  {program.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>

                <button 
                  className="program-btn"
                  onClick={() => setSelectedProgram(program)}
                >
                  View Curriculum Syllabus <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Modal */}
      {selectedProgram && (
        <div className="modal-overlay" onClick={() => setSelectedProgram(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedProgram.title} Syllabus</h3>
              <button className="modal-close" onClick={() => setSelectedProgram(null)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <p className="section-desc" style={{ marginBottom: '2rem', fontSize: '0.95rem', textAlign: 'left' }}>
                {selectedProgram.description}
              </p>
              
              <h4 className="modal-section-title">Weekly Roadmap ({selectedProgram.duration})</h4>
              <div className="syllabus-timeline">
                {selectedProgram.syllabus.map((week, idx) => (
                  <div key={idx} className="syllabus-week">
                    <div className="week-num">{week.week}</div>
                    <div className="week-details">
                      <div className="week-title">{week.title}</div>
                      <div className="week-topics">{week.topics}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How it works Section */}
      <section className="section" id="journey">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">The Timeline</span>
            <h2 className="section-title">Your Path to Mastery</h2>
            <p className="section-desc">
              We structure our learning timeline to guide you seamlessly from waitlist admission to hiring portfolios.
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-step">Step 1</span>
                <h3 className="timeline-title">Join Waitlist & Submit Profile</h3>
                <p className="timeline-desc">
                  Secure your spot on the waitlist. We screen candidates to build highly collaborative cohorts of tech enthusiasts.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-step">Step 2</span>
                <h3 className="timeline-title">Match with a Mentor & Cohort</h3>
                <p className="timeline-desc">
                  Get paired with 10 peer developers and a dedicated senior software engineer who matches your track.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-step">Step 3</span>
                <h3 className="timeline-title">Build in Production Teams</h3>
                <p className="timeline-desc">
                  Work on multi-developer codebases. Manage branches, handle merge disputes, deploy servers, and launch actual apps.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-step">Step 4</span>
                <h3 className="timeline-title">Recruitment Referrals & Graduate</h3>
                <p className="timeline-desc">
                  Review portfolios, polish technical resumes, perform mock developer interviews, and get referred to our network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="section" id="mentors" style={{ background: '#f8fafc', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Expert Instruction</span>
            <h2 className="section-title">Learn From Industry Veterans</h2>
            <p className="section-desc">
              Our mentors have real-world engineering experience and love helping students navigate industry realities.
            </p>
          </div>

          <div className="mentors-grid">
            {mentors.map((mentor, index) => (
              <div key={index} className="mentor-card">
                <div style={{ height: '220px', background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Users size={32} style={{ color: 'var(--primary)' }} />
                  </div>
                </div>
                <div className="mentor-info">
                  <h3 className="mentor-name">{mentor.name}</h3>
                  <div className="mentor-role">{mentor.role}</div>
                  <p className="mentor-bio">{mentor.bio}</p>
                  
                  <div className="mentor-socials">
                    <a href={mentor.github} aria-label="GitHub"><GithubIcon size={18} /></a>
                    <a href={mentor.linkedin} aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Common Inquiries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Have questions about schedules, requirements, or pathways? We have answers.
            </p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              >
                <div 
                  className="faq-question"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="faq-icon" />
                </div>
                
                <div 
                  className="faq-answer"
                  style={{ maxHeight: activeFaq === index ? '200px' : '0px' }}
                >
                  <div className="faq-answer-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Call To Action Form */}
      <section className="waitlist-section" id="waitlist-form-container">
        <div className="container">
          <div className="waitlist-card">
            {!isSubmitted ? (
              <>
                <h2 className="section-title" style={{ fontSize: '2.25rem', marginBottom: '1rem', textAlign: 'center' }}>
                  Secure Your Spot in Cohort 1.0
                </h2>
                <p className="section-desc" style={{ fontSize: '1rem', marginBottom: '2.5rem', textAlign: 'center' }}>
                  Waitlist applications are free and non-binding. Spots are highly limited to preserve a low student-to-mentor ratio.
                </p>
                
                {formError && (
                  <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    {formError}
                  </div>
                )}

                <form onSubmit={handleWaitlistSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      placeholder="e.g. Ebun Bankole" 
                      className="form-input"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="you@example.com" 
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="interest">Pathway of Interest</label>
                    <select 
                      id="interest" 
                      className="form-input form-select"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option value="Frontend Development">Frontend Development</option>
                      <option value="Backend & Systems">Backend & Systems</option>
                      <option value="Fullstack Engineering">Full-Stack Engineering</option>
                      <option value="Mobile Development">Mobile Development</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-primary w-full large" style={{ marginTop: '2rem', justifyContent: 'center' }}>
                    Request Cohort Invitation
                  </button>
                </form>
              </>
            ) : (
              <div className="success-container">
                <div className="success-icon-wrapper">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="success-title">You're on the list, {formData.fullName.split(' ')[0]}!</h3>
                <p className="success-text">
                  Thank you for applying for the <strong>{formData.interest}</strong> track. 
                  We've sent a confirmation email to <strong>{formData.email}</strong>. Keep an eye on your inbox for onboarding steps.
                </p>
                <button 
                  className="btn-secondary" 
                  style={{ marginTop: '2rem' }}
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ fullName: '', email: '', interest: 'Fullstack Engineering' });
                  }}
                >
                  Register Another Student
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <a href="#" className="logo" style={{ marginBottom: '0.5rem' }}>
                <span className="logo-text">DevHub</span>
              </a>
              <p className="footer-logo-desc">
                Accelerating the career trajectories of software engineers through project cohorts, direct team structures, and 1-on-1 industry mentorship.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Syllabus Path</h4>
              <div className="footer-links">
                <a href="#programs">Frontend Development</a>
                <a href="#programs">Backend & Systems</a>
                <a href="#programs">Full-Stack Engineering</a>
                <a href="#programs">Mobile Development</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">DevHub Community</h4>
              <div className="footer-links">
                <a href="#journey">The Learning Path</a>
                <a href="#features">1-on-1 Mentors</a>
                <a href="#faq">Frequently Asked Questions</a>
                <a href="#waitlist-form-container">Sign Up Portal</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Get Involved</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                Join our teaching roster or become a partner company to recruit top dev talent.
              </p>
              <div className="footer-social-row">
                <a href="#" className="social-icon-btn" aria-label="GitHub"><GithubIcon size={18} /></a>
                <a href="#" className="social-icon-btn" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
                <a href="#" className="social-icon-btn" aria-label="Discord"><MessageSquare size={18} /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} DevHubAcademy.com. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple custom component to render a globe icon fallback using SVG
function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

// Custom component to render a github icon using SVG
function GithubIcon(props: any) {
  const size = props.size || 20;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Custom component to render a linkedin icon using SVG
function LinkedinIcon(props: any) {
  const size = props.size || 20;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
