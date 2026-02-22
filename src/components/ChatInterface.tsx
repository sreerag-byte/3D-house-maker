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
    { role: 'assistant', content: "SYSTEM_INITIALIZED: Architectural AI ready. Describe parameters for space generation." }
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
          systemInstruction: "You are a high-precision architectural AI. Provide technical, concise, and insightful architectural advice. Use technical terms. Format responses as system logs or structured data where appropriate.",
        }
      });

      const aiResponse = response.text || "ERROR: RESPONSE_NULL. RE-INITIALIZE QUERY.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "CRITICAL_ERROR: CONNECTION_INTERRUPTED." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full font-mono">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tighter">AI_ARCHITECT_v4.2</h2>
          <p className="text-[9px] text-white/20 tracking-[0.4em] uppercase">Neural_Design_Engine_Active</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] text-white/40 tracking-widest">ENCRYPTED_LINK</span>
        </div>
      </div>

      <div className="flex-1 bg-[#0A0A0B] border border-white/5 rounded-lg overflow-hidden flex flex-col mb-4 relative">
        <div className="absolute inset-0 pointer-events-none technical-grid opacity-20" />
        
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar relative z-10"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex flex-col gap-1",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "text-[8px] font-bold tracking-widest uppercase",
                    msg.role === 'assistant' ? "text-orange-500" : "text-white/40"
                  )}>
                    {msg.role === 'assistant' ? ">> ARCH_AI" : ">> USER_AUTH_01"}
                  </span>
                </div>
                <div className={cn(
                  "p-4 rounded border text-[11px] leading-relaxed max-w-[90%] font-mono",
                  msg.role === 'assistant' 
                    ? "bg-white/5 border-white/10 text-white/80" 
                    : "bg-orange-500/10 border-orange-500/20 text-orange-500"
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
              className="flex items-center gap-2 text-white/20 text-[9px] tracking-widest"
            >
              <Loader2 className="w-3 h-3 animate-spin" />
              PROCESSING_QUERY...
            </motion.div>
          )}
        </div>

        <div className="p-4 bg-[#0A0A0B] border-t border-white/5 relative z-10">
          <div className="relative flex items-center gap-3">
            <div className="absolute left-4 text-orange-500 text-[10px] font-bold tracking-widest">{">"}</div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="ENTER_COMMAND_OR_PARAMETER..."
              className="flex-1 bg-white/5 h-12 pl-10 pr-6 rounded border border-white/5 text-[11px] font-mono text-white placeholder:text-white/10 focus:outline-none focus:border-orange-500/30 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="h-12 px-6 bg-orange-500 text-black text-[10px] font-bold tracking-widest rounded disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
              EXECUTE
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {[
          "GENERATE_MODERN_MINIMALIST",
          "ANALYZE_STRUCTURAL_INTEGRITY",
          "OPTIMIZE_LIGHT_FLOW",
          "EXPORT_BIM_DATA"
        ].map((suggestion, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
            onClick={() => setInput(suggestion)}
            className="px-4 py-2 bg-white/5 border border-white/5 text-[9px] font-bold text-white/40 uppercase tracking-widest rounded transition-all whitespace-nowrap"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
