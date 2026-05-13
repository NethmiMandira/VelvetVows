'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Globe, Infinity, Sparkles, Heart, Music2, Pause, Play, Calendar, Clock, MapPin } from 'lucide-react';

export default function NextGenWedding() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    adults: 0,
    children: 0,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Parallax effects for deep single-column layering
  const heroY = useTransform(smoothProgress, [0, 1], [0, 500]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 1.15]);
  const opacityFade = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date('2026-12-15T18:00:00').getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          mins: Math.floor((diff / 60000) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.5;
    audio.loop = true;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch {
        setIsMusicPlaying(false);
      }
    };

    playAudio();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'adults' || name === 'children' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('RSVP Submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', attendance: '', adults: 0, children: 0, message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  };

  return (
    <main className="bg-[#FAF9F6] text-[#2D2926] selection:bg-[#E5D3B3] overflow-x-hidden">
      <audio ref={audioRef} src="/audio.mpeg" preload="auto" />

{/* --- AUDIO TOGGLE: THE PRESS BUTTON --- */}
      <motion.button
        type="button"
        onClick={toggleMusic}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ y: -2, backgroundColor: "#fff" }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 right-4 md:top-8 md:right-8 z-50 flex items-center gap-2 md:gap-4 rounded-full border border-[#E5D3B3] bg-[#FAF9F6] p-1.5 md:p-2 md:pr-6 pr-3 text-[#3A4D39] shadow-[0_10px_40px_rgba(58,77,57,0.12)] backdrop-blur-md transition-all group"
      >
        {/* Modern Vintage Icon Circle */}
        <span className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-[#3A4D39] text-[#FAF9F6] shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]">
          {isMusicPlaying ? (
            <Pause size={16} strokeWidth={2.5} />
          ) : (
            <Play size={16} fill="currentColor" className="ml-1" />
          )}
        </span>

        <div className="hidden sm:flex flex-col items-start">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#A67C52] leading-none mb-1.5">
            {isMusicPlaying ? 'On Air' : 'Silent'}
          </span>
          
          {/* Refined Audio Visualizer */}
          <div className="flex items-end gap-[3px] h-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.span
                key={i}
                animate={isMusicPlaying ? {
                  height: [4, 12, 6, 10, 4][i - 1],
                } : { height: 2 }}
                transition={isMusicPlaying ? {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: "easeInOut"
                } : {}}
                className="w-[2px] rounded-full bg-[#3A4D39]/40"
              />
            ))}
          </div>
        </div>
      </motion.button>
      
     {/* --- SECTION 1: THE MATTE FILM COVER --- */}
      <section className="relative min-h-[100svh] md:h-screen flex items-center justify-center overflow-hidden bg-[#FAF9F6] px-4 md:px-0">
        <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="/cpl16.jpg" 
            alt="Sarah & Michael"
            fill
            className="object-cover opacity-95 grayscale-[10%] contrast-[1.05]"
            priority
          />
          {/* Subtle Green Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#3A4D39]/20 via-transparent to-[#FAF9F6]" />
          {/* Bottom Soft Wash */}
          <div className="absolute inset-0 shadow-[inset_0_-150px_120px_-50px_#FAF9F6]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-screen-2xl">
          {/* Hero image only */}
        </div>
      </section>

      {/* --- THE GALLERY HEADER --- */}
      <section className="w-full pt-12 md:pt-16 pb-16 md:pb-24 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto text-center px-4 md:px-6 relative">
          {/* Floating Ornamental Line */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            className="h-[1px] bg-[#E5D3B3] mx-auto mb-10"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] tracking-[0.8em] uppercase text-[#A67C52] mb-6 font-bold block">
              The Symphony of Two Hearts
            </span>
            
            <h1 className="font-honey text-4xl sm:text-6xl md:text-9xl text-[#3A4D39] leading-[0.9] md:leading-[0.8] mb-4">
              Sarah & Michael
            </h1>
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-[1px] w-8 bg-[#E5D3B3]" />
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#3A4D39]/60 font-serif-modern">
                EST. 2026
              </p>
              <div className="h-[1px] w-8 bg-[#E5D3B3]" />
            </div>
          </motion.div>
        </div>
      </section>

{/* --- EDITORIAL QUOTE SECTION --- */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute inset-0 z-0 flex justify-center items-center opacity-[0.03]">
          <Heart size={400} className="text-[#3A4D39]" strokeWidth={1} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4 md:px-6"
        >
          {/* Top Decorative Line */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-[#E5D3B3]" />
            <Sparkles size={16} className="text-[#A67C52]" />
            <div className="w-12 h-[1px] bg-[#E5D3B3]" />
          </div>

          <div className="relative">
            {/* Large Stylized Quote Mark */}
            <span className="absolute -top-12 -left-4 md:-left-10 text-8xl md:text-[10rem] font-honey text-[#3A4D39]/10 leading-none select-none">
              “
            </span>

            <blockquote className="relative z-10">
              <p className="text-xl sm:text-2xl md:text-4xl text-[#3D3834] font-serif-modern italic leading-[1.5] md:leading-[1.6] tracking-tight">
                Whatever our souls are made of, <span className="text-[#3A4D39] not-italic font-honey">his and mine</span> are the same. In choosing each other, we discover a deeper version of who we are meant to become.
              </p>
              
              <footer className="mt-10">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "60px" }}
                  className="h-[2px] bg-[#C17A7A] mx-auto mb-4"
                />
                <cite className="not-italic">
                  <span className="text-[10px] uppercase tracking-[0.6em] text-[#A67C52] font-bold block mb-1">Author</span>
                  <span className="text-xl font-honey text-[#3A4D39]">Emily Brontë</span>
                </cite>
              </footer>
            </blockquote>

            {/* Large Stylized Quote Mark Bottom */}
            <span className="absolute -bottom-24 -right-4 md:-right-10 text-8xl md:text-[10rem] font-honey text-[#3A4D39]/10 leading-none select-none">
              ”
            </span>
          </div>
        </motion.div>
      </section>

{/* --- SECTION 2: THE FLOWING DETAILS (Modern Vintage) --- */}
      <section className="relative z-20 flex flex-col items-center text-center px-4 md:px-6 py-10 md:py-12">
        
        {/* Date + Countdown Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl bg-white border border-[#E5D3B3] rounded-[2rem] md:rounded-[4rem] p-6 sm:p-8 md:p-20 shadow-[0_40px_100px_rgba(58,77,57,0.05)] relative overflow-hidden"
        >
          {/* Subtle Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3A4D39]/5 rounded-bl-full" />
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.8em] text-[#A67C52] font-bold block mb-4">The Final Countdown</span>
              {/* Cursive Date */}
              <h3 className="text-4xl sm:text-5xl md:text-8xl font-honey text-[#3A4D39]">Dec 12th, 2026</h3>
            </div>

            {/* Elegant Divider */}
            <div className="flex items-center justify-center gap-6 mb-16">
              <div className="h-[1px] w-20 bg-[#E5D3B3]" />
              <Infinity className="text-[#3A4D39]/40" size={32} strokeWidth={1} />
              <div className="h-[1px] w-20 bg-[#E5D3B3]" />
            </div>

            {/* Countdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {[
                { v: timeLeft.days, l: 'Days' },
                { v: timeLeft.hours, l: 'Hours' },
                { v: timeLeft.mins, l: 'Mins' },
                { v: timeLeft.secs, l: 'Secs' }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <span className="text-4xl sm:text-5xl md:text-8xl font-serif-modern text-[#3D3834] block leading-none group-hover:text-[#3A4D39] transition-colors">
                    {String(t.v).padStart(2, '0')}
                  </span>
                  <div className="mt-4 flex flex-col items-center">
                    <div className="w-4 h-[2px] bg-[#C17A7A] mb-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#A67C52]">{t.l}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 flex flex-col items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#3A4D39", color: "#fff", borderColor: "#3A4D39" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const event = {
                    title: 'Sarah & Michael\'s Wedding',
                    date: '20261212', // Updated to Dec 12
                    startTime: '180000',
                    endTime: '230000',
                    location: 'The Glass House, Manhattan, New York'
                  };
                  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.date}T${event.startTime}Z/${event.date}T${event.endTime}Z&location=${encodeURIComponent(event.location)}`;
                  window.open(url, '_blank');
                }}
                className="text-[10px] uppercase tracking-[0.4em] px-12 py-4 border border-[#3A4D39] text-[#3A4D39] rounded-full transition-all duration-300 font-bold"
              >
                + Add to Calendar
              </motion.button>
              
              <p className="text-[9px] uppercase tracking-widest text-gray-400">Join us for the beginning of forever</p>
            </div>
          </div>
        </motion.div>
      </section>

 
{/* --- EVENT DETAILS SECTION: MODERN VINTAGE GREEN --- */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#A67C52] font-bold">The Celebration</span>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-honey text-[#3D3834] mt-4">Join Us</h2>
            <div className="mt-6 flex justify-center gap-1">
              <div className="w-12 h-[1px] bg-[#E5D3B3]" />
              <Heart size={12} className="text-[#C17A7A] -mt-[5px]" />
              <div className="w-12 h-[1px] bg-[#E5D3B3]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden bg-[#3A4D39] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-24 shadow-2xl border border-[#4A5D49]"
          >
            {/* Background Decorative Element */}
            <div className="absolute top-[-10%] right-[-5%] text-[15rem] font-honey text-white/5 pointer-events-none select-none">
              S&M
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              
              {/* Date Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center md:border-r border-white/10 px-2 md:px-4"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 rounded-full mb-8 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Calendar className="text-[#E5D3B3]" size={24} />
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3]/60 mb-4 font-bold">The Date</h3>
                {/* Cursive Date */}
                <p className="text-4xl sm:text-5xl md:text-6xl font-honey text-[#E5D3B3] leading-tight">
                  Dec 12th
                </p>
                <p className="text-sm text-white/60 mt-4 font-serif-modern tracking-widest uppercase">Saturday Night</p>
              </motion.div>

              {/* Time Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center md:border-r border-white/10 px-2 md:px-4"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 rounded-full mb-8 border border-white/10">
                  <Clock className="text-[#E5D3B3]" size={24} />
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3]/60 mb-4 font-bold">The Hours</h3>
                <p className="text-3xl sm:text-4xl md:text-5xl font-serif-modern text-[#E5D3B3]">
                  18:00
                </p>
                <p className="text-sm text-white/60 mt-4 font-serif-modern tracking-widest uppercase">Until 11:00 PM EST</p>
              </motion.div>

              {/* Venue Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center px-2 md:px-4"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 rounded-full mb-8 border border-white/10">
                  <MapPin className="text-[#E5D3B3]" size={24} />
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3]/60 mb-4 font-bold">The Venue</h3>
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif-modern text-[#E5D3B3]">
                  The Glass House
                </p>
                <p className="text-sm text-white/60 mt-4 font-serif-modern tracking-widest uppercase mb-8">Manhattan, NY</p>
                
                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: "#E5D3B3", color: "#3A4D39" }}
                  className="inline-block px-8 py-3 border border-[#E5D3B3] text-[#E5D3B3] rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all"
                >
                  Explore Map
                </motion.a>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

{/* --- WEDDING DAY PROGRAM: THE SYMPHONY --- */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white relative overflow-hidden">
        {/* Background Decorative Text */}
        <div className="hidden md:block absolute top-10 left-10 text-[12rem] font-honey opacity-[0.02] select-none pointer-events-none text-[#3A4D39]">
          The Day
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <span className="text-[10px] uppercase tracking-[0.8em] text-[#A67C52] font-bold">The Itinerary</span>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-honey text-[#3A4D39] mt-4">Wedding Program</h2>
            <div className="mt-8 flex justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E5D3B3]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#3A4D39]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E5D3B3]" />
            </div>
          </motion.div>

          <div className="relative">
            {/* The Vertical Timeline Thread */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#E5D3B3] to-transparent" />

            <div className="space-y-24">
              {[
                { time: '18:00', title: 'Cocktail Hour', desc: 'Welcome reception & garden lounge with live jazz quartet', side: 'left' },
                { time: '19:00', title: 'The Ceremony', desc: 'Exchange of vows in the Glass Pavilion', side: 'right' },
                { time: '19:45', title: 'Dinner & Toasts', desc: 'A curated multi-course seasonal menu & heartfelt words', side: 'left' },
                { time: '21:00', title: 'Celebration', desc: 'Dancing, dessert bar & late night revelry', side: 'right' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-center justify-start md:justify-between w-full ${
                    item.side === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* The Node Dot */}
                  <div className="absolute left-0 md:left-1/2 md:-ml-2.5 w-10 h-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#3A4D39] ring-8 ring-white shadow-sm" />
                  </div>

                  {/* Content Box */}
                  <div className="ml-12 md:ml-0 md:w-[42%] text-left md:text-right group">
                    <div className={`${item.side === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="text-xs font-bold tracking-[0.4em] text-[#C17A7A] block mb-2">{item.time}</span>
                      <h4 className="text-3xl font-serif-modern text-[#3D3834] group-hover:text-[#3A4D39] transition-colors">{item.title}</h4>
                      <p className="text-sm text-[#6b6358] mt-3 leading-relaxed max-w-xs md:max-w-none inline-block">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for Desktop Grid */}
                  <div className="hidden md:block w-[42%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* --- GUEST RESPONSE FORM: DIGITAL STATIONERY --- */}
      <section className="py-20 md:py-40 px-4 md:px-6 relative overflow-hidden bg-[#FAF9F6]">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#3A4D39]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C17A7A]/5 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-honey text-[#3A4D39] mb-4">RSVP</h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#A67C52] font-bold">Kindly respond by November 1st</p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white border border-[#E5D3B3] rounded-[3rem] shadow-xl"
            >
              <Heart size={48} className="mx-auto mb-6 text-[#C17A7A] fill-[#C17A7A]/10" />
              <h3 className="text-4xl font-honey text-[#3A4D39] mb-4">Thank You</h3>
              <p className="text-serif-modern text-[#6b6358]">We have received your response.<br/>We can't wait to celebrate with you!</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="bg-white border border-[#E5D3B3] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 shadow-[0_30px_100px_rgba(58,77,57,0.08)] space-y-10 md:space-y-12"
            >
              {/* Name Input - Modern Minimalist */}
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.4em] text-[#3A4D39] font-bold mb-4">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-0 py-4 border-b border-[#E5D3B3] bg-transparent text-lg md:text-xl font-serif-modern text-[#3D3834] placeholder:text-[#E5D3B3] focus:outline-none focus:border-[#3A4D39] transition-all"
                />
              </div>

              {/* Attendance Selection - Editorial Style */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.4em] text-[#3A4D39] font-bold mb-6 text-center">
                  Will You Join Us?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'yes', label: 'Happily Attend' },
                    { id: 'no', label: 'Regretfully Decline' }
                  ].map((option) => (
                    <label key={option.id} className="cursor-pointer group">
                      <input
                        type="radio"
                        name="attendance"
                        value={option.id}
                        checked={formData.attendance === option.id}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className={`py-5 px-8 rounded-2xl border-2 text-center transition-all duration-300 font-serif-modern text-lg ${
                        formData.attendance === option.id 
                        ? 'bg-[#3A4D39] border-[#3A4D39] text-white shadow-lg' 
                        : 'bg-white border-[#E5D3B3] text-[#3D3834] group-hover:border-[#3A4D39]'
                      }`}>
                        {option.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guest Count - Refined Counters */}
              {formData.attendance === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-2 gap-6 md:gap-10 pt-4"
                >
                  {['adults', 'children'].map((type) => (
                    <div key={type} className="text-center">
                      <label className="block text-[9px] uppercase tracking-[0.4em] text-[#A67C52] font-bold mb-4">{type}</label>
                      <div className="flex items-center justify-between border-b border-[#E5D3B3] pb-4">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, [type]: Math.max(0, (prev[type as keyof typeof prev] as number) - 1) }))}
                          className="w-10 h-10 flex items-center justify-center text-2xl text-[#3A4D39] hover:bg-[#3A4D39]/5 rounded-full transition-all"
                        >
                          －
                        </button>
                        <span className="text-3xl font-serif-modern text-[#3D3834]">
                          {formData[type as keyof typeof formData]}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, [type]: (prev[type as keyof typeof prev] as number) + 1 }))}
                          className="w-10 h-10 flex items-center justify-center text-2xl text-[#3A4D39] hover:bg-[#3A4D39]/5 rounded-full transition-all"
                        >
                          ＋
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Message Box - Large Typography */}
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.4em] text-[#3A4D39] font-bold mb-4">
                  Note for the Couple
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Dietary requests or a warm wish..."
                  rows={2}
                  className="w-full px-0 py-4 border-b border-[#E5D3B3] bg-transparent text-lg font-serif-modern text-[#3D3834] placeholder:text-[#E5D3B3] focus:outline-none focus:border-[#3A4D39] transition-all resize-none"
                />
              </div>

              {/* Submit Button - Vintage Green Gradient */}
              <motion.button
                type="submit"
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(58,77,57,0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 bg-[#3A4D39] text-white rounded-full font-bold uppercase tracking-[0.6em] text-[10px] shadow-xl transition-all"
              >
                Confirm Attendance
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>

      {/* --- FOOTER: THE SIGNATURE --- */}
      <footer className="py-20 md:py-32 bg-white relative">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Decorative Divider */}
          <div className="flex justify-center items-center gap-6 opacity-30">
            <div className="w-16 h-[1px] bg-[#3A4D39]" />
            <Heart size={14} className="text-[#3A4D39]" strokeWidth={1} />
            <div className="w-16 h-[1px] bg-[#3A4D39]" />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-6"
          >
            {/* Main Signature Logo */}
            <h2 className="font-honey text-4xl sm:text-5xl md:text-8xl text-[#3A4D39]">
              Sarah & Michael
            </h2>
            
            <div className="space-y-2">
              <p className="text-[10px] tracking-[1.2em] uppercase text-[#A67C52] font-bold pl-[1.2em]">
                Forever & Always
              </p>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gray-300">
                12 . 12 . 2026 — NYC
              </p>
            </div>
          </motion.div>

          

          {/* Credits */}
          <div className="pt-12">
            <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400">
              Made with love for our family & friends
            </p>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#3A4D39]/5 to-transparent" />
      </footer>
    </main>
  );
}