// src/components/MessageInput.jsx
import React, { useState } from 'react';
import InputDoc from './InputDoc';
import { sendTextChat, sendPdfChat, sendPdfTextChat } from '@/APIServices/ChatServices';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() && !pdfFile) return;

    setLoading(true);
    try {
      let res;

      // Cas 1 : PDF + message
      if (pdfFile && message.trim()) {
        res = await sendPdfTextChat(pdfFile, message.trim());
      }
      // Cas 2 : message seul
      else if (message.trim()) {
        res = await sendTextChat(message.trim());
      }
      // Cas 3 : PDF seul
      else if (pdfFile) {
        res = await sendPdfChat(pdfFile);
      }

      // Affiche le message de l'utilisateur
      onSend({
        content: message.trim() || pdfFile.name,
        isUser: true,
      });

      // Affiche la réponse du bot
      const botReply = res.data?.response || 'Pas de réponse.';
      onSend({
        content: botReply,
        isUser: false,
      });

      // Reset
      setMessage('');
      setPdfFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Erreur d'envoi, réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-border sticky bottom-0">
      
      <InputDoc
        className="md:flex-none"
        onUpload={(file) => setPdfFile(file)}
        onClear={() => setPdfFile(null)}
      />

      <textarea
        rows={1}
        placeholder="Votre message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        className="flex-1 bg-transparent border-none focus:ring-0 resize-none px-4 py-3 h-12 rounded-lg focus:outline-none"
      />

      <button
        onClick={handleSend}
        disabled={loading || (!message.trim() && !pdfFile)}
        className={cn(
          "p-3 rounded-full transition-all duration-200",
          (!message.trim() && !pdfFile) || loading
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-sina-500 text-white hover:bg-sina-600"
        )}
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default MessageInput;