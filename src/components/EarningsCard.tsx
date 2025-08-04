import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Coins, 
  TrendingUp, 
  Star, 
  Upload, 
  Eye,
  ThumbsUp,
  Wallet,
  History
} from 'lucide-react';

interface EarningStats {
  totalEarnings: number;
  pendingEarnings: number;
  questionsUploaded: number;
  totalViews: number;
  totalLikes: number;
  monthlyTarget: number;
  currentProgress: number;
}

interface Props {
  stats: EarningStats;
}

export default function EarningsCard({ stats }: Props) {
  const [showWithdraw, setShowWithdraw] = useState(false);

  const progressPercentage = (stats.currentProgress / stats.monthlyTarget) * 100;

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-accent/20 border border-border">
            <Coins className="h-5 w-5 text-primary" />
          </div>
          <span>Earnings Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Earnings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-accent/20 border border-border rounded-lg">
            <div className="text-2xl font-bold text-foreground">₹{stats.totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Earned</div>
          </div>
          <div className="text-center p-4 bg-accent/20 border border-border rounded-lg">
            <div className="text-2xl font-bold text-primary">₹{stats.pendingEarnings.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
        </div>

        <Separator />

        {/* Monthly Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Monthly Target Progress</span>
            <span className="text-sm text-muted-foreground">₹{stats.currentProgress}/₹{stats.monthlyTarget}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">
            {progressPercentage.toFixed(1)}% of monthly target achieved
          </div>
        </div>

        <Separator />

        {/* Activity Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Questions</span>
            </div>
            <div className="text-lg font-semibold">{stats.questionsUploaded}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Views</span>
            </div>
            <div className="text-lg font-semibold">{stats.totalViews.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Likes</span>
            </div>
            <div className="text-lg font-semibold">{stats.totalLikes.toLocaleString()}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Rating</span>
            </div>
            <div className="text-lg font-semibold flex items-center">
              4.8
              <Star className="h-4 w-4 text-yellow-500 ml-1 fill-current" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Earning Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">This Month's Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Question Uploads</span>
              <span>₹{(stats.currentProgress * 0.6).toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Community Votes</span>
              <span>₹{(stats.currentProgress * 0.3).toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tips & Bonuses</span>
              <span>₹{(stats.currentProgress * 0.1).toFixed(0)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="default" 
            className="w-full"
            disabled={stats.pendingEarnings < 100}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Withdraw to Crypto
            {stats.pendingEarnings < 100 && (
              <Badge variant="secondary" className="ml-2">Min ₹100</Badge>
            )}
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* Earning Tips */}
        <div className="bg-accent/20 border border-border rounded-lg p-4 space-y-2">
          <h5 className="text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Boost Your Earnings
          </h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Upload high-quality interview questions</li>
            <li>• Provide detailed solutions in multiple languages</li>
            <li>• Engage with community discussions</li>
            <li>• Share your interview experiences</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}