import { useState, useEffect } from 'react';
import { 
  supabase, 
  type Product, 
  isSupabaseConfigured,
  testConnection,
  handleSupabaseError
} from '../lib/supabase';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        console.warn('Supabase not configured, using demo data');
        // Return demo data instead of throwing error
        setProducts([
          {
            id: 'demo-1',
            product_name: 'MOUNTAIN LIONS',
            subtitle: 'Small Slide',
            image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
            category_id: 'funforms',
            href: '/src/ProductView/indexProduct.html',
            featured: true,
            active: true,
            file_url: null,
            file_name: null,
            file_type: null,
            is_deleted: false,
            product_number: 'WO-2025-0001',
            last_activity: new Date().toISOString(),
            view_count: 0,
            first_name: null,
            last_name: null,
            activity_log: [],
            flow_requirement_value: null,
            flow_requirement_unit: null,
            flow_requirement_lpm: null,
            flow_requirement_lpm_unit: null,
            product_data_sheet_url: null,
            top_svg_file_url: null,
            side_svg_file_url: null,
            width_in: null,
            width_cm: null,
            length_in: null,
            length_cm: null,
            height_in: null,
            height_cm: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 'demo-2',
            product_name: 'RHINO',
            subtitle: 'Sprayer',
            image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=600',
            category_id: 'colorcast',
            href: '/src/ProductView/indexProduct.html',
            featured: false,
            active: true,
            file_url: null,
            file_name: null,
            file_type: null,
            is_deleted: false,
            product_number: 'WO-2025-0002',
            last_activity: new Date().toISOString(),
            view_count: 0,
            first_name: null,
            last_name: null,
            activity_log: [],
            flow_requirement_value: null,
            flow_requirement_unit: null,
            flow_requirement_lpm: null,
            flow_requirement_lpm_unit: null,
            product_data_sheet_url: null,
            top_svg_file_url: null,
            side_svg_file_url: null,
            width_in: null,
            width_cm: null,
            length_in: null,
            length_cm: null,
            height_in: null,
            height_cm: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 'demo-3',
            product_name: 'GIRAFFE',
            subtitle: 'Sprayer',
            image: 'https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg?auto=compress&cs=tinysrgb&w=600',
            category_id: 'funforms',
            href: '/src/ProductView/indexProduct.html',
            featured: false,
            active: true,
            file_url: null,
            file_name: null,
            file_type: null,
            is_deleted: false,
            product_number: 'WO-2025-0003',
            last_activity: new Date().toISOString(),
            view_count: 0,
            first_name: null,
            last_name: null,
            activity_log: [],
            flow_requirement_value: null,
            flow_requirement_unit: null,
            flow_requirement_lpm: null,
            flow_requirement_lpm_unit: null,
            product_data_sheet_url: null,
            top_svg_file_url: null,
            side_svg_file_url: null,
            width_in: null,
            width_cm: null,
            length_in: null,
            length_cm: null,
            height_in: null,
            height_cm: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);
        setLoading(false);
        return;
      }

      console.log('Fetching products...');
      
      // Test connection first
      const connectionTest = await testConnection();
      if (!connectionTest) {
        throw new Error('Unable to connect to Supabase. Please check your configuration and network connection.');
      }

      const { data, error: supabaseError } = await supabase
        .from('products')
        .select(`
          *,
          categories(id, label)
        `)
        .eq('active', true)
        .neq('is_deleted', true)
        .order('product_name', { ascending: true }); // Order by product name alphabetically

      if (supabaseError) {
        console.error('Supabase query error:', supabaseError);
        const errorInfo = handleSupabaseError(supabaseError);
        throw supabaseError;
      }

      console.log('Products fetched successfully:', data?.length || 0, 'items');
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      const errorInfo = err instanceof Error ? handleSupabaseError(err) : { message: 'Failed to fetch products' };
      const errorMessage = errorInfo.message || 'Failed to fetch products';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    refetch
  };
};