import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Camera, Trophy, Target, Flame, MessageSquare, Heart, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  username: string | null;
}

interface UserStats {
  problems_solved: number;
  discussions_created: number;
  total_likes: number;
  streak: number;
  rank: string;
}

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<UserStats>({
    problems_solved: 0,
    discussions_created: 0,
    total_likes: 0,
    streak: 0,
    rank: 'Beginner'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      toast({
        title: "Error",
        description: "Failed to fetch profile",
        variant: "destructive"
      });
      return;
    }

    if (data) {
      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        username: data.username || '',
        bio: data.bio || ''
      });
    }
  };

  const fetchStats = async () => {
    if (!user) return;

    // Fetch user statistics from various tables
    const [submissionsResult, discussionsResult] = await Promise.all([
      supabase
        .from('submissions')
        .select('*')
        .eq('user_id', user.id)
        .eq('passed', true),
      supabase
        .from('discussions')
        .select('likes_count')
        .eq('author_id', user.id)
    ]);

    const problemsSolved = submissionsResult.data?.length || 0;
    const discussionsCreated = discussionsResult.data?.length || 0;
    const totalLikes = discussionsResult.data?.reduce((sum, d) => sum + d.likes_count, 0) || 0;

    // Calculate rank based on problems solved
    let rank = 'Beginner';
    if (problemsSolved >= 50) rank = 'Expert';
    else if (problemsSolved >= 20) rank = 'Advanced';
    else if (problemsSolved >= 5) rank = 'Intermediate';

    setStats({
      problems_solved: problemsSolved,
      discussions_created: discussionsCreated,
      total_likes: totalLikes,
      streak: Math.floor(Math.random() * 30), // Placeholder for streak calculation
      rank
    });
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);

    // Check if username is taken
    if (formData.username && formData.username !== profile?.username) {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', formData.username)
        .neq('user_id', user.id)
        .single();

      if (existingUser) {
        toast({
          title: "Error",
          description: "Username is already taken",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
    }

    const updateData = {
      full_name: formData.full_name || null,
      username: formData.username || null,
      bio: formData.bio || null,
      updated_at: new Date().toISOString()
    };

    let result;
    if (profile) {
      result = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id);
    } else {
      result = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          ...updateData
        });
    }

    if (result.error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      setIsEditing(false);
      fetchProfile();
    }

    setLoading(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
      return;
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    await supabase
      .from('profiles')
      .update({ avatar_url: data.publicUrl })
      .eq('user_id', user.id);

    fetchProfile();
    toast({
      title: "Success",
      description: "Profile picture updated"
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to view your profile</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback className="text-2xl">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{profile?.full_name || 'User'}</h1>
                  <p className="text-muted-foreground">@{profile?.username || 'username'}</p>
                  <Badge variant="secondary" className="mt-2">{stats.rank}</Badge>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground mb-2">{profile?.bio || 'No bio available'}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.problems_solved}</p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Flame className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <MessageSquare className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.discussions_created}</p>
                <p className="text-sm text-muted-foreground">Discussions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.total_likes}</p>
                <p className="text-sm text-muted-foreground">Total Likes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Solved "Two Sum" problem</span>
                <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
              </div>
              <Separator />
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Created discussion "Best practices for arrays"</span>
                <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
              </div>
              <Separator />
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Achieved 7-day streak</span>
                <span className="text-xs text-muted-foreground ml-auto">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}