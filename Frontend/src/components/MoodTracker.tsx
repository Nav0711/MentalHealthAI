import React, { useState, useEffect } from "react";
import MoodEmoji from "./MoodEmoji";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

interface MoodTrackerProps {
  onSubmit: (mood: MoodType, notes: string) => void;
  className?: string;
}

const moodLabels: Record<MoodType, string> = {
  terrible: "Terrible",
  bad: "Bad",
  neutral: "Neutral",
  good: "Good",
  great: "Great"
};

const MoodTracker: React.FC<MoodTrackerProps> = ({ onSubmit, className }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [notes, setNotes] = useState("");
  const { setCurrentMood } = useTheme();
  
  // Update the theme when a mood is selected
  useEffect(() => {
    setCurrentMood(selectedMood);
  }, [selectedMood, setCurrentMood]);

  const handleSubmit = () => {
    if (selectedMood) {
      onSubmit(selectedMood, notes);
      // Keep the mood selected and theme applied after submit
      setNotes("");
    }
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  return (
    <div className={className}>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-mental-light">
        <h3 className="text-xl font-semibold mb-4 mental-text">How are you feeling today?</h3>
        
        <div className="mb-6">
          <div className="flex justify-between">
            {(["terrible", "bad", "neutral", "good", "great"] as MoodType[]).map(mood => (
              <MoodEmoji
                key={mood}
                mood={mood}
                selected={selectedMood === mood}
                onClick={() => handleMoodSelect(mood)}
              />
            ))}
          </div>
          
          <div className="flex justify-between mt-2 px-2 text-xs">
            {(["terrible", "bad", "neutral", "good", "great"] as MoodType[]).map(mood => (
              <span 
                key={`label-${mood}`} 
                className={`text-center ${selectedMood === mood ? 'font-medium mental-text' : 'text-gray-500'}`}
              >
                {moodLabels[mood]}
              </span>
            ))}
          </div>
        </div>
        
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add some notes about your mood (optional)"
          className="mb-4 resize-none h-24 mental-input"
        />
        
        <Button 
          onClick={handleSubmit}
          disabled={!selectedMood}
          variant="mental"
          className="w-full rounded-full"
        >
          Save Mood
        </Button>
      </div>
    </div>
  );
};

export default MoodTracker;
