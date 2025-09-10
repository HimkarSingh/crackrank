
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleProblems } from "@/data/problems";
import { ChevronLeft, Code, Check, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { supabase } from "@/integrations/supabase/client";

export default function ProblemDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [code, setCode] = useState(`def solution(nums, target):\n    # Write your solution here\n    pass`);
  const [language, setLanguage] = useState("python");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  // Update code when language changes
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    if (problem?.starterCode) {
      setCode(problem.starterCode[newLang as keyof typeof problem.starterCode] || "");
    }
  };

  const problem = sampleProblems.find(p => p.id === parseInt(id || '0'));

  // Initialize code with starter code when problem loads
  useEffect(() => {
    if (problem?.starterCode) {
      setCode(problem.starterCode[language as keyof typeof problem.starterCode] || "");
    }
  }, [problem, language]);

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
      case "Easy": return "border-emerald-400 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 hover:text-emerald-500 hover:bg-emerald-500/20 transition-colors duration-200 px-3 py-1 font-semibold rounded-full border cursor-pointer";
      case "Medium": return "border-amber-400 text-amber-600 dark:text-amber-300 bg-amber-500/10 hover:text-amber-500 hover:bg-amber-500/20 transition-colors duration-200 px-3 py-1 font-semibold rounded-full border cursor-pointer";
      case "Hard": return "border-red-400 text-red-600 dark:text-red-300 bg-red-500/10 hover:text-red-500 hover:bg-red-500/20 transition-colors duration-200 px-3 py-1 font-semibold rounded-full border cursor-pointer";
      default: return "border-border text-muted-foreground px-3 py-1 font-semibold rounded-full border cursor-pointer";
    }
  };

  const handleRun = async () => {
    setIsSubmitting(true);
    setOutput(null);
    setError(null);
    setTestResults([]);
    
    try {
      const { data, error } = await supabase.functions.invoke('execute-code', {
        body: { 
          code, 
          language,
          input: problem?.examples[0]?.input.replace(/nums = /, '').replace(/, target = /, '\n') || ""
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.stderr) {
        setError(data.stderr);
      } else if (data.compile_output) {
        setError(data.compile_output);
      } else {
        setOutput(data.stdout || "No output");
      }
    } catch (err: any) {
      setError(err.message || "Failed to execute code");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem) return;
    
    setIsSubmitting(true);
    setOutput(null);
    setError(null);
    setTestResults([]);
    
    try {
      const { data, error } = await supabase.functions.invoke('submit-solution', {
        body: { 
          code, 
          language,
          problemId: problem.id,
          testCases: problem.testCases
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setTestResults(data.testResults);
      
      if (data.passed) {
        setOutput("All test cases passed! 🎉");
        toast({ 
          title: "Accepted!", 
          description: data.message,
          className: "bg-emerald-600 text-white border-emerald-700" 
        });
      } else {
        setOutput(`${data.passedTests}/${data.totalTests} test cases passed`);
        toast({ 
          title: "Some tests failed", 
          description: data.message,
          className: "bg-amber-600 text-white border-amber-700" 
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit code");
      toast({ 
        title: "Submission Error", 
        description: err.message || "Failed to submit code",
        className: "bg-destructive text-white" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { theme } = useTheme();

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-primary mb-2 transition-colors duration-300">
                #{problem.id}. {problem.title}
              </h1>
              <div className="flex items-center space-x-4">
                <Badge className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
                <span
                  className={`ml-2 text-sm font-semibold px-2 py-1 rounded transition-colors duration-200
                    ${problem.acceptance_rate >= 70
                      ? 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10'
                      : problem.acceptance_rate >= 40
                      ? 'text-amber-600 dark:text-amber-300 bg-amber-500/10'
                      : 'text-red-600 dark:text-red-300 bg-red-500/10'}
                  `}
                >
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
                  <p className="whitespace-pre-wrap text-gray-700 dark:text-card-foreground transition-colors duration-300">{problem.description}</p>
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
                    <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-card/80 transition-colors duration-300">
                      <p className="font-medium text-sm text-gray-700 dark:text-card-foreground mb-2 transition-colors duration-300">Example {index + 1}:</p>
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
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-card-foreground space-y-1 transition-colors duration-300">
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
                  <Select value={language} onValueChange={handleLanguageChange}>
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
                <MonacoEditor
                  height="500px"
                  language={language === "cpp" ? "cpp" : language}
                  value={code}
                  theme={theme === "dark" ? "vs-dark" : "light"}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    readOnly: isSubmitting,
                    fontFamily: 'Fira Mono, monospace',
                    scrollBeyondLastLine: false,
                  }}
                  onChange={(value) => setCode(value || "")}
                />
                {output && (
                  <div className="mt-4 p-3 bg-gray-900 dark:bg-emerald-950/30 text-green-200 dark:text-emerald-300 rounded font-mono text-sm whitespace-pre-wrap transition-colors duration-300">
                    <strong>Output:</strong>
                    <div>{output}</div>
                  </div>
                )}
                {error && (
                  <div className="mt-4 p-3 bg-red-900 dark:bg-destructive/20 text-red-200 dark:text-destructive rounded font-mono text-sm whitespace-pre-wrap transition-colors duration-300">
                    <strong>Error:</strong>
                    <div>{error}</div>
                  </div>
                )}
                
                {/* Test Results */}
                {testResults.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <strong className="text-sm">Test Results:</strong>
                    {testResults.map((result, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded text-sm ${
                          result.passed 
                            ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-700' 
                            : 'bg-red-950/30 text-red-300 border border-red-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">Test Case {result.testCase}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            result.passed ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {result.passed ? 'PASSED' : 'FAILED'}
                          </span>
                        </div>
                        {!result.passed && (
                          <div className="space-y-1 text-xs font-mono">
                            <div><strong>Expected:</strong> {result.expected}</div>
                            <div><strong>Actual:</strong> {result.actual || 'No output'}</div>
                            {result.error && <div><strong>Error:</strong> {result.error}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex space-x-4 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleRun}
                    disabled={isSubmitting}
                    className="transition-transform duration-200 hover:scale-105"
                  >
                    {isSubmitting ? "Running..." : "Run"}
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-success hover:bg-success/90 transition-transform duration-200 hover:scale-105"
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
                      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-card/80 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm text-gray-700 dark:text-card-foreground transition-colors duration-300">Hash Map Approach</span>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="transition-transform duration-200 hover:scale-110">
                              <ArrowUp className="h-4 w-4 mr-1" />
                              42
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-card-foreground transition-colors duration-300">
                          Use a hash map to store numbers and their indices. For each number, check if target - number exists in the map.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="comments" className="mt-4">
                    <div className="text-center py-8 text-gray-500 dark:text-muted-foreground transition-colors duration-300">
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
