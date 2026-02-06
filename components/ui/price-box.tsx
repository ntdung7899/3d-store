'use client';

import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PriceBoxProps {
    price: number;
    oldPrice?: number;
    label?: string;
}

export default function PriceBox({ price, oldPrice, label }: PriceBoxProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-muted/50 rounded-lg p-4 border border-border"
        >
            {label && (
                <p className="text-sm text-muted-foreground mb-2">{label}</p>
            )}

            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                    {formatPrice(price)}
                </span>

                {oldPrice && oldPrice > price && (
                    <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(oldPrice)}
                    </span>
                )}
            </div>

            {oldPrice && oldPrice > price && (
                <p className="text-sm text-accent mt-1 font-medium">
                    Tiết kiệm {formatPrice(oldPrice - price)}
                </p>
            )}
        </motion.div>
    );
}
