import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars, Send } from 'lucide-react';
import { GreetingData } from '../types';

interface GeneratorFormProps {
  onSubmit: (data: GreetingData) => void;
  isGenerating: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onSubmit, isGenerating }) => {
  const [name, setName] = useState('');
  const [memories, setMemories] = useState('');
  const [tone, setTone] = useState<GreetingData['tone']>('heartfelt');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name, memories, tone });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-midnight-900 relative">
       {/* Background Elements */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg glass-panel p-8 md:p-12 rounded-2xl shadow-2xl z-10"
      >
        <div className="text-center mb-10">
          <Heart className="w-10 h-10 text-rose-400 mx-auto mb-4 animate-pulse" />
          <h2 className="font-serif text-3xl text-gold-100 mb-2">Tell us about her</h2>
          <p className="text-gray-400 text-sm">We'll craft a beautiful message based on your thoughts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gold-300 text-sm font-medium mb-2 uppercase tracking-wider">
              Her Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-midnight-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
              placeholder="e.g. Sophia"
            />
          </div>

          <div>
            <label htmlFor="memories" className="block text-gold-300 text-sm font-medium mb-2 uppercase tracking-wider">
              What do you cherish about her?
            </label>
            <textarea
              id="memories"
              value={memories}
              onChange={(e) => setMemories(e.target.value)}
              rows={3}
              className="w-full bg-midnight-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all resize-none"
              placeholder="e.g. She always makes me laugh, she supported me during hard times..."
            />
          </div>

          <div>
             <label className="block text-gold-300 text-sm font-medium mb-3 uppercase tracking-wider">
              Vibe
            </label>
            <div className="flex gap-3">
              {(['heartfelt', 'poetic', 'cheerful'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm transition-all border ${
                    tone === t 
                      ? 'bg-gold-500/20 border-gold-500 text-gold-100' 
                      : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !name.trim()}
            className={`w-full py-4 mt-4 rounded-xl font-serif text-lg tracking-wide flex items-center justify-center gap-2 transition-all ${
              isGenerating 
                ? 'bg-gray-800 cursor-wait text-gray-400' 
                : 'bg-gradient-to-r from-gold-700 to-gold-500 hover:from-gold-600 hover:to-gold-400 text-midnight-900 shadow-lg hover:shadow-gold-500/20'
            }`}
          >
            {isGenerating ? (
              <>
                <Stars className="w-5 h-5 animate-spin" />
                <span>Crafting Magic...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Create Greeting</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};