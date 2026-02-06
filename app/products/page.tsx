'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProductCard from '@/components/ui/product-card';
import { products } from '@/lib/data';
import { ProductType, MaterialType } from '@/lib/types';

export default function ProductsPage() {
    const [filterType, setFilterType] = useState<'all' | 'file' | 'print'>('all');
    const [filterMaterial, setFilterMaterial] = useState<MaterialType | 'all'>('all');

    const filteredProducts = products.filter(product => {
        // Filter by type
        let matchesType = true;
        if (filterType === 'file') {
            matchesType = product.type === ProductType.FILE || product.type === ProductType.BOTH;
        } else if (filterType === 'print') {
            matchesType = product.type === ProductType.PRINT || product.type === ProductType.BOTH;
        }

        // Filter by material
        let matchesMaterial = true;
        if (filterMaterial !== 'all') {
            matchesMaterial = product.supportedMaterials?.includes(filterMaterial) || false;
        }

        return matchesType && matchesMaterial;
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
            <div className="mb-10 space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-card p-6 rounded-2xl border border-border shadow-sm">
                    {/* Types Filter */}
                    <div className="space-y-3 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Loại sản phẩm
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['all', 'file', 'print'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type as any)}
                                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${filterType === type
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                        }`}
                                >
                                    {type === 'all' ? 'Tất cả' : type === 'file' ? 'File STL' : 'In sẵn'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Materials Filter */}
                    <div className="space-y-3 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            Chất liệu nhựa
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilterMaterial('all')}
                                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${filterMaterial === 'all'
                                    ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/25 scale-105'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                            >
                                Tất cả chất liệu
                            </button>
                            {Object.values(MaterialType).map((mat) => (
                                <button
                                    key={mat}
                                    onClick={() => setFilterMaterial(mat)}
                                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${filterMaterial === mat
                                        ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/25 scale-105'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                        }`}
                                >
                                    {mat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Result count */}
                <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                    <p>Đang hiển thị <span className="font-bold text-foreground">{filteredProducts.length}</span> sản phẩm</p>
                    {(filterType !== 'all' || filterMaterial !== 'all') && (
                        <button
                            onClick={() => { setFilterType('all'); setFilterMaterial('all'); }}
                            className="text-primary hover:underline font-medium"
                        >
                            Xóa tất cả bộ lọc
                        </button>
                    )}
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
