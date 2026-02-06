'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { CartProvider } from '@/hooks/use-cart';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </ThemeProvider>
    );
}
