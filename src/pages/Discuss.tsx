import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowUp, Clock, User, ArrowRight, Heart, MessageCircle, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Discuss() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const discussions = [
    {
      id: 1,
      title: "Optimal approach for Two Sum problem",
      author: "coder123",
      replies: 8,
      likes: 24,
      tags: ["Array", "Hash Table"],
      timestamp: "2 hours ago",
      preview: "I've been working on the Two Sum problem and found multiple approaches. Which one would you recommend for interview scenarios?",
      category: "Problem Discussion"
    },
    {
      id: 2,
      title: "Dynamic Programming vs Memoization - When to use what?",
      author: "algoexpert",
      replies: 15,
      likes: 42,
      tags: ["Dynamic Programming", "General"],
      timestamp: "5 hours ago",
      preview: "Can someone explain the key differences between DP and memoization? I'm getting confused about when to apply each technique.",
      category: "Learning"
    },
    {
      id: 3,
      title: "Best practices for Binary Tree traversal",
      author: "treemaster",
      replies: 12,
      likes: 33,
      tags: ["Tree", "DFS", "BFS"],
      timestamp: "1 day ago",
      preview: "What are the most efficient ways to traverse binary trees? Looking for both recursive and iterative approaches.",
      category: "Best Practices"
    },
    {
      id: 4,
      title: "Time complexity analysis for sorting algorithms",
      author: "sortguru",
      replies: 20,
      likes: 56,
      tags: ["Sorting", "Big O"],
      timestamp: "2 days ago",
      preview: "Comprehensive analysis of different sorting algorithms and their time complexities in various scenarios.",
      category: "Educational"
    },
    {
      id: 5,
      title: "Graph algorithms for coding interviews",
      author: "graphwiz",
      replies: 7,
      likes: 19,
      tags: ["Graph", "BFS", "DFS"],
      timestamp: "3 days ago",
      preview: "Which graph algorithms are most commonly asked in technical interviews? Need to prioritize my study plan.",
      category: "Interview Prep"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Problem Discussion": return "border-emerald-400 text-emerald-500 bg-emerald-500/10";
      case "Learning": return "border-blue-400 text-blue-500 bg-blue-500/10";
      case "Best Practices": return "border-purple-400 text-purple-500 bg-purple-500/10";
      case "Educational": return "border-amber-400 text-amber-500 bg-amber-500/10";
      case "Interview Prep": return "border-red-400 text-red-500 bg-red-500/10";
      default: return "border-border text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Login Banner for Non-Authenticated Users */}
        {!user && (
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Join Our Discussion Community!</h3>
                  <p className="text-sm text-muted-foreground">Sign up to participate in discussions, ask questions, and share knowledge</p>
                </div>
                <Button onClick={() => navigate('/auth')} className="shrink-0">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                Discussion Forum
              </h1>
              <p className="text-muted-foreground">
                {user ? "Share knowledge and learn from the community" : "Explore discussions - sign up to participate!"}
              </p>
            </div>
            <Button 
              onClick={() => user ? undefined : navigate('/auth')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              {user ? "New Discussion" : "Sign Up to Discuss"}
            </Button>
          </div>
        </div>

        {/* Featured Topics */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <CardHeader>
            <CardTitle className="text-card-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Popular Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Dynamic Programming", "Arrays", "Trees", "Graphs", "System Design", "Interview Tips", "Big O", "Recursion"].map(topic => (
                <Badge 
                  key={topic} 
                  variant="outline" 
                  className="cursor-pointer border-border text-muted-foreground hover:bg-accent hover:text-foreground hover:border-primary/30 transition-all duration-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Discussions List */}
        <div className="space-y-6">
          {discussions.map((discussion) => (
            <Card 
              key={discussion.id} 
              className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                    {discussion.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {discussion.preview}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{discussion.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{discussion.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{discussion.replies} replies</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{discussion.likes} likes</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex flex-col items-end space-y-2">
                  <Badge 
                    variant="outline"
                    className={`text-xs border ${getCategoryColor(discussion.category)} group-hover:shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-300`}
                  >
                    {discussion.category}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] transition-all duration-300" />
                </div>
              </div>
              
              {discussion.tags && (
                <div className="flex flex-wrap gap-2">
                  {discussion.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-accent/30 border border-border/50 text-muted-foreground text-xs rounded group-hover:border-primary/20 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Ready to start a discussion?</p>
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Start New Discussion
          </Button>
        </div>
      </div>
    </div>
  );
}