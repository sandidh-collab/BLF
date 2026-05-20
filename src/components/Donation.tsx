import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Landmark, Heart, CheckCircle2, Copy, X, ChevronRight, ShieldCheck } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';

const methods = [
  { name: 'bKash', icon: Smartphone, color: 'bg-[#D12053]', number: '+8801700000000', type: 'Personal' },
  { name: 'Nagad', icon: Smartphone, color: 'bg-[#E11F26]', number: '+8801800000000', type: 'Personal' },
  { name: 'Bank Transfer', icon: Landmark, color: 'bg-brand-primary', number: '123-456-789', type: 'Savings' },
];

export default function Donation() {
  const { addDonation, content } = useCMS();
  const [view, setView] = useState<'donate' | 'track'>('donate');
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);
  const [donorName, setDonorName] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Tracking state
  const [searchTxnId, setSearchTxnId] = useState('');
  const [trackResult, setTrackResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedMethod.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId || !donorName || !amount) return;
    
    addDonation({
      amount: `৳${amount}`,
      from: donorName,
      txnId: transactionId
    });
    
    setIsSubmitted(true);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const result = content.donations.find(d => d.txnId.toLowerCase() === searchTxnId.toLowerCase());
    setTrackResult(result || null);
    setHasSearched(true);
  };

  if (isSubmitted) {
    return (
      <section className="py-24 bg-brand-warm/30 min-h-[750px] flex items-center justify-center overflow-hidden relative">
        {/* Animated background elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white p-1 md:p-2 rounded-[4rem] shadow-2xl max-w-lg mx-6 relative z-10 overflow-hidden"
        >
          <div className="bg-slate-50 p-12 md:p-16 rounded-[3.5rem] border border-white text-center relative overflow-hidden group">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full translate-x-1/2 translate-y-1/2" />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-28 h-28 bg-brand-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-primary/20 relative overflow-hidden"
            >
              <Heart className="text-white w-12 h-12 relative z-10 fill-white" />
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.4, 0]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 bg-brand-accent"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-white/20 rounded-[2.5rem]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-primary mb-2">Thank You!</h2>
              <div className="w-20 h-1.5 bg-brand-accent mx-auto mb-10 rounded-full" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-8 text-slate-600 leading-relaxed"
            >
              <p className="text-xl font-bold tracking-tight">
                Dear <span className="text-brand-primary font-black uppercase tracking-wider">{donorName}</span>, your contribution is making a real difference in people's lives.
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm inline-block w-full relative overflow-hidden"
              >
                {/* Floating Sparles */}
                <motion.div 
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="absolute top-4 left-4"
                >
                  <Heart className="w-4 h-4 text-brand-accent fill-brand-accent" />
                </motion.div>
                <motion.div 
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
                  className="absolute bottom-4 right-10"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                </motion.div>

                <div className="absolute top-0 right-0 p-4">
                  <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }}>
                    <ShieldCheck className="w-6 h-6 text-emerald-500/20" />
                  </motion.div>
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Verification Amount</div>
                <div className="text-5xl font-display font-bold text-emerald-600">৳{amount}</div>
                <div className="mt-4 flex items-center justify-center gap-2 bg-slate-50 py-2 px-4 rounded-xl border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-400 font-mono tracking-widest">{transactionId}</span>
                </div>
              </motion.div>

              <p className="text-sm text-slate-400 font-medium">
                Thank you for trusting Begum Lutfennahar Foundation. We will notify you once the verification is complete.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold hover:shadow-2xl transition-all shadow-xl shadow-brand-primary/10 active:scale-95 flex items-center justify-center gap-2 group/btn"
              >
                <span>Back to Home</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <p className="text-[9px] font-black text-brand-accent uppercase tracking-[0.3em] mt-8 select-none opacity-40">
                Lutfennahar Humanity Protocol
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="donate" className="py-24 bg-brand-warm/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          layout
          className="glass rounded-[3rem] p-8 md:p-20 overflow-hidden relative shadow-2xl border border-white/40"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex justify-center mb-12 relative z-10">
            <div className="bg-white/50 p-1.5 rounded-2xl backdrop-blur-sm border border-brand-primary/5 flex gap-1">
              <button
                onClick={() => setView('donate')}
                className={cn(
                  "px-8 py-3 rounded-xl text-sm font-bold transition-all",
                  view === 'donate' ? "bg-brand-primary text-white shadow-lg" : "text-brand-primary hover:bg-brand-primary/5"
                )}
              >
                Donate Now
              </button>
              <button
                onClick={() => setView('track')}
                className={cn(
                  "px-8 py-3 rounded-xl text-sm font-bold transition-all",
                  view === 'track' ? "bg-brand-primary text-white shadow-lg" : "text-brand-primary hover:bg-brand-primary/5"
                )}
              >
                Track Status
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {view === 'donate' ? (
              <motion.div 
                key="donate-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid lg:grid-cols-2 gap-16 items-start relative z-10"
              >
                <div>
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                    className="inline-flex items-center gap-2 text-brand-primary font-bold tracking-widest uppercase text-xs mb-4"
                  >
                    <Heart className="w-4 h-4 fill-brand-primary" />
                    Make an impact
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-display font-medium text-brand-primary mb-8"
                  >
                    Begum Lutfennahar <br />
                    <span className="font-accent font-bold text-brand-accent tracking-tighter">Foundation</span> (BLF)
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 text-lg mb-12 leading-relaxed"
                  >
                    Your generosity provides life-saving support to those who need it most. 
                    We manually verify all transactions to ensure transparency and security.
                  </motion.p>
                  <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Arif Ahmed" 
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full py-5 px-8 rounded-2xl bg-white border border-brand-primary/10 font-bold text-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all text-xl shadow-sm" 
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Donation Amount (৳)</label>
                   <input 
                    type="number" 
                    placeholder="Enter Amount in BDT" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full py-5 px-8 rounded-2xl bg-white border border-brand-primary/10 font-bold text-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all text-xl shadow-sm" 
                  />
                  <p className="text-[10px] text-slate-400 mt-2 ml-2 font-medium italic">* Enter amount in BDT (৳)</p>
                </motion.div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-primary/5"
            >
              <h3 className="text-2xl font-display font-bold text-brand-primary mb-8 flex items-center justify-between">
                Payment Info
                <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-[10px] bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-widest"
                >
                  Safe & Manual
                </motion.span>
              </h3>
              
              <div className="space-y-3 mb-8">
                {methods.map((method, i) => (
                  <motion.button
                    key={method.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    whileHover={{ x: 10, backgroundColor: "rgba(var(--brand-primary), 0.02)" }}
                    onClick={() => setSelectedMethod(method)}
                    className={cn(
                      "w-full p-5 rounded-2xl border flex items-center justify-between transition-all group",
                      selectedMethod.name === method.name ? "border-brand-primary bg-brand-primary/5 ring-4 ring-brand-primary/5" : "border-slate-100 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${method.color} rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110`}>
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-slate-800 block leading-none mb-1">{method.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">{method.type}</span>
                      </div>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center",
                      selectedMethod.name === method.name ? "border-brand-primary bg-brand-primary" : "border-slate-200"
                    )}>
                      {selectedMethod.name === method.name && (
                        <motion.div 
                          layoutId="radio-dot"
                          className="w-2 h-2 bg-white rounded-full" 
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedMethod.name}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100 relative overflow-hidden"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute -right-4 -top-4 opacity-[0.03]"
                  >
                    <selectedMethod.icon size={80} />
                  </motion.div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Transfer to this Number</p>
                  <div className="flex items-center justify-center gap-4 relative z-10">
                    <span className="text-2xl font-display font-bold text-brand-primary tracking-tight">{selectedMethod.number}</span>
                    <motion.button 
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopy}
                      className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-brand-primary shadow-sm"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          </motion.div>
                        ) : (
                          <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Copy className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Transaction ID (Required)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 5TRX9821" 
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full py-4 px-6 rounded-xl bg-slate-50 border-none font-mono font-bold text-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none shadow-inner" 
                  />
                </motion.div>
                
                <motion.button 
                  type="submit"
                  disabled={!transactionId || !donorName || !amount}
                  whileHover={{ scale: 1.02, backgroundColor: "#065f46" }}
                  whileTap={{ scale: 0.98 }}
                  animate={(transactionId && donorName && amount) ? {
                    boxShadow: ["0 0 0 rgba(10, 110, 92, 0)", "0 0 20px rgba(10, 110, 92, 0.4)", "0 0 0 rgba(10, 110, 92, 0)"]
                  } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg hover:shadow-2xl active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-xl shadow-brand-primary/20"
                >
                  Send Verification Request
                </motion.button>
              </form>
              
              <div className="text-center text-[10px] text-gray-400 mt-6 flex items-center justify-center gap-2 uppercase font-bold tracking-widest">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Heart className="w-3 h-3 text-brand-accent fill-brand-accent" />
                </motion.div>
                Verified manually by BLF Team
              </div>
            </motion.div>
          </motion.div>
        ) : (
              <motion.div 
                key="track-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="mb-12">
                  <h2 className="text-4xl font-display font-bold text-brand-primary mb-4">Track Donation</h2>
                  <p className="text-gray-500">Enter your Transaction ID to see the current status of your donation.</p>
                </div>

                <form onSubmit={handleTrack} className="mb-12 relative flex max-w-lg mx-auto">
                  <input 
                    type="text" 
                    placeholder="Enter Transaction ID (e.g. TXN-101)" 
                    value={searchTxnId}
                    onChange={(e) => setSearchTxnId(e.target.value)}
                    className="w-full py-5 px-8 rounded-l-2xl bg-white border border-brand-primary/10 font-mono font-bold text-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 shadow-sm"
                  />
                  <button 
                    type="submit"
                    className="bg-brand-primary text-white px-8 rounded-r-2xl font-bold hover:bg-brand-accent transition-all shrink-0"
                  >
                    Track
                  </button>
                </form>

                <AnimatePresence mode="wait">
                  {hasSearched && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-brand-primary/5 text-left"
                    >
                      {trackResult ? (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Donor Name</p>
                              <p className="text-xl font-bold text-brand-primary">{trackResult.from}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                              <span className={cn(
                                "px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase",
                                trackResult.status === 'Success' ? "bg-emerald-50 text-emerald-600" : 
                                trackResult.status === 'Processing' ? "bg-amber-50 text-amber-600" : 
                                "bg-red-50 text-red-600"
                              )}>
                                {trackResult.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                              <p className="text-2xl font-display font-bold text-emerald-600">{trackResult.amount}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                              <p className="text-slate-600 font-bold">{trackResult.date}</p>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Official Message</p>
                            <p className="text-sm text-slate-600 italic">
                              {trackResult.status === 'Success' ? "Verification complete. Your contribution has been added to our impact funds. Thank you!" : 
                               trackResult.status === 'Processing' ? "Our team is currently verifying this transaction with the provider. Please check back later." : 
                               "The transaction ID provided could not be verified. Please contact support or try again."}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="text-red-500 w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-bold text-brand-primary mb-2">No Record Found</h3>
                          <p className="text-gray-500 text-sm">We couldn't find any donation associated with that Transaction ID. Please double check and try again.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

import { cn } from '../lib/utils';
