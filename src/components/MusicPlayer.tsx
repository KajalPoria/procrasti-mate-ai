import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Create a simple lo-fi beat using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playLoFi = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 220;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      
      return { oscillator, gainNode };
    };

    if (isPlaying) {
      const { oscillator, gainNode } = playLoFi();
      audioRef.current = { oscillator, gainNode } as any;
      
      toast({
        title: "🎧 Lo-Fi Radio Started",
        description: "Helps you vibe while not achieving anything",
      });
    } else if (audioRef.current) {
      (audioRef.current as any).oscillator?.stop();
      audioRef.current = null;
    }

    return () => {
      if (audioRef.current) {
        (audioRef.current as any).oscillator?.stop();
      }
    };
  }, [isPlaying, toast]);

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            🎧 Lo-Fi Procrastination Radio
          </h3>
          <p className="text-sm text-muted-foreground">
            {isPlaying ? "Now vibing... 🎵" : "Ready to vibe"}
          </p>
        </div>
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant={isPlaying ? "destructive" : "default"}
          size="lg"
        >
          {isPlaying ? "⏸️ Pause" : "▶️ Play"}
        </Button>
      </div>
    </Card>
  );
};
