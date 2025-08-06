import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Users, TrendingUp, CheckCircle, ArrowRight, Target, BookOpen, MessageSquare, Zap, Star, Brain } from "lucide-react";
import PricingSection from "@/components/PricingSection";

export default function Index() {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Curated Problems",
      description: "50+ handpicked DSA problems from top companies like Google, Amazon, and Meta"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Progress Tracking",
      description: "Track your solving streaks, accuracy rates, and improvement over time"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Support",
      description: "Connect with peers, share solutions, and learn from discussions"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Interview Ready",
      description: "Problems categorized by company and difficulty to match your target roles"
    }
  ];


  const recentProblems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: 72, description: "Find two numbers that add up to target" },
    { id: 2, title: "Maximum Subarray", difficulty: "Medium", acceptance: 54, description: "Find contiguous subarray with largest sum" },
    { id: 3, title: "3Sum", difficulty: "Medium", acceptance: 35, description: "Find all unique triplets that sum to zero" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "border-emerald-400 text-emerald-500 bg-emerald-500/10";
      case "Medium": return "border-amber-400 text-amber-500 bg-amber-500/10";
      case "Hard": return "border-red-400 text-red-500 bg-red-500/10";
      default: return "border-border text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* Hero Section */}
      <section className="relative bg-background text-foreground py-24 overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-1.5 border border-border shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Zap className="h-4 w-4 text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                <span className="text-xs font-medium text-foreground">Level up your coding skills</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Ace Your <span className="text-primary drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pulse">Coding Interviews</span>
            </h1>
            <p className="text-base md:text-lg mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The all-in-one platform to master Data Structures & Algorithms with curated problems, 
              progress tracking, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/problems">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border-0 text-sm px-6 py-3 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:scale-105 transition-all duration-200 font-semibold">
                  Start Practicing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-2 border-border text-foreground bg-transparent hover:bg-accent hover:text-foreground backdrop-blur-sm text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative neon elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Code className="h-20 w-20 text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <CheckCircle className="h-24 w-24 text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <Star className="h-16 w-16 text-primary drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Everything You Need to Succeed
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive tools and resources designed to help you crack any coding interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-sm group hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <div className="p-3 rounded-full bg-accent/20 border border-border shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-base text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Problems Preview */}
      <section className="py-16 bg-accent/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Popular Problems
            </h2>
            <p className="text-sm text-muted-foreground">
              Start with these frequently asked interview questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recentProblems.map((problem) => (
              <Card key={problem.id} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-sm group hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-base text-card-foreground group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all">
                      {problem.title}
                    </h3>
                    <Badge className={`${getDifficultyColor(problem.difficulty)} font-medium px-2 py-0.5 text-xs border`}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs mb-3">{problem.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="bg-accent/30 border border-border px-3 py-1 rounded-full">#{problem.id}</span>
                    <span className="text-card-foreground font-medium">{problem.acceptance}% acceptance</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/problems">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-6 py-3 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-105 transition-all duration-200 font-semibold">
                <BookOpen className="mr-2 h-4 w-4" />
                View All Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-sm mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who have successfully prepared for their coding interviews with CrackRank
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-6 py-3 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:scale-105 transition-all duration-200 font-semibold">
                Get Started Free
              </Button>
            </Link>
            <Link to="/discuss">
              <Button size="lg" variant="outline" className="border-2 border-border text-foreground bg-transparent hover:bg-accent hover:text-foreground backdrop-blur-sm text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <MessageSquare className="mr-2 h-4 w-4" />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/30 border-t border-border">
        <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-bold text-foreground">CrackRank</h3>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Master coding interviews with curated problems, progress tracking, and community support. Your gateway to landing dream tech jobs.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/crackrank" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="https://github.com/crackrank" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/crackrank" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Platform</h3>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/problems" className="text-muted-foreground hover:text-primary transition-colors">Browse Problems</Link></li>
                <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/discuss" className="text-muted-foreground hover:text-primary transition-colors">Discussions</Link></li>
                <li><Link to="/payment" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Support</h3>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
                <li><a href="mailto:support@crackrank.com" className="text-muted-foreground hover:text-primary transition-colors">Contact Support</a></li>
                <li><a href="mailto:feedback@crackrank.com" className="text-muted-foreground hover:text-primary transition-colors">Send Feedback</a></li>
                <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Get Started</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
                <li><Link to="/guidelines" className="text-muted-foreground hover:text-primary transition-colors">Community Guidelines</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-muted-foreground mb-3 md:mb-0">
              © 2025 CrackRank. All rights reserved. Built for developers, by developers.
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-muted-foreground">Contact us:</span>
              <a href="mailto:hello@crackrank.com" className="text-primary hover:text-primary/80 transition-colors font-medium">
                hello@crackrank.com
              </a>
              <a href="tel:+1-555-0123" className="text-primary hover:text-primary/80 transition-colors font-medium">
                +1 (555) 0123
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}