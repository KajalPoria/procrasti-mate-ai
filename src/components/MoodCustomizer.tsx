import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type LazyLevel = "mildly_lazy" | "comfortably_lazy" | "ultra_lazy";

const MOOD_LEVELS = [
  { value: 0, label: "🐢 Mildly Lazy", mode: "mildly_lazy" as LazyLevel },
  { value: 50, label: "🛋️ Comfortably Lazy", mode: "comfortably_lazy" as LazyLevel },
  { value: 100, label: "💤 Ultra Lazy", mode: "ultra_lazy" as LazyLevel },
];

export const MoodCustomizer = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  const [currentMode, setCurrentMode] = useState<LazyLevel>("comfortably_lazy");
  const { toast } = useToast();

  useEffect(() => {
    loadUserMode();
  }, []);

  const loadUserMode = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("laziness_level")
        .eq("id", user.id)
        .single();
      
      if (data) {
        const level = data.laziness_level as LazyLevel;
        setCurrentMode(level);
        const moodIndex = MOOD_LEVELS.findIndex(m => m.mode === level);
        if (moodIndex !== -1) {
          setSliderValue([MOOD_LEVELS[moodIndex].value]);
        }
      }
    }
  };

  const updateMode = async (value: number) => {
    const closestMode = value <= 25 ? MOOD_LEVELS[0] : 
                       value <= 75 ? MOOD_LEVELS[1] : 
                       MOOD_LEVELS[2];
    
    setCurrentMode(closestMode.mode);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ laziness_level: closestMode.mode })
        .eq("id", user.id);
      
      toast({
        title: "Laziness Level Updated! 🎯",
        description: `You're now in ${closestMode.label} mode`,
      });
    }
  };

  const getMoodDescription = () => {
    switch (currentMode) {
      case "mildly_lazy":
        return "Gentle teasing + random excuses";
      case "comfortably_lazy":
        return "Frequent memes + fake progress bars";
      case "ultra_lazy":
        return "Everything breaks or says 'Do it tomorrow.'";
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 animate-bounce-in">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-accent">🧘 Set Your Laziness Level</h3>
          <p className="text-sm text-muted-foreground">{getMoodDescription()}</p>
        </div>
        
        <div className="space-y-4">
          <Slider
            value={sliderValue}
            onValueChange={(value) => setSliderValue(value)}
            onValueCommit={(value) => updateMode(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>🐢 Mildly</span>
            <span>🛋️ Comfortably</span>
            <span>💤 Ultra</span>
          </div>
        </div>

        <div className="text-center text-lg font-semibold">
          {MOOD_LEVELS.find(m => m.mode === currentMode)?.label}
        </div>
      </div>
    </Card>
  );
};
