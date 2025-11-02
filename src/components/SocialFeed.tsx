import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Post = {
  id: string;
  content: string;
  reactions: { relatable: number; same: number; legend: number };
  created_at: string;
  profiles: { name: string } | null;
};

export const SocialFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        profiles:user_id (name)
      `)
      .order("created_at", { ascending: false })
      .limit(10);

    if (data) setPosts(data as any);
  };

  const createPost = async () => {
    if (!newPost.trim()) return;
    
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({ title: "Please login to post", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("posts")
      .insert([{ user_id: user.id, content: newPost }]);

    if (error) {
      toast({ title: "Failed to post", variant: "destructive" });
    } else {
      setNewPost("");
      loadPosts();
      toast({ title: "Posted successfully! 🎉" });
    }
    setLoading(false);
  };

  const addReaction = async (postId: string, type: "relatable" | "same" | "legend") => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newReactions = {
      ...post.reactions,
      [type]: post.reactions[type] + 1,
    };

    await supabase
      .from("posts")
      .update({ reactions: newReactions })
      .eq("id", postId);

    loadPosts();
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-secondary/30">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            💬 Slacker Space
          </h3>
          <p className="text-sm text-muted-foreground">Share what you didn't do today</p>
        </div>

        <div className="space-y-3">
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Skipped gym again... #Consistency"
            className="resize-none"
            rows={3}
          />
          <Button 
            onClick={createPost} 
            disabled={loading || !newPost.trim()}
            className="w-full"
          >
            Post Your Achievement
          </Button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {posts.map((post) => (
            <Card key={post.id} className="p-4 bg-secondary/5">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-sm text-primary">
                    {post.profiles?.name || "Anonymous Procrastinator"}
                  </p>
                  <p className="text-foreground mt-1">{post.content}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addReaction(post.id, "relatable")}
                    className="text-xs"
                  >
                    😂 Relatable {post.reactions.relatable}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addReaction(post.id, "same")}
                    className="text-xs"
                  >
                    😩 Same {post.reactions.same}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addReaction(post.id, "legend")}
                    className="text-xs"
                  >
                    🏆 Legend {post.reactions.legend}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};
