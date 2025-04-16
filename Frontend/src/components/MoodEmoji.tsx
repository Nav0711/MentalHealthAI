import React from "react";
import { cn } from "@/lib/utils";

type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

interface MoodEmojiProps {
  mood: MoodType;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const emojis: Record<MoodType, string> = {
  great: "😃",
  good: "🙂",
  neutral: "😐",
  bad: "😔",
  terrible: "😢"
};

// Color scheme for each mood level (satisfaction increases left to right)
const moodColors: Record<MoodType, { 
  bg: string, 
  selectedBg: string, 
  border: string,
  shadow: string
}> = {
  terrible: { 
    bg: "hover:bg-red-100", 
    selectedBg: "bg-red-200", 
    border: "border-red-300",
    shadow: "shadow-red-200"
  }, // Red for terrible
  bad: { 
    bg: "hover:bg-yellow-100", 
    selectedBg: "bg-yellow-200", 
    border: "border-yellow-300",
    shadow: "shadow-yellow-200"
  }, // Yellow for bad
  neutral: { 
    bg: "hover:bg-green-100", 
    selectedBg: "bg-green-200", 
    border: "border-green-300",
    shadow: "shadow-green-200"
  }, // Green for neutral
  good: { 
    bg: "hover:bg-blue-100", 
    selectedBg: "bg-blue-200", 
    border: "border-blue-300",
    shadow: "shadow-blue-200"
  }, // Blue for good
  great: { 
    bg: "hover:bg-purple-100", 
    selectedBg: "bg-purple-200", 
    border: "border-purple-300",
    shadow: "shadow-purple-200"
  } // Purple for great
};

const MoodEmoji: React.FC<MoodEmojiProps> = ({ 
  mood, 
  size = "md", 
  selected = false,
  onClick,
  className
}) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl"
  };

  return (
    <button
      className={cn(
        "rounded-full p-3 transition-all duration-300 hover:scale-105 active:scale-95",
        selected 
          ? `${moodColors[mood].selectedBg} scale-110 border-2 ${moodColors[mood].border} ${moodColors[mood].shadow} shadow-md animate-pulse-gentle` 
          : moodColors[mood].bg,
        onClick ? "cursor-pointer" : "cursor-default",
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      type="button"
      aria-label={`Select ${mood} mood`}
    >
      {emojis[mood]}
    </button>
  );
};

export default MoodEmoji;
