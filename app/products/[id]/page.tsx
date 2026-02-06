'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Download, Package, FileText, ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { useAnimate, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ProductGallery from '@/components/ui/product-gallery';
import ProductTabs from '@/components/ui/product-tabs';
import MaterialSelector from '@/components/ui/material-selector';
import ColorSelector from '@/components/ui/color-selector';
import PriceBox from '@/components/ui/price-box';
import ProductCard from '@/components/ui/product-card';
import { getProductById, getRelatedProducts, materials, colors } from '@/lib/data';
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
    const [isFlying, setIsFlying] = useState(false);
    const [flyingCoords, setFlyingCoords] = useState({ x: 0, y: 0 });
    const [targetCoords, setTargetCoords] = useState({ x: 0, y: 0 });

    const relatedProducts = product ? getRelatedProducts(product) : [];

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

    const handleAddToCart = (type: 'file' | 'print', e: React.MouseEvent) => {
        // Calculate animation start position
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

        // Find cart icon position
        const cartIcon = document.getElementById('header-cart-icon');
        const cartRect = cartIcon?.getBoundingClientRect();

        setFlyingCoords({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        });

        setTargetCoords({
            x: (cartRect?.left || window.innerWidth - 100) + (cartRect?.width || 0) / 2,
            y: (cartRect?.top || 20) + (cartRect?.height || 0) / 2
        });

        setIsFlying(true);

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

        // Clear flying state after animation
        setTimeout(() => setIsFlying(false), 800);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative">
            <AnimatePresence>
                {isFlying && (
                    <motion.div
                        variants={{
                            initial: {
                                scale: 0.5,
                                opacity: 0,
                                position: 'fixed',
                                left: flyingCoords.x - 64,
                                top: flyingCoords.y - 64,
                                zIndex: 100
                            },
                            animate: {
                                scale: [0.5, 1.2, 0.1],
                                opacity: [0, 1, 0],
                                left: [flyingCoords.x - 64, flyingCoords.x - 64, targetCoords.x - 16],
                                top: [flyingCoords.y - 64, flyingCoords.y - 64, targetCoords.y - 16]
                            }
                        }}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="pointer-events-none"
                    >
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-[0_0_40px_rgba(99,102,241,0.6)] bg-white ring-2 ring-primary">
                            <Image
                                src={product.images[0]}
                                alt="Flying item"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                    <div className="flex flex-wrap gap-2 mb-4">
                        {hasFile && (
                            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-primary/20">
                                <Download className="w-3 h-3" />
                                FILE STL
                            </span>
                        )}
                        {hasPrint && (
                            <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-secondary/20">
                                <Package className="w-3 h-3" />
                                IN SẴN 3D
                            </span>
                        )}
                        {product.category && (
                            <span className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full border border-border">
                                {product.category.toUpperCase()}
                            </span>
                        )}
                    </div>

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

                    {/* Detailed Specs */}
                    <div className="bg-muted/30 rounded-2xl p-6 mb-8 border border-border">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Thông số kỹ thuật
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Phân loại:</span>
                                <span className="font-medium">{product.category || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Bản quyền:</span>
                                <span className="font-medium">{product.license || 'Standard'}</span>
                            </div>
                            {product.supportedMaterials && (
                                <div className="flex flex-col gap-2 col-span-1 sm:col-span-2 pt-2">
                                    <span className="text-muted-foreground">Nhựa hỗ trợ:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {product.supportedMaterials.map(mat => (
                                            <span key={mat} className="px-2 py-0.5 bg-background border border-border rounded text-[10px] font-bold text-foreground">
                                                {mat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

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
                                            onClick={(e) => handleAddToCart('file', e)}
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
                                            onClick={(e) => handleAddToCart('print', e)}
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

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="mt-20 border-t border-border pt-16">
                    <h2 className="text-3xl font-bold mb-8">Sản phẩm liên quan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((p, index) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProductCard product={p} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
