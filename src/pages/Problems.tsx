
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleProblems, companies, topics } from "@/data/problems";
import { Search, Filter } from "lucide-react";

export default function Problems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");

  const filteredProblems = useMemo(() => {
    return sampleProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.id.toString().includes(searchTerm);
      const matchesDifficulty = selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
      const matchesCompany = selectedCompany === "all" || problem.companies.includes(selectedCompany);
      const matchesTopic = selectedTopic === "all" || problem.topics.includes(selectedTopic);

      return matchesSearch && matchesDifficulty && matchesCompany && matchesTopic;
    });
  }, [searchTerm, selectedDifficulty, selectedCompany, selectedTopic]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Problems</h1>
          <p className="text-gray-300 text-lg">Practice coding problems to ace your interviews</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/30 border-white/30 text-white placeholder-gray-400 focus:border-white/60 focus:ring-white/20"
                />
              </div>
            </div>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="bg-black/30 border-white/30 text-white focus:border-white/60">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/30">
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="bg-black/30 border-white/30 text-white focus:border-white/60">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/30">
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="bg-black/30 border-white/30 text-white focus:border-white/60">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/30">
                <SelectItem value="all">All Topics</SelectItem>
                {topics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No problems found matching your criteria.</p>
            </div>
          ) : (
            filteredProblems.map(problem => (
              <Link key={problem.id} to={`/problem/${problem.id}`}>
                <Card className="bg-black/50 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-400 w-8">#{problem.id}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-300">
                            {problem.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge className={getDifficultyColor(problem.difficulty)}>
                              {problem.difficulty}
                            </Badge>
                            <span className="text-sm text-gray-400">
                              {problem.acceptance_rate}% acceptance
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex flex-wrap gap-1 mb-2 justify-end">
                          {problem.companies.slice(0, 3).map(company => (
                            <Badge key={company} variant="outline" className="text-xs border-white/30 text-gray-300">
                              {company}
                            </Badge>
                          ))}
                          {problem.companies.length > 3 && (
                            <Badge variant="outline" className="text-xs border-white/30 text-gray-300">
                              +{problem.companies.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {problem.topics.slice(0, 2).map(topic => (
                            <Badge key={topic} className="text-xs bg-white/10 text-gray-300 border-white/20">
                              {topic}
                            </Badge>
                          ))}
                          {problem.topics.length > 2 && (
                            <Badge className="text-xs bg-white/10 text-gray-300 border-white/20">
                              +{problem.topics.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
