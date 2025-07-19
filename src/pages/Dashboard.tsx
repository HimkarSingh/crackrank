import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, TrendingUp, Clock, Code, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo data for non-authenticated users
  const demoStats = {
    totalSolved: 24,
    totalProblems: 50,
    weeklyStreak: 7,
    accuracy: 78,
    easyCompleted: 15,
    mediumCompleted: 7,
    hardCompleted: 2,
    thisWeek: 12,
    recentSubmissions: [
      { id: 1, problem: "Two Sum", verdict: "Accepted", timestamp: "2 hours ago", difficulty: "Easy" },
      { id: 2, problem: "3Sum", verdict: "Wrong Answer", timestamp: "5 hours ago", difficulty: "Medium" },
      { id: 3, problem: "Valid Parentheses", verdict: "Accepted", timestamp: "1 day ago", difficulty: "Easy" },
      { id: 4, problem: "Maximum Subarray", verdict: "Accepted", timestamp: "2 days ago", difficulty: "Medium" },
      { id: 5, problem: "Climbing Stairs", verdict: "Accepted", timestamp: "3 days ago", difficulty: "Easy" },
    ]
  };

  useEffect(() => {
    if (user) {
      fetchUserStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      // For now, we'll use demo data but you can implement real fetching here
      // This is where you'd fetch real user statistics from your database
      setUserStats({
        totalSolved: 0,
        totalProblems: 50,
        weeklyStreak: 0,
        accuracy: 0,
        easyCompleted: 0,
        mediumCompleted: 0,
        hardCompleted: 0,
        thisWeek: 0,
        recentSubmissions: []
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    return verdict === "Accepted" 
      ? "bg-emerald-500 text-white border border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
      : "bg-red-500 text-white border border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-500 text-white border border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]";
      case "Medium": return "bg-amber-500 text-white border border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.3)]";
      case "Hard": return "bg-red-500 text-white border border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.3)]";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const displayStats = user ? userStats : demoStats;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Login Banner for Non-Authenticated Users */}
        {!user && (
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Join Our Coding Community!</h3>
                  <p className="text-sm text-muted-foreground">Sign up to track your real progress, earn achievements, and compete with others</p>
                </div>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="shrink-0"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            {user ? "Your Dashboard" : "Dashboard Preview"}
          </h1>
          <p className="text-muted-foreground">
            {user ? "Track your coding interview preparation progress" : "See what your dashboard will look like"}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Problems Solved</CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{displayStats?.totalSolved || 0}</div>
              <p className="text-xs text-muted-foreground">
                out of {displayStats?.totalProblems || 50} total
              </p>
              <Progress 
                value={displayStats ? (displayStats.totalSolved / displayStats.totalProblems) * 100 : 0} 
                className="mt-2 bg-secondary border border-border/30"
              />
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Weekly Streak</CardTitle>
              <Calendar className="h-4 w-4 text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center text-card-foreground">
                {displayStats?.weeklyStreak || 0}
                <span className="text-amber-500 ml-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">🔥</span>
              </div>
              <p className="text-xs text-muted-foreground">
                consecutive days
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{displayStats?.accuracy || 0}%</div>
              <p className="text-xs text-muted-foreground">
                acceptance rate
              </p>
              <Progress 
                value={displayStats?.accuracy || 0} 
                className="mt-2 bg-secondary border border-border/30"
              />
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{displayStats?.thisWeek || 0}</div>
              <p className="text-xs text-muted-foreground">
                problems solved
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress by Difficulty */}
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-card-foreground">
                <Code className="h-5 w-5 mr-2 text-primary drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                Progress by Difficulty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor("Easy")}>Easy</Badge>
                      <span className="text-sm text-muted-foreground">{displayStats?.easyCompleted || 0}/20</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">
                      {Math.round(((displayStats?.easyCompleted || 0) / 20) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={((displayStats?.easyCompleted || 0) / 20) * 100} 
                    className="h-2 bg-secondary border border-border/30"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor("Medium")}>Medium</Badge>
                      <span className="text-sm text-muted-foreground">{displayStats?.mediumCompleted || 0}/20</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">
                      {Math.round(((displayStats?.mediumCompleted || 0) / 20) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={((displayStats?.mediumCompleted || 0) / 20) * 100} 
                    className="h-2 bg-secondary border border-border/30"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor("Hard")}>Hard</Badge>
                      <span className="text-sm text-muted-foreground">{displayStats?.hardCompleted || 0}/10</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">
                      {Math.round(((displayStats?.hardCompleted || 0) / 10) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={((displayStats?.hardCompleted || 0) / 10) * 100} 
                    className="h-2 bg-secondary border border-border/30"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayStats?.recentSubmissions?.length > 0 ? (
                  displayStats.recentSubmissions.map((submission) => (
                    <div 
                      key={submission.id} 
                      className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-card/30 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge className={getDifficultyColor(submission.difficulty)}>
                          {submission.difficulty}
                        </Badge>
                        <div>
                          <p className="font-medium text-sm text-card-foreground">{submission.problem}</p>
                          <p className="text-xs text-muted-foreground">{submission.timestamp}</p>
                        </div>
                      </div>
                      <Badge className={getVerdictColor(submission.verdict)}>
                        {submission.verdict}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      {user ? "No submissions yet. Start solving problems!" : "Your submissions will appear here"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Graph Placeholder */}
        <Card className="mt-8 border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-card-foreground">Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-secondary/30 border border-border/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                {user ? "Activity graph coming soon..." : "Your activity graph will appear here"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}