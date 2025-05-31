
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/components/ui/use-toast";

type ProfileUpdate = {
  username?: string;
  full_name?: string;
  bio?: string;
  website?: string;
  avatar_url?: string;
};

/**
 * Hook to fetch and update user profile
 * Uses TanStack Query for data fetching, caching and mutations
 */
export const useProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch profile data
  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!user?.id, // Only run query if user is authenticated
  });
  
  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error.message || 'Failed to update your profile',
        variant: 'destructive',
      });
    }
  });
  
  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile: updateProfile.mutate,
    isPending: updateProfile.isPending
  };
};
