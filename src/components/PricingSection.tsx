import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, Crown, Zap, Star, TrendingUp, Coins, Upload, BarChart3, Info, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/month',
    description: 'Perfect for getting started',
    shortFeatures: [
      '10 coding problems',
      'Basic difficulty levels',
      'Community access'
    ],
    features: [
      'Access to 10 coding problems',
      'Basic difficulty levels', 
      'Community discussions (view only)',
      'Standard support',
      'Ads supported'
    ],
    limitations: [
      'No question upload',
      'No earning opportunities', 
      'Limited to basic problems',
      'Ads displayed'
    ],
    icon: <Zap className="h-6 w-6" />,
    popular: false,
    buttonText: 'Get Started Free',
    buttonVariant: 'outline' as const
  },
  {
    name: 'Premium',
    price: '₹500',
    period: '/month',
    description: 'Unlock exclusive content & earnings',
    shortFeatures: [
      '50+ premium problems',
      'Upload 5 questions/month',
      'Earn crypto rewards',
      'Ad-free experience'
    ],
    features: [
      'Access to 50+ premium problems',
      'Multi-language solutions (5 languages)',
      'Upload up to 5 questions/month',
      'Earn through community voting',
      'Priority email support',
      'Ad-free experience'
    ],
    limitations: [],
    icon: <Crown className="h-6 w-6" />,
    popular: true,
    buttonText: 'Upgrade to Premium',
    buttonVariant: 'default' as const
  },
  {
    name: 'Premium+',
    price: '₹1,000',
    period: '/month',
    description: 'Full access with analytics',
    shortFeatures: [
      '100+ exclusive problems',
      'Upload 15 questions/month',
      'Premium analytics',
      'Priority chat support'
    ],
    features: [
      'Access to 100+ exclusive problems',
      'Multi-language solutions (10+ languages)',
      'Upload up to 15 questions/month', 
      'Enhanced earning opportunities',
      'Premium dashboard with analytics',
      'Priority chat support',
      'Ad-free experience'
    ],
    limitations: [],
    icon: <Star className="h-6 w-6" />,
    popular: false,
    buttonText: 'Upgrade to Premium+',
    buttonVariant: 'default' as const
  },
  {
    name: 'Pro',
    price: '₹2,000',
    period: '/month',
    description: 'Complete access & unlimited earnings',
    shortFeatures: [
      'Unlimited access',
      'Unlimited uploads',
      'Advanced analytics',
      '24/7 priority support'
    ],
    features: [
      'Unlimited access to all problems',
      'Multi-language solutions (15+ languages)',
      'Unlimited question uploads',
      'Maximum earning potential',
      'Advanced analytics dashboard',
      'Interview preparation coaching',
      '24/7 priority support',
      'Ad-free experience',
      'Exclusive webinars & events'
    ],
    limitations: [],
    icon: <TrendingUp className="h-6 w-6" />,
    popular: false,
    buttonText: 'Go Pro',
    buttonVariant: 'default' as const
  }
];

export default function PricingSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handlePlanSelect = (planName: string) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to select a subscription plan.',
        variant: 'destructive'
      });
      return;
    }

    setSelectedPlan(planName);
    
    if (planName === 'Free') {
      toast({
        title: 'Welcome to CrackRank!',
        description: 'You are now on the Free plan. Start solving problems!',
      });
      return;
    }

    // For premium plans, redirect to payment page
    window.location.href = `/payment?plan=${planName.toLowerCase()}`;
  };

  return (
    <section className="py-24 bg-accent/5 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Unlock premium features, earn from your contributions, and accelerate your coding journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-sm group hover:scale-105 relative ${
                plan.popular ? 'ring-2 ring-primary/20 shadow-[0_0_40px_rgba(255,255,255,0.1)]' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <div className="p-3 rounded-full bg-accent/20 border border-border shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl text-card-foreground mb-2">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {plan.price}
                  <span className="text-lg text-muted-foreground font-normal">{plan.period}</span>
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.shortFeatures.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-card-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Dialog open={openDialog === plan.name} onOpenChange={(open) => setOpenDialog(open ? plan.name : null)}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary">
                      <Info className="h-4 w-4 mr-2" />
                      View Full Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl">
                        <div className="p-2 rounded-full bg-accent/20 border border-border">
                          {plan.icon}
                        </div>
                        {plan.name} Plan Details
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-accent/10 rounded-lg">
                        <div className="text-4xl font-bold text-foreground mb-2">
                          {plan.price}
                          <span className="text-lg text-muted-foreground font-normal">{plan.period}</span>
                        </div>
                        <p className="text-muted-foreground">{plan.description}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-foreground">All Features Included</h4>
                        <div className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start space-x-3">
                              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-card-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {plan.limitations.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-muted-foreground">Limitations</h4>
                          <div className="space-y-3">
                            {plan.limitations.map((limitation, limitIndex) => (
                              <div key={limitIndex} className="flex items-start space-x-3">
                                <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{limitation}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button 
                        onClick={() => {
                          setOpenDialog(null);
                          handlePlanSelect(plan.name);
                        }}
                        variant={plan.buttonVariant}
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                            : ''
                        }`}
                        disabled={selectedPlan === plan.name}
                      >
                        {selectedPlan === plan.name ? 'Selected' : plan.buttonText}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button 
                  onClick={() => handlePlanSelect(plan.name)}
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                      : ''
                  }`}
                  disabled={selectedPlan === plan.name}
                >
                  {selectedPlan === plan.name ? 'Selected' : plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Earning Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-accent/20 border border-border">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Earn Through Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Upload quality problems and solutions to earn crypto rewards based on community voting and engagement.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-accent/20 border border-border">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Share Your Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Upload interview experiences, coding tips, and educational content to help others and earn rewards.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-accent/20 border border-border">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Track Your Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Monitor your contributions, community impact, and cryptocurrency earnings through our advanced analytics dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}