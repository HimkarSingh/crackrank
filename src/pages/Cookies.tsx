import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Cookie, Settings, BarChart3, Shield } from "lucide-react";

export default function Cookies() {
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
            Cookie Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                What Are Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-primary" />
                Essential Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These cookies are necessary for the website to function properly and cannot be disabled.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Authentication:</strong> Keep you logged in to your account</li>
                <li><strong>Security:</strong> Protect against cross-site request forgery</li>
                <li><strong>Preferences:</strong> Remember your theme and language settings</li>
                <li><strong>Session:</strong> Maintain your session state across pages</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-primary" />
                Analytics Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These cookies help us understand how you interact with our platform so we can improve it.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Usage Analytics:</strong> Track which features are most popular</li>
                <li><strong>Performance:</strong> Monitor page load times and errors</li>
                <li><strong>User Journey:</strong> Understand how users navigate the platform</li>
                <li><strong>A/B Testing:</strong> Test different features and improvements</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Managing Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Browser Settings</h4>
                <p className="text-muted-foreground mb-2">
                  You can control cookies through your browser settings:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Block all cookies</li>
                  <li>Accept only first-party cookies</li>
                  <li>Delete cookies when closing browser</li>
                  <li>View and delete existing cookies</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Platform Settings</h4>
                <p className="text-muted-foreground">
                  You can adjust your cookie preferences in your account settings. 
                  Note that disabling certain cookies may affect platform functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-4">Questions?</h4>
              <p className="text-muted-foreground mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@crackrank.com</p>
                <p><strong>Support:</strong> <Link to="/help" className="text-primary hover:underline">Visit Help Center</Link></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}