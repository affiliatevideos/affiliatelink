import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          {inView && (
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        </div>
        <div className="p-4">
          <h3 className="flex items-center justify-between text-lg font-semibold text-gray-800">
            {product.title}
            <ExternalLink className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </h3>
        </div>
      </a>
    </div>
  );
}