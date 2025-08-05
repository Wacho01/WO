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
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainCatalog />} />
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

  // Fetch data from Supabase
  const { 
    products, 
    loading: productsLoading, 
    error: productsError, 
    refetch: refetchProducts 
  } = useProducts();
  
  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError, 
    refetch: refetchCategories 
  } = useCategories();

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    // Clear search when changing filters for better UX
    setSearchTerm('');
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    // When searching, reset filter to 'all' to search across all products
    if (term.trim() && activeFilter !== 'all') {
      setActiveFilter('all');
    }
  };

  const handleRetry = () => {
    refetchProducts();
    refetchCategories();
  };

  // Force intro to complete after 3 seconds regardless
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Show error only if both products and categories fail to load AND intro is complete
  const hasError = !showIntro && productsError && categoriesError;
  const errorMessage = productsError || categoriesError || '';

  return (
    <div className="min-h-screen bg-gray-100">
      {showIntro && <IntroSplash onComplete={handleIntroComplete} />}
      
      {!showIntro && (
        <div className="w-full">
          <Header />
          
          {hasError ? (
            <ErrorMessage 
              message={errorMessage} 
              onRetry={handleRetry}
              className="mt-8"
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;