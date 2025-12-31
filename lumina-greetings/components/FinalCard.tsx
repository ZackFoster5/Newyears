import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GeneratedContent } from '../types';
import { Star } from 'lucide-react';

interface FinalCardProps {
  content: GeneratedContent;
}

export const FinalCard: React.FC<FinalCardProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create snow flakes
  const [flakes] = useState(() => 
    [...Array(60)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 5 + 8, // 8-13s
      animationDelay: Math.random() * 5,
      size: Math.random() * 3 + 2, // 2-5px
      opacity: Math.random() * 0.4 + 0.3
    }))
  );

  useEffect(() => {
    // Extended fireworks display
    const duration = 8000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 100, zIndex: 20, gravity: 0.8 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      // Occasional random burst after initial duration
      if (timeLeft <= 0) {
        // Randomly trigger a small burst every few seconds indefinitely
        if (Math.random() < 0.05) {
             confetti({ ...defaults, particleCount: 50, origin: { x: Math.random(), y: Math.random() * 0.5 }, colors: ['#D4AF37', '#FFF', '#EAD69E'] });
        }
        return; 
      }

      const particleCount = 40 * (timeLeft / duration);
      
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, 
        colors: ['#D4AF37', '#F9F1D8', '#FFFFFF'],
        scalar: 1.2,
        drift: randomInRange(-0.5, 0.5)
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, 
        colors: ['#AA8C2C', '#F9F1D8', '#FFFFFF'],
        scalar: 1.2,
        drift: randomInRange(-0.5, 0.5)
      });
    }, 300);

    // Initial big burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFFFFF']
    });

    return () => clearInterval(interval);
  }, []);

  // Variants for staggering the message paragraphs
  const messageContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 2.5, // Start staggering children after headline settles
        staggerChildren: 0.6
      }
    }
  };

  const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-midnight-900 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Animated stars */}
        {[...Array(25)].map((_, i) => (
           <div 
             key={i}
             className="absolute rounded-full bg-gold-100 animate-pulse"
             style={{
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               width: `${Math.random() * 2 + 1}px`,
               height: `${Math.random() * 2 + 1}px`,
               opacity: Math.random() * 0.5 + 0.2,
               animationDuration: `${Math.random() * 4 + 3}s`,
               animationDelay: `${Math.random() * 5}s`
             }}
           />
        ))}
      </div>

      {/* Falling Snow Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {flakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-white animate-snow"
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.animationDelay}s`,
              top: '-20px' // Start slightly above viewport
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-2xl bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md border border-gold-500/20 p-8 md:p-20 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.1)] relative text-center z-20"
      >
        {/* Elegant Border Frame */}
        <div className="absolute inset-3 border border-gold-500/10 pointer-events-none rounded-sm"></div>
        <div className="absolute inset-2 border-[0.5px] border-gold-500/5 pointer-events-none rounded-sm"></div>

        {/* Corner Flourishes */}
        <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-gold-500/30 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-gold-500/30 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-gold-500/30 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-gold-500/30 rounded-br-lg"></div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
           className="mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-300 text-[10px] tracking-[0.3em] uppercase rounded-full mb-8 border border-gold-500/10">
            Happy New Year 2026
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-gold-100 leading-tight">
            {content.headline}
          </h1>
        </motion.div>

        <motion.div
          variants={messageContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 mb-12"
        >
          {content.message.split('\n').map((paragraph, idx) => (
             <motion.p 
               key={idx}
               variants={paragraphVariants}
               className="font-sans text-gray-300 leading-loose text-lg md:text-xl font-light tracking-wide"
             >
               {paragraph}
             </motion.p>
          ))}
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 6, duration: 1.5 }}
        >
          <div className="w-12 h-[1px] bg-gold-500/30 mx-auto mb-6"></div>
          <p className="font-serif text-2xl text-gold-400 italic">
            {content.signoff}
          </p>
        </motion.div>

      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 6 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-gold-500/20 z-20"
      >
        <div className="flex gap-2">
            <Star className="w-3 h-3 animate-pulse" />
            <Star className="w-4 h-4 mt-2 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Star className="w-3 h-3 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </motion.div>

    </div>
  );
};