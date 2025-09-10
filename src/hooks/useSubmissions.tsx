import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Submission {
  id: string;
  user_id: string;
  problem_id: string;
  code: string;
  language: string;
  passed: boolean;
  testcases: any;
  output: string | null;
  error: string | null;
  created_at: string;
}

export function useSubmissions(problemId?: number) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('submissions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (problemId) {
          query = query.eq('problem_id', problemId.toString());
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        setSubmissions(data || []);
      } catch (err: any) {
        console.error('Error fetching submissions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [user, problemId]);

  const refreshSubmissions = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (problemId) {
        query = query.eq('problem_id', problemId.toString());
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setSubmissions(data || []);
    } catch (err: any) {
      console.error('Error refreshing submissions:', err);
      setError(err.message);
    }
  };

  return {
    submissions,
    loading,
    error,
    refreshSubmissions
  };
}