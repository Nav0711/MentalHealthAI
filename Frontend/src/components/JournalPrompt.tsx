import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/contexts/ThemeContext";

interface JournalEntry {
  text: string;
  timestamp: string;
  tags: string[];
}

interface JournalPromptProps {
  prompt: string;
  onSave: (entry: string) => void;
  className?: string;
}

const JournalPrompt: React.FC<JournalPromptProps> = ({ prompt, onSave, className }) => {
  const [entry, setEntry] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [savedEntries, setSavedEntries] = useState<JournalEntry[]>([]);
  const [selectedEntryIndex, setSelectedEntryIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const { themeColors } = useTheme();

  const STORAGE_KEY = "my_journal_entries";

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSavedEntries(JSON.parse(stored));
    }
  }, []);

  const updateLocalStorage = (entries: JournalEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  };

  const handleSave = () => {
    if (entry.trim()) {
      const newEntry: JournalEntry = {
        text: entry,
        timestamp: new Date().toLocaleString(),
        tags: tags,
      };
      const updated = [newEntry, ...savedEntries];
      setSavedEntries(updated);
      updateLocalStorage(updated);
      onSave(entry);
      setEntry("");
      setTags([]);
      setTagInput("");
    }
  };

  const handleDelete = (index: number) => {
    const updated = savedEntries.filter((_, i) => i !== index);
    setSavedEntries(updated);
    updateLocalStorage(updated);
    setSelectedEntryIndex(null);
  };

  const handleEditSave = () => {
    if (selectedEntryIndex !== null && editText.trim()) {
      const updated = savedEntries.map((item, i) =>
        i === selectedEntryIndex ? { ...item, text: editText, tags: editTags } : item
      );
      setSavedEntries(updated);
      updateLocalStorage(updated);
      setIsEditing(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all your journal entries?")) {
      setSavedEntries([]);
      updateLocalStorage([]);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <>
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
          <div className="flex items-center gap-2 mt-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag (e.g. #gratitude)"
            />
            <Button onClick={handleAddTag} size="sm" className="rounded-full">
              Add Tag
            </Button>
          </div>
          <div className="flex flex-wrap mt-2 gap-1">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                {tag}
              </span>
            ))}
          </div>

          {savedEntries.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Saved Entries:</h4>
                <Button variant="destructive" size="sm" onClick={handleClearAll} className="rounded-full">
                  Clear All
                </Button>
              </div>
              <ul className="space-y-2">
                {savedEntries.map((item, index) => (
                  <li
                    key={index}
                    className="p-3 rounded cursor-pointer shadow-sm"
                    style={{ background: themeColors.background, border: `1px solid ${themeColors.secondary}` }}
                    onClick={() => {
                      setSelectedEntryIndex(index);
                      setEditText(item.text);
                      setEditTags(item.tags);
                      setIsEditing(false);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm truncate">
                        {item.text.length > 50 ? item.text.slice(0, 50) + "..." : item.text}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">{item.timestamp}</span>
                    </div>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
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

      {/* Modal for View / Edit */}
      <Dialog open={selectedEntryIndex !== null} onOpenChange={() => setSelectedEntryIndex(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Journal Entry" : "Your Journal Entry"}</DialogTitle>
          </DialogHeader>
          {selectedEntryIndex !== null && !isEditing && (
            <>
              <div className="whitespace-pre-wrap mb-2">{savedEntries[selectedEntryIndex].text}</div>
              <div className="text-xs text-gray-500 mb-2">Saved: {savedEntries[selectedEntryIndex].timestamp}</div>
              <div className="flex gap-1 mb-4 flex-wrap">
                {savedEntries[selectedEntryIndex].tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-800">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(true)} className="rounded-full">
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(selectedEntryIndex)} className="rounded-full">
                  Delete
                </Button>
              </div>
            </>
          )}

          {isEditing && (
            <>
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-[150px]"
              />
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tag during edit"
                />
                <Button onClick={() => {
                  if (tagInput.trim() && !editTags.includes(tagInput.trim())) {
                    setEditTags([...editTags, tagInput.trim()]);
                    setTagInput("");
                  }
                }} size="sm" className="rounded-full">
                  Add Tag
                </Button>
              </div>
              <div className="flex flex-wrap mt-2 gap-1">
                {editTags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-full">
                  Cancel
                </Button>
                <Button onClick={handleEditSave} disabled={!editText.trim()} className="rounded-full">
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JournalPrompt;
