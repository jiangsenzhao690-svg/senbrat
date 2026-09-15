import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Trash2, MessageSquare } from 'lucide-react';
import { ContactMessage } from '../types';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [pings, setPings] = useState<ContactMessage[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('brat_pings_v1');
      if (saved) {
        setPings(JSON.parse(saved));
      }
    } catch (err) {
      console.warn('LocalStorage access blocked', err);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject: subject || 'General Collaboration',
        message,
        timestamp: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };

      const updated = [newMsg, ...pings].slice(0, 5);
      setPings(updated);

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

  const handleClearPings = () => {
    setPings([]);
    try {
      localStorage.removeItem('brat_pings_v1');
    } catch {}
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0B08] relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9ACD32]/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  [ PING & SUB-CULTURAL COLLABORATION ]
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

                <div className="bg-[#141614] border border-[#9ACD32]/30 p-4">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
                    COLLABORATION BASE (协作基地)
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-[#9ACD32]" />
                    <span className="font-mono text-sm text-white uppercase">
                      CHINA · REMOTE WORLDWIDE (全球远程)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pings Log */}
            {pings.length > 0 && (
              <div className="bg-[#141614] border border-zinc-800 p-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-gray-400 pb-2 border-b border-zinc-800">
                  <span className="flex items-center gap-1.5 text-[#9ACD32]">
                    <MessageSquare className="w-3.5 h-3.5" /> RECENT PINGS ({pings.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleClearPings}
                    className="hover:text-red-400 transition-colors p-1"
                    title="清空历史记录"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {pings.map((p) => (
                    <div
                      key={p.id}
                      className="text-[11px] font-mono p-2 bg-[#0d0e0d] border border-zinc-800/80 flex justify-between items-center"
                    >
                      <div className="truncate mr-2">
                        <span className="text-[#9ACD32] font-semibold">{p.name}</span>
                        <span className="text-gray-500 ml-1.5 truncate">{p.subject}</span>
                      </div>
                      <span className="text-gray-600 text-[10px] shrink-0">{p.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#141614] border-2 border-[#9ACD32]/40 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-xs text-gray-300 uppercase block mb-1.5"
                  >
                    your name / 姓名 *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex / 品牌主"
                    className="w-full bg-[#0d0e0d] border border-[#9ACD32]/30 px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#9ACD32]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-mono text-xs text-gray-300 uppercase block mb-1.5"
                  >
                    your email / 邮箱 *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@yourdomain.com"
                    className="w-full bg-[#0d0e0d] border border-[#9ACD32]/30 px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#9ACD32]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="font-mono text-xs text-gray-300 uppercase block mb-1.5"
                >
                  subject / 合作主题
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="项目委托 / 视觉设计 / 网页开发"
                  className="w-full bg-[#0d0e0d] border border-[#9ACD32]/30 px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#9ACD32]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-mono text-xs text-gray-300 uppercase block mb-1.5"
                >
                  message / 详细留言 *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="描述您的想法、预算范围或预期的交付时间..."
                  className="w-full bg-[#0d0e0d] border border-[#9ACD32]/30 p-3.5 text-sm text-white font-mono focus:outline-none focus:border-[#9ACD32] resize-none"
                />
              </div>

              {/* Status alerts */}
              {status === 'success' && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500 text-emerald-400 font-mono text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>消息已记录！感谢您的来信，我将尽快查阅并回复。</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500 text-red-400 font-mono text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>请填写完整的姓名、邮箱以及留言内容。</span>
                </div>
              )}

              <button
                id="btn-send-message"
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 bg-[#9ACD32] hover:bg-white text-black font-brat text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer font-bold shadow-[0_0_15px_rgba(154,205,50,0.3)] disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <span>SENDING TRANSMISSION...</span>
                ) : (
                  <>
                    <span>SEND TRANSMISSION / 发送讯息</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
