import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, MessageCircle, Shield, FileText, Mail } from 'lucide-react';

export default function Help() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions and get support</p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-6">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">FAQ</h3>
              <p className="text-sm text-muted-foreground">Find quick answers to common questions</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-muted-foreground">Get help from our support team</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <FileText className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">Learn how to use all features</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I solve coding problems?</AccordionTrigger>
                <AccordionContent>
                  Navigate to the Problems page, select a problem based on difficulty and topic, 
                  read the description carefully, write your solution in the code editor, and submit it for evaluation. 
                  You'll receive immediate feedback on your solution.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I participate in discussions?</AccordionTrigger>
                <AccordionContent>
                  Go to the Discuss page where you can browse different categories like algorithms, 
                  data structures, and general programming. You can create new discussions, reply to existing ones, 
                  and like helpful posts.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How is my rank calculated?</AccordionTrigger>
                <AccordionContent>
                  Your rank is based on the number of problems you've solved successfully. 
                  Start as a Beginner, advance to Intermediate (5+ problems), Advanced (20+ problems), 
                  and Expert (50+ problems).
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I change my username?</AccordionTrigger>
                <AccordionContent>
                  Yes! Go to your Profile page and click "Edit Profile". You can change your username 
                  as long as it's not already taken by another user. You can also update your full name, 
                  bio, and profile picture.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What programming languages are supported?</AccordionTrigger>
                <AccordionContent>
                  We support multiple programming languages including Python, JavaScript, Java, C++, 
                  and more. You can select your preferred language from the dropdown in the code editor.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="your.email@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="How can we help you?" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="Describe your issue or question..." rows={4} />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>

        {/* Privacy Policy & Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Legal & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                Privacy Policy
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                Terms of Service
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                Cookie Policy
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                Community Guidelines
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                We value your privacy and are committed to protecting your personal information. 
                Our privacy policy explains how we collect, use, and safeguard your data.
              </p>
              <p className="mt-2">
                By using CrackRank, you agree to our terms of service and community guidelines. 
                Please review these documents to understand your rights and responsibilities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}