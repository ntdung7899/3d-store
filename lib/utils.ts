import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Vietnamese Dong
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

/**
 * Calculate price based on material and size
 */
export function calculatePrice(
  basePrice: number,
  materialMultiplier: number = 1,
  sizeMultiplier: number = 1
): number {
  return Math.round(basePrice * materialMultiplier * sizeMultiplier);
}

/**
 * Get size multiplier
 */
export function getSizeMultiplier(size: string): number {
  const multipliers: Record<string, number> = {
    Small: 0.7,
    Medium: 1.0,
    Large: 1.5,
  };
  return multipliers[size] || 1.0;
}
