
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleProblems } from "@/data/problems";
import { ChevronLeft, Code, Check, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProblemDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [code, setCode] = useState(`def solution(nums, target):
    # Write your solution here
    pass`);
  const [language, setLanguage] = useState("python");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const problem = sampleProblems.find(p => p.id === parseInt(id || '0'));

  if (!problem) {
    return (
      <div className="min-h-screen bg-secondary font-inter flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Problem Not Found</h1>
          <Link to="/problems">
            <Button>Back to Problems</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-white";
      case "Medium": return "bg-orange-500 text-white";
      case "Hard": return "bg-destructive text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const handleRun = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Code Executed",
        description: "Output: [0, 1] - Test cases passed!",
      });
    }, 1500);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Accepted!",
        description: "Your solution passed all test cases.",
        className: "bg-success text-white",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-secondary font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link to="/problems" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Problems
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                #{problem.id}. {problem.title}
              </h1>
              <div className="flex items-center space-x-4">
                <Badge className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
                <span className="text-sm text-gray-600">
                  {problem.acceptance_rate}% acceptance rate
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-gray-700">{problem.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <p className="font-medium text-sm text-gray-700 mb-2">Example {index + 1}:</p>
                      <div className="space-y-1 text-sm">
                        <p><strong>Input:</strong> {example.input}</p>
                        <p><strong>Output:</strong> {example.output}</p>
                        {example.explanation && (
                          <p><strong>Explanation:</strong>  {example.explanation}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {problem.companies.map(company => (
                    <Badge key={company} variant="outline">{company}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {problem.topics.map(topic => (
                    <Badge key={topic} variant="secondary">{topic}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    Code Editor
                  </CardTitle>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-sm min-h-[400px] resize-none"
                  placeholder="Write your solution here..."
                />
                
                <div className="flex space-x-4 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleRun}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Running..." : "Run"}
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-success hover:bg-success/90"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discussion Section */}
            <Card>
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="solutions" className="w-full">
                  <TabsList>
                    <TabsTrigger value="solutions">Solutions</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                  </TabsList>
                  <TabsContent value="solutions" className="mt-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">Hash Map Approach</span>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <ArrowUp className="h-4 w-4 mr-1" />
                              42
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Use a hash map to store numbers and their indices. For each number, check if target - number exists in the map.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="comments" className="mt-4">
                    <div className="text-center py-8 text-gray-500">
                      <p>No comments yet. Be the first to discuss this problem!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
