import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Analytics = () => {
  const [stats, setStats] = useState({
    excuses: 0,
    hours: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("excuses_generated, fake_hours_wasted")
        .eq("id", user.id)
        .single();
      
      if (data) {
        setStats({
          excuses: data.excuses_generated,
          hours: data.fake_hours_wasted,
        });
      }
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            📈 Useless Analytics
          </h3>
          <p className="text-sm text-muted-foreground">Data that means absolutely nothing</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <div className="text-3xl font-bold text-primary">{stats.excuses}</div>
            <div className="text-xs text-muted-foreground mt-1">Excuses Generated</div>
          </div>
          
          <div className="text-center p-4 bg-secondary/10 rounded-lg">
            <div className="text-3xl font-bold text-secondary">{stats.hours}h</div>
            <div className="text-xs text-muted-foreground mt-1">Time Wasted</div>
          </div>
          
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <div className="text-3xl font-bold text-accent">100%</div>
            <div className="text-xs text-muted-foreground mt-1">Procrastination Efficiency</div>
          </div>
          
          <div className="text-center p-4 bg-destructive/10 rounded-lg">
            <div className="text-3xl font-bold text-destructive">∞</div>
            <div className="text-xs text-muted-foreground mt-1">Tasks Avoided</div>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground italic">
          "Charts that look impressive but mean nothing" ✨
        </div>
      </div>
    </Card>
  );
};
