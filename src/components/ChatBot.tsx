import { useState } from "react";
import { Bot, X, Send, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  text: string;
}

const quickReplies = [
  "Show me luxury apartments",
  "What's the price range?",
  "Schedule a site visit",
  "Talk to an agent",
];

const botResponses: Record<string, string> = {
  default:
    "Thank you for your interest! Our team will connect with you shortly. Meanwhile, you can explore our featured properties or call us at +91 98765 43210.",
  luxury:
    "We have stunning luxury apartments starting from ₹1.2 Cr in Gurugram, ₹3.5 Cr villas in Bangalore, and premium penthouses in Mumbai. Would you like to schedule a visit?",
  price:
    "Our properties range from ₹50 Lakhs to ₹10+ Cr across premium locations. What's your preferred budget and location?",
  visit:
    "We'd love to show you around! Please share your preferred date and time, and our team will arrange a personalized site visit for you.",
  agent:
    "Connecting you with our senior property consultant. Please share your name and phone number, and we'll call you within 15 minutes.",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("luxury") || lower.includes("apartment")) return botResponses.luxury;
  if (lower.includes("price") || lower.includes("range") || lower.includes("cost")) return botResponses.price;
  if (lower.includes("visit") || lower.includes("schedule") || lower.includes("site")) return botResponses.visit;
  if (lower.includes("agent") || lower.includes("talk") || lower.includes("call")) return botResponses.agent;
  return botResponses.default;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! 👋 Welcome to NLV. How can I help you find your dream property today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    const botMsg: Message = { role: "bot", text: getResponse(text) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-popover rounded-2xl shadow-luxury overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-primary-foreground text-sm">NLV Assistant</p>
                  <p className="font-sans text-primary-foreground/60 text-xs">Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/60 hover:text-primary-foreground">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl font-sans text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs font-sans px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Type a message..."
                className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-foreground font-sans text-sm outline-none"
              />
              <button
                onClick={() => sendMessage(input)}
                className="bg-accent text-accent-foreground p-2.5 rounded-xl transition-transform hover:scale-105"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle - positioned above WhatsApp button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-luxury transition-transform hover:scale-110"
        aria-label="Open chatbot"
      >
        {open ? <X size={24} className="text-primary-foreground" /> : <MessageSquare size={24} className="text-primary-foreground" />}
      </button>
    </>
  );
};

export default ChatBot;
