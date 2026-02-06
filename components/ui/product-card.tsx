'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Download, Package } from 'lucide-react';
import { Product, ProductType } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
    className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
    const hasFile = product.type === ProductType.FILE || product.type === ProductType.BOTH;
    const hasPrint = product.type === ProductType.PRINT || product.type === ProductType.BOTH;

    return (
        <Link href={`/products/${product.id}`}>
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    'group relative bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-smooth',
                    className
                )}
            >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-smooth"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {hasFile && (
                            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                File STL
                            </span>
                        )}
                        {hasPrint && (
                            <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                <Package className="w-3 h-3" />
                                In sẵn
                            </span>
                        )}
                    </div>

                    {/* Featured badge */}
                    {product.featured && (
                        <div className="absolute top-3 right-3">
                            <span className="bg-orange text-white text-xs font-bold px-2 py-1 rounded">
                                ⭐ Nổi bật
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-smooth">
                        {product.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.shortDescription}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3 text-sm">
                        <div className="flex items-center">
                            <span className="text-orange">★</span>
                            <span className="ml-1 font-medium">{product.rating}</span>
                        </div>
                        <span className="text-muted-foreground">({product.reviewCount})</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            {hasFile && product.filePrice && (
                                <div className="text-sm">
                                    <span className="text-xs text-muted-foreground">File: </span>
                                    <span className="font-bold text-primary">
                                        {formatPrice(product.filePrice)}
                                    </span>
                                </div>
                            )}
                            {hasPrint && product.printBasePrice && (
                                <div className="text-sm">
                                    <span className="text-xs text-muted-foreground">In: </span>
                                    <span className="font-bold text-secondary">
                                        {formatPrice(product.printBasePrice)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
