import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Leader = {
  name: string;
  excuses_generated: number;
  fake_hours_wasted: number;
};

const BADGES = [
  "👑 King of Delay",
  "👸 Queen of Excuses",
  "💼 CEO of Later",
  "🎯 Master Procrastinator",
  "🏆 Legendary Slacker",
];

export const HallOfFame = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    loadLeaders();
  }, []);

  const loadLeaders = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("name, excuses_generated, fake_hours_wasted")
      .order("excuses_generated", { ascending: false })
      .limit(5);

    if (data) setLeaders(data);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 to-destructive/10 border-2 border-accent/30">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            🏆 Hall of Fame
          </h3>
          <p className="text-sm text-muted-foreground">Top Procrastinators of All Time</p>
        </div>

        <div className="space-y-3">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                <div>
                  <p className="font-semibold text-foreground">{leader.name || "Anonymous"}</p>
                  <p className="text-xs text-muted-foreground">{BADGES[index]}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-accent">{leader.excuses_generated} excuses</p>
                <p className="text-xs text-muted-foreground">{leader.fake_hours_wasted}h wasted</p>
              </div>
            </div>
          ))}
        </div>

        {leaders.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p>No legendary procrastinators yet...</p>
            <p className="text-sm mt-2">Be the first to achieve nothing! 🌟</p>
          </div>
        )}
      </div>
    </Card>
  );
};
