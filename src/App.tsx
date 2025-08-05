import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Components
import IntroSplash from './components/IntroSplash';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import ProductGrid from './components/ProductGrid';
import AdminDashboard from './pages/AdminDashboard';
import ProductView from './pages/ProductView';

// Hooks
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';

// Main Catalog Component
const CatalogPage: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { products, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setSearchTerm(''); // Clear search when changing filters
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      setActiveFilter('all'); // Show all categories when searching
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Intro Splash */}
      {showIntro && <IntroSplash onComplete={handleIntroComplete} />}

      {/* Main Content */}
      {!showIntro && (
        <>
          {/* Header */}
          <Header />

          {/* Filter Section */}
          <FilterSection
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            categories={categories}
          />

          {/* Product Grid */}
          <ProductGrid
            products={products}
            activeFilter={activeFilter}
            searchTerm={searchTerm}
          />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/product-view" element={<ProductView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;