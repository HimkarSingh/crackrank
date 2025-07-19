-- Create discussions table
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_important BOOLEAN NOT NULL DEFAULT false,
  likes_count INTEGER NOT NULL DEFAULT 0,
  replies_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create discussion_replies table
CREATE TABLE public.discussion_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  author_id UUID NOT NULL,
  content TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for discussions
CREATE POLICY "Everyone can view discussions" 
ON public.discussions 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create discussions" 
ON public.discussions 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors and admins can update discussions" 
ON public.discussions 
FOR UPDATE 
USING (auth.uid() = author_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Authors and admins can delete non-important discussions" 
ON public.discussions 
FOR DELETE 
USING ((auth.uid() = author_id AND is_important = false) OR has_role(auth.uid(), 'admin'));

-- RLS Policies for replies
CREATE POLICY "Everyone can view replies" 
ON public.discussion_replies 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create replies" 
ON public.discussion_replies 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors and admins can update replies" 
ON public.discussion_replies 
FOR UPDATE 
USING (auth.uid() = author_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Authors and admins can delete replies" 
ON public.discussion_replies 
FOR DELETE 
USING (auth.uid() = author_id OR has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE TRIGGER update_discussions_updated_at
BEFORE UPDATE ON public.discussions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discussion_replies_updated_at
BEFORE UPDATE ON public.discussion_replies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample discussions
INSERT INTO public.discussions (title, content, author_id, category, is_pinned, is_important, likes_count, replies_count) VALUES
('Welcome to the Community!', 'This is a pinned discussion to welcome new members. Feel free to introduce yourself here and ask any questions about getting started with coding challenges.', '00000000-0000-0000-0000-000000000000', 'announcements', true, true, 15, 8),
('Best practices for solving algorithms', 'Let''s discuss the most effective approaches for tackling algorithmic problems. Share your favorite techniques and strategies!', '00000000-0000-0000-0000-000000000000', 'algorithms', false, false, 23, 12),
('Dynamic Programming Tips', 'Having trouble with DP problems? Share your insights and learn from others about mastering dynamic programming concepts.', '00000000-0000-0000-0000-000000000000', 'algorithms', false, false, 18, 7),
('Code Review Requests', 'Post your solutions here for community feedback and code reviews. Help each other improve coding style and efficiency.', '00000000-0000-0000-0000-000000000000', 'general', false, false, 12, 15),
('Weekly Coding Contest Discussion', 'Discuss this week''s contest problems, share approaches, and celebrate achievements!', '00000000-0000-0000-0000-000000000000', 'contests', true, false, 31, 22);