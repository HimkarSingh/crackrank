import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogIn, MessageSquare, Heart, Pin, Lock, Plus, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: string;
  is_pinned: boolean;
  is_important: boolean;
  likes_count: number;
  replies_count: number;
  created_at: string;
  profiles?: {
    full_name: string | null;
    avatar_url?: string | null;
  } | null;
}

export default function Discuss() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingDiscussion, setEditingDiscussion] = useState<Discussion | null>(null);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  const featuredTopics = [
    'Getting Started',
    'Algorithms',
    'Data Structures',
    'System Design',
    'Interview Tips',
    'Code Review'
  ];

  const categories = [
    { value: 'general', label: 'General Discussion' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'data-structures', label: 'Data Structures' },
    { value: 'contests', label: 'Contests' },
    { value: 'announcements', label: 'Announcements' },
    { value: 'help', label: 'Help & Support' }
  ];

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      // First get discussions
      const { data: discussionsData, error: discussionsError } = await supabase
        .from('discussions')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (discussionsError) throw discussionsError;

      // Then get profile data for each discussion
      const discussionsWithProfiles = await Promise.all(
        (discussionsData || []).map(async (discussion) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('user_id', discussion.author_id)
            .single();

          return {
            ...discussion,
            profiles: profileData
          };
        })
      );

      setDiscussions(discussionsWithProfiles);
    } catch (error) {
      console.error('Error fetching discussions:', error);
      toast({
        title: "Error",
        description: "Failed to load discussions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiscussion = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('discussions')
        .insert({
          title: newDiscussion.title.trim(),
          content: newDiscussion.content.trim(),
          category: newDiscussion.category,
          author_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Discussion created successfully!"
      });

      setCreateDialogOpen(false);
      setNewDiscussion({ title: '', content: '', category: 'general' });
      fetchDiscussions();
    } catch (error) {
      console.error('Error creating discussion:', error);
      toast({
        title: "Error",
        description: "Failed to create discussion",
        variant: "destructive"
      });
    }
  };

  const handleUpdateDiscussion = async () => {
    if (!editingDiscussion || !user) return;

    try {
      const { error } = await supabase
        .from('discussions')
        .update({
          title: editingDiscussion.title,
          content: editingDiscussion.content,
          category: editingDiscussion.category
        })
        .eq('id', editingDiscussion.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Discussion updated successfully!"
      });

      setEditingDiscussion(null);
      fetchDiscussions();
    } catch (error) {
      console.error('Error updating discussion:', error);
      toast({
        title: "Error",
        description: "Failed to update discussion",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDiscussion = async (discussion: Discussion) => {
    if (!user || (!isAdmin && discussion.author_id !== user.id)) return;

    if (discussion.is_important && !isAdmin) {
      toast({
        title: "Cannot Delete",
        description: "This discussion is marked as important and can only be deleted by admins",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('discussions')
        .delete()
        .eq('id', discussion.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Discussion deleted successfully!"
      });

      fetchDiscussions();
    } catch (error) {
      console.error('Error deleting discussion:', error);
      toast({
        title: "Error",
        description: "Failed to delete discussion",
        variant: "destructive"
      });
    }
  };

  const togglePin = async (discussion: Discussion) => {
    if (!isAdmin) return;

    try {
      const { error } = await supabase
        .from('discussions')
        .update({ is_pinned: !discussion.is_pinned })
        .eq('id', discussion.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Discussion ${discussion.is_pinned ? 'unpinned' : 'pinned'} successfully!`
      });

      fetchDiscussions();
    } catch (error) {
      console.error('Error toggling pin:', error);
      toast({
        title: "Error",
        description: "Failed to update discussion",
        variant: "destructive"
      });
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'algorithms': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'data-structures': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'contests': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'announcements': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'help': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'general': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    };
    return colors[category] || colors.general;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const canEditDiscussion = (discussion: Discussion) => {
    return user && (discussion.author_id === user.id || isAdmin);
  };

  const canDeleteDiscussion = (discussion: Discussion) => {
    return user && ((discussion.author_id === user.id && !discussion.is_important) || isAdmin);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Login Banner for Non-Authenticated Users */}
        {!user && (
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Join the Discussion!</h3>
                  <p className="text-sm text-muted-foreground">Sign up to create discussions, reply to posts, and connect with the community</p>
                </div>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="shrink-0"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Forum Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Community Forum</h1>
            <p className="text-muted-foreground mt-2">
              Connect with fellow developers, share knowledge, and get help with coding challenges.
            </p>
          </div>
          
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => !user && navigate('/auth')}
                className="shrink-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Start Discussion
              </Button>
            </DialogTrigger>
            {user && (
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Discussion</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Discussion title"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Select 
                    value={newDiscussion.category} 
                    onValueChange={(value) => setNewDiscussion(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Share your thoughts, ask questions, or start a discussion..."
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateDiscussion}>
                      Create Discussion
                    </Button>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Discussion List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {discussion.is_pinned && <Pin className="h-4 w-4 text-primary" />}
                        {discussion.is_important && <Lock className="h-4 w-4 text-orange-500" />}
                        <Badge className={getCategoryColor(discussion.category)}>
                          {discussion.category}
                        </Badge>
                      </div>
                      
                      {(canEditDiscussion(discussion) || canDeleteDiscussion(discussion) || isAdmin) && (
                        <div className="flex gap-1">
                          {isAdmin && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePin(discussion)}
                              className="h-8 w-8 p-0"
                            >
                              <Pin className={`h-3 w-3 ${discussion.is_pinned ? 'text-primary' : 'text-muted-foreground'}`} />
                            </Button>
                          )}
                          {canEditDiscussion(discussion) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingDiscussion(discussion)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                          {canDeleteDiscussion(discussion) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDiscussion(discussion)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary cursor-pointer">
                      {discussion.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {discussion.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={discussion.profiles?.avatar_url} />
                          <AvatarFallback>
                            {discussion.profiles?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {discussion.profiles?.full_name || 'Anonymous'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatTimeAgo(discussion.created_at)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{discussion.likes_count}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {discussions.length === 0 && (
                <Card className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No discussions yet</h3>
                  <p className="text-muted-foreground mb-4">Be the first to start a conversation!</p>
                  {user && (
                    <Button onClick={() => setCreateDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Discussion
                    </Button>
                  )}
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Featured Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {featuredTopics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Forum Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Discussions</span>
                    <span className="font-medium">{discussions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pinned Topics</span>
                    <span className="font-medium">{discussions.filter(d => d.is_pinned).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Discussion Dialog */}
        <Dialog open={!!editingDiscussion} onOpenChange={() => setEditingDiscussion(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Discussion</DialogTitle>
            </DialogHeader>
            {editingDiscussion && (
              <div className="space-y-4">
                <Input
                  placeholder="Discussion title"
                  value={editingDiscussion.title}
                  onChange={(e) => setEditingDiscussion(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
                <Select 
                  value={editingDiscussion.category} 
                  onValueChange={(value) => setEditingDiscussion(prev => prev ? { ...prev, category: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Discussion content..."
                  value={editingDiscussion.content}
                  onChange={(e) => setEditingDiscussion(prev => prev ? { ...prev, content: e.target.value } : null)}
                  rows={6}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingDiscussion(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateDiscussion}>
                    Update Discussion
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}