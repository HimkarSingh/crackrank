import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Users, BarChart3, MessageSquare, Pin, Lock, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topic: string;
  acceptance_rate: number;
  is_solved: boolean;
  created_at: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  created_at: string;
  role?: string;
}

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

export default function Admin() {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [activeTab, setActiveTab] = useState('problems');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    topic: '',
    acceptance_rate: 0,
  });

  useEffect(() => {
    fetchProblems();
    fetchUsers();
  }, []);

  const fetchProblems = async () => {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProblems(data || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
      toast({
        title: "Error",
        description: "Failed to fetch problems",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      const usersWithRoles = profilesData?.map(user => {
        const userRole = rolesData?.find(role => role.user_id === user.user_id);
        return {
          ...user,
          role: userRole?.role || 'user'
        };
      }) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProblem) {
        const { error } = await supabase
          .from('problems')
          .update(formData)
          .eq('id', editingProblem.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Problem updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('problems')
          .insert([formData]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Problem created successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingProblem(null);
      setFormData({
        title: '',
        description: '',
        difficulty: 'Easy',
        topic: '',
        acceptance_rate: 0,
      });
      fetchProblems();
    } catch (error) {
      console.error('Error saving problem:', error);
      toast({
        title: "Error",
        description: "Failed to save problem",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (problem: Problem) => {
    setEditingProblem(problem);
    setFormData({
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      topic: problem.topic,
      acceptance_rate: problem.acceptance_rate,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this problem?')) return;

    try {
      const { error } = await supabase
        .from('problems')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Problem deleted successfully",
      });
      fetchProblems();
    } catch (error) {
      console.error('Error deleting problem:', error);
      toast({
        title: "Error",
        description: "Failed to delete problem",
        variant: "destructive",
      });
    }
  };

  const toggleUserRole = async (userId: string, currentRole: string) => {
    // Additional security check: verify current user is admin
    const { data: currentUserRole, error: roleCheckError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user?.id)
      .eq('role', 'admin')
      .single();

    if (roleCheckError || !currentUserRole) {
      toast({
        title: "Error",
        description: "Unauthorized: Admin access required",
        variant: "destructive",
      });
      return;
    }

    // Prevent users from removing their own admin role
    if (userId === user?.id && currentRole === 'admin') {
      toast({
        title: "Error",
        description: "Cannot remove your own admin privileges",
        variant: "destructive",
      });
      return;
    }

    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `User role updated to ${newRole}`,
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage problems, users, and monitor the application</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        <Button
          variant={activeTab === 'problems' ? 'default' : 'outline'}
          onClick={() => setActiveTab('problems')}
          className="flex items-center gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Problems
        </Button>
        <Button
          variant={activeTab === 'users' ? 'default' : 'outline'}
          onClick={() => setActiveTab('users')}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          Users
        </Button>
      </div>

      {/* Problems Tab */}
      {activeTab === 'problems' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Problems Management</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingProblem(null);
                  setFormData({
                    title: '',
                    description: '',
                    difficulty: 'Easy',
                    topic: '',
                    acceptance_rate: 0,
                  });
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Problem
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingProblem ? 'Edit Problem' : 'Add New Problem'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="topic">Topic</Label>
                      <Input
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="acceptance_rate">Acceptance Rate (%)</Label>
                    <Input
                      id="acceptance_rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.acceptance_rate}
                      onChange={(e) => setFormData({ ...formData, acceptance_rate: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingProblem ? 'Update' : 'Create'} Problem
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Problems ({problems.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Acceptance Rate</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {problems.map((problem) => (
                    <TableRow key={problem.id}>
                      <TableCell className="font-medium">{problem.title}</TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>{problem.topic}</TableCell>
                      <TableCell>{problem.acceptance_rate}%</TableCell>
                      <TableCell>{new Date(problem.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(problem)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(problem.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Users Management</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>All Users ({users.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name || 'No Name'}</TableCell>
                      <TableCell>
                        <Badge className={user.role === 'admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleUserRole(user.user_id, user.role || 'user')}
                        >
                          Make {user.role === 'admin' ? 'User' : 'Admin'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}