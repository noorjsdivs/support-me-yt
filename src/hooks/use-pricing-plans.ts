
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch pricing plans from Supabase
 * Uses TanStack Query for caching, loading states, and error handling
 */
export const usePricingPlans = () => {
  return useQuery({
    queryKey: ['pricingPlans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('price', { ascending: true });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    },
  });
};
