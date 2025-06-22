
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Users, TrendingUp, CheckCircle, ArrowRight, Target, BookOpen, MessageSquare, Zap, Star } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-white" />,
      title: "Curated Problems",
      description: "50+ handpicked DSA problems from top companies like Google, Amazon, and Meta"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      title: "Progress Tracking",
      description: "Track your solving streaks, accuracy rates, and improvement over time"
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Community Support",
      description: "Connect with peers, share solutions, and learn from discussions"
    },
    {
      icon: <Target className="h-8 w-8 text-white" />,
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
      case "Easy": return "bg-green-500 text-white border-green-400";
      case "Medium": return "bg-yellow-500 text-black border-yellow-400";
      case "Hard": return "bg-red-500 text-white border-red-400";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Zap className="h-5 w-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span className="text-sm font-medium text-white">Level up your coding skills</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Ace Your <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse">Coding Interviews</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The all-in-one platform to master Data Structures & Algorithms with curated problems, 
              progress tracking, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/problems">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 border-0 text-lg px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:scale-105 transition-all duration-200 font-semibold">
                  Start Practicing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white bg-transparent hover:bg-white hover:text-black backdrop-blur-sm text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative neon elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Code className="h-20 w-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <CheckCircle className="h-24 w-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <Star className="h-16 w-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools and resources designed to help you crack any coding interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-sm group hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <div className="p-3 rounded-full bg-white/5 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Problems Preview */}
      <section className="py-24 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Popular Problems
            </h2>
            <p className="text-xl text-gray-300">
              Start with these frequently asked interview questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recentProblems.map((problem) => (
              <Card key={problem.id} className="bg-black border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-xl text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">
                      {problem.title}
                    </h3>
                    <Badge className={`${getDifficultyColor(problem.difficulty)} font-medium px-3 py-1`}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="bg-white/5 border border-white/20 px-3 py-1 rounded-full">#{problem.id}</span>
                    <span className="text-white font-medium">{problem.acceptance}% acceptance</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/problems">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:scale-105 transition-all duration-200 font-semibold">
                <BookOpen className="mr-3 h-6 w-6" />
                View All Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who have successfully prepared for their coding interviews with CrackRank
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:scale-105 transition-all duration-200 font-semibold">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white bg-transparent hover:bg-white hover:text-black backdrop-blur-sm text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <MessageSquare className="mr-3 h-6 w-6" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
