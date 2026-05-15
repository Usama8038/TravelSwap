'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  content: string;
  time: string;
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm TravelSwap AI Assistant. I can help you with buying/selling tickets, pricing, refunds, and more. How can I help?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch {
      // Fallback response
      const msg = input.toLowerCase();
      let reply = "I'm here to help! You can ask me about buying tickets, selling tickets, pricing, refunds, or security.";
      if (msg.includes('sell')) reply = 'To sell: Go to Seller Dashboard → List New Ticket → Fill details → Submit!';
      else if (msg.includes('buy')) reply = 'To buy: Search routes → Filter → Check seller ratings → Buy Now!';
      else if (msg.includes('refund')) reply = 'Refunds process in 5-7 business days. Raise a dispute from your order page.';
      else if (msg.includes('price')) reply = 'We charge 5% platform fee. Our AI suggests optimal prices for quick sales!';
      setMessages(prev => [...prev, { role: 'bot', content: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-bg text-white shadow-lg z-50 flex items-center justify-center glow">
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden shadow-2xl z-50"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            {/* Header */}
            <div className="gradient-bg px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">TravelSwap AI</p>
                  <p className="text-xs opacity-80">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3" style={{ background: 'var(--muted-bg)' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === 'user' ? 'rounded-br-md text-white' : 'rounded-bl-md'}`}
                    style={msg.role === 'user'
                      ? { background: 'var(--gradient-primary)' }
                      : { background: 'var(--card-bg)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}>
                    {msg.content}
                    <p className="text-[10px] mt-1 opacity-60">{msg.time}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: 'var(--muted)' }}
                          animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 flex gap-2" style={{ borderTop: '1px solid var(--card-border)' }}>
              <input
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} />
              <button onClick={sendMessage}
                className="w-10 h-10 rounded-xl gradient-bg text-white flex items-center justify-center btn-press">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
