// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const logo = process.env.PATH_LOGO;

    const navItems = [
        { name: "หน้าแรก", href: "/" },
        { name: "สินค้า", href: "/products" },
        { name: "เกี่ยวกับเรา", href: "/about-us" },
        { name: "ติดต่อ", href: "/contect" },
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Triple World</h1>
                            <p className="text-sm text-gray-600">Food Chemical Supplier</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`transition ${isActive
                                            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                                            : "text-gray-700 hover:text-blue-600"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}