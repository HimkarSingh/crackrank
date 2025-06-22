import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Users, TrendingUp, CheckCircle, ArrowRight, Target, BookOpen, MessageSquare } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Curated Problems",
      description: "50+ handpicked DSA problems from top companies like Google, Amazon, and Meta"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-success" />,
      title: "Progress Tracking",
      description: "Track your solving streaks, accuracy rates, and improvement over time"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Community Support",
      description: "Connect with peers, share solutions, and learn from discussions"
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: "Interview Ready",
      description: "Problems categorized by company and difficulty to match your target roles"
    }
  ];

  const stats = [
    { number: "50+", label: "Curated Problems" },
    { number: "10K+", label: "Users Learning" },
    { number: "95%", label: "Success Rate" },
    { number: "500+", label: "Companies Hiring" }
  ];

  const recentProblems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: 72 },
    { id: 2, title: "Maximum Subarray", difficulty: "Medium", acceptance: 54 },
    { id: 3, title: "3Sum", difficulty: "Medium", acceptance: 35 }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-white";
      case "Medium": return "bg-orange-500 text-white";
      case "Hard": return "bg-destructive text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ace Your <span className="text-yellow-300">Coding Interviews</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              The all-in-one platform to master Data Structures & Algorithms with curated problems, 
              progress tracking, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/problems">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
                  Start Practicing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Code className="h-16 w-16" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <CheckCircle className="h-20 w-20" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources designed to help you crack any coding interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors cursor-pointer">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Problems Preview */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Problems
            </h2>
            <p className="text-xl text-muted-foreground">
              Start with these frequently asked interview questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {recentProblems.map((problem) => (
              <Card key={problem.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{problem.title}</h3>
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>#{problem.id}</span>
                    <span>{problem.acceptance}% acceptance</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/problems">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <BookOpen className="mr-2 h-5 w-5" />
                View All Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of developers who have successfully prepared for their coding interviews with CrackRank
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3">
              <MessageSquare className="mr-2 h-5 w-5" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
