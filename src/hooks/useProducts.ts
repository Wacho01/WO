import { useState, useEffect } from 'react';
import { 
  supabase, 
  type Product, 
  isSupabaseConfigured
} from '../lib/supabase';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const demoProducts: Product[] = [
    {
      id: 'demo-1',
      product_name: 'MOUNTAIN LIONS',
      subtitle: 'Small Slide',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      category_id: 'funforms',
      href: null,
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
      href: null,
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
      href: null,
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
    },
    {
      id: 'demo-4',
      product_name: 'BIGHORN',
      subtitle: 'Medium Slide',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      category_id: 'funforms',
      href: null,
      featured: false,
      active: true,
      file_url: null,
      file_name: null,
      file_type: null,
      is_deleted: false,
      product_number: 'WO-2025-0004',
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
      id: 'demo-5',
      product_name: 'ASIAN ELEPHANT',
      subtitle: 'Sprayer',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=600',
      category_id: 'funforms',
      href: null,
      featured: true,
      active: true,
      file_url: null,
      file_name: null,
      file_type: null,
      is_deleted: false,
      product_number: 'WO-2025-0005',
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
      id: 'demo-6',
      product_name: 'DOLPHIN',
      subtitle: 'Sprayer',
      image: 'https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg?auto=compress&cs=tinysrgb&w=600',
      category_id: 'funforms',
      href: null,
      featured: false,
      active: true,
      file_url: null,
      file_name: null,
      file_type: null,
      is_deleted: false,
      product_number: 'WO-2025-0006',
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
      id: 'demo-7',
      product_name: 'TRUCK',
      subtitle: 'Triple Slide',
      image: 'https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg?auto=compress&cs=tinysrgb&w=600',
      category_id: 'funforms',
      href: null,
      featured: true,
      active: true,
      file_url: null,
      file_name: null,
      file_type: null,
      is_deleted: false,
      product_number: 'WO-2025-0007',
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
      id: 'demo-8',
      product_name: 'TREE HOUSE',
      subtitle: 'Medium Slide',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      category_id: 'funforms',
      href: null,
      featured: false,
      active: true,
      file_url: null,
      file_name: null,
      file_type: null,
      is_deleted: false,
      product_number: 'WO-2025-0008',
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
  ];

  const fetchProducts = async () => {
    if (!isSupabaseConfigured()) {
      console.log('Using demo products - Supabase not configured');
      setProducts(demoProducts);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase!
        .from('products')
        .select(`
          *,
          categories(id, label)
        `)
        .eq('active', true)
        .neq('is_deleted', true)
        .order('product_name', { ascending: true });

      if (supabaseError) {
        console.error('Supabase query error:', supabaseError);
        setProducts(demoProducts);
        return;
      }

      setProducts(data || demoProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts(demoProducts);
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