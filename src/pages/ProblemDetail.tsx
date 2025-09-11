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
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  const problem = sampleProblems.find(p => p.id === parseInt(id || '0'));

  // Initialize code with starter code when problem loads
  useEffect(() => {
    if (problem?.starterCode) {
      setCode(problem.starterCode[language as keyof typeof problem.starterCode] || "");
    }
  }, [problem, language]);

  // Update code when language changes
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    if (problem?.starterCode) {
      setCode(problem.starterCode[newLang as keyof typeof problem.starterCode] || "");
    }
  };

  const parseInput = (inputStr: string) => {
    // Parse different input formats
    if (inputStr.includes('nums = ') && inputStr.includes('target = ')) {
      const nums = inputStr.match(/nums = (\[.*?\])/)?.[1] || '[]';
      const target = inputStr.match(/target = (\d+)/)?.[1] || '0';
      return `${nums}\n${target}`;
    } else if (inputStr.includes('s = ')) {
      const s = inputStr.match(/s = "(.*?)"/)?.[1] || '';
      return s;
    } else if (inputStr.includes('n = ')) {
      const n = inputStr.match(/n = (\d+)/)?.[1] || '0';
      return n;
    }
    return inputStr;
  };

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
      const firstExample = problem?.examples[0];
      const input = firstExample ? parseInput(firstExample.input) : "";
      
      const { data, error } = await supabase.functions.invoke('execute-code', {
        body: { 
          code, 
          language,
          input
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
    setTestResults([]);
    setOutput(null);
    setError(null);
    
    try {
      // Transform test cases to proper format
      const formattedTestCases = problem.testCases.map(tc => ({
        ...tc,
        input: parseInput(tc.input)
      }));

      const { data, error } = await supabase.functions.invoke('submit-solution', {
        body: { 
          code, 
          language,
          problemId: problem.id.toString(),
          testCases: formattedTestCases
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setTestResults(data.testResults || []);
      
      if (data.passed) {
        toast({
          title: "Success!",
          description: data.message,
          duration: 5000,
        });
      } else {
        toast({
          title: "Some tests failed",
          description: data.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit solution");
      toast({
        title: "Submission failed",
        description: err.message || "Please try again",
        variant: "destructive",
        duration: 5000,
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
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Acceptance: {problem.acceptance_rate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
                    {problem.description}
                  </p>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-primary">Examples</h3>
                  {problem.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-200">Input: </span>
                          <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                            {example.input}
                          </code>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-200">Output: </span>
                          <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                            {example.output}
                          </code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-200">Explanation: </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {example.explanation}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-primary mb-2">Constraints</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>

                {/* Topics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-primary mb-2">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Companies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-primary mb-2">Companies</h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.companies.map((company, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor and Results */}
          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Code Editor</CardTitle>
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
                <div className="h-96 border border-border rounded-lg overflow-hidden">
                  <MonacoEditor
                    height="100%"
                    language={language === 'cpp' ? 'cpp' : language}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={handleRun} 
                    disabled={isSubmitting}
                    variant="outline"
                    className="flex-1"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Running..." : "Run Code"}
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            {(output || error || testResults.length > 0) && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap">
                        {error}
                      </pre>
                    </div>
                  )}
                  
                  {output && !error && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <pre className="text-sm text-green-700 dark:text-green-300 whitespace-pre-wrap">
                        {output}
                      </pre>
                    </div>
                  )}

                  {testResults.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-primary">Test Results</h4>
                      {testResults.map((result, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border ${
                            result.passed 
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              Test Case {result.testCase}
                            </span>
                            <Badge variant={result.passed ? "default" : "destructive"}>
                              {result.passed ? "PASSED" : "FAILED"}
                            </Badge>
                          </div>
                          
                          {!result.passed && (
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">Expected: </span>
                                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                  {result.expected}
                                </code>
                              </div>
                              <div>
                                <span className="font-medium">Actual: </span>
                                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                  {result.actual || 'null'}
                                </code>
                              </div>
                              {result.error && (
                                <div>
                                  <span className="font-medium">Error: </span>
                                  <span className="text-red-600 dark:text-red-400">
                                    {result.error}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}