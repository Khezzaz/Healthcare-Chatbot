import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from '@/components/chat/message-bubble';
import MessageInput from '@/components/chat/chat-input';
import FloatingNavbar from '@/components/ui/floating-navbar';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Navbar items
const navItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Features', link: '/features' },
];

// Welcome initial
const welcomeMessages = [
  {
    id: 1,
    content: "Hello! I'm aAicennAI, your personal medical assistant. How can I help you today?",
    isUser: false,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const Chat = () => {
  const [messages, setMessages] = useState(welcomeMessages);
  const messagesEndRef = useRef(null);

  // Scroll automatique
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ajoute un message à l'état
  const handleSend = ({ content, isUser }) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, content, isUser, timestamp },
    ]);
  };

  return (
    <div className="min-h-screen relative">
      <FloatingNavbar navItems={navItems} />

      <div className="container max-w-4xl mx-auto py-24 px-4">
        {/* Back link */}
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="glass p-4 rounded-2xl mb-4">
          <h1 className="text-2xl font-bold">Chat with Avicennai</h1>
          <p className="text-sm text-muted-foreground">
            Posez votre question médicale ou envoyez un PDF pour analyse.
          </p>
        </div>

        {/* Messages */}
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 min-h-[60vh] mb-4 shadow-sm overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg.content}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <MessageInput onSend={handleSend} />

        {/* Disclaimer */}
        <div className="text-xs text-center text-muted-foreground mt-4">
          AvicennAI fournit des informations à titre éducatif, pas un avis médical professionnel.
        </div>
      </div>
    </div>
  );
};

export default Chat;
