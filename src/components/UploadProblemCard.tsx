import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  Plus, 
  Code, 
  Coins,
  Star,
  AlertCircle,
  CheckCircle,
  FileText,
  Brain
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadStats {
  uploadsThisMonth: number;
  uploadsLimit: number;
  totalEarnings: number;
  averageRating: number;
}

interface Props {
  stats: UploadStats;
  userPlan: 'Free' | 'Premium' | 'Premium+' | 'Pro';
}

export default function UploadProblemCard({ stats, userPlan }: Props) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState<'problem' | 'experience' | 'tutorial'>('problem');
  
  const canUpload = userPlan !== 'Free' && stats.uploadsThisMonth < stats.uploadsLimit;
  const remainingUploads = stats.uploadsLimit - stats.uploadsThisMonth;

  const handleUpload = async () => {
    if (!canUpload) {
      toast({
        title: 'Upload Limit Reached',
        description: 'Upgrade your plan to upload more content this month.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: 'Upload Successful!',
        description: 'Your content has been submitted for review. You will earn rewards once approved.',
      });
    }, 2000);
  };

  const uploadTypes = [
    {
      type: 'problem' as const,
      label: 'Coding Problem',
      icon: <Code className="h-4 w-4" />,
      description: 'Upload interview questions with solutions',
      earnings: '₹50-200 per problem'
    },
    {
      type: 'experience' as const,
      label: 'Interview Experience',
      icon: <Brain className="h-4 w-4" />,
      description: 'Share your interview experience',
      earnings: '₹20-100 per experience'
    },
    {
      type: 'tutorial' as const,
      label: 'Tutorial/Guide',
      icon: <FileText className="h-4 w-4" />,
      description: 'Create educational content',
      earnings: '₹100-500 per guide'
    }
  ];

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-accent/20 border border-border">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <span>Upload & Earn</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-accent/20 border border-border rounded-lg">
            <div className="text-lg font-bold text-foreground">{stats.uploadsThisMonth}</div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </div>
          <div className="text-center p-3 bg-accent/20 border border-border rounded-lg">
            <div className="text-lg font-bold text-primary">₹{stats.totalEarnings}</div>
            <div className="text-xs text-muted-foreground">Total Earned</div>
          </div>
        </div>

        {/* Upload Limit Status */}
        <div className="flex items-center justify-between p-3 bg-accent/10 border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            {canUpload ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
            <span className="text-sm font-medium">
              {canUpload ? `${remainingUploads} uploads remaining` : 'Upload limit reached'}
            </span>
          </div>
          <Badge variant={canUpload ? 'default' : 'secondary'}>
            {stats.uploadsThisMonth}/{stats.uploadsLimit}
          </Badge>
        </div>

        <Separator />

        {/* Upload Types */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">What would you like to upload?</h4>
          <div className="grid gap-3">
            {uploadTypes.map((type) => (
              <div
                key={type.type}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  uploadType === type.type
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setUploadType(type.type)}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-1 rounded bg-accent/20">
                    {type.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{type.label}</div>
                    <div className="text-xs text-muted-foreground">{type.description}</div>
                    <div className="text-xs text-primary font-medium mt-1">{type.earnings}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {canUpload ? (
          <>
            <Separator />
            
            {/* Quick Upload Form */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder={`Enter ${uploadType} title...`}
                  disabled={isUploading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder={`Describe your ${uploadType}...`}
                  rows={3}
                  disabled={isUploading}
                />
              </div>

              {uploadType === 'problem' && (
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select disabled={isUploading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  'Uploading...'
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload {uploadType === 'problem' ? 'Problem' : uploadType === 'experience' ? 'Experience' : 'Tutorial'}
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6 space-y-3">
            {userPlan === 'Free' ? (
              <>
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground" />
                <h4 className="font-medium">Premium Feature</h4>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Premium to start uploading content and earning rewards.
                </p>
                <Button size="sm">
                  Upgrade to Premium
                </Button>
              </>
            ) : (
              <>
                <AlertCircle className="h-8 w-8 mx-auto text-yellow-500" />
                <h4 className="font-medium">Monthly Limit Reached</h4>
                <p className="text-sm text-muted-foreground">
                  You've reached your upload limit for this month. Upgrade for more uploads.
                </p>
                <Button size="sm" variant="outline">
                  Upgrade Plan
                </Button>
              </>
            )}
          </div>
        )}

        {/* Earning Tips */}
        <div className="bg-accent/20 border border-border rounded-lg p-3 space-y-2">
          <h5 className="text-sm font-medium flex items-center">
            <Coins className="h-4 w-4 mr-2" />
            Maximize Your Earnings
          </h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Upload high-quality, well-explained problems</li>
            <li>• Include multiple solution approaches</li>
            <li>• Add time/space complexity analysis</li>
            <li>• Engage with community feedback</li>
          </ul>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Your Average Rating</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="font-medium">{stats.averageRating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}