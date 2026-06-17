import { useState, useEffect, FormEvent } from "react";
import { Message } from "../types";
import { Send, Check, Mail, MessageSquare, Terminal, RefreshCw, Trash2, Github } from "lucide-react";
import { motion } from "motion/react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [localMsgs, setLocalMsgs] = useState<Message[]>([]);

  // Load message logs from localStorage on load to demonstrate true data persistence
  useEffect(() => {
    try {
      const stored = localStorage.getItem("brat_pings_v1");
      if (stored) {
        setLocalMsgs(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Local storage permission blocked by sandbox iframe config.", e);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("sending");

    // Simulate short network packet send delay
    setTimeout(() => {
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject: subject || "general inquiry",
        message,
        timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      };

      const updated = [newMsg, ...localMsgs].slice(0, 5); // Keep last 5 pings
      setLocalMsgs(updated);
      try {
        localStorage.setItem("brat_pings_v1", JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage write failed.", e);
      }

      setStatus("success");
      // Reset inputs
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  const clearLogs = () => {
    setLocalMsgs([]);
    try {
      localStorage.removeItem("brat_pings_v1");
    } catch (e) {}
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0B08] relative">
      {/* Light glow bottom right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9ACD32]/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info and Terminal Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs">
                  [ communications & connection ]
                </span>
                <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
                  contact-me.联系我
                </h2>
              </motion.div>

              <div className="py-3">
                <a 
                  href="mailto:jiangsenzhao690@gmail.com" 
                  className="font-brat text-4xl sm:text-5xl md:text-[3.5rem] tracking-tighter uppercase text-[#9ACD32] hover:text-white transition-all underline underline-offset-[10px] decoration-3 text-blur-sm select-none"
                >
                  LET'S TALK.
                </a>
              </div>

              <p className="font-mono text-xs text-gray-400 leading-relaxed max-w-md uppercase">
                有任何大胆的想法，或者纯粹追求亚文化电子风格的合作设计？
                立即发送数据包联系我，或者通过以下加密或者公开协议加入我的网络频道。
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="mailto:jiangsenzhao690@gmail.com"
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#9ACD32] transition-colors font-mono text-xs"
                >
                  <div className="p-2 bg-[#141614] border border-gray-800 rounded-sm">
                    <Mail className="w-4 h-4 text-[#9ACD32]" />
                  </div>
                  <span>jiangsenzhao690@gmail.com</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#9ACD32] transition-colors font-mono text-xs"
                >
                  <div className="p-2 bg-[#141614] border border-gray-800 rounded-sm">
                    <Github className="w-4 h-4 text-[#9ACD32]" />
                  </div>
                  <span>github.com/senzhao-360</span>
                </a>
              </div>
            </div>

            {/* Simulated Live Connection logs (Persisted in Local Storage) */}
            <div className="bg-[#141614] border-2 border-dashed border-[#9ACD32]/20 p-5 rounded-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="font-mono text-[10px] text-gray-400 flex items-center gap-1.5 uppercase font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-[#9ACD32]" /> terminal.本地传输日志
                </span>
                {localMsgs.length > 0 && (
                  <button
                    onClick={clearLogs}
                    className="p-1 hover:bg-[#9ACD32]/10 text-gray-500 hover:text-red-400 rounded-sm transition-colors cursor-pointer"
                    title="Clear database logs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {localMsgs.length === 0 ? (
                <div className="py-6 text-center text-gray-600 font-mono text-[10px] uppercase">
                  [ 暂无本地连接传输。请填写右侧表单发送数据 ]
                </div>
              ) : (
                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                  {localMsgs.map((msg) => (
                    <div key={msg.id} className="font-mono text-[10px] leading-relaxed border-b border-gray-900 pb-2">
                      <div className="flex justify-between text-gray-400">
                        <span className="text-[#9ACD32] font-semibold">{msg.name} // {msg.email}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div className="text-gray-500 truncate mt-1">
                        Topic: "{msg.subject}" → {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Actual Contact Form Column */}
          <div className="lg:col-span-7 bg-[#141614] border-2 border-[#9ACD32] p-6 sm:p-8 rounded-sm relative">
            <span className="absolute top-4 right-4 font-mono text-[9px] text-[#9ACD32] border border-[#9ACD32]/30 px-2 py-0.5 uppercase select-none">
              ssl.secured_vibe
            </span>

            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-brat text-xl text-white uppercase border-b border-[#9ACD32]/20 pb-2 mb-4">
                send-data.建立连接
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 animate-slide-up">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">
                    label.您的名字 / NO.
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0d0e0d] border border-gray-800 focus:border-[#9ACD32] text-white font-mono text-xs py-3 px-3 rounded-none focus:outline-none transition-colors"
                    placeholder="E.g., Charli"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">
                    label.邮箱连接 / SMTP
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0d0e0d] border border-gray-800 focus:border-[#9ACD32] text-white font-mono text-xs py-3 px-3 rounded-none focus:outline-none transition-colors"
                    placeholder="charli@xcx.world"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">
                  label.邮件主题 / TOPIC
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#0d0e0d] border border-gray-800 focus:border-[#9ACD32] text-white font-mono text-xs py-3 px-3 rounded-none focus:outline-none transition-colors"
                  placeholder="Subject of interest..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">
                  label.主要内容 / PACKAGE
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#0d0e0d] border border-gray-800 focus:border-[#9ACD32] text-white font-mono text-xs py-3 px-3 rounded-none focus:outline-none resize-none transition-colors"
                  placeholder="Type your message packages here..."
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[#9ACD32] text-black font-brat text-sm uppercase py-3.5 px-6 font-bold tracking-widest text-center flex items-center justify-center gap-2 border-2 border-transparent hover:bg-black hover:text-[#9ACD32] hover:border-[#9ACD32] transition-all cursor-pointer rounded-none disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      PACKAGING DATA...
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check className="w-4 h-4" />
                      DATA TRANSFER COMPLETE!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      UPLOAD MESSAGE / 发送包
                    </>
                  )}
                </button>
              </div>

              {/* Status Banner */}
              {status === "error" && (
                <div className="p-3 bg-red-950/40 border border-red-500 font-mono text-[10px] text-red-400 uppercase text-center mt-2">
                  * 错误: 所有带有 label 的必填项都必须填写正确。
                </div>
              )}
              {status === "success" && (
                <div className="p-3 bg-[#9ACD32]/10 border border-[#9ACD32] font-mono text-[10px] text-[#9ACD32] uppercase text-center mt-2 animate-pulse">
                  * 成功: 数据包已被加密写入本地终端数据库。刷新或在上方列表查收。
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
