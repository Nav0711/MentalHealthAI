import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}
const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser,
  timestamp 
}) => {
  return (
    <div className={cn(
      "flex items-start gap-3 mb-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className={cn(
        "w-10 h-10 flex items-center justify-center overflow-hidden",
        isUser ? "bg-mental-primary text-white" : "bg-transparent border-0"
      )}>
        {isUser ? (
          <i className="fas fa-user text-lg"></i>
        ) : (
          <>
            <AvatarImage 
              src="/favicon.ico" 
              alt="AI"
              className="w-10 h-10 object-contain" 
            />
            <AvatarFallback className="bg-white">AI</AvatarFallback>
          </>
        )}
      </Avatar>
      
      <div 
        className={cn(
          "max-w-[80%] rounded-2xl p-4",
          isUser 
            ? "bg-mental-primary text-white rounded-tr-none" 
            : "bg-mental-light text-mental-dark rounded-tl-none"
        )}
      >
        <p className="whitespace-pre-wrap">{message}</p>
        <div className={cn(
          "text-xs mt-1",
          isUser ? "text-white/70" : "text-mental-dark/70"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
