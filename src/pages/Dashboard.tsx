
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, TrendingUp, Clock, Code } from "lucide-react";

export default function Dashboard() {
  // Mock user data
  const userStats = {
    totalSolved: 24,
    totalProblems: 50,
    weeklyStreak: 7,
    accuracy: 78,
    easyCompleted: 15,
    mediumCompleted: 7,
    hardCompleted: 2,
    recentSubmissions: [
      { id: 1, problem: "Two Sum", verdict: "Accepted", timestamp: "2 hours ago", difficulty: "Easy" },
      { id: 2, problem: "3Sum", verdict: "Wrong Answer", timestamp: "5 hours ago", difficulty: "Medium" },
      { id: 3, problem: "Valid Parentheses", verdict: "Accepted", timestamp: "1 day ago", difficulty: "Easy" },
      { id: 4, problem: "Maximum Subarray", verdict: "Accepted", timestamp: "2 days ago", difficulty: "Medium" },
      { id: 5, problem: "Climbing Stairs", verdict: "Accepted", timestamp: "3 days ago", difficulty: "Easy" },
    ]
  };

  const getVerdictColor = (verdict: string) => {
    return verdict === "Accepted" ? "bg-success text-white" : "bg-destructive text-white";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-white";
      case "Medium": return "bg-orange-500 text-white";
      case "Hard": return "bg-destructive text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-secondary font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your coding interview preparation progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalSolved}</div>
              <p className="text-xs text-muted-foreground">
                out of {userStats.totalProblems} total
              </p>
              <Progress 
                value={(userStats.totalSolved / userStats.totalProblems) * 100} 
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Streak</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {userStats.weeklyStreak}
                <span className="text-orange-600 ml-1">🔥</span>
              </div>
              <p className="text-xs text-muted-foreground">
                consecutive days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.accuracy}%</div>
              <p className="text-xs text-muted-foreground">
                acceptance rate
              </p>
              <Progress value={userStats.accuracy} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Clock className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                problems solved
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress by Difficulty */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Progress by Difficulty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-success text-white">Easy</Badge>
                      <span className="text-sm text-gray-600">{userStats.easyCompleted}/20</span>
                    </div>
                    <span className="text-sm font-medium">{Math.round((userStats.easyCompleted / 20) * 100)}%</span>
                  </div>
                  <Progress value={(userStats.easyCompleted / 20) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-orange-500 text-white">Medium</Badge>
                      <span className="text-sm text-gray-600">{userStats.mediumCompleted}/20</span>
                    </div>
                    <span className="text-sm font-medium">{Math.round((userStats.mediumCompleted / 20) * 100)}%</span>
                  </div>
                  <Progress value={(userStats.mediumCompleted / 20) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-destructive text-white">Hard</Badge>
                      <span className="text-sm text-gray-600">{userStats.hardCompleted}/10</span>
                    </div>
                    <span className="text-sm font-medium">{Math.round((userStats.hardCompleted / 10) * 100)}%</span>
                  </div>
                  <Progress value={(userStats.hardCompleted / 10) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userStats.recentSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge className={getDifficultyColor(submission.difficulty)}>
                        {submission.difficulty}
                      </Badge>
                      <div>
                        <p className="font-medium text-sm">{submission.problem}</p>
                        <p className="text-xs text-gray-500">{submission.timestamp}</p>
                      </div>
                    </div>
                    <Badge className={getVerdictColor(submission.verdict)}>
                      {submission.verdict}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Graph Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Activity graph coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
