import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Users, Shield, AlertTriangle } from "lucide-react";

export default function Terms() {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                By accessing and using CrackRank, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                User Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Creation</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per person is allowed</li>
                  <li>You must be at least 13 years old to create an account</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Account Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Keep your login credentials secure</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Use the platform in compliance with all applicable laws</li>
                  <li>Do not share your account with others</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Acceptable Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use the platform for legitimate coding interview preparation</li>
                <li>Submit original content when uploading problems or solutions</li>
                <li>Respect intellectual property rights</li>
                <li>Maintain respectful communication in discussions</li>
                <li>Do not attempt to hack, reverse engineer, or exploit the platform</li>
                <li>Do not share subscription access with others</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Violating any applicable laws or regulations</li>
                <li>Uploading malicious code or viruses</li>
                <li>Attempting to gain unauthorized access to user accounts</li>
                <li>Selling, renting, or transferring your account</li>
                <li>Using automated tools to scrape content</li>
                <li>Harassment, abuse, or discrimination against other users</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-4">Contact Information</h4>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> legal@crackrank.com</p>
                <p><strong>Address:</strong> CrackRank, 123 Tech Street, Silicon Valley, CA 94000</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}