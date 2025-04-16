import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";

interface JournalPromptProps {
  prompt: string;
  onSave: (entry: string) => void;
  className?: string;
}

const JournalPrompt: React.FC<JournalPromptProps> = ({ prompt, onSave, className }) => {
  const [entry, setEntry] = useState("");
  const { themeColors } = useTheme();
  
  const handleSave = () => {
    if (entry.trim()) {
      onSave(entry);
      setEntry("");
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="mental-text">Journal Entry</CardTitle>
        <CardDescription>Take a moment to reflect...</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium mb-3 italic" style={{ color: themeColors.secondary }}>
          "{prompt}"
        </p>
        <Textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Start writing here..."
          className="min-h-[150px] mental-input"
        />
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSave} 
          disabled={!entry.trim()} 
          variant="mental"
          className="rounded-full"
        >
          Save Entry
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalPrompt;
