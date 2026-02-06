'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Package, Download } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
    const { items, removeItem, updateQuantity, subtotal, shipping, total } = useCart();

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <div className="text-8xl mb-6">🛒</div>
                    <h1 className="text-4xl font-bold mb-4">Giỏ hàng trống</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Chưa có sản phẩm nào trong giỏ hàng của bạn
                    </p>
                    <Link href="/products">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg flex items-center gap-2 mx-auto shadow-lg"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Tiếp tục mua sắm
                        </motion.button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/products"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-smooth"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Tiếp tục mua sắm
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold">Giỏ hàng của bạn</h1>
                <p className="text-muted-foreground mt-2">
                    {items.length} sản phẩm trong giỏ
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item, index) => {
                        const price = item.type === 'file'
                            ? item.product.filePrice || 0
                            : item.product.printBasePrice || 0;

                        return (
                            <motion.div
                                key={`${item.product.id}-${item.type}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-card rounded-xl p-4 sm:p-6 border border-border"
                            >
                                <div className="flex gap-4">
                                    {/* Image */}
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                        <Image
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                                                    {item.product.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {item.type === 'file' ? (
                                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                            <Download className="w-3 h-3" />
                                                            Digital File
                                                        </span>
                                                    ) : (
                                                        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                            <Package className="w-3 h-3" />
                                                            Physical Product
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.product.id, item.type)}
                                                className="p-2 hover:bg-muted rounded-lg transition-smooth text-muted-foreground hover:text-destructive"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Options for print items */}
                                        {item.type === 'print' && item.selectedOptions && (
                                            <div className="text-sm text-muted-foreground mb-3 space-y-1">
                                                {item.selectedOptions.material && (
                                                    <div>Vật liệu: {item.selectedOptions.material.name}</div>
                                                )}
                                                {item.selectedOptions.color && (
                                                    <div className="flex items-center gap-2">
                                                        Màu: {item.selectedOptions.color.name}
                                                        <div
                                                            className="w-4 h-4 rounded-full border border-border"
                                                            style={{ backgroundColor: item.selectedOptions.color.hex }}
                                                        />
                                                    </div>
                                                )}
                                                {item.selectedOptions.size && (
                                                    <div>Kích thước: {item.selectedOptions.size}</div>
                                                )}
                                            </div>
                                        )}

                                        {/* Quantity & Price */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.type, item.quantity - 1)}
                                                    className="p-2 hover:bg-background rounded transition-smooth"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.type, item.quantity + 1)}
                                                    className="p-2 hover:bg-background rounded transition-smooth"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <div className="font-bold text-lg">
                                                    {formatPrice(price * item.quantity)}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatPrice(price)} × {item.quantity}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                        <h2 className="text-2xl font-bold mb-6">Tổng đơn hàng</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Tạm tính</span>
                                <span className="font-medium">{formatPrice(subtotal)}</span>
                            </div>

                            {shipping > 0 && (
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-medium">{formatPrice(shipping)}</span>
                                </div>
                            )}

                            {shipping === 0 && items.some(item => item.type === 'file') && (
                                <div className="flex items-center gap-2 text-sm text-accent">
                                    <Download className="w-4 h-4" />
                                    <span>File tải ngay - Miễn phí vận chuyển</span>
                                </div>
                            )}

                            <div className="pt-4 border-t border-border">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Tổng cộng</span>
                                    <span className="text-primary">{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-smooth"
                        >
                            Thanh toán
                        </motion.button>

                        <p className="text-xs text-muted-foreground text-center mt-4">
                            Đây là demo UI - Thanh toán chưa thực hiện
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
