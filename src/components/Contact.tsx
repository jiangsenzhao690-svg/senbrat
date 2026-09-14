import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Trash2, Github } from 'lucide-react';
import { MessageLog } from '../types';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<MessageLog[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('brat_pings_v1');
      if (stored) {
        setLogs(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage blocked', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    setTimeout(() => {
      const newEntry: MessageLog = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        timestamp: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };

      const updated = [newEntry, ...logs].slice(0, 5);
      setLogs(updated);

      try {
        localStorage.setItem('brat_pings_v1', JSON.stringify(updated));
      } catch (err) {
        console.warn('Storage write failed', err);
      }

      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  const clearLogs = () => {
    setLogs([]);
    try {
      localStorage.removeItem('brat_pings_v1');
    } catch {}
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0B08] relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9ACD32]/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> [ PING & SUB-CULTURAL COLLABORATION ]
                </span>
                <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
                  contact.联络我
                </h2>
              </motion.div>

              <p className="font-sans text-gray-300 text-sm leading-relaxed">
                无论是商业项目视觉委托、前沿技术探索、或任何富有争议的亚文化设计合作，都欢迎与我直接联系。
              </p>

              <div className="space-y-3 pt-2">
                <div className="bg-[#141614] border border-[#9ACD32]/30 p-4">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
                    DIRECT EMAIL (直接电邮)
                  </span>
                  <a
                    href="mailto:jiangsenzhao690@gmail.com"
                    className="font-brat text-lg sm:text-xl text-[#9ACD32] hover:text-white transition-colors block mt-1 break-all"
                  >
                    jiangsenzhao690@gmail.com
                  </a>
                </div>

                <div className="bg-[#141614] border border-[#9ACD32]/20 p-4">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
                    LOCATION & TIMEZONE
                  </span>
                  <span className="font-mono text-sm text-gray-200 block mt-1">
                    BEIJING, CN (UTC+8) / GLOBAL REMOTE
                  </span>
                </div>
              </div>

              {/* Social buttons */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 bg-[#141614] border border-zinc-800 hover:border-[#9ACD32] text-white font-brat text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4 text-[#9ACD32]" /> GITHUB
                </a>
                <a
                  href="mailto:jiangsenzhao690@gmail.com"
                  className="flex-1 py-3 px-4 bg-[#9ACD32] text-black hover:bg-black hover:text-[#9ACD32] border border-transparent hover:border-[#9ACD32] font-brat text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors font-bold"
                >
                  <Mail className="w-4 h-4" /> SEND MAIL
                </a>
              </div>
            </div>

            {/* Terminal Recent Logs */}
            {logs.length > 0 && (
              <div className="bg-[#0d0e0d] border border-zinc-800 p-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pb-2 border-b border-zinc-800">
                  <span>LOCAL DISPATCH LOGS ({logs.length})</span>
                  <button
                    onClick={clearLogs}
                    className="hover:text-red-400 flex items-center gap-1 cursor-pointer"
                    title="Clear Logs"
                  >
                    <Trash2 className="w-3 h-3" /> CLEAR
                  </button>
                </div>
                {logs.map((item) => (
                  <div key={item.id} className="text-[11px] font-mono text-zinc-400">
                    <span className="text-[#9ACD32]">[{item.timestamp}]</span> {item.name} &lt;
                    {item.email}&gt;
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-[#141614] border-2 border-[#9ACD32]/40 p-8 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="font-mono text-xs text-gray-300 uppercase block mb-2">
                    NAME / 您的称呼 *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Senzhao / 赵江森"
                    className="w-full bg-[#0d0e0d] border border-zinc-800 focus:border-[#9ACD32] px-4 py-3 text-sm text-white font-sans focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-mono text-xs text-gray-300 uppercase block mb-2">
                    EMAIL / 电子邮箱 *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#0d0e0d] border border-zinc-800 focus:border-[#9ACD32] px-4 py-3 text-sm text-white font-sans focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="font-mono text-xs text-gray-300 uppercase block mb-2">
                  SUBJECT / 项目主题
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Creative Direction / Web Project"
                  className="w-full bg-[#0d0e0d] border border-zinc-800 focus:border-[#9ACD32] px-4 py-3 text-sm text-white font-sans focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="font-mono text-xs text-gray-300 uppercase block mb-2">
                  MESSAGE / 需求描述 *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, timeline, and vibe..."
                  className="w-full bg-[#0d0e0d] border border-zinc-800 focus:border-[#9ACD32] p-4 text-sm text-white font-sans focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  {status === 'error' && (
                    <span className="font-mono text-xs text-red-500 uppercase">
                      * Please fill out all required fields.
                    </span>
                  )}
                  {status === 'success' && (
                    <span className="font-mono text-xs text-[#9ACD32] uppercase">
                      ✓ MESSAGE DISPATCHED SUCCESSFULLY!
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="py-3.5 px-8 bg-[#9ACD32] text-black font-brat text-xs uppercase tracking-widest hover:bg-white transition-all cursor-pointer flex items-center gap-2 font-bold disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    'DISPATCHING...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> TRANSMIT_SIGNAL
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
