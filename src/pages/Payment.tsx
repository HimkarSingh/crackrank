import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Wallet, 
  Shield, 
  Check, 
  Crown, 
  Star, 
  TrendingUp, 
  Coins,
  Bitcoin,
  ArrowLeft,
  Copy,
  ExternalLink
} from 'lucide-react';

const planDetails = {
  premium: {
    name: 'Premium',
    price: 500,
    icon: <Crown className="h-6 w-6" />,
    features: [
      'Access to 50+ premium problems',
      'Multi-language solutions (5 languages)',
      'Upload up to 5 questions/month',
      'Earn through community voting',
      'Priority email support',
      'Ad-free experience'
    ]
  },
  'premium+': {
    name: 'Premium+',
    price: 1000,
    icon: <Star className="h-6 w-6" />,
    features: [
      'Access to 100+ exclusive problems',
      'Multi-language solutions (10+ languages)',
      'Upload up to 15 questions/month',
      'Enhanced earning opportunities',
      'Premium dashboard with analytics',
      'Priority chat support',
      'Ad-free experience'
    ]
  },
  pro: {
    name: 'Pro',
    price: 2000,
    icon: <TrendingUp className="h-6 w-6" />,
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
    ]
  }
};

const cryptoOptions = [
  { symbol: 'BTC', name: 'Bitcoin', rate: 0.0000120, wallet: 'bc1qvvhq4k6j6yc37tnenm377ul277t7zld5g5gqlu' },
  { symbol: 'ETH', name: 'Ethereum', rate: 0.000185, wallet: '0x2FBAA46F9A433d2640042cA1a3590f8E6FdFb04d' },
  { symbol: 'SOL', name: 'Solana', rate:0.0001 , wallet: '4FAVBZFwb9WdBrgnf4mH5UdSuhZW3En6t8qripkfThBG' },
  { symbol: 'ETH', name: 'MetaMask', rate: 0.012, wallet: '0xa31eE866e304100E4BcEBf0eDAC0b8f3476A13c8' }
];

export default function Payment() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan') || 'premium';
  
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);
  const [isAnnual, setIsAnnual] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const plan = planDetails[planParam as keyof typeof planDetails];
  const finalPrice = isAnnual ? plan.price * 10 : plan.price; // 2 months free on annual
  const cryptoAmount = (finalPrice * selectedCrypto.rate).toFixed(8);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!plan) {
      navigate('/');
      return;
    }
  }, [user, plan, navigate]);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(selectedCrypto.wallet);
    toast({
      title: 'Copied!',
      description: 'Wallet address copied to clipboard',
    });
  };

  const handlePayment = async () => {
    if (!transactionId.trim()) {
      toast({
        title: 'Transaction ID Required',
        description: 'Please enter your transaction ID to complete the payment.',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast({
        title: 'Payment Submitted!',
        description: 'Your payment is being verified. You will receive an email confirmation shortly.',
      });
      navigate('/dashboard');
    }, 2000);
  };

  if (!plan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plans
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Complete Your Subscription
          </h1>
          <p className="text-muted-foreground">
            Upgrade to {plan.name} and unlock premium features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-accent/20 border border-border">
                  {plan.icon}
                </div>
                <span>{plan.name} Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="billing-cycle">Billing Cycle</Label>
                  <div className="flex items-center space-x-3">
                    <span className={!isAnnual ? 'text-foreground' : 'text-muted-foreground'}>Monthly</span>
                    <Switch
                      id="billing-cycle"
                      checked={isAnnual}
                      onCheckedChange={setIsAnnual}
                    />
                    <span className={isAnnual ? 'text-foreground' : 'text-muted-foreground'}>
                      Annual
                      <Badge variant="secondary" className="ml-2">Save 17%</Badge>
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">What's included:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{plan.price}/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  {isAnnual && (
                    <div className="flex justify-between text-primary">
                      <span>Annual Discount (17%)</span>
                      <span>-₹{plan.price * 2}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span>₹{finalPrice}/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={paymentMethod === 'crypto' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('crypto')}
                  className="h-12"
                >
                  <Bitcoin className="h-5 w-5 mr-2" />
                  Crypto
                </Button>
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className="h-12"
                  disabled
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Card (Soon)
                </Button>
              </div>

              {paymentMethod === 'crypto' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Select Cryptocurrency</Label>
                    <Select
                      value={selectedCrypto.symbol}
                      onValueChange={(value) => {
                        const crypto = cryptoOptions.find(c => c.symbol === value);
                        if (crypto) setSelectedCrypto(crypto);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptoOptions.map((crypto) => (
                          <SelectItem key={crypto.symbol} value={crypto.symbol}>
                            <div className="flex items-center space-x-2">
                              <Coins className="h-4 w-4" />
                              <span>{crypto.name} ({crypto.symbol})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-accent/20 border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Amount to send:</span>
                      <span className="font-mono font-bold">{cryptoAmount} {selectedCrypto.symbol}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm">Wallet Address:</Label>
                      <div className="flex items-center space-x-2 bg-background border border-border rounded-md p-3">
                        <code className="flex-1 text-xs break-all">{selectedCrypto.wallet}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCopyWallet}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Send exactly the amount shown above to complete your payment</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="transaction-id">Transaction ID *</Label>
                    <Input
                      id="transaction-id"
                      placeholder="Enter your transaction hash/ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the transaction ID from your crypto wallet after sending the payment
                    </p>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={processing || !transactionId.trim()}
                    className="w-full"
                  >
                    {processing ? (
                      'Processing...'
                    ) : (
                      <>
                        <Wallet className="h-5 w-5 mr-2" />
                        Verify Payment
                      </>
                    )}
                  </Button>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="text-center py-8 space-y-4">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium text-muted-foreground">Card Payments Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    We're working on integrating traditional payment methods. 
                    For now, please use cryptocurrency for instant payments.
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-4 border-t border-border">
                <Shield className="h-4 w-4" />
                <span>Your payment is secured with end-to-end encryption</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}