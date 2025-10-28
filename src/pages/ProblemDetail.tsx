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
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch problem from database
  useEffect(() => {
    const fetchProblem = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('problems')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        setProblem({
          ...data,
          examples: (data.examples as any[]) || [],
          constraints: (data.constraints as string[]) || [],
          starter_code: (data.starter_code as any) || {},
          test_cases: (data.test_cases as any[]) || [],
          companies: (data.companies as string[]) || [],
          topics: (data.topics as string[]) || []
        });
      } catch (err) {
        console.error('Error fetching problem:', err);
        toast({
          title: "Error",
          description: "Failed to load problem",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id, toast]);

  // Initialize code with starter code when problem loads
  useEffect(() => {
    if (problem?.starter_code) {
      setCode(problem.starter_code[language as keyof typeof problem.starter_code] || "");
    }
  }, [problem, language]);

  // Update code when language changes
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    if (problem?.starter_code) {
      setCode(problem.starter_code[newLang as keyof typeof problem.starter_code] || "");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary font-inter flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading problem...</p>
        </div>
      </div>
    );
  }

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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <Link to="/problems" className="inline-flex items-center text-primary hover:text-primary/80 mb-3 sm:mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Problems
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-primary mb-2 transition-colors duration-300">
                {problem.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Problem Description */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-card">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0 sm:pt-0">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
                    {problem.description}
                  </p>
                </div>

                {/* Examples */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-primary">Examples</h3>
                  {problem.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base">Input: </span>
                          <code className="text-xs sm:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded break-all">
                            {example.input}
                          </code>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base">Output: </span>
                          <code className="text-xs sm:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded break-all">
                            {example.output}
                          </code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base">Explanation: </span>
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
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
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-primary mb-2">Constraints</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="leading-relaxed">{constraint}</li>
                    ))}
                  </ul>
                </div>

                {/* Topics */}
                {problem.topics && problem.topics.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-primary mb-2">Topics</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {problem.topics.map((topic: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Companies */}
                {problem.companies && problem.companies.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-primary mb-2">Companies</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {problem.companies.map((company: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Code Editor and Results */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-card">
              <CardHeader className="pb-3 sm:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <CardTitle className="text-base sm:text-lg">Code Editor</CardTitle>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full sm:w-32">
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
              <CardContent className="pt-0">
                <div className="h-64 sm:h-80 lg:h-96 border border-border rounded-lg overflow-hidden">
                  <MonacoEditor
                    height="100%"
                    language={language === 'cpp' ? 'cpp' : language}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 12,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      wordWrap: 'on',
                    }}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
                  <Button 
                    onClick={handleRun} 
                    disabled={isSubmitting}
                    variant="outline"
                    className="flex-1 text-sm sm:text-base"
                    size="sm"
                  >
                    <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    {isSubmitting ? "Running..." : "Run Code"}
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="flex-1 text-sm sm:text-base"
                    size="sm"
                  >
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            {(output || error || testResults.length > 0) && (
              <Card className="bg-card">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">Output</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {error && (
                    <div className="p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <pre className="text-xs sm:text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap overflow-x-auto">
                        {error}
                      </pre>
                    </div>
                  )}
                  
                  {output && !error && (
                    <div className="p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <pre className="text-xs sm:text-sm text-green-700 dark:text-green-300 whitespace-pre-wrap overflow-x-auto">
                        {output}
                      </pre>
                    </div>
                  )}

                  {testResults.length > 0 && (
                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-primary">Test Results</h4>
                      {testResults.map((result, index) => (
                        <div 
                          key={index}
                          className={`p-2 sm:p-3 rounded-lg border ${
                            result.passed 
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs sm:text-sm font-medium">
                              Test Case {result.testCase}
                            </span>
                            <Badge variant={result.passed ? "default" : "destructive"} className="text-xs px-2 py-1">
                              {result.passed ? "PASSED" : "FAILED"}
                            </Badge>
                          </div>
                          
                          {!result.passed && (
                            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="font-medium shrink-0">Expected: </span>
                                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs break-all">
                                  {result.expected}
                                </code>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="font-medium shrink-0">Actual: </span>
                                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs break-all">
                                  {result.actual || 'null'}
                                </code>
                              </div>
                              {result.error && (
                                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                                  <span className="font-medium shrink-0">Error: </span>
                                  <span className="text-red-600 dark:text-red-400 text-xs break-words">
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
