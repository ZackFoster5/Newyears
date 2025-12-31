import React, { useState } from 'react';
import { Intro } from './components/Intro';
import { FinalCard } from './components/FinalCard';
import { AppState, GeneratedContent } from './types';
import { generateGreetingMessage } from './services/gemini';
import { AnimatePresence, motion } from 'framer-motion';
import { Stars } from 'lucide-react';

// --- CONFIGURATION ---
// Change this to your best friend's name!
const RECIPIENT_NAME = "Yuki"; 
// ---------------------

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleStart = async () => {
    setAppState(AppState.GENERATING);
    try {
      // Simulate a small delay for dramatic effect if response is instant
      const [content] = await Promise.all([
        generateGreetingMessage(RECIPIENT_NAME),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);
      setGeneratedContent(content);
      setAppState(AppState.CARD);
    } catch (error) {
      console.error("Failed to generate content", error);
      setAppState(AppState.CARD);
    }
  };

  return (
    <div className="antialiased bg-midnight-900 text-gold-100 min-h-screen">
      <AnimatePresence mode="wait">
        
        {appState === AppState.INTRO && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
          >
            <Intro onStart={handleStart} recipientName={RECIPIENT_NAME} />
          </motion.div>
        )}

        {appState === AppState.GENERATING && (
           <motion.div
           key="generating"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           className="min-h-screen flex flex-col items-center justify-center"
         >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
                <Stars className="w-12 h-12 text-gold-500/50" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 font-serif text-xl text-gold-200 tracking-widest uppercase"
            >
              Unfolding your surprise...
            </motion.p>
          </motion.div>
        )}

        {appState === AppState.CARD && generatedContent && (
           <motion.div
           key="card"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.5 }}
         >
            <FinalCard content={generatedContent} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;