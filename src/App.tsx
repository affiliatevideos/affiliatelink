import React, { useEffect, useState } from 'react';
import { ProductGrid } from './components/ProductGrid';
import { fetchProductsFromSheet } from './utils/sheets';
import type { Product, SheetConfig } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const config: SheetConfig = {
          sheetId: '12v1HJ0hg6Y24mLVJJrlnnlZC67rS2o-qUQMuIKS8Tv4',
          range: 'Sheet1!A:D', // Updated range to include column D
        };

        const data = await fetchProductsFromSheet(config);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://pub-978fa224b48646b0b99f042a0935693b.r2.dev/techreviewprologo.png" 
                alt="TechReviewPro Logo" 
                className="h-10 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                TechReviewPro
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        ) : (
          <ProductGrid products={products} loading={loading} />
        )}
      </main>
    </div>
  );
}

export default App;