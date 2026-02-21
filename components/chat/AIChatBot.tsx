// components/chat/AIChatBot.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { greetings } from "@/lib/chatbot/knowledge";
import type { ChatMessage } from "@/types";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const greeting =
        greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([
        {
          id: "greeting",
          role: "bot",
          content: `${greeting} Ben PavBot, Pavlov Gaming Hub asistanıyım. Sana nasıl yardımcı olabilirim?`,
          timestamp: new Date(),
        },
      ]);
      setHasGreeted(true);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, hasGreeted]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "bot",
          content: "Bağlantıda bir sorun oluştu. Tekrar dener misin? 🔄",
          timestamp: new Date(),
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[80] w-14 h-14 flex items-center justify-center group"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Sohbet Botu"
      >
        <div className="absolute inset-0 bg-electric-purple/90 rotate-0 group-hover:rotate-45 transition-transform duration-500" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              className="relative z-10 text-white text-lg font-light"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              className="relative z-10 text-white text-lg"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              💬
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 border border-electric-purple/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-[79] w-[calc(100vw-3rem)] max-w-[380px]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-heavy overflow-hidden flex flex-col h-[500px] max-h-[70vh]">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/[0.04] flex items-center gap-3">
                <div className="w-8 h-8 bg-electric-purple/20 rotate-45 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs font-bold text-electric-purple -rotate-45">
                    P
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-grotesk text-sm text-white/80 block">
                    PavBot
                  </span>
                  <span className="font-mono text-[0.55rem] text-neon-green/60 tracking-wider flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-neon-green animate-pulse-glow" />
                    Çevrimiçi
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-electric-purple/15 border border-electric-purple/10 ml-auto"
                          : "bg-surface-3/50 border border-white/[0.04]"
                      }`}
                    >
                      <p className="font-grotesk text-[0.8rem] text-white/70 leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                      <span className="block font-mono text-[0.5rem] text-white/15 mt-2 text-right">
                        {msg.timestamp.toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-surface-3/50 border border-white/[0.04] px-4 py-3 flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-electric-purple/40 rounded-full"
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.15,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-white/[0.04]">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Bir şey sor..."
                    className="flex-1 bg-surface-3/30 border border-white/[0.06] px-4 py-3 font-grotesk text-sm text-white/80 placeholder-white/15 focus:outline-none focus:border-electric-purple/20 transition-colors"
                    maxLength={500}
                    disabled={isTyping}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="px-4 bg-electric-purple/20 border border-electric-purple/10 text-electric-purple hover:bg-electric-purple/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-mono text-sm"
                    aria-label="Gönder"
                  >
                    ↑
                  </button>
                </div>
                <span className="block font-mono text-[0.5rem] text-white/10 mt-2 text-center tracking-widest">
                  PavBot — AI Asistan
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}