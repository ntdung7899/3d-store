'use client';

import { motion } from 'framer-motion';
import { Color } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ColorSelectorProps {
    colors: Color[];
    selected?: Color;
    onSelect: (color: Color) => void;
}

export default function ColorSelector({
    colors,
    selected,
    onSelect
}: ColorSelectorProps) {
    return (
        <div className="space-y-3">
            <label className="text-sm font-medium">Chọn màu</label>
            <div className="flex flex-wrap gap-3">
                {colors.map((color) => {
                    const isSelected = selected?.id === color.id;

                    return (
                        <motion.button
                            key={color.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onSelect(color)}
                            className={cn(
                                'relative w-10 h-10 rounded-full border-2 transition-smooth',
                                isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-border'
                            )}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        >
                            {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={3} />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
            {selected && (
                <p className="text-sm text-muted-foreground">
                    Đã chọn: <span className="font-medium text-foreground">{selected.name}</span>
                </p>
            )}
        </div>
    );
}
