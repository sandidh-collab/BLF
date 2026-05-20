import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Heart, MessageSquare, 
  LogOut, Lightbulb, X, Camera, Plus, Trash2,
  Calendar, CheckCircle2, ShieldCheck, Zap, Settings,
  Copy, Check
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../contexts/CMSContext';
import { THEME_PRESETS } from '../constants';

export default function Moderator() {
  const { content, updateContent, updateDonationStatus } = useCMS();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [dbStatus, setDbStatus] = useState<'ready' | 'missing-tables' | 'error'>('ready');

  React.useEffect(() => {
    async function checkSupabaseStatus() {
      try {
        const { error: donErr } = await supabase.from('blf_donations').select('*').limit(1);
        const { error: ideaErr } = await supabase.from('blf_user_ideas').select('*').limit(1);
        
        if (donErr || ideaErr) {
          setDbStatus('missing-tables');
        } else {
          setDbStatus('ready');
        }
      } catch (e) {
        setDbStatus('error');
      }
    }
    checkSupabaseStatus();
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  if (false) { // Login screen disabled as requested
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-display font-bold text-slate-900">Moderator Access</h1>
            <p className="text-slate-500 text-sm mt-2">Content Moderation Gateway</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Mod Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all text-lg"
                placeholder="mod@foundation.org"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Access Key</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all text-lg"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
            <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all">
              Initialize Session
              <Zap className="w-5 h-5 fill-white" />
            </button>
          </form>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full mt-6 text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors"
          >
            ← Exit to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleFileUpload = (path: string, index?: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (index !== undefined) {
          if (path === 'events') {
            const newEvents = [...content.events];
            newEvents[index] = { ...newEvents[index], image: result };
            updateContent('events', newEvents);
          } else if (path === 'logo') {
            updateContent('logo', result);
          } else if (path === 'gallery') {
            const newGallery = [...content.gallery];
            newGallery[index] = { ...newGallery[index], url: result };
            updateContent('gallery', newGallery);
          } else if (path === 'stories') {
            const newStories = [...content.stories];
            newStories[index] = { ...newStories[index], image: result };
            updateContent('stories', newStories);
          } else if (path === 'governingBody') {
            const newMembers = [...content.governingBody];
            newMembers[index] = { ...newMembers[index], image: result };
            updateContent('governingBody', newMembers);
          }
        } else {
          updateContent(path, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen"
      >
        <div className="p-8 border-b border-slate-50">
           <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center shadow-lg shadow-brand-accent/20">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight block text-brand-primary">MOD PANEL</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Content Moderation</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 mt-4">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'donations', label: 'Donations', icon: Heart },
            { id: 'ideas', label: 'Moderate Ideas', icon: Lightbulb },
            { id: 'stories', label: 'Impact Stories', icon: Heart },
            { id: 'events', label: 'Manage Events', icon: Calendar },
            { id: 'gallery', label: 'Gallery CMS', icon: Camera },
            { id: 'governingBody', label: 'Governing Body', icon: ShieldCheck },
            { id: 'milestones', label: 'Timeline', icon: Calendar },
            { id: 'content', label: 'Content CMS', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-semibold transition-all group",
                activeTab === item.id 
                  ? "bg-brand-accent text-white shadow-xl shadow-brand-accent/20 scale-[1.02]" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-brand-accent"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-brand-accent")} />
                {item.label}
              </div>
              {activeTab === item.id && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-red-500 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Exit Panel
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900 tracking-tight capitalize">{activeTab} Moderation</h1>
            <p className="text-sm text-slate-400 font-medium">Lutfennahar Foundation Moderator Access</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end mr-4">
              <span className="text-sm font-bold text-slate-900">Moderator</span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Session</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border-2 border-brand-accent/20 flex items-center justify-center text-brand-accent font-bold">
              MOD
            </div>
          </div>
        </header>

        <div className="p-10 space-y-10">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div
                key="dashboard"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { label: 'Donations', count: content.donations.length, icon: Heart, color: 'bg-emerald-500' },
                    { label: 'Pending Ideas', count: content.userIdeas.length, icon: Lightbulb, color: 'bg-amber-500' },
                    { label: 'Active Events', count: content.events.length, icon: Calendar, color: 'bg-indigo-500' },
                    { label: 'Gallery Stories', count: content.gallery.length, icon: Camera, color: 'bg-rose-500' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white", stat.color)}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-3xl font-display font-bold text-slate-900">{stat.count}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm grid lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-1 space-y-6">
                    <div>
                      <h3 className="font-display font-medium text-xl text-brand-primary mb-2">Supabase Sync Link</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">Your portal is securely synced with your Supabase database server.</p>
                    </div>

                    <div className="p-6 rounded-2xl border flex items-center gap-4 bg-slate-50 border-slate-100">
                      {dbStatus === 'ready' ? (
                        <>
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                            <CheckCircle2 className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-800">Link Status: Connected</p>
                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Sync tables ready</p>
                          </div>
                        </>
                      ) : dbStatus === 'missing-tables' ? (
                        <>
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                            <Zap className="w-5 h-5 lg:animate-bounce" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-800">Connection Active</p>
                            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Setup tables below</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                            <X className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-850">Connecting...</p>
                            <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">Check credentials/tables</p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="bg-brand-primary/5 p-6 rounded-2xl border border-brand-primary/10">
                      <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">Project Reference</p>
                      <code className="text-xs font-mono font-bold text-brand-primary">tjaoktbbhvlhaoqzqtpx</code>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Required Table Schemas (SQL)</h4>
                      <button 
                        onClick={() => {
                          const sql = `-- Table 1: Donations table
CREATE TABLE blf_donations (
  id bigint generated always as identity primary key,
  txn_id text not null unique,
  amount text not null,
  "from" text not null,
  date text not null,
  status text not null default 'Processing',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table 2: User ideas table
CREATE TABLE blf_user_ideas (
  id bigint generated always as identity primary key,
  "user" text not null,
  email text not null,
  text text not null,
  category text not null default 'Community Idea',
  date text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);`;
                          navigator.clipboard.writeText(sql);
                          setCopiedSql(true);
                          setTimeout(() => setCopiedSql(false), 2000);
                        }}
                        className="flex items-center gap-2 text-xs font-bold text-brand-primary hover:text-brand-accent bg-brand-primary/5 hover:bg-brand-primary/10 px-4 py-2 rounded-xl transition-all self-start"
                      >
                        {copiedSql ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        {copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}
                      </button>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-3xl font-mono text-xs text-slate-300 overflow-x-auto border border-slate-900 shadow-inner max-h-[160px]">
                      <span className="text-slate-500">-- Run in Supabase SQL Editor to make sync tables active:</span>
                      <pre className="mt-2 text-emerald-400 select-all">
{`CREATE TABLE blf_donations (
  id bigint generated always as identity primary key,
  txn_id text not null unique,
  amount text not null,
  "from" text not null,
  date text not null,
  status text not null default 'Processing',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE blf_user_ideas (
  id bigint generated always as identity primary key,
  "user" text not null,
  email text not null,
  text text not null,
  category text not null default 'Community Idea',
  date text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                   <h3 className="font-display font-medium text-xl text-brand-primary mb-6">Moderator Guidelines</h3>
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                         <h4 className="font-bold text-slate-850 mb-2">1. Idea Review</h4>
                         <p className="text-sm text-slate-500 leading-relaxed">Ensure community suggestions are constructive and align with our core missions (Health, Education, Food Security).</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                         <h4 className="font-bold text-slate-850 mb-2">2. Visual Standards</h4>
                         <p className="text-sm text-slate-500 leading-relaxed">Gallery images should be high quality and respect the privacy of those we serve.</p>
                      </div>
                   </div>
                </div>            </div>
              </motion.div>

            ) : activeTab === 'donations' ? (
              <motion.div
                key="donations"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl">Manage Donations</h3>
                  <div className="flex gap-4">
                    <div className="bg-white px-4 py-2 rounded-lg border border-slate-100 flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-amber-500" />
                       <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">Processing: {content.donations.filter(d => d.status === 'Processing').length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Donor</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Amount</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Transaction ID</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {content.donations.map((donation) => (
                        <tr key={donation.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <p className="font-bold text-slate-900">{donation.from}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{donation.date}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-emerald-600 font-bold font-display">{donation.amount}</span>
                          </td>
                          <td className="px-8 py-6">
                            <code className="text-[10px] bg-slate-100 px-2 py-1 rounded font-mono font-bold text-slate-500">{donation.txnId}</code>
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                              donation.status === 'Success' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                              donation.status === 'Processing' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                              "bg-red-50 text-red-600 border border-red-100"
                            )}>
                              {donation.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              {donation.status === 'Processing' ? (
                                <>
                                  <button 
                                    onClick={() => updateDonationStatus(donation.id, 'Success')}
                                    className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                    title="Mark as Success"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => updateDonationStatus(donation.id, 'Failed')}
                                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                    title="Mark as Failed"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <button 
                                  onClick={() => updateDonationStatus(donation.id, 'Processing')}
                                  className="text-[9px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest px-2"
                                >
                                  Reset
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {content.donations.length === 0 && (
                    <div className="py-20 text-center">
                       <Heart className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                       <p className="text-slate-400 font-medium tracking-tight">No donations yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : activeTab === 'ideas' ? (
              <motion.div
                key="ideas"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-8"
              >
                {content.userIdeas.map((idea) => (
                  <motion.div
                    key={idea.id}
                    variants={itemVariants}
                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{idea.user}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{idea.email}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary text-[10px] font-bold rounded-full uppercase tracking-tighter">
                        {idea.category}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed mb-8 italic">
                      "{idea.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          const newIdeas = content.userIdeas.filter(i => i.id !== idea.id);
                          updateContent('userIdeas', newIdeas);
                        }}
                        className="flex-1 py-4 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </button>
                      <button 
                         onClick={() => {
                           const newIdeas = content.userIdeas.filter(i => i.id !== idea.id);
                           updateContent('userIdeas', newIdeas);
                         }}
                         className="px-4 py-4 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {content.userIdeas.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                    <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">No new ideas to moderate at this time.</p>
                  </div>
                )}
              </motion.div>

            ) : activeTab === 'events' ? (
              <motion.div
                key="events"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl">Upcoming Activity List</h3>
                  <button 
                    onClick={() => {
                      const newEvent = {
                        id: Date.now().toString(),
                        title: 'New Event Contribution',
                        date: 'Next Month',
                        location: 'TBD',
                        description: 'Details for the new activity...',
                        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800'
                      };
                      updateContent('events', [...content.events, newEvent]);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    New Event
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {content.events.map((event, index) => (
                    <div key={event.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative group">
                      <button 
                        onClick={() => {
                          const newEvents = content.events.filter(e => e.id !== event.id);
                          updateContent('events', newEvents);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="space-y-4">
                        <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                          <img src={event.image} alt="" className="w-full h-full object-cover" />
                          <label className="absolute bottom-2 right-2 w-10 h-10 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                            <Camera className="w-5 h-5 text-slate-600" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('events', index)} />
                          </label>
                        </div>
                        <div className="space-y-3">
                          <input 
                            className="w-full px-4 py-3 bg-slate-50 rounded-lg text-sm font-bold border-none outline-none focus:ring-1 focus:ring-brand-accent/30"
                            value={event.title}
                            onChange={(e) => {
                              const newEvents = [...content.events];
                              newEvents[index] = { ...event, title: e.target.value };
                              updateContent('events', newEvents);
                            }}
                          />
                          <div className="flex gap-2">
                             <input 
                              className="flex-1 px-4 py-2 bg-slate-50 rounded-lg text-[10px] font-bold border-none outline-none"
                              value={event.date}
                              onChange={(e) => {
                                const newEvents = [...content.events];
                                newEvents[index] = { ...event, date: e.target.value };
                                updateContent('events', newEvents);
                              }}
                            />
                            <input 
                              className="flex-1 px-4 py-2 bg-slate-50 rounded-lg text-[10px] font-bold border-none outline-none"
                              value={event.location}
                              onChange={(e) => {
                                const newEvents = [...content.events];
                                newEvents[index] = { ...event, location: e.target.value };
                                updateContent('events', newEvents);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            ) : activeTab === 'gallery' ? (
              <motion.div
                key="gallery"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl">Gallery Item Moderation</h3>
                  <button 
                    onClick={() => {
                      const newItem = {
                        id: Date.now().toString(),
                        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
                        title: 'Impact Story',
                        description: 'Detailed description of this impact story...'
                      };
                      updateContent('gallery', [...content.gallery, newItem]);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest"
                  >
                    <Plus className="w-4 h-4" />
                    Add Story
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {content.gallery.map((item, index) => (
                    <div key={item.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm group relative">
                      <button 
                        onClick={() => {
                          const newGallery = content.gallery.filter(g => g.id !== item.id);
                          updateContent('gallery', newGallery);
                        }}
                        className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-bold"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative shadow-sm">
                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                        <label className="absolute bottom-2 right-2 w-10 h-10 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center cursor-pointer hover:bg-white transition-colors shadow-lg">
                          <Camera className="w-5 h-5 text-brand-primary" />
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('gallery', index)} />
                        </label>
                      </div>
                      <div className="space-y-3">
                         <input 
                            className="w-full px-3 py-2 bg-slate-50 rounded-lg text-sm font-bold border-none outline-none"
                            value={item.title}
                            onChange={(e) => {
                              const newGallery = [...content.gallery];
                              newGallery[index] = { ...item, title: e.target.value };
                              updateContent('gallery', newGallery);
                            }}
                          />
                          <textarea 
                            className="w-full px-3 py-2 bg-slate-50 rounded-lg text-[10px] font-medium leading-relaxed border-none outline-none h-20"
                            value={item.description}
                            onChange={(e) => {
                              const newGallery = [...content.gallery];
                              newGallery[index] = { ...item, description: e.target.value };
                              updateContent('gallery', newGallery);
                            }}
                          />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : activeTab === 'governingBody' ? (
              <motion.div
                key="governingBody"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10 pb-20"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-display font-bold text-3xl text-slate-900 tracking-tight">Governing Body</h3>
                    <p className="text-slate-400 font-medium">Manage foundation leadership and board members</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newMember = {
                        id: Date.now().toString(),
                        name: 'New Member',
                        role: 'Board Member',
                        image: 'https://i.pravatar.cc/150?u=' + Date.now()
                      };
                      updateContent('governingBody', [...content.governingBody, newMember]);
                    }}
                    className="flex items-center gap-2 px-8 py-4 bg-brand-accent text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-accent/20"
                  >
                    <Plus className="w-5 h-5" />
                    Add Member
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {content.governingBody.map((member, index) => (
                    <motion.div 
                      key={member.id} 
                      variants={itemVariants}
                      className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200/60 relative group"
                    >
                      <button 
                        onClick={() => {
                          const newMembers = content.governingBody.filter(m => m.id !== member.id);
                          updateContent('governingBody', newMembers);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="flex flex-col items-center text-center space-y-6">
                        <div className="relative group/img cursor-pointer">
                          <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-lg">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <label className="absolute inset-0 bg-brand-accent/40 opacity-0 group-hover/img:opacity-100 rounded-[2rem] flex items-center justify-center transition-all cursor-pointer">
                            <Camera className="text-white w-6 h-6" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('governingBody', index)} />
                          </label>
                        </div>

                        <div className="w-full space-y-4">
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                            <input 
                              className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-sm font-bold text-slate-800 text-center"
                              value={member.name}
                              onChange={(e) => {
                                const newMembers = [...content.governingBody];
                                newMembers[index] = { ...member, name: e.target.value };
                                updateContent('governingBody', newMembers);
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Designation / Role</label>
                            <input 
                              className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-sm font-bold text-slate-800 text-center"
                              value={member.role}
                              onChange={(e) => {
                                const newMembers = [...content.governingBody];
                                newMembers[index] = { ...member, role: e.target.value };
                                updateContent('governingBody', newMembers);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : activeTab === 'stories' ? (
              <motion.div
                key="stories"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10 pb-20"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-display font-bold text-3xl text-slate-900 tracking-tight">Manage Impact Stories</h3>
                    <p className="text-slate-400 font-medium">Capture and share the resilience of our community</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newStory = {
                        id: Date.now().toString(),
                        name: 'New Person',
                        role: 'Beneficiary',
                        content: 'Write their story here...',
                        image: '', // Empty for default
                        location: 'Location'
                      };
                      updateContent('stories', [newStory, ...(content.stories || [])]);
                    }}
                    className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-primary/20"
                  >
                    <Plus className="w-5 h-5" />
                    New Story
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {(content.stories || []).map((story, index) => (
                    <motion.div 
                      key={story.id} 
                      variants={itemVariants}
                      className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200/60 relative group"
                    >
                      <button 
                        onClick={() => {
                          const newStories = content.stories.filter(s => s.id !== story.id);
                          updateContent('stories', newStories);
                        }}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="flex gap-8">
                        <div className="space-y-4 shrink-0">
                          <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-slate-50 relative group/img cursor-pointer shadow-lg">
                            <img 
                              src={story.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.name)}&background=F3F4F6&color=4B5563&size=200`} 
                              alt="" 
                              className="w-full h-full object-cover" 
                            />
                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                              <Camera className="text-white w-6 h-6" />
                              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('stories', index)} />
                            </label>
                          </div>
                          <p className="text-[10px] font-black text-center text-slate-400 uppercase tracking-widest">Change Photo</p>
                        </div>

                        <div className="flex-grow space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Name</label>
                              <input 
                                className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-sm font-bold text-slate-800"
                                value={story.name}
                                onChange={(e) => {
                                  const newStories = [...content.stories];
                                  newStories[index] = { ...story, name: e.target.value };
                                  updateContent('stories', newStories);
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Role/Status</label>
                              <input 
                                className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-sm font-bold text-slate-800"
                                value={story.role}
                                onChange={(e) => {
                                  const newStories = [...content.stories];
                                  newStories[index] = { ...story, role: e.target.value };
                                  updateContent('stories', newStories);
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</label>
                            <input 
                              className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-xs font-bold text-slate-600"
                              value={story.location}
                              onChange={(e) => {
                                const newStories = [...content.stories];
                                newStories[index] = { ...story, location: e.target.value };
                                updateContent('stories', newStories);
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">The Story</label>
                            <textarea 
                              className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-medium leading-relaxed h-32"
                              value={story.content}
                              onChange={(e) => {
                                const newStories = [...content.stories];
                                newStories[index] = { ...story, content: e.target.value };
                                updateContent('stories', newStories);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : activeTab === 'milestones' ? (
              <motion.div
                key="milestones"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-brand-primary">Journey Milestones</h2>
                    <p className="text-slate-400 font-medium">Manage the foundation timeline</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newMilestones = [...content.milestones, { year: '20XX', title: 'New Milestone', description: 'Describe the milestone...' }];
                      updateContent('milestones', newMilestones);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:shadow-xl transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add Milestone
                  </button>
                </div>

                <div className="grid gap-6">
                  {content.milestones.map((m, i) => (
                    <motion.div 
                      key={i}
                      className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative group"
                    >
                      <button 
                         onClick={() => {
                           const newMilestones = content.milestones.filter((_, idx) => idx !== i);
                           updateContent('milestones', newMilestones);
                         }}
                         className="absolute top-6 right-6 w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                           <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Year</label>
                           <input 
                              value={m.year}
                              onChange={(e) => {
                                const newMilestones = [...content.milestones];
                                newMilestones[i].year = e.target.value;
                                updateContent('milestones', newMilestones);
                              }}
                              className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none font-bold text-brand-primary"
                           />
                        </div>
                        <div className="md:col-span-3">
                           <div className="space-y-4">
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Milestone Title</label>
                                <input 
                                  value={m.title}
                                  onChange={(e) => {
                                    const newMilestones = [...content.milestones];
                                    newMilestones[i].title = e.target.value;
                                    updateContent('milestones', newMilestones);
                                  }}
                                  className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none font-bold text-slate-800"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                                <textarea 
                                  value={m.description}
                                  onChange={(e) => {
                                    const newMilestones = [...content.milestones];
                                    newMilestones[i].description = e.target.value;
                                    updateContent('milestones', newMilestones);
                                  }}
                                  rows={2}
                                  className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none font-medium text-slate-600 resize-none"
                                />
                              </div>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : activeTab === 'content' ? (
              <motion.div
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10 pb-20"
              >
                <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-200/60 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                        <Camera className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-2xl text-slate-900">Logo & Branding</h3>
                        <p className="text-sm text-slate-400 font-medium">Upload your foundation logo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-center overflow-hidden shadow-inner shrink-0 aspect-square">
                        {content.logo ? (
                          <img src={content.logo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <Heart className="w-8 h-8 text-slate-200 fill-slate-200" />
                        )}
                      </div>
                      <label className="px-6 py-3 bg-brand-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer hover:scale-105 transition-all shadow-lg shadow-brand-primary/20">
                        Upload Logo
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('logo')} />
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                      <input 
                        type="color" 
                        value={content.brandColor} 
                        onChange={(e) => updateContent('brandColor', e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border-none bg-transparent"
                      />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Color</p>
                        <p className="text-xs font-bold text-slate-700">{content.brandColor?.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                      <input 
                        type="color" 
                        value={content.accentColor} 
                        onChange={(e) => updateContent('accentColor', e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border-none bg-transparent"
                      />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accent Color</p>
                        <p className="text-xs font-bold text-slate-700">{content.accentColor?.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Theme Presets (Predefined Styles)</p>
                    <div className="flex flex-wrap gap-3">
                      {THEME_PRESETS.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => {
                            updateContent('brandColor', theme.primary);
                            updateContent('accentColor', theme.accent);
                          }}
                          className={cn(
                            "group relative flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all h-24 w-32",
                            content.brandColor === theme.primary && content.accentColor === theme.accent
                              ? "bg-brand-primary border-brand-primary shadow-lg shadow-brand-primary/20"
                              : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"
                          )}
                        >
                          <div className="flex gap-1 w-full h-8 rounded-lg overflow-hidden border border-white/20">
                            <div className="flex-1" style={{ backgroundColor: theme.primary }} />
                            <div className="w-4" style={{ backgroundColor: theme.accent }} />
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold text-center leading-tight line-clamp-2",
                            content.brandColor === theme.primary && content.accentColor === theme.accent
                              ? "text-white"
                              : "text-slate-600"
                          )}>
                            {theme.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Hero Section Edit */}
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200/60 space-y-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-slate-900 line-clamp-1">Hero Section CMS</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Hero Title</label>
                        <textarea 
                          className="w-full p-6 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-primary/10 text-slate-800 font-medium"
                          rows={2}
                          value={content.hero.title}
                          onChange={(e) => updateContent('hero.title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Hero Description</label>
                        <textarea 
                          className="w-full p-6 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-primary/10 text-slate-800 text-sm font-medium leading-relaxed"
                          rows={4}
                          value={content.hero.description}
                          onChange={(e) => updateContent('hero.description', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* About Section Edit */}
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200/60 space-y-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent">
                        <Heart className="w-6 h-6" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-slate-900">About Section CMS</h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Section Title</label>
                        <input 
                          className="w-full p-6 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-primary/10 text-slate-800 font-medium"
                          value={content.about.title}
                          onChange={(e) => updateContent('about.title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Footer Quote</label>
                        <textarea 
                          className="w-full p-6 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-primary/10 text-slate-800 text-sm font-medium"
                          rows={2}
                          value={content.footer.quote}
                          onChange={(e) => updateContent('footer.quote', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-primary p-12 rounded-[3.5rem] shadow-2xl shadow-brand-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h4 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Sync Foundation Content</h4>
                    <p className="text-white/60 font-medium max-w-md">Synchronize all modifications with the public foundation terminal.</p>
                  </div>
                  <button 
                    onClick={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        const originalText = btn.innerText;
                        btn.innerText = 'Synchronizing...';
                        setTimeout(() => btn.innerText = originalText, 2000);
                    }}
                    className="px-12 py-5 bg-white text-brand-primary rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
                  >
                    Update Production Site
                  </button>
                </div>
              </motion.div>
            ) : activeTab === 'settings' ? (
               <motion.div
                key="settings"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200/60 space-y-10"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-brand-accent/10 rounded-[1.5rem] flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900">Moderator Settings</h3>
                    <p className="text-slate-400">Limited access to global preferences</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="font-bold text-slate-800">Maintenance Mode</p>
                      <p className="text-xs text-slate-400">Toggle public site availability.</p>
                    </div>
                    <div 
                      onClick={() => updateContent('settings.maintenanceMode', !content.settings?.maintenanceMode)}
                      className={cn(
                        "w-12 h-6 rounded-full relative cursor-pointer transition-colors",
                        content.settings?.maintenanceMode ? "bg-red-500" : "bg-slate-200"
                      )}
                    >
                      <motion.div 
                        animate={{ x: content.settings?.maintenanceMode ? 24 : 0 }}
                        className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
