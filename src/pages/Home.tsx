import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Home = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8 animate-slide-up">
        {/* Logo/Header */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-float">
            ProcrastiMate 🧠🚫
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
            Because Doing Nothing is Hard Work
          </p>
          <p className="text-lg md:text-xl text-foreground/70 italic">
            Your AI partner in professional procrastination 💤
          </p>
        </div>

        {/* Emoji decoration */}
        <div className="flex justify-center gap-4 text-4xl animate-bounce-in">
          <span className="animate-wiggle">😴</span>
          <span className="animate-float">📱</span>
          <span className="animate-wiggle">🎮</span>
          <span className="animate-float">🍕</span>
          <span className="animate-wiggle">🛋️</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            onClick={() => navigate("/dashboard")}
            size="lg"
            className="text-xl px-8 py-6 rounded-2xl shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.3)] hover:shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.5)] transition-all hover:scale-105"
          >
            🚀 Start Not Working
          </Button>
          <Button
            onClick={() => setShowDialog(true)}
            variant="outline"
            size="lg"
            className="text-xl px-8 py-6 rounded-2xl border-2 hover:scale-105 transition-all"
          >
            💼 I Actually Want to Work
          </Button>
        </div>

        {/* Fun stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
            <div className="text-4xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground mt-2">Success Rate of Not Working</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-secondary/20 hover:border-secondary/40 transition-all hover:scale-105">
            <div className="text-4xl font-bold text-secondary">24/7</div>
            <div className="text-sm text-muted-foreground mt-2">Professional Procrastination</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-accent/20 hover:border-accent/40 transition-all hover:scale-105">
            <div className="text-4xl font-bold text-accent">∞</div>
            <div className="text-sm text-muted-foreground mt-2">Excuses Generated Daily</div>
          </div>
        </div>
      </div>

      {/* Dialog for "I Actually Want to Work" */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">🚨 Alert! Alert!</DialogTitle>
            <DialogDescription className="text-lg pt-4">
              <div className="space-y-4 text-center">
                <p className="text-xl font-semibold">We don't do that here 😎</p>
                <p className="text-muted-foreground">
                  Working is so 2010s. Let's embrace the art of strategic delay instead!
                </p>
                <div className="text-6xl pt-2">🙅‍♂️</div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
