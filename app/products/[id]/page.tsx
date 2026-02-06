'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Download, Package, FileText, ShoppingCart, ArrowLeft } from 'lucide-react';
import ProductGallery from '@/components/ui/product-gallery';
import ProductTabs from '@/components/ui/product-tabs';
import MaterialSelector from '@/components/ui/material-selector';
import ColorSelector from '@/components/ui/color-selector';
import PriceBox from '@/components/ui/price-box';
import { getProductById, materials, colors } from '@/lib/data';
import { Product, ProductType, Material, Color, SizeOption } from '@/lib/types';
import { calculatePrice, getSizeMultiplier, formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addItem } = useCart();
    const product = getProductById(params.id as string);

    const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
    const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);
    const [selectedSize, setSelectedSize] = useState<SizeOption>(SizeOption.MEDIUM);

    if (!product) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="text-6xl mb-4">😕</div>
                <h1 className="text-3xl font-bold mb-2">Không tìm thấy sản phẩm</h1>
                <p className="text-muted-foreground mb-6">
                    Sản phẩm này không tồn tại hoặc đã bị xóa
                </p>
                <button
                    onClick={() => router.push('/products')}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
                >
                    Quay lại danh sách
                </button>
            </div>
        );
    }

    const hasFile = product.type === ProductType.FILE || product.type === ProductType.BOTH;
    const hasPrint = product.type === ProductType.PRINT || product.type === ProductType.BOTH;

    const calculatePrintPrice = () => {
        const basePrice = product.printBasePrice || 0;
        const sizeMultiplier = getSizeMultiplier(selectedSize);
        return calculatePrice(basePrice, selectedMaterial.priceMultiplier, sizeMultiplier);
    };

    const handleAddToCart = (type: 'file' | 'print') => {
        addItem({
            product,
            type,
            quantity: 1,
            selectedOptions: type === 'print' ? {
                material: selectedMaterial,
                color: selectedColor,
                size: selectedSize,
            } : undefined,
        });

        // Optional: Show toast notification
        alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-smooth"
            >
                <ArrowLeft className="w-5 h-5" />
                Quay lại
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Gallery */}
                <div>
                    <ProductGallery images={product.images} productName={product.name} />
                </div>

                {/* Right Column - Product Info */}
                <div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={i < Math.floor(product.rating) ? 'text-orange' : 'text-muted'}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="font-semibold">{product.rating}</span>
                        </div>
                        <span className="text-muted-foreground">
                            ({product.reviewCount} đánh giá)
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Tabs */}
                    <ProductTabs
                        tabs={[
                            ...(hasFile ? [{ id: 'file', label: 'Mua file', icon: <Download className="w-4 h-4" /> }] : []),
                            ...(hasPrint ? [{ id: 'print', label: 'In sẵn', icon: <Package className="w-4 h-4" /> }] : []),
                        ]}
                        defaultTab={hasFile ? 'file' : 'print'}
                    >
                        {(activeTab) => (
                            <>
                                {/* File Tab */}
                                {activeTab === 'file' && hasFile && (
                                    <div className="space-y-6">
                                        <PriceBox price={product.filePrice || 0} label="Giá file" />

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <FileText className="w-5 h-5 text-primary" />
                                                <span className="font-medium">Định dạng:</span>
                                                <div className="flex gap-2">
                                                    {product.fileFormats?.map(format => (
                                                        <span
                                                            key={format}
                                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold"
                                                        >
                                                            {format}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {product.license && (
                                                <div className="text-sm">
                                                    <span className="font-medium">License: </span>
                                                    <span className="text-muted-foreground">{product.license}</span>
                                                </div>
                                            )}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAddToCart('file')}
                                            className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-smooth"
                                        >
                                            <Download className="w-5 h-5" />
                                            Mua & tải ngay
                                        </motion.button>
                                    </div>
                                )}

                                {/* Print Tab */}
                                {activeTab === 'print' && hasPrint && (
                                    <div className="space-y-6">
                                        <MaterialSelector
                                            materials={materials}
                                            selected={selectedMaterial}
                                            onSelect={setSelectedMaterial}
                                        />

                                        <ColorSelector
                                            colors={colors}
                                            selected={selectedColor}
                                            onSelect={setSelectedColor}
                                        />

                                        <div className="space-y-3">
                                            <label className="text-sm font-medium">Chọn kích thước</label>
                                            <select
                                                value={selectedSize}
                                                onChange={(e) => setSelectedSize(e.target.value as SizeOption)}
                                                className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            >
                                                <option value={SizeOption.SMALL}>Nhỏ (70%)</option>
                                                <option value={SizeOption.MEDIUM}>Vừa (100%)</option>
                                                <option value={SizeOption.LARGE}>Lớn (150%)</option>
                                            </select>
                                        </div>

                                        <PriceBox price={calculatePrintPrice()} label="Giá in sẵn" />

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAddToCart('print')}
                                            className="w-full px-6 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-smooth"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            Thêm vào giỏ
                                        </motion.button>
                                    </div>
                                )}
                            </>
                        )}
                    </ProductTabs>
                </div>
            </div>
        </div>
    );
}
