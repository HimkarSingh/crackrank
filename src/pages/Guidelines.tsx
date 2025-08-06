import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Heart, MessageSquare, AlertTriangle, Trophy } from "lucide-react";

export default function Guidelines() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Community Guidelines
          </h1>
          <p className="text-muted-foreground">
            Building a supportive coding community together
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                CrackRank is built on the foundation of mutual respect, learning, and growth. 
                We believe that everyone deserves a supportive environment to improve their coding skills 
                and prepare for their dream job interviews.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                Be Respectful and Inclusive
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Treat all community members with kindness and respect</li>
                <li>Welcome beginners and celebrate all skill levels</li>
                <li>Use inclusive language and avoid discriminatory comments</li>
                <li>Be patient when helping others learn</li>
                <li>Respect different coding approaches and perspectives</li>
                <li>Create an environment where everyone feels comfortable participating</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                Discussion Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Helpful Contributions</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Provide clear explanations with your solutions</li>
                  <li>Share insights and alternative approaches</li>
                  <li>Ask thoughtful questions that promote learning</li>
                  <li>Give constructive feedback on others' solutions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Keep It Relevant</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Stay on topic and related to coding/interviews</li>
                  <li>Use appropriate discussion channels</li>
                  <li>Search before posting duplicate questions</li>
                  <li>Provide context when asking for help</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-primary" />
                Content Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Submit original problems and solutions</li>
                <li>Ensure code is properly formatted and commented</li>
                <li>Test your solutions before sharing</li>
                <li>Provide problem descriptions that are clear and complete</li>
                <li>Include time and space complexity analysis when relevant</li>
                <li>Cite sources when referencing external materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Prohibited Behavior
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-red-500">Zero Tolerance</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Harassment, bullying, or personal attacks</li>
                    <li>Discriminatory language or hate speech</li>
                    <li>Sharing others' private information</li>
                    <li>Spam or promotional content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-amber-500">Not Allowed</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Plagiarizing solutions without attribution</li>
                    <li>Asking others to complete assignments for you</li>
                    <li>Sharing copyrighted materials without permission</li>
                    <li>Creating multiple accounts to manipulate votes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-4">Reporting and Enforcement</h4>
              <p className="text-muted-foreground mb-4">
                If you encounter behavior that violates these guidelines:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Use the report button on posts or comments</li>
                <li>Contact our moderation team directly</li>
                <li>Provide specific details about the violation</li>
              </ul>
              <div className="space-y-2">
                <p><strong>Email:</strong> community@crackrank.com</p>
                <p><strong>Support:</strong> <Link to="/help" className="text-primary hover:underline">Help Center</Link></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}