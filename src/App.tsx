import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import IntroSplash from './components/IntroSplash';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import ProductGrid from './components/ProductGrid';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import AdminDashboard from './pages/AdminDashboard';
import ProductView from './pages/ProductView';
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainCatalog />} />
          <Route path="/product-view" element={<ProductView />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function MainCatalog() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Always show demo data to prevent white screen
  const demoProducts = [
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
    }
  ];

  const demoCategories = [
    { id: 'all', label: 'All', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'funforms', label: 'Fun Forms', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'colorcast', label: 'Color Cast', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'themed', label: 'Themed Essentials', disabled: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ];

  // Fetch data from Supabase with fallback to demo data
  const { 
    products = demoProducts, 
    loading: productsLoading = false, 
    error: productsError = null
  } = useProducts();
  
  const { 
    categories = demoCategories, 
    loading: categoriesLoading = false, 
    error: categoriesError = null
  } = useCategories();

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setSearchTerm('');
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term.trim() && activeFilter !== 'all') {
      setActiveFilter('all');
    }
  };

  // Force intro to complete after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {showIntro && <IntroSplash onComplete={handleIntroComplete} />}
      
      {!showIntro && (
        <div className="w-full">
          <Header />
          <FilterSection 
            activeFilter={activeFilter} 
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            categories={categories}
          />
          <ProductGrid 
            products={products} 
            activeFilter={activeFilter}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
}

export default App;