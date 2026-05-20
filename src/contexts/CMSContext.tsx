import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

interface StoryItem {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  location: string;
}

interface DonationRecord {
  id: string;
  amount: string;
  from: string;
  date: string;
  status: 'Success' | 'Processing' | 'Failed';
  txnId: string;
}

interface CMSContent {
  logo?: string;
  brandColor?: string;
  accentColor?: string;
  hero: {
    badge: string;
    title: string;
    description: string;
    image: string;
    impactAmount: string;
  };
  milestones: {
    year: string;
    title: string;
    description: string;
  }[];
  governingBody: {
    id: string;
    name: string;
    role: string;
    image: string;
  }[];
  about: {
    title: string;
    description: string;
    pillar1: string;
    pillar2: string;
    pillar3: string;
    image1: string;
    image2: string;
  };
  gallery: GalleryItem[];
  events: EventItem[];
  stories: StoryItem[];
  donations: DonationRecord[];
  userIdeas: {
    id: string;
    user: string;
    email: string;
    text: string;
    category: string;
    date: string;
  }[];
  footer: {
    quote: string;
    citation: string;
  };
  settings: {
    maintenanceMode: boolean;
    emailNotifications: boolean;
  };
}

const defaultContent: CMSContent = {
  logo: '',
  brandColor: '#1B4332',
  accentColor: '#D4AF37',
  hero: {
    badge: 'Humanity Above All',
    title: 'Every Donation Brings Hope.',
    description: 'Begum Lutfennahar Foundation (BLF) is dedicated to serving humanity through food, medical, and educational support for those in need.',
    image: 'https://picsum.photos/seed/humanity/1200/600',
    impactAmount: '10,000+',
  },
  milestones: [
    {
      year: '2023',
      title: 'Foundation Established',
      description: "Begum Lutfennahar's vision for a more compassionate world takes its first step.",
    },
    {
      year: '2024',
      title: 'First 500 Families Assisted',
      description: 'Successfully reached a major milestone in medical and food support across Dhaka.',
    },
    {
      year: '2025',
      title: 'Education Program Launched',
      description: 'Introduced the Smart Classroom initiative to provide digital education for orphanages.',
    },
    {
      year: '2026',
      title: 'Digital Empowerment',
      description: 'Launched our real-time transparency terminal to connect donors directly with the impact.',
    },
  ],
  governingBody: [
    { id: '1', name: 'Al-haj Abdul Hakim', role: 'Chairman', image: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Begum Lutfennahar', role: 'Founder & Visionary', image: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Sandid Hassan', role: 'Executive Director', image: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Dr. Shariful Islam', role: 'Medical Advisor', image: 'https://i.pravatar.cc/150?u=4' },
  ],
  about: {
    title: 'Our Mission is Humanity Above All.',
    description: 'Begum Lutfennahar Foundation (BLF) works tirelessly for the betterment of society, focusing on three core pillars of service:',
    pillar1: 'Food and medical assistance for helpless people',
    pillar2: 'Educational support for poor and talented students',
    pillar3: 'Standing beside people affected by natural disasters',
    image1: 'https://picsum.photos/seed/about1/600/800',
    image2: 'https://picsum.photos/seed/about2/600/800',
  },
  gallery: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Food Distribution',
      description: 'Monthly food support for underprivileged families in local communities.'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Medical Camp',
      description: 'Free health checkups and medicine distribution for elderly citizens.'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Education Project',
      description: 'Providing books and school supplies to talented students from low-income families.'
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Disaster Relief',
      description: 'Emergency response and rehabilitation support during flood crisis.'
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Community Building',
      description: 'Strengthening internal village bonds through infrastructure and shared resources.'
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1491446559770-3ff036b31102?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Youth Sports',
      description: 'Promoting physical health and teamwork through organized local sports events.'
    }
  ],
  events: [
    {
      id: '1',
      title: 'Winter Blanket Distribution',
      date: 'Dec 25, 2026',
      location: 'Northern Districts, Bangladesh',
      description: 'Distribution of warm clothes and blankets to the cold-affected people.',
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      title: 'Free Eye Clinic',
      date: 'Jan 15, 2027',
      location: 'BLF Community Center',
      description: 'Cataract surgeries and eye checkups for senior citizens.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ],
  stories: [
    {
      id: '1',
      name: 'Rahima Khatun',
      role: 'Mother of 3',
      content: 'The foundation provided us with food and medical supplies when we were at our lowest. They are like family to us.',
      image: 'https://i.pravatar.cc/150?u=rahima',
      location: 'Dhaka'
    },
    {
      id: '2',
      name: 'Arif Ahmed',
      role: 'Student',
      content: 'Thanks to the scholarship, I am now the first person in my family to attend university. My life has changed forever.',
      image: 'https://i.pravatar.cc/150?u=arif',
      location: 'Chittagong'
    },
    {
      id: '3',
      name: 'Tahmina Begum',
      role: 'Micro-entrepreneur',
      content: 'With the vocational training, I started my own small sewing business. Now I can support my children independently.',
      image: 'https://i.pravatar.cc/150?u=tahmina',
      location: 'Sylhet'
    },
    {
      id: '4',
      name: 'Abdul Karim',
      role: 'Farmer',
      content: "After the flood destroyed my crops, BLF provided me with seeds and financial aid to restart my farm. I'm forever grateful.",
      image: 'https://i.pravatar.cc/150?u=abdul',
      location: 'Kurigram'
    },
    {
      id: '5',
      name: 'Sumaiya Akter',
      role: 'Orphan Support Recipient',
      content: "BLF has been my guardian since I lost my parents. They've ensured my education and well-being every step of the way.",
      image: 'https://i.pravatar.cc/150?u=sumaiya',
      location: 'Barisal'
    }
  ],
  donations: [
    { id: '1', txnId: 'TXN-101', amount: '৳500', from: 'Anonymous', date: 'May 11, 2026', status: 'Success' },
    { id: '2', txnId: 'TXN-102', amount: '৳1,200', from: 'John Smith', date: 'May 10, 2026', status: 'Success' },
    { id: '3', txnId: 'TXN-103', amount: '৳50', from: 'Tahmina Ali', date: 'May 09, 2026', status: 'Processing' },
  ],
  userIdeas: [
    {
      id: '1',
      user: 'Jamil Hossain',
      email: 'jamil@example.com',
      text: 'We should start a mobile library for street children.',
      category: 'Education',
      date: 'May 10, 2026'
    },
    {
      id: '2',
      user: 'Anika Rahman',
      email: 'anika@example.com',
      text: 'Can we organize a tree plantation drive next month?',
      category: 'Environment',
      date: 'May 11, 2026'
    }
  ],
  footer: {
    quote: '"Whatever you spend in good, surely Allah knows it well."',
    citation: '— Surah Al-Baqarah',
  },
  settings: {
    maintenanceMode: false,
    emailNotifications: true,
  },
};

interface CMSContextType {
  content: CMSContent;
  updateContent: (path: string, value: any) => void;
  addUserIdea: (idea: { text: string; user: string; email: string }) => void;
  addDonation: (donation: { amount: string; from: string; txnId: string }) => void;
  updateDonationStatus: (id: string, status: 'Success' | 'Processing' | 'Failed') => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CMSContent>(() => {
    try {
      const saved = localStorage.getItem('blf_cms_content_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge saved data with default data to ensure new fields (like 'stories') are present
        return {
          ...defaultContent,
          ...parsed,
          // Deep merge objects if necessary, but for this app top-level property spread is enough
          // or we can explicitly ensure core properties
          hero: { ...defaultContent.hero, ...(parsed.hero || {}) },
          about: { ...defaultContent.about, ...(parsed.about || {}) },
          milestones: parsed.milestones || defaultContent.milestones,
          governingBody: parsed.governingBody || defaultContent.governingBody,
          footer: { ...defaultContent.footer, ...(parsed.footer || {}) },
          settings: { ...defaultContent.settings, ...(parsed.settings || {}) },
          logo: parsed.logo || defaultContent.logo,
          brandColor: parsed.brandColor || defaultContent.brandColor,
          accentColor: parsed.accentColor || defaultContent.accentColor,
        };
      }
      return defaultContent;
    } catch (e) {
      console.error("Local storage corruption:", e);
      return defaultContent;
    }
  });

  useEffect(() => {
    localStorage.setItem('blf_cms_content_v2', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    async function fetchSupabaseData() {
      // 1. Fetch donations from user's Supabase project
      try {
        const { data: dbDonations, error: donError } = await supabase
          .from('blf_donations')
          .select('*');
        
        if (!donError && dbDonations && dbDonations.length > 0) {
          const normalizedDonations = dbDonations.map((d: any) => ({
            id: d.id?.toString() || (Date.now() + Math.random()).toString(),
            txnId: d.txn_id || d.txnId || d.transaction_id || '',
            amount: d.amount || '',
            from: d.from || d.from_name || d.donor_name || 'Anonymous',
            date: d.date || new Date(d.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: d.status || 'Processing'
          }));
          setContent(prev => ({
            ...prev,
            donations: normalizedDonations
          }));
        }
      } catch (e) {
        console.warn('Supabase donations table not yet created/active. Local fallback utilized.', e);
      }

      // 2. Fetch user ideas from user's Supabase project
      try {
        const { data: dbIdeas, error: ideaError } = await supabase
          .from('blf_user_ideas')
          .select('*');

        if (!ideaError && dbIdeas && dbIdeas.length > 0) {
          const normalizedIdeas = dbIdeas.map((i: any) => ({
            id: i.id?.toString() || (Date.now() + Math.random()).toString(),
            user: i.user || i.user_name || i.name || 'Anonymous',
            email: i.email || '',
            text: i.text || i.message || i.idea || '',
            category: i.category || 'Community Idea',
            date: i.date || new Date(i.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          }));
          setContent(prev => ({
            ...prev,
            userIdeas: normalizedIdeas
          }));
        }
      } catch (e) {
        console.warn('Supabase user ideas table not yet created/active. Local fallback utilized.', e);
      }
    }
    fetchSupabaseData();
  }, []);

  const updateContent = (path: string, value: any) => {
    const keys = path.split('.');
    setContent((prev) => {
      const updateRecursive = (obj: any, ks: string[], val: any): any => {
        if (ks.length === 1) {
          return { ...obj, [ks[0]]: val };
        }
        const [first, ...rest] = ks;
        return {
          ...obj,
          [first]: updateRecursive(obj[first], rest, val)
        };
      };
      return updateRecursive(prev, keys, value);
    });
  };

  const addUserIdea = async (idea: { text: string; user: string; email: string }) => {
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const localId = Date.now().toString();

    const newIdea = {
      id: localId,
      ...idea,
      date: dateStr,
      category: 'Community Idea'
    };

    // Update local state instantly for extreme responsiveness
    setContent(prev => ({
      ...prev,
      userIdeas: [newIdea, ...prev.userIdeas]
    }));

    // Post to Supabase in the background
    try {
      await supabase.from('blf_user_ideas').insert([
        {
          user: idea.user,
          email: idea.email,
          text: idea.text,
          category: 'Community Idea',
          date: dateStr
        }
      ]);
    } catch (err) {
      console.warn('Error pushing user idea to Supabase (locally retained):', err);
    }
  };

  const addDonation = async (donation: { amount: string; from: string; txnId: string }) => {
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const localId = Date.now().toString();

    const newDonation = {
      id: localId,
      ...donation,
      date: dateStr,
      status: 'Processing' as const
    };

    // Update local state instantly
    setContent(prev => ({
      ...prev,
      donations: [newDonation, ...prev.donations]
    }));

    // Post to Supabase in the background
    try {
      await supabase.from('blf_donations').insert([
        {
          txn_id: donation.txnId,
          amount: donation.amount,
          from: donation.from,
          date: dateStr,
          status: 'Processing'
        }
      ]);
    } catch (err) {
      console.warn('Error pushing donation to Supabase (locally retained):', err);
    }
  };

  const updateDonationStatus = async (id: string, status: 'Success' | 'Processing' | 'Failed') => {
    let targetTxnId = '';
    
    // Update local state
    setContent(prev => {
      const updated = prev.donations.map(d => {
        if (d.id === id) {
          targetTxnId = d.txnId;
          return { ...d, status };
        }
        return d;
      });
      return { ...prev, donations: updated };
    });

    // Update in Supabase
    try {
      // Try to update using ID, and fallback to txn_id if necessary
      const { error: idError } = await supabase
        .from('blf_donations')
        .update({ status })
        .eq('id', id);

      if (idError && targetTxnId) {
        await supabase
          .from('blf_donations')
          .update({ status })
          .eq('txn_id', targetTxnId);
      }
    } catch (err) {
      console.warn('Error updating donation status in Supabase:', err);
    }
  };

  return (
    <CMSContext.Provider value={{ content, updateContent, addUserIdea, addDonation, updateDonationStatus }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
