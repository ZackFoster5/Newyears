import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail } from 'lucide-react';

interface IntroProps {
  onStart: () => void;
  recipientName: string;
}

export const Intro: React.FC<IntroProps> = ({ onStart, recipientName }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-midnight-900">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 flex flex-col items-center max-w-lg"
      >
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 relative"
        >
          <Sparkles className="w-16 h-16 text-gold-300 opacity-80" />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
          </motion.div>
        </motion.div>

        <h1 className="font-serif text-4xl md:text-6xl text-gold-100 mb-6 tracking-wide leading-tight">
          A Message for <br/>
          <span className="text-gold-500">{recipientName}</span>
        </h1>
        
        <p className="font-sans text-lg text-gold-100/70 max-w-md mb-12 leading-relaxed tracking-wide">
          I wrote this to celebrate the New Year,<br/>and to celebrate you.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative px-10 py-4 bg-gradient-to-r from-gold-700/20 to-gold-500/20 border border-gold-500/40 text-gold-300 font-serif text-xl tracking-widest uppercase rounded-full overflow-hidden transition-all hover:border-gold-500 hover:text-gold-100 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Mail className="w-5 h-5" />
            Open Letter
          </span>
          <div className="absolute inset-0 bg-gold-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-out"></div>
        </motion.button>
      </motion.div>
    </div>
  );
};