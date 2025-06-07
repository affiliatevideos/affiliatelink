import React, { useEffect, useState } from 'react';
import { ProductGrid } from './components/ProductGrid';
import { fetchProductsFromSheet } from './utils/sheets';
import { Search } from 'lucide-react';
import type { Product, SheetConfig } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const config: SheetConfig = {
          sheetId: '1S_ifsOpJcqkYpHDbuavo8HLUknjx4VlwLiG26rvCCc0',
          range: 'Sheet1!A:D',
        };

        const data = await fetchProductsFromSheet(config);
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.ibb.co/tpkzCpRx/affiliate.png" 
                alt="affiliate Logo" 
                className="h-7 sm:h-8 w-auto"
              />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Affiliate links
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white py-1.5 pl-9 pr-3 text-xs sm:text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <main className="flex-1 mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        {error ? (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
        ) : (
          <ProductGrid products={filteredProducts} loading={loading} />
        )}
      </main>

      <footer className="bg-white mt-auto border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] sm:text-xs text-gray-600">
            TechReviewPro is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
