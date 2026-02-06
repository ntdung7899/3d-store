'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
    id: string;
    label: string;
    icon?: ReactNode;
}

interface ProductTabsProps {
    tabs: Tab[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
    children: (activeTab: string) => ReactNode;
}

export default function ProductTabs({
    tabs,
    defaultTab,
    onTabChange,
    children
}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex border-b border-border">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={cn(
                            'relative px-6 py-3 font-medium text-sm transition-smooth',
                            activeTab === tab.id
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <div className="flex items-center gap-2">
                            {tab.icon}
                            {tab.label}
                        </div>

                        {/* Active indicator */}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="py-6"
            >
                {children(activeTab)}
            </motion.div>
        </div>
    );
}
