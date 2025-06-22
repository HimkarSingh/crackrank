
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Users, TrendingUp, CheckCircle, ArrowRight, Target, BookOpen, MessageSquare, Zap, Star } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-cyan-400" />,
      title: "Curated Problems",
      description: "50+ handpicked DSA problems from top companies like Google, Amazon, and Meta"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-400" />,
      title: "Progress Tracking",
      description: "Track your solving streaks, accuracy rates, and improvement over time"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-400" />,
      title: "Community Support",
      description: "Connect with peers, share solutions, and learn from discussions"
    },
    {
      icon: <Target className="h-8 w-8 text-pink-400" />,
      title: "Interview Ready",
      description: "Problems categorized by company and difficulty to match your target roles"
    }
  ];

  const stats = [
    { number: "50+", label: "Curated Problems", color: "text-cyan-400" },
    { number: "10K+", label: "Users Learning", color: "text-emerald-400" },
    { number: "95%", label: "Success Rate", color: "text-purple-400" },
    { number: "500+", label: "Companies Hiring", color: "text-pink-400" }
  ];

  const recentProblems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: 72 },
    { id: 2, title: "Maximum Subarray", difficulty: "Medium", acceptance: 54 },
    { id: 3, title: "3Sum", difficulty: "Medium", acceptance: 35 }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-500 text-white border-emerald-400";
      case "Medium": return "bg-amber-500 text-white border-amber-400";
      case "Hard": return "bg-red-500 text-white border-red-400";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-inter">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">Level up your coding skills</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Ace Your <span className="text-yellow-300">Coding Interviews</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-4xl mx-auto leading-relaxed">
              The all-in-one platform to master Data Structures & Algorithms with curated problems, 
              progress tracking, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/problems">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 text-lg px-10 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200">
                  Start Practicing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white bg-white/10 hover:bg-white hover:text-gray-900 backdrop-blur-sm text-lg px-10 py-4 rounded-xl transition-all duration-200">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 opacity-10">
          <Code className="h-20 w-20" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <CheckCircle className="h-24 w-24" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5">
          <Star className="h-16 w-16" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools and resources designed to help you crack any coding interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-sm group hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
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
      <section className="py-24 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Popular Problems
            </h2>
            <p className="text-xl text-gray-300">
              Start with these frequently asked interview questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recentProblems.map((problem) => (
              <Card key={problem.id} className="bg-slate-800/60 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-xl text-white group-hover:text-cyan-400 transition-colors">
                      {problem.title}
                    </h3>
                    <Badge className={`${getDifficultyColor(problem.difficulty)} font-medium px-3 py-1`}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="bg-slate-700 px-3 py-1 rounded-full">#{problem.id}</span>
                    <span className="text-emerald-400 font-medium">{problem.acceptance}% acceptance</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/problems">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white text-lg px-10 py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200">
                <BookOpen className="mr-3 h-6 w-6" />
                View All Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl mb-12 text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who have successfully prepared for their coding interviews with CrackRank
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-10 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200 font-semibold">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-gray-900 backdrop-blur-sm text-lg px-10 py-4 rounded-xl transition-all duration-200">
              <MessageSquare className="mr-3 h-6 w-6" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
