import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export const MessageBubble = ({
  message,
  isUser,
  timestamp,
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-sina-100 flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-sina-600" />
        </div>
      )}

      <div
        className={cn(
          "chat-bubble",
          isUser ? "chat-bubble-user" : "chat-bubble-bot"
        )}
      >
        <div className="prose prose-sm max-w-none text-sm">
          <ReactMarkdown>
            {message}
          </ReactMarkdown>
        </div>

        {timestamp && (
          <div
            className={cn(
              "text-[10px] mt-1",
              isUser ? "text-white/70 text-right" : "text-muted-foreground"
            )}
          >
            {timestamp}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-sina-400 flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
