import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

// Global cache for admin status to avoid repeated API calls
const adminCache = new Map<string, { isAdmin: boolean; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Check cache first
      const cached = adminCache.get(user.id);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setIsAdmin(cached.isAdmin);
        setLoading(false);
        return;
      }

      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          const isAdminUser = !!data;
          setIsAdmin(isAdminUser);
          
          // Cache the result
          adminCache.set(user.id, {
            isAdmin: isAdminUser,
            timestamp: Date.now()
          });
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    };

    checkAdminStatus();

    // Cleanup function to abort any pending requests
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [user?.id]); // Only depend on user.id, not the entire user object

  return { isAdmin, loading };
}