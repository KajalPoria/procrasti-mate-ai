import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MEME_CAPTIONS = [
  "When you open your laptop just to close it again",
  "That feeling when you finish doing nothing all day",
  "Me pretending to work vs me actually working",
  "My to-do list: exists. Me: interesting...",
  "Due tomorrow? Do tomorrow.",
  "I'll start Monday. Every Sunday ever.",
  "Productive? Never heard of her.",
  "My boss: Any progress? Me: Define progress...",
  "When someone asks what you did today: 😶",
  "Successfully avoided all responsibilities 🏆",
];

export const MemeGenerator = () => {
  const [showMeme, setShowMeme] = useState(false);
  const [currentMeme, setCurrentMeme] = useState("");

  const generateMeme = () => {
    const randomCaption = MEME_CAPTIONS[Math.floor(Math.random() * MEME_CAPTIONS.length)];
    setCurrentMeme(randomCaption);
    setShowMeme(true);
  };

  return (
    <>
      <Card 
        className="p-8 bg-gradient-to-br from-destructive/10 to-destructive/5 border-2 border-destructive/30 hover:border-destructive/50 transition-all hover:scale-105 cursor-pointer animate-bounce-in"
        onClick={generateMeme}
      >
        <div className="text-center space-y-4">
          <div className="text-5xl">😂</div>
          <h3 className="text-2xl font-bold text-destructive">Generate a Meme</h3>
          <p className="text-muted-foreground">Procrastination Therapy</p>
        </div>
      </Card>

      <Dialog open={showMeme} onOpenChange={setShowMeme}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">😂 Your Meme</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-center pt-4">
            <div className="text-6xl">🤡</div>
            <p className="text-xl font-bold text-foreground italic">
              "{currentMeme}"
            </p>
            <div className="flex gap-2">
              <Button
                onClick={generateMeme}
                variant="outline"
                className="flex-1"
              >
                Generate Another
              </Button>
              <Button
                onClick={() => {
                  // Fake download
                  const link = document.createElement('a');
                  link.download = 'procrastination-meme.txt';
                  link.click();
                }}
                className="flex-1"
              >
                Save Meme
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
