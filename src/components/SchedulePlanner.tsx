import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const FAKE_SCHEDULE = [
  { time: "9:00 AM", task: "Think about thinking 🤔" },
  { time: "9:30 AM", task: "Contemplate breakfast choices 🥐" },
  { time: "10:00 AM", task: "Check if wifi is still working 📡" },
  { time: "11:30 AM", task: "Watch productivity videos instead of being productive 📺" },
  { time: "1:00 PM", task: "Lunch meditation (aka staring at the wall) 🧘" },
  { time: "2:00 PM", task: "Power nap (indefinite duration) 💤" },
  { time: "3:30 PM", task: "Contemplate life choices ☁️" },
  { time: "4:00 PM", task: "Refresh social media 47 times 📱" },
  { time: "5:00 PM", task: "Consider doing something productive 🤷" },
  { time: "6:00 PM", task: "Decide to start tomorrow instead 🌅" },
];

export const SchedulePlanner = () => {
  const [showPlanner, setShowPlanner] = useState(false);

  return (
    <>
      <Card 
        className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30 hover:border-secondary/50 transition-all hover:scale-105 cursor-pointer animate-bounce-in"
        onClick={() => setShowPlanner(true)}
      >
        <div className="text-center space-y-4">
          <div className="text-5xl">📅</div>
          <h3 className="text-2xl font-bold text-secondary">Plan My Day</h3>
          <p className="text-muted-foreground">Schedule breaks that never end</p>
        </div>
      </Card>

      <Dialog open={showPlanner} onOpenChange={setShowPlanner}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">📅 Your Perfect Schedule</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            {FAKE_SCHEDULE.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
              >
                <span className="text-primary font-semibold min-w-[80px]">{item.time}</span>
                <span className="text-foreground">{item.task}</span>
              </div>
            ))}
          </div>
          <div className="text-center pt-4 text-sm text-muted-foreground italic">
            "A plan so perfect, you'll never need to execute it." ✨
          </div>
          <Button
            onClick={() => setShowPlanner(false)}
            variant="outline"
            className="w-full mt-4"
          >
            Save (and immediately forget)
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
