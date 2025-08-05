import { useState, useEffect } from 'react';
import { 
  supabase, 
  type Category, 
  isSupabaseConfigured
} from '../lib/supabase';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const demoCategories: Category[] = [
    { id: 'all', label: 'All', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'funforms', label: 'Fun Forms', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'colorcast', label: 'Color Cast', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'themed', label: 'Themed Essentials', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'essentials', label: 'Essentials', disabled: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'groundsprays', label: 'Ground Sprays', disabled: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ];

  const fetchCategories = async () => {
    if (!isSupabaseConfigured()) {
      console.log('Using demo categories - Supabase not configured');
      setCategories(demoCategories);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase!
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (supabaseError) {
        console.error('Supabase query error:', supabaseError);
        setCategories(demoCategories);
        return;
      }

      setCategories(data || demoCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
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