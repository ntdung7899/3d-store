'use client';

import { motion } from 'framer-motion';
import { Material } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';

interface MaterialSelectorProps {
    materials: Material[];
    selected?: Material;
    onSelect: (material: Material) => void;
}

export default function MaterialSelector({
    materials,
    selected,
    onSelect
}: MaterialSelectorProps) {
    return (
        <div className="space-y-3">
            <label className="text-sm font-medium">Chọn vật liệu</label>
            <div className="flex flex-wrap gap-2">
                {materials.map((material) => {
                    const isSelected = selected?.id === material.id;

                    return (
                        <motion.button
                            key={material.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(material)}
                            className={cn(
                                'px-4 py-2 rounded-full font-medium text-sm border-2 transition-smooth flex items-center gap-2',
                                isSelected
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-card text-foreground border-border hover:border-primary'
                            )}
                        >
                            <Layers className="w-4 h-4" />
                            {material.name}
                            {material.priceMultiplier !== 1 && (
                                <span className="text-xs opacity-75">
                                    (x{material.priceMultiplier})
                                </span>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
