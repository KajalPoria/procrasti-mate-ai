import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const EXCUSES = [
  "You can't start now, Mercury is in retrograde 🪐",
  "Your brain's Wi-Fi signal seems weak. Try tomorrow 📡",
  "Studies show productivity peaks at never o'clock ⏰",
  "The cosmic energy isn't aligned today ✨",
  "Your keyboard needs emotional rest 🎹",
  "It's too early/late for this level of effort 😴",
  "Your coffee hasn't kicked in yet... give it 5-7 hours ☕",
  "The universe is telling you to scroll instead 📱",
  "Your talent is wasted on actual work 🎨",
  "Today is a designated Netflix research day 📺"
];

const DEMOTIVATIONAL_QUOTES = [
  "Dream big... sleep bigger 😴",
  "You miss 100% of the naps you don't take 💤",
  "Be the reason your alarm clock fears you ⏰",
  "Success is just failure that hasn't happened yet 🎯",
  "Hard work pays off later. Laziness pays off now 🛋️",
  "Why do today what you can forget about tomorrow? 📅",
  "Every morning is a fresh new disappointment 🌅",
  "Aim for the stars... but stay on the couch 🌟",
  "Your potential is limitless. Your motivation isn't 🚀",
  "Believe in yourself, but not too much 💪"
];

const DISTRACTIONS = [
  { type: "fact", content: "Did you know? Penguins can't taste fish. Neither can your productivity taste success today 🐧" },
  { type: "fact", content: "Fun fact: Sloths can hold their breath longer than dolphins. Be the sloth 🦥" },
  { type: "fact", content: "Breaking: Local person discovers that snacks exist. Investigation ongoing 🍪" },
  { type: "fact", content: "Scientists confirm: Your couch misses you. Go comfort it 🛋️" },
  { type: "fact", content: "Research shows: 90% of productivity happens in imagination 🧠" },
  { type: "meme", content: "🎮 Remember that game you installed? It's still there. Waiting. Calling your name..." },
  { type: "meme", content: "📱 Your phone has 47 unread notifications. That's basically a full-time job right there" },
  { type: "meme", content: "🎵 That one song from 2015 just popped into your head. You have to listen to it now. It's the law." },
  { type: "meme", content: "🍿 Fun theory: What if you just... made some popcorn and contemplated existence?" },
  { type: "meme", content: "🎨 Sudden urge to reorganize your entire desk. This is definitely more important than work." }
];

const Dashboard = () => {
  const [showExcuse, setShowExcuse] = useState(false);
  const [currentExcuse, setCurrentExcuse] = useState("");
  const [showDistraction, setShowDistraction] = useState(false);
  const [currentDistraction, setCurrentDistraction] = useState({ type: "", content: "" });
  const [showMotivation, setShowMotivation] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [focusProgress, setFocusProgress] = useState(0);
  const [isFocusing, setIsFocusing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Random reminder popups
  useEffect(() => {
    const reminders = [
      "⏰ Time to check if snacks still exist in the kitchen",
      "🌱 Your plants might need emotional support",
      "🚰 Hydration check: Coffee counts, right?",
      "🧘 Reminder: Deep breaths... then deep scrolls",
      "📧 You should probably check your email... or not",
      "🎯 Life update: Still successfully avoiding productivity!"
    ];

    const showReminder = () => {
      const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
      toast({
        title: "Friendly Reminder",
        description: randomReminder,
        duration: 4000,
      });
    };

    const interval = setInterval(showReminder, 45000); // Every 45 seconds
    return () => clearInterval(interval);
  }, [toast]);

  const generateExcuse = () => {
    const randomExcuse = EXCUSES[Math.floor(Math.random() * EXCUSES.length)];
    setCurrentExcuse(randomExcuse);
    setShowExcuse(true);
  };

  const generateDistraction = () => {
    const randomDistraction = DISTRACTIONS[Math.floor(Math.random() * DISTRACTIONS.length)];
    setCurrentDistraction(randomDistraction);
    setShowDistraction(true);
  };

  const generateMotivation = () => {
    const randomQuote = DEMOTIVATIONAL_QUOTES[Math.floor(Math.random() * DEMOTIVATIONAL_QUOTES.length)];
    setCurrentQuote(randomQuote);
    setShowMotivation(true);
  };

  const startFakeFocus = () => {
    setIsFocusing(true);
    setFocusProgress(0);
    
    const interval = setInterval(() => {
      setFocusProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            toast({
              title: "🎉 Focus Mode Complete!",
              description: "Congrats! You did absolutely nothing successfully.",
              duration: 5000,
            });
            setIsFocusing(false);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 100); // 10 seconds total
  };

  const emergencyButton = () => {
    toast({
      title: "🚨 EMERGENCY PROTOCOL ACTIVATED",
      description: "Redirecting to safety... (aka YouTube)",
      duration: 3000,
    });
    setTimeout(() => {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-up">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Let's Pretend to Be Productive Today! 💪
          </h1>
          <p className="text-xl text-muted-foreground">Choose your weapon of mass distraction</p>
        </div>

        {/* Productivity Tracker (Always 100%) */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-accent/30 animate-bounce-in">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Daily Productivity Tracker</h3>
              <span className="text-2xl">📊</span>
            </div>
            <Progress value={100} className="h-4" />
            <p className="text-sm text-muted-foreground text-center pt-2">
              ✨ You've achieved maximum effort by doing the bare minimum
            </p>
          </div>
        </Card>

        {/* Main Chaos Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer animate-bounce-in"
            onClick={generateExcuse}
          >
            <div className="text-center space-y-4">
              <div className="text-5xl">🎭</div>
              <h3 className="text-2xl font-bold text-primary">Generate Excuse</h3>
              <p className="text-muted-foreground">Get a scientifically-approved reason to delay</p>
            </div>
          </Card>

          <Card 
            className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30 hover:border-secondary/50 transition-all hover:scale-105 cursor-pointer animate-bounce-in"
            onClick={generateDistraction}
            style={{ animationDelay: "0.1s" }}
          >
            <div className="text-center space-y-4">
              <div className="text-5xl">🎪</div>
              <h3 className="text-2xl font-bold text-secondary">Distract Me</h3>
              <p className="text-muted-foreground">Important distractions you definitely need</p>
            </div>
          </Card>

          <Card 
            className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 hover:border-accent/50 transition-all hover:scale-105 cursor-pointer animate-bounce-in"
            onClick={startFakeFocus}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-center space-y-4">
              <div className="text-5xl">⏳</div>
              <h3 className="text-2xl font-bold text-accent">Fake Focus Mode</h3>
              <p className="text-muted-foreground">Look busy while doing absolutely nothing</p>
              {isFocusing && (
                <div className="pt-4 space-y-2">
                  <Progress value={focusProgress} className="h-3" />
                  <p className="text-sm font-medium">{focusProgress}% Complete</p>
                </div>
              )}
            </div>
          </Card>

          <Card 
            className="p-8 bg-gradient-to-br from-destructive/10 to-destructive/5 border-2 border-destructive/30 hover:border-destructive/50 transition-all hover:scale-105 cursor-pointer animate-bounce-in"
            onClick={generateMotivation}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-center space-y-4">
              <div className="text-5xl">💬</div>
              <h3 className="text-2xl font-bold text-destructive">Motivate Me</h3>
              <p className="text-muted-foreground">Demotivational quotes to keep you grounded</p>
            </div>
          </Card>
        </div>

        {/* Emergency Button */}
        <Card className="p-6 bg-destructive/5 border-2 border-destructive/50 animate-bounce-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-destructive flex items-center gap-2 justify-center md:justify-start">
                <span className="animate-pulse">🚨</span> EMERGENCY
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                I'm accidentally being productive! HELP!
              </p>
            </div>
            <Button
              onClick={emergencyButton}
              variant="destructive"
              size="lg"
              className="animate-wiggle hover:animate-none text-lg px-8"
            >
              PANIC BUTTON
            </Button>
          </div>
        </Card>
      </div>

      {/* Excuse Dialog */}
      <Dialog open={showExcuse} onOpenChange={setShowExcuse}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">🎭 Your Perfect Excuse</DialogTitle>
            <DialogDescription className="text-lg pt-4">
              <div className="space-y-4 text-center">
                <p className="text-xl font-semibold text-foreground">{currentExcuse}</p>
                <div className="text-6xl pt-2">😌</div>
                <p className="text-sm text-muted-foreground italic">
                  Use this wisely (or don't, we're not judging)
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Distraction Dialog */}
      <Dialog open={showDistraction} onOpenChange={setShowDistraction}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {currentDistraction.type === "fact" ? "🧠 Totally Important Fact" : "🎪 Critical Distraction"}
            </DialogTitle>
            <DialogDescription className="text-lg pt-4">
              <div className="space-y-4 text-center">
                <p className="text-lg text-foreground">{currentDistraction.content}</p>
                <div className="text-6xl pt-2">
                  {currentDistraction.type === "fact" ? "🤓" : "🎉"}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowDistraction(false)}
                  className="mt-4"
                >
                  Never mind, I'll get distracted later
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Motivation Dialog */}
      <Dialog open={showMotivation} onOpenChange={setShowMotivation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">💬 Words of "Wisdom"</DialogTitle>
            <DialogDescription className="text-lg pt-4">
              <div className="space-y-4 text-center">
                <p className="text-2xl font-bold text-foreground italic">"{currentQuote}"</p>
                <div className="text-6xl pt-2">🌟</div>
                <p className="text-sm text-muted-foreground">
                  Inspirational? Questionable. Relatable? Absolutely.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
