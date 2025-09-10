import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Lock, Target, Trophy, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { sampleProblems } from "@/data/problems";

export default function Roadmap() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Define roadmap structure - problems arranged by difficulty and importance
  const roadmapProblems = [
    // Foundation Level (Must solve)
    { ...sampleProblems[0], order: 1, section: "Foundation", required: true }, // Two Sum
    { ...sampleProblems[1], order: 2, section: "Foundation", required: true }, // Reverse Linked List
    { ...sampleProblems[2], order: 3, section: "Foundation", required: true }, // Valid Parentheses
    { ...sampleProblems[4], order: 4, section: "Foundation", required: true }, // Climbing Stairs
    { ...sampleProblems[5], order: 5, section: "Foundation", required: true }, // Binary Tree Inorder
    
    // Intermediate Level
    { ...sampleProblems[3], order: 6, section: "Intermediate", required: true }, // Maximum Subarray
    { ...sampleProblems[7], order: 7, section: "Intermediate", required: true }, // Longest Palindromic
    { ...sampleProblems[6], order: 8, section: "Advanced", required: false }, // 3Sum
  ];

  const [completedProblems] = useState<number[]>([1, 3, 5]); // Mock completed problems
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "border-emerald-400 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10";
      case "Medium": return "border-amber-400 text-amber-600 dark:text-amber-300 bg-amber-500/10";
      case "Hard": return "border-red-400 text-red-600 dark:text-red-300 bg-red-500/10";
      default: return "border-border text-muted-foreground";
    }
  };

  const isCompleted = (problemId: number) => completedProblems.includes(problemId);
  const isLocked = (index: number) => {
    if (index === 0) return false; // First problem is always unlocked
    // Check if previous required problem is completed
    const prevProblem = roadmapProblems[index - 1];
    return prevProblem.required && !isCompleted(prevProblem.id);
  };

  const getCompletionRate = () => {
    const completed = roadmapProblems.filter(p => isCompleted(p.id)).length;
    return Math.round((completed / roadmapProblems.length) * 100);
  };

  const handleProblemClick = (problem: any, index: number) => {
    if (isLocked(index)) return;
    navigate(`/problem/${problem.id}`);
  };

  const groupedProblems = roadmapProblems.reduce((acc, problem) => {
    if (!acc[problem.section]) acc[problem.section] = [];
    acc[problem.section].push(problem);
    return acc;
  }, {} as Record<string, typeof roadmapProblems>);

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Target className="h-8 w-8 mr-3 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Coding100 Roadmap
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master DSA and crack interviews with our carefully curated problem sequence. 
            Complete problems in order to build strong foundations.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-primary" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-lg font-bold text-primary">{getCompletionRate()}%</span>
            </div>
            <Progress value={getCompletionRate()} className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-500">
                  {roadmapProblems.filter(p => isCompleted(p.id)).length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {roadmapProblems.length - roadmapProblems.filter(p => isCompleted(p.id)).length}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">
                  {roadmapProblems.filter(p => p.required).length}
                </div>
                <div className="text-sm text-muted-foreground">Required</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap Sections */}
        <div className="space-y-8">
          {Object.entries(groupedProblems).map(([section, problems]) => (
            <div key={section}>
              <div className="flex items-center mb-6">
                <Star className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">{section}</h2>
                <Badge variant="secondary" className="ml-3">
                  {problems.filter(p => isCompleted(p.id)).length}/{problems.length}
                </Badge>
              </div>
              
              <div className="grid gap-4">
                {problems.map((problem, index) => {
                  const globalIndex = roadmapProblems.findIndex(p => p.id === problem.id);
                  const completed = isCompleted(problem.id);
                  const locked = isLocked(globalIndex);
                  
                  return (
                    <Card 
                      key={problem.id}
                      className={`transition-all duration-200 cursor-pointer border ${
                        completed 
                          ? 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20' 
                          : locked 
                          ? 'border-muted-foreground/20 bg-muted/10 cursor-not-allowed' 
                          : 'border-border hover:border-primary/50 hover:shadow-md'
                      }`}
                      onClick={() => handleProblemClick(problem, globalIndex)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="flex items-center space-x-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                completed 
                                  ? 'bg-emerald-500 text-white' 
                                  : locked 
                                  ? 'bg-muted-foreground/20 text-muted-foreground' 
                                  : 'bg-primary text-primary-foreground'
                              }`}>
                                {problem.order}
                              </div>
                              {completed ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              ) : locked ? (
                                <Lock className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className={`text-lg font-semibold ${
                                  locked ? 'text-muted-foreground' : 'text-foreground'
                                }`}>
                                  {problem.title}
                                </h3>
                                {problem.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    Required
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <Badge 
                                  variant="outline" 
                                  className={getDifficultyColor(problem.difficulty)}
                                >
                                  {problem.difficulty}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {problem.topics.slice(0, 2).join(", ")}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {problem.acceptance_rate}% acceptance
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-4">
                            <Button 
                              variant={completed ? "secondary" : locked ? "ghost" : "default"}
                              disabled={locked}
                              size="sm"
                            >
                              {completed ? "Review" : locked ? "Locked" : "Solve"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle>💡 Roadmap Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Complete problems in the given order for optimal learning progression</li>
              <li>• Required problems must be solved to unlock the next ones</li>
              <li>• Focus on understanding patterns rather than memorizing solutions</li>
              <li>• Each section builds upon concepts from previous sections</li>
              <li>• Take breaks between difficult problems to let concepts sink in</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}