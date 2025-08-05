import { useState, useEffect } from 'react';
import { 
  supabase, 
  testConnection, 
  type Category, 
  isSupabaseConfigured,
  handleSupabaseError
} from '../lib/supabase';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using demo data');
        // Return demo categories instead of throwing error
        const demoCategories = [
          { id: 'all', label: 'All', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: 'funforms', label: 'Fun Forms', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: 'colorcast', label: 'Color Cast', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: 'themed', label: 'Themed Essentials', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
        ];
        setCategories(demoCategories);
        setLoading(false);
        return;
      }

      console.log('Fetching categories...');
      
      // Test connection first
      const connectionTest = await testConnection();
      if (!connectionTest) {
        throw new Error('Unable to connect to Supabase. Please check your configuration and network connection.');
      }

      const { data, error: supabaseError } = await supabase!
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (supabaseError) {
        console.error('Supabase query error:', supabaseError);
        const errorInfo = handleSupabaseError(supabaseError);
        throw new Error(errorInfo.message);
      }

      console.log('Categories fetched successfully:', data?.length || 0, 'items');
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Don't set error for connection issues, just use demo data
      console.log('Using demo categories due to connection issue');
      const demoCategories = [
        { id: 'all', label: 'All', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'funforms', label: 'Fun Forms', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'colorcast', label: 'Color Cast', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 'themed', label: 'Themed Essentials', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      ];
      setCategories(demoCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const refetch = () => {
    fetchCategories();
  };

  return {
    categories,
    loading,
    error,
    refetch
  };
};