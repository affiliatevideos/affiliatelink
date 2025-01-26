import React from 'react';
import { useInView } from 'react-intersection-observer';
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
      className="relative overflow-hidden rounded-lg bg-white shadow-md"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="p-2 sm:p-3">
          <div className="flex items-center justify-center h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]">
            {inView && (
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full w-auto object-contain"
              />
            )}
          </div>
          <h3 className="mt-2 text-[11px] font-medium text-gray-800 line-clamp-2 sm:text-xs md:text-sm lg:text-base">
            {product.title}
          </h3>
        </div>
      </a>
    </div>
  );
}