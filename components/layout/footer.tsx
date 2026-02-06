import Link from 'next/link';
import { Github, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border bg-muted/30 mt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-bold text-lg mb-3">3D Store</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Nền tảng mua bán file in 3D và sản phẩm in sẵn hàng đầu Việt Nam.
                            Chất lượng cao, giao hàng nhanh, hỗ trợ tận tâm.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="p-2 rounded-lg hover:bg-muted transition-smooth">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg hover:bg-muted transition-smooth">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg hover:bg-muted transition-smooth">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg hover:bg-muted transition-smooth">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-3">Liên kết</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/products" className="hover:text-foreground transition-smooth">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-foreground transition-smooth">
                                    Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-foreground transition-smooth">
                                    Liên hệ
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-foreground transition-smooth">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-3">Hỗ trợ</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/terms" className="hover:text-foreground transition-smooth">
                                    Điều khoản
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-foreground transition-smooth">
                                    Bảo mật
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-foreground transition-smooth">
                                    Vận chuyển
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-foreground transition-smooth">
                                    Đổi trả
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>&copy; 2026 3D Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
