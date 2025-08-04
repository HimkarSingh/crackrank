import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Crown, Star, TrendingUp, Calendar, CreditCard, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubscriptionStatus {
  plan: 'Free' | 'Premium' | 'Premium+' | 'Pro';
  isActive: boolean;
  expiryDate?: string;
  questionsUsed: number;
  questionsLimit: number;
  uploadsUsed: number;
  uploadsLimit: number;
}

interface Props {
  subscription: SubscriptionStatus;
}

const planIcons = {
  Free: <Gift className="h-5 w-5" />,
  Premium: <Crown className="h-5 w-5" />,
  'Premium+': <Star className="h-5 w-5" />,
  Pro: <TrendingUp className="h-5 w-5" />
};

const planColors = {
  Free: 'bg-muted text-muted-foreground',
  Premium: 'bg-premium-gold text-foreground',
  'Premium+': 'bg-premium-silver text-foreground',
  Pro: 'bg-premium-bronze text-foreground'
};

export default function SubscriptionCard({ subscription }: Props) {
  const questionProgress = (subscription.questionsUsed / subscription.questionsLimit) * 100;
  const uploadProgress = subscription.uploadsLimit > 0 ? (subscription.uploadsUsed / subscription.uploadsLimit) * 100 : 0;

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-accent/20 border border-border">
              {planIcons[subscription.plan]}
            </div>
            <span>Subscription</span>
          </div>
          <Badge className={planColors[subscription.plan]}>
            {subscription.plan}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge variant={subscription.isActive ? 'default' : 'destructive'}>
            {subscription.isActive ? 'Active' : 'Expired'}
          </Badge>
        </div>

        {subscription.expiryDate && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Next Billing</span>
            <span className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {subscription.expiryDate}
            </span>
          </div>
        )}

        <Separator />

        {/* Usage Stats */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Questions Solved</span>
              <span>{subscription.questionsUsed}/{subscription.questionsLimit === Infinity ? '∞' : subscription.questionsLimit}</span>
            </div>
            {subscription.questionsLimit !== Infinity && (
              <Progress value={questionProgress} className="h-2" />
            )}
          </div>

          {subscription.uploadsLimit > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Uploads</span>
                <span>{subscription.uploadsUsed}/{subscription.uploadsLimit}</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>

        <Separator />

        {/* Plan Benefits */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Current Plan Benefits</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            {subscription.plan === 'Free' && (
              <>
                <div>• Access to 10 basic problems</div>
                <div>• Community discussions (view only)</div>
                <div>• Standard support</div>
              </>
            )}
            {subscription.plan === 'Premium' && (
              <>
                <div>• 50+ premium problems</div>
                <div>• Multi-language solutions</div>
                <div>• Upload 5 questions/month</div>
                <div>• Earn through voting</div>
                <div>• Ad-free experience</div>
              </>
            )}
            {subscription.plan === 'Premium+' && (
              <>
                <div>• 100+ exclusive problems</div>
                <div>• 10+ programming languages</div>
                <div>• Upload 15 questions/month</div>
                <div>• Enhanced earnings</div>
                <div>• Premium analytics</div>
              </>
            )}
            {subscription.plan === 'Pro' && (
              <>
                <div>• Unlimited problem access</div>
                <div>• 15+ programming languages</div>
                <div>• Unlimited uploads</div>
                <div>• Maximum earning potential</div>
                <div>• 24/7 priority support</div>
              </>
            )}
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-3">
          {subscription.plan === 'Free' ? (
            <Link to="/?section=pricing">
              <Button className="w-full">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </Link>
          ) : (
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Billing
              </Button>
              {subscription.plan !== 'Pro' && (
                <Link to="/?section=pricing">
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Upgrade Suggestion */}
        {subscription.plan === 'Free' && questionProgress > 80 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 space-y-2">
            <div className="text-sm font-medium text-primary">Almost at your limit!</div>
            <div className="text-xs text-muted-foreground">
              Upgrade to Premium to access 50+ more problems and start earning from your contributions.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}