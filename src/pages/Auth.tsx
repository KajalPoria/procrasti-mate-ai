import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showGoogleFail, setShowGoogleFail] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({ title: "Welcome back, lazy legend! 😴" });
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) throw error;
        toast({ 
          title: "🎉 Signed up successfully!", 
          description: "Configuring excuses... Done! Welcome to the league!"
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Oops!",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 animate-fade-in">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            {isLogin ? "Welcome Back! 💤" : "Join the League 🛋️"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Ready to delay your goals?" : "Become a Lazy Legend"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required={!isLogin}
                className="mt-1"
              />
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1"
            />
          </div>

          {isLogin && (
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Loading..." : isLogin ? "Login to Delay Your Goals" : "Join the League of Lazy Legends"}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setShowGoogleFail(true)}
          >
            Sign in with Google
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </form>

        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="w-full mt-6"
        >
          ← Back to Home
        </Button>
      </Card>

      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🤔 Forgot Password?</DialogTitle>
            <DialogDescription className="text-center pt-4">
              <p className="text-lg">You probably forgot your motivation too.</p>
              <div className="text-6xl my-4">😅</div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showGoogleFail} onOpenChange={setShowGoogleFail}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🚫 Google Sign-In Failed</DialogTitle>
            <DialogDescription className="text-center pt-4">
              <p className="text-lg">Google declined to enable procrastination mode.</p>
              <div className="text-6xl my-4">🙈</div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
