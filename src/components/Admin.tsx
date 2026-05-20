import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Heart, MessageSquare, 
  Settings, LogOut, TrendingUp, Banknote, 
  ChevronRight, Calendar, Search, Bell, Lightbulb, X,
  Camera, Plus, Trash2, ShieldCheck, Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

import { useCMS } from '../contexts/CMSContext';
import { THEME_PRESETS } from '../constants';

export default function Admin() {
  const { content, updateContent, updateDonationStatus } = useCMS();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  if (false) { // Login screen disabled as requested
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-accent/20">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-display font-bold text-slate-900">Admin Secure Login</h1>
            <p className="text-slate-500 text-sm mt-2">Restricted Access - High Level Clearance</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Official Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all"
                placeholder="admin@foundation.org"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
            <button type="submit" className="w-full btn-primary py-4 rounded-2xl group">
              Unlock Terminal
              <Zap className="w-5 h-5 group-hover:fill-current" />
            </button>
          </form>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full mt-6 text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors"
          >
            ← Back to Foundation Site
          </button>
        </motion.div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingStat, setIsEditingStat] = useState<number | null>(null);
  const [isCmsSaving, setIsCmsSaving] = useState(false);
  
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'foundation.admin@lutfennahar.org',
    image: 'https://i.pravatar.cc/100?u=admin'
  });
  
  const navigate = useNavigate();

  const [dynamicStats, setDynamicStats] = useState([
    { label: 'Total Donations', value: '৳124,500', icon: Banknote, trend: '+12%', color: 'emerald' },
    { label: 'Success Stories', value: '45', icon: Heart, trend: '+2', color: 'rose' },
    { label: 'Inquiries', value: '12', icon: MessageSquare, trend: '-3%', color: 'amber' },
  ]);

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

  const handleStatEdit = (index: number, newValue: string) => {
    const newStats = [...dynamicStats];
    newStats[index].value = newValue;
    setDynamicStats(newStats);
    setIsEditingStat(null);
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
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <Heart className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight block text-brand-primary">ROOT PANEL</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Foundation OS v1.0</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 mt-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'ideas', label: 'Idea Box', icon: Lightbulb },
            { id: 'donations', label: 'Donations', icon: Banknote },
            { id: 'milestones', label: 'Milestones', icon: Calendar },
            { id: 'governingBody', label: 'Governing Body', icon: ShieldCheck },
            { id: 'stories', label: 'Impact Stories', icon: Heart },
            { id: 'content', label: 'Content CMS', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-semibold transition-all group",
                activeTab === item.id 
                  ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-[1.02]" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-brand-primary")} />
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
            Return to Site
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Profile Edit Overlay */}
        <AnimatePresence>
          {isEditingProfile && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-white shadow-2xl flex flex-col"
            >
              <div className="p-10 border-b flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-display font-bold text-brand-primary">Edit Administrator Profile</h3>
                  <p className="text-slate-400 font-medium">Update your secure access credentials</p>
                </div>
                <button 
                  onClick={() => setIsEditingProfile(false)}
                  className="w-12 h-12 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 p-10 max-w-2xl mx-auto w-full space-y-10 py-20">
                <div className="flex items-center gap-8 mb-10">
                   <div className="w-24 h-24 rounded-[2rem] overflow-hidden shadow-xl border-4 border-slate-50">
                     <img src={adminProfile.image} alt="" className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <button className="px-6 py-3 bg-brand-primary/5 text-brand-primary rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all">
                       Change Photo
                     </button>
                   </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Full Administrative Name</label>
                    <input 
                      className="w-full p-6 bg-slate-50 rounded-2xl border-none outline-none text-slate-800 font-bold"
                      value={adminProfile.name}
                      onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Registered Email Agency</label>
                    <input 
                      className="w-full p-6 bg-slate-50 rounded-2xl border-none outline-none text-slate-800 font-bold"
                      value={adminProfile.email}
                      onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditingProfile(false)}
                  className="w-full py-5 bg-brand-primary text-white rounded-[1.5rem] font-bold shadow-2xl shadow-brand-primary/30 text-sm uppercase tracking-widest hover:translate-y-[-2px] transition-all"
                >
                  Confirm Security Updates
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900 tracking-tight">Admin Overview</h1>
            <p className="text-sm text-slate-400 font-medium">Monday, 11 May 2026</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input type="text" placeholder="Search Terminal..." className="bg-transparent border-none outline-none text-sm w-48 font-medium" />
            </div>
            
            <div className="flex items-center gap-3 relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all group"
              >
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-brand-primary transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-16 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-50"
                  >
                    <h3 className="font-bold text-slate-800 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-800">Donation Alert</p>
                        <p className="text-[10px] text-slate-500">৳500 received from Anonymous</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <div 
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-12 h-12 rounded-2xl bg-brand-warm border-2 border-white overflow-hidden shadow-sm cursor-pointer hover:scale-110 transition-transform"
                >
                    <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" referrerPolicy="no-referrer" />
                </div>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-16 right-0 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-50 text-center"
                    >
                      <div className="w-16 h-16 rounded-2xl mx-auto mb-4 border-4 border-slate-50">
                         <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" className="rounded-xl" />
                      </div>
                      <h4 className="font-bold text-slate-800">{adminProfile.name}</h4>
                      <p className="text-xs text-slate-400 mb-4">{adminProfile.email}</p>
                      <button 
                        onClick={() => {
                          setIsEditingProfile(true);
                          setShowProfile(false);
                        }}
                        className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                      >
                        Edit Profile
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {dynamicStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 relative overflow-hidden group"
                    >
                      <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                          <div className={cn(
                            "p-4 rounded-2xl bg-opacity-10",
                            stat.color === 'emerald' && "bg-emerald-500 text-emerald-600",
                            stat.color === 'blue' && "bg-blue-500 text-blue-600",
                            stat.color === 'rose' && "bg-rose-500 text-rose-600",
                            stat.color === 'amber' && "bg-amber-500 text-amber-600",
                          )}>
                            <stat.icon className="w-6 h-6" />
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                            <TrendingUp className="w-3 h-3" />
                            {stat.trend}
                          </div>
                        </div>
                        <div>
                          {isEditingStat === i ? (
                            <input
                              autoFocus
                              className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-slate-900 tracking-tight mb-1 bg-slate-50 border-b-2 border-brand-primary outline-none w-full"
                              defaultValue={stat.value}
                              onBlur={(e) => handleStatEdit(i, e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleStatEdit(i, e.currentTarget.value)}
                            />
                          ) : (
                            <p 
                              onClick={() => setIsEditingStat(i)}
                              className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-slate-900 tracking-tight mb-1 cursor-edit hover:text-brand-primary transition-colors whitespace-nowrap"
                            >
                              {stat.value}
                            </p>
                          )}
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                      </div>
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-110 transition-transform duration-500" />
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                  {/* Ideas Widget */}
                  <motion.div 
                    variants={itemVariants}
                    className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 overflow-hidden p-10"
                  >
                    <div className="flex items-center justify-between mb-8">
                       <div>
                         <h3 className="font-display font-bold text-2xl text-slate-900">Recent Community Ideas</h3>
                         <p className="text-sm text-slate-400">Suggestions from the idea box</p>
                       </div>
                    </div>
                    <div className="space-y-6">
                      {content.userIdeas.map((idea) => (
                        <div key={idea.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start justify-between group">
                          <div>
                            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded-full uppercase tracking-tighter mb-2 inline-block">{idea.category}</span>
                            <p className="text-slate-800 font-medium mb-1">{idea.text}</p>
                            <p className="text-xs text-slate-400">by {idea.user} • {idea.date}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Sidebar Widgets */}
                  <div className="space-y-10">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-brand-primary p-10 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl shadow-brand-primary/30"
                    >
                      <div className="relative z-10">
                        <h3 className="text-3xl font-display font-bold mb-4 tracking-tight leading-tight">Launch Impact Campaign</h3>
                        <p className="text-white/60 mb-10 text-sm leading-relaxed font-medium">
                          Ready to start a new healthcare or education drive?
                        </p>
                        <button 
                          onClick={() => {
                            const newEvent = {
                              id: Date.now().toString(),
                              title: 'Grand Charity Gala 2026',
                              date: 'August 12, 2026',
                              location: 'Dhaka National Arena',
                              description: 'A major fundraising and awareness event featuring community leaders and success stories to drive future healthcare projects.',
                              image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800'
                            };
                            updateContent('events', [newEvent, ...content.events]);
                            setActiveTab('content');
                          }}
                          className="w-full py-5 bg-brand-accent text-white rounded-[1.5rem] font-bold shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest animate-glow"
                        >
                          Launch Event
                        </button>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-[80px]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

            ) : activeTab === 'donations' ? (
              <motion.div
                key="donations"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 overflow-hidden"
              >
                <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-display font-bold text-2xl text-slate-900">Donation History</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold">Today</button>
                    <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold">Export</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-10 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction ID</th>
                        <th className="px-10 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Donor</th>
                        <th className="px-10 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                        <th className="px-10 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="px-10 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status / Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {content.donations.map((txn) => (
                        <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-10 py-6 font-mono text-xs font-bold text-slate-400">{txn.txnId}</td>
                          <td className="px-10 py-6 font-bold text-slate-700">{txn.from}</td>
                          <td className="px-10 py-6 text-emerald-600 font-bold whitespace-nowrap min-w-[140px]">{txn.amount}</td>
                          <td className="px-10 py-6 text-xs text-slate-400 font-medium">{txn.date}</td>
                          <td className="px-10 py-6">
                            <select
                              value={txn.status}
                              onChange={(e) => updateDonationStatus(txn.id, e.target.value as any)}
                              className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border-none outline-none cursor-pointer appearance-none transition-all",
                                txn.status === 'Success' ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : 
                                txn.status === 'Processing' ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : 
                                "bg-red-50 text-red-600 hover:bg-red-100"
                              )}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Success">Success</option>
                              <option value="Failed">Failed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                    className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-primary/20"
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
                          <label className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover/img:opacity-100 rounded-[2rem] flex items-center justify-center transition-all cursor-pointer">
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
                        <TrendingUp className="w-6 h-6" />
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
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Impact Counter</label>
                          <input 
                            className="w-full p-6 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-primary/10 text-slate-800 font-medium"
                            value={content.hero.impactAmount}
                            onChange={(e) => updateContent('hero.impactAmount', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Badge Text</label>
                          <input 
                            className="w-full p-6 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-primary/10 text-slate-800 font-medium"
                            value={content.hero.badge}
                            onChange={(e) => updateContent('hero.badge', e.target.value)}
                          />
                        </div>
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
                         <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Mission Pillars</label>
                         <div className="space-y-3">
                            <input 
                              className="w-full px-6 py-4 bg-slate-50 rounded-xl border-none outline-none text-slate-800 text-sm font-medium"
                              value={content.about.pillar1}
                              onChange={(e) => updateContent('about.pillar1', e.target.value)}
                            />
                            <input 
                              className="w-full px-6 py-4 bg-slate-50 rounded-xl border-none outline-none text-slate-800 text-sm font-medium"
                              value={content.about.pillar2}
                              onChange={(e) => updateContent('about.pillar2', e.target.value)}
                            />
                            <input 
                              className="w-full px-6 py-4 bg-slate-50 rounded-xl border-none outline-none text-slate-800 text-sm font-medium"
                              value={content.about.pillar3}
                              onChange={(e) => updateContent('about.pillar3', e.target.value)}
                            />
                         </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Hero Image URL</label>
                        <div className="flex gap-2">
                          <input 
                            className="flex-1 p-6 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-primary/10 text-brand-primary text-xs font-mono truncate"
                            value={content.hero.image}
                            onChange={(e) => updateContent('hero.image', e.target.value)}
                          />
                          <label className="shrink-0 w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center cursor-pointer hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/10">
                            <Camera className="w-6 h-6" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('hero.image')} />
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">About Image 1 URL</label>
                          <div className="flex gap-2">
                            <input 
                              className="flex-1 p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/10 text-brand-primary text-[10px] font-mono truncate"
                              value={content.about.image1}
                              onChange={(e) => updateContent('about.image1', e.target.value)}
                            />
                            <label className="shrink-0 w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                              <Camera className="w-5 h-5" />
                              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('about.image1')} />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">About Image 2 URL</label>
                          <div className="flex gap-2">
                            <input 
                              className="flex-1 p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/10 text-brand-primary text-[10px] font-mono truncate"
                              value={content.about.image2}
                              onChange={(e) => updateContent('about.image2', e.target.value)}
                            />
                            <label className="shrink-0 w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                              <Camera className="w-5 h-5" />
                              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('about.image2')} />
                            </label>
                          </div>
                        </div>
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
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Footer Citation</label>
                        <input 
                          className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-slate-800 text-xs font-medium"
                          value={content.footer.citation}
                          onChange={(e) => updateContent('footer.citation', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Events Section CMS */}
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200/60 space-y-8 col-span-full">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-2xl text-slate-900">Events Management CMS</h3>
                          <p className="text-xs text-slate-400 font-medium">Schedule upcoming humanitarian activities</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          const newEvent = {
                            id: Date.now().toString(),
                            title: 'New Upcoming Event',
                            date: 'Next Month',
                            location: 'Location Name',
                            description: 'Provide details about the upcoming event.',
                            image: 'https://via.placeholder.com/800x600?text=New+Event'
                          };
                          updateContent('events', [...content.events, newEvent]);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-accent/20"
                      >
                        <Plus className="w-4 h-4" />
                        New Event
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {content.events.map((event, index) => (
                        <div key={event.id} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:border-brand-accent/20 transition-all relative">
                          <button 
                            onClick={() => {
                              const newEvents = content.events.filter(e => e.id !== event.id);
                              updateContent('events', newEvents);
                            }}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shadow-sm z-10"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          
                          <div className="grid mobile-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Event Title</label>
                                <input 
                                  className="w-full p-4 bg-white rounded-xl border border-slate-100 text-sm font-bold"
                                  value={event.title}
                                  onChange={(e) => {
                                    const newEvents = [...content.events];
                                    newEvents[index] = { ...event, title: e.target.value };
                                    updateContent('events', newEvents);
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Date</label>
                                  <input 
                                    className="w-full p-4 bg-white rounded-xl border border-slate-100 text-xs font-medium"
                                    value={event.date}
                                    onChange={(e) => {
                                      const newEvents = [...content.events];
                                      newEvents[index] = { ...event, date: e.target.value };
                                      updateContent('events', newEvents);
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</label>
                                  <input 
                                    className="w-full p-4 bg-white rounded-xl border border-slate-100 text-xs font-medium"
                                    value={event.location}
                                    onChange={(e) => {
                                      const newEvents = [...content.events];
                                      newEvents[index] = { ...event, location: e.target.value };
                                      updateContent('events', newEvents);
                                    }}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                                <textarea 
                                  className="w-full p-4 bg-white rounded-xl border border-slate-100 text-xs leading-relaxed h-24"
                                  value={event.description}
                                  onChange={(e) => {
                                    const newEvents = [...content.events];
                                    newEvents[index] = { ...event, description: e.target.value };
                                    updateContent('events', newEvents);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="aspect-video rounded-2xl overflow-hidden border border-slate-100">
                                <img src={event.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Image URL</label>
                                <div className="flex gap-2">
                                  <input 
                                    className="flex-1 p-4 bg-white rounded-xl border border-slate-100 text-[10px] font-mono truncate"
                                    value={event.image}
                                    onChange={(e) => {
                                      const newEvents = [...content.events];
                                      newEvents[index] = { ...event, image: e.target.value };
                                      updateContent('events', newEvents);
                                    }}
                                  />
                                  <label className="shrink-0 w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                                    <Camera className="w-5 h-5" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('events', index)} />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery Section CMS */}
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200/60 space-y-8 col-span-full">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                          <Camera className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-2xl text-slate-900">Gallery Portfolio CMS</h3>
                          <p className="text-xs text-slate-400 font-medium">Manage visual stories and case studies</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          const newItem = {
                            id: Date.now().toString(),
                            url: 'https://via.placeholder.com/800x600?text=New+Impact',
                            title: 'New Story',
                            description: 'Provide details about this humanitarian effort.'
                          };
                          updateContent('gallery', [...content.gallery, newItem]);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-primary/20"
                      >
                        <Plus className="w-4 h-4" />
                        Add Resource
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {content.gallery.map((item, index) => (
                        <div key={item.id} className="bg-slate-50 p-6 rounded-[2rem] space-y-4 group border border-slate-100 hover:border-brand-primary/20 transition-all relative">
                          <button 
                            onClick={() => {
                              const newGallery = content.gallery.filter(g => g.id !== item.id);
                              updateContent('gallery', newGallery);
                            }}
                            className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm group/img">
                            <img src={item.url} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-3 right-3 px-3 py-1 bg-white/80 backdrop-blur-md rounded-lg text-[10px] font-black text-brand-primary">
                              #{index + 1}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Item Heading</label>
                              <input 
                                className="w-full p-4 bg-white rounded-xl border border-slate-100 outline-none text-slate-800 text-sm font-bold focus:ring-2 focus:ring-brand-primary/10"
                                value={item.title}
                                onChange={(e) => {
                                  const newGallery = [...content.gallery];
                                  newGallery[index] = { ...item, title: e.target.value };
                                  updateContent('gallery', newGallery);
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Detailed Narrative</label>
                              <textarea 
                                className="w-full p-4 bg-white rounded-xl border border-slate-100 outline-none text-slate-800 text-xs font-medium leading-relaxed"
                                rows={4}
                                value={item.description}
                                onChange={(e) => {
                                  const newGallery = [...content.gallery];
                                  newGallery[index] = { ...item, description: e.target.value };
                                  updateContent('gallery', newGallery);
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Media URL</label>
                              <div className="flex gap-2">
                                <input 
                                  className="flex-1 p-4 bg-white rounded-xl border border-slate-100 outline-none text-brand-primary text-[10px] font-mono truncate"
                                  value={item.url}
                                  onChange={(e) => {
                                    const newGallery = [...content.gallery];
                                    newGallery[index] = { ...item, url: e.target.value };
                                    updateContent('gallery', newGallery);
                                  }}
                                />
                                <label className="shrink-0 w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                                  <Camera className="w-5 h-5" />
                                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload('gallery', index)} />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-brand-primary p-12 rounded-[3.5rem] shadow-2xl shadow-brand-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h4 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Update Foundation Content</h4>
                    <p className="text-white/60 font-medium max-w-md">Your changes will be pushed to the landing page, gallery, and cause sections instantly.</p>
                  </div>
                  <button 
                    onClick={() => {
                        setIsCmsSaving(true);
                        setTimeout(() => setIsCmsSaving(false), 2000);
                    }}
                    className="px-12 py-5 bg-white text-brand-primary rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
                  >
                    {isCmsSaving ? 'Synchronizing Site...' : 'Update Production Site'}
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
                  <div className="w-20 h-20 bg-brand-warm rounded-[1.5rem] flex items-center justify-center">
                    <Settings className="w-10 h-10 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900">Foundation Settings</h3>
                    <p className="text-slate-400">Manage global organization preferences</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="font-bold text-slate-800">Maintenance Mode</p>
                      <p className="text-xs text-slate-400">Put the front-end site into maintenance mode.</p>
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
                  <button 
                    disabled 
                    className="w-full py-4 border-2 border-slate-100 text-slate-300 rounded-2xl font-bold cursor-not-allowed"
                  >
                    Advanced Config (Locked)
                  </button>
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
                    className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60 group hover:border-brand-primary/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                          <Lightbulb className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{idea.user}</h4>
                          <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{idea.category}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">{idea.date}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6">"{idea.text}"</p>
                    <div className="flex gap-4">
                      <button className="flex-1 py-3 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all">
                        Approve Concept
                      </button>
                      <button 
                         onClick={() => {
                           const newIdeas = content.userIdeas.filter(i => i.id !== idea.id);
                           updateContent('userIdeas', newIdeas);
                         }}
                         className="px-4 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {content.userIdeas.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2.5rem]">
                    <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">No new ideas shared yet.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="other"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-40 gap-8"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center animate-pulse">
                  <Settings className="w-10 h-10 text-slate-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-display font-bold text-slate-900 mb-2 whitespace-nowrap">Section Under Maintenance</h3>
                  <p className="text-slate-400 font-medium">We're updating the {activeTab} tools for better performance.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="btn-primary"
                >
                  Back to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

