'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function Envelope() {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpening(true);
    setTimeout(() => {
      router.push("/home");
    }, 1100);
  };

  return (
    <motion.main
      initial={{ opacity: 1 }}
      animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full overflow-hidden bg-[#FAF9F6] flex items-center justify-center cursor-pointer"
      onClick={handleOpenInvitation}
    >
      {/* Background Texture - Handmade Paper Feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={isOpening ? { y: -80, opacity: 0, scale: 1.05 } : { y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[88%] max-w-[480px] aspect-[1.4/1]"
      >
        {/* Main Envelope Body */}
        <div className="absolute inset-0 bg-white shadow-[0_40px_100px_rgba(58,77,57,0.06)] border border-[#E5D3B3]/30 rounded-sm" />

        {/* --- THE REFINED TOP SECTION (Names) --- */}
        <div className="absolute top-0 left-0 right-0 h-1/2 flex items-center justify-center">
          <motion.div 
            animate={isOpening ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="font-honey text-5xl md:text-6xl text-[#3A4D39] leading-tight">
              Sarah & Michael
            </h1>
            <div className="flex items-center justify-center gap-3 mt-2 opacity-40">
          
            </div>
          </motion.div>
        </div>

        {/* --- THE LOWER FLAP (The Pocket) --- */}
        <div 
          className="absolute inset-0 z-20 border-t border-white/40 shadow-[-10px_-10px_30px_rgba(0,0,0,0.02)]"
          style={{ 
            clipPath: 'polygon(0 50%, 50% 100%, 100% 50%, 100% 100%, 0 100%)', 
            background: 'linear-gradient(180deg, #FAF9F6 0%, #F5F1E8 100%)' 
          }}
        />

        {/* --- THE SIGNATURE WAX SEAL --- */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative"
          >
            <div className="w-14 h-14 bg-[#3A4D39] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#3A4D39]">
              <Heart size={20} className="text-[#FAF9F6] opacity-90" fill="currentColor" />
            </div>
            
            {/* Pulsing Hint Around Seal */}
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute inset-0 bg-[#3A4D39] rounded-full -z-10"
            />
          </motion.div>
        </div>

        {/* Tiny Date at the Bottom */}
        <div className="absolute bottom-6 left-0 right-0 text-center z-40">
           <p className="text-[9px] tracking-[0.3em] uppercase text-[#3A4D39] opacity-30 font-bold">
             12 . 12 . 26
           </p>
        </div>
      </motion.div>

      {/* Modern Interaction Instruction */}
      <motion.div
        animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#3A4D39] font-bold">
          Open Invitation
        </p>
        <motion.div 
          animate={{ height: [40, 10, 40] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-10 bg-gradient-to-b from-[#3A4D39] to-transparent" 
        />
      </motion.div>
    </motion.main>
  );
}