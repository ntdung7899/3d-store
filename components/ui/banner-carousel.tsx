'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const BANNERS = [
    {
        id: 1,
        title: "Kỷ Nguyên In 3D Mới",
        subtitle: "Khám phá bộ sưu tập mẫu in kiến trúc và cơ khí đỉnh cao.",
        image: "https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?w=1600&h=800&fit=crop",
        cta: "Xem ngay",
        link: "/products",
        color: "from-primary/80 to-secondary/80"
    },
    {
        id: 2,
        title: "Dịch Vụ In Theo Yêu Cầu",
        subtitle: "Gửi file ngay, nhận sản phẩm tận tay với độ chính xác tuyệt đối.",
        image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1600&h=800&fit=crop",
        cta: "Đặt in ngay",
        link: "/custom",
        color: "from-secondary/80 to-accent/80"
    },
    {
        id: 3,
        title: "Workshop Maker Pro",
        subtitle: "Tham gia cộng đồng và học cách tối ưu hóa máy in của bạn.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&h=800&fit=crop",
        cta: "Tìm hiểu thêm",
        link: "/blog",
        color: "from-accent/80 to-orange/80"
    }
];

export default function BannerCarousel() {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, []);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 px-4 md:px-8 py-10"
                >
                    <div className="relative w-full h-full rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl">
                        {/* Image */}
                        <Image
                            src={BANNERS[current].image}
                            alt={BANNERS[current].title}
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${BANNERS[current].color} mix-blend-multiply opacity-60`} />
                        <div className="absolute inset-0 bg-black/30" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-20 text-white max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block border border-white/30"
                            >
                                Featured Collection
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                            >
                                {BANNERS[current].title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-white/90 mb-8 font-light"
                            >
                                {BANNERS[current].subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link href={BANNERS[current].link}>
                                    <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300 shadow-xl group/btn">
                                        {BANNERS[current].cta}
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prev}
                className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={next}
                className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
                {BANNERS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${current === i ? "w-10 bg-white" : "w-4 bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
