import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Loader2, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your AI design assistant. Tell me about the space you're dreaming of, and I'll help you build it!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', content: userMessage }].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are a friendly, helpful architectural assistant. Use simple, easy-to-understand language. Be encouraging and provide clear design advice. Avoid overly technical jargon unless necessary.",
        }
      });

      const aiResponse = response.text || "I'm sorry, I'm having a little trouble thinking right now. Could you try again?";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops! Something went wrong. Let's try that again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Design Chat</h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Talk to your AI assistant</p>
      </div>

      <div className="flex-1 bg-white dark:bg-[#0A0A0B] border border-gray-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col mb-4 soft-shadow">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col gap-2",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "px-6 py-4 rounded-[1.5rem] text-sm leading-relaxed max-w-[80%]",
                  msg.role === 'assistant' 
                    ? "bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-gray-200" 
                    : "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-gray-400 text-xs font-medium"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Thinking...
            </motion.div>
          )}
        </div>

        <div className="p-6 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5">
          <div className="relative flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your design..."
              className="flex-1 bg-white dark:bg-white/5 h-14 px-8 rounded-2xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all shadow-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="h-14 px-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold uppercase tracking-widest rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
            >
              Send
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {[
          "Modern home ideas",
          "How to save space",
          "Best lighting for a living room",
          "Minimalist kitchen tips"
        ].map((suggestion, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02, backgroundColor: "var(--suggestion-hover)" }}
            onClick={() => setInput(suggestion)}
            className="px-5 py-2.5 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shadow-sm"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
