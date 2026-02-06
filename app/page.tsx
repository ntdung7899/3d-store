'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Truck, HeadphonesIcon, Shield } from 'lucide-react';
import ProductCard from '@/components/ui/product-card';
import BannerCarousel from '@/components/ui/banner-carousel';
import { getFeaturedProducts, getPopularProducts } from '@/lib/data';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const popularProducts = getPopularProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        {/* Banner Carousel */}
        <section className="bg-background py-10">
          <BannerCarousel />
        </section>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Khám phá thế giới</span>
                <br />
                in 3D sáng tạo
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Hàng trăm mẫu file in 3D chất lượng cao và sản phẩm in sẵn.
                Tải ngay hoặc đặt in theo yêu cầu với chất lượng tuyệt hảo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-smooth"
                  >
                    Khám phá mẫu in
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
                  </motion.button>
                </Link>

                <Link href="/products?type=file">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-card hover:bg-muted border-2 border-primary text-foreground rounded-full font-semibold text-lg flex items-center gap-2 transition-smooth"
                  >
                    <Download className="w-5 h-5" />
                    Tải file STL
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-16"
            >
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Mẫu file</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">1000+</div>
                <div className="text-sm text-muted-foreground">Khách hàng</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">4.8⭐</div>
                <div className="text-sm text-muted-foreground">Đánh giá</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Sản phẩm nổi bật ✨
            </h2>
            <p className="text-muted-foreground">
              Những mẫu in được yêu thích nhất
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Xem tất cả
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <Link href="/products" className="sm:hidden mt-6 flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-medium transition-smooth">
          Xem tất cả
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Popular Files */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                File bán chạy 🔥
              </h2>
              <p className="text-muted-foreground">
                Tải ngay, in ngay - giá tốt nhất
              </p>
            </div>
            <Link
              href="/products?type=file"
              className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Xem tất cả
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tại sao chọn chúng tôi?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cam kết mang đến trải nghiệm tốt nhất cho cộng đồng maker Việt Nam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: 'Chất lượng cao',
              description: 'File được kiểm duyệt kỹ lưỡng, in sẵn với độ chính xác tuyệt đối',
            },
            {
              icon: Truck,
              title: 'Giao hàng nhanh',
              description: 'File tải ngay lập tức, sản phẩm in sẵn giao trong 2-3 ngày',
            },
            {
              icon: HeadphonesIcon,
              title: 'Hỗ trợ tận tâm',
              description: 'Đội ngũ hỗ trợ 24/7, tư vấn kỹ thuật miễn phí',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary transition-smooth"
            >
              <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg w-fit mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
