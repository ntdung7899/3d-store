'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProductCard from '@/components/ui/product-card';
import { products } from '@/lib/data';
import { ProductType } from '@/lib/types';

export default function ProductsPage() {
    const [filterType, setFilterType] = useState<'all' | 'file' | 'print'>('all');

    const filteredProducts = products.filter(product => {
        if (filterType === 'all') return true;
        if (filterType === 'file') {
            return product.type === ProductType.FILE || product.type === ProductType.BOTH;
        }
        if (filterType === 'print') {
            return product.type === ProductType.PRINT || product.type === ProductType.BOTH;
        }
        return true;
    });

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    Danh sách sản phẩm
                </h1>
                <p className="text-lg text-muted-foreground">
                    Khám phá {products.length} mẫu file và sản phẩm in 3D chất lượng cao
                </p>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Lọc theo:</span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterType('all')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-smooth ${filterType === 'all'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setFilterType('file')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-smooth ${filterType === 'file'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        File STL
                    </button>
                    <button
                        onClick={() => setFilterType('print')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-smooth ${filterType === 'print'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        In sẵn
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-2xl font-bold mb-2">Không tìm thấy sản phẩm</h3>
                    <p className="text-muted-foreground">
                        Thử thay đổi bộ lọc hoặc quay lại sau
                    </p>
                </div>
            )}
        </div>
    );
}
