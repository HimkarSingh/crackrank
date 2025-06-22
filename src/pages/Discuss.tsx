
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowUp, Clock, User } from "lucide-react";

export default function Discuss() {
  const discussions = [
    {
      id: 1,
      title: "Optimal approach for Two Sum problem",
      author: "coder123",
      replies: 8,
      upvotes: 24,
      tags: ["Array", "Hash Table"],
      timeAgo: "2 hours ago",
      lastActivity: "30 min ago"
    },
    {
      id: 2,
      title: "Dynamic Programming vs Memoization - When to use what?",
      author: "algoexpert",
      replies: 15,
      upvotes: 42,
      tags: ["Dynamic Programming", "General"],
      timeAgo: "5 hours ago",
      lastActivity: "1 hour ago"
    },
    {
      id: 3,
      title: "Best practices for Binary Tree traversal",
      author: "treemaster",
      replies: 12,
      upvotes: 33,
      tags: ["Tree", "DFS", "BFS"],
      timeAgo: "1 day ago",
      lastActivity: "3 hours ago"
    },
    {
      id: 4,
      title: "Time complexity analysis for sorting algorithms",
      author: "sortguru",
      replies: 20,
      upvotes: 56,
      tags: ["Sorting", "Big O"],
      timeAgo: "2 days ago",
      lastActivity: "6 hours ago"
    },
    {
      id: 5,
      title: "Graph algorithms for coding interviews",
      author: "graphwiz",
      replies: 7,
      upvotes: 19,
      tags: ["Graph", "BFS", "DFS"],
      timeAgo: "3 days ago",
      lastActivity: "12 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Discussions</h1>
              <p className="text-gray-300 text-lg">Connect with the community and share knowledge</p>
            </div>
            <Button className="bg-white text-black hover:bg-gray-100 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:scale-105">
              <MessageSquare className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </div>
        </div>

        {/* Featured Topics */}
        <Card className="mb-8 bg-black/50 backdrop-blur-sm border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <CardHeader>
            <CardTitle className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Popular Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Dynamic Programming", "Arrays", "Trees", "Graphs", "System Design", "Interview Tips", "Big O", "Recursion"].map(topic => (
                <Badge 
                  key={topic} 
                  variant="outline" 
                  className="cursor-pointer border-white/30 text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all duration-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Discussions List */}
        <div className="space-y-4">
          {discussions.map(discussion => (
            <Card 
              key={discussion.id} 
              className="bg-black/50 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-300 mb-2">
                      {discussion.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{discussion.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{discussion.timeAgo}</span>
                      </div>
                      <span>Last activity: {discussion.lastActivity}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {discussion.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          className="text-xs bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-1 group-hover:text-white transition-colors">
                      <ArrowUp className="h-4 w-4" />
                      <span>{discussion.upvotes}</span>
                    </div>
                    <div className="flex items-center space-x-1 group-hover:text-white transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>{discussion.replies}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="bg-transparent border-white/30 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            Load More Discussions
          </Button>
        </div>
      </div>
    </div>
  );
}
