'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, Sun, Moon, Printer } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
    const themeContext = useTheme();
    const { totalItems } = useCart();

    const theme = themeContext?.theme || 'light';
    const toggleTheme = themeContext?.toggleTheme || (() => { });

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Sản phẩm', href: '/products' },
        { name: 'File in 3D', href: '/products?type=file' },
        { name: 'In theo yêu cầu', href: '/custom' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border glass">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                            <Printer className="w-6 h-6 text-white" />
                        </div>
                        <span className="hidden sm:block gradient-text">3D Store</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-muted transition-smooth"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5" />
                            ) : (
                                <Sun className="w-5 h-5" />
                            )}
                        </button>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative p-2 rounded-lg hover:bg-muted transition-smooth"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth py-2"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
