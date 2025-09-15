"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logo = process.env.NEXT_PUBLIC_PATH_LOGO;

  const navItems = [
    { name: "หน้าแรก", href: "/" },
    { name: "สินค้า", href: "/products" },
    { name: "เกี่ยวกับเรา", href: "/about-us" },
    { name: "บริการ", href: "/service_page" },
    { name: "ติดต่อ", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-orange-500/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-orange-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl border-4 border-white shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden bg-white">
              {logo ? (
                <img
                  src={logo}
                  alt="Triple World Logo"
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="text-orange-600 font-bold text-xl md:text-2xl">TW</span>
              )}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl md:text-3xl font-bold text-white group-hover:text-yellow-200 transition-all duration-300">
                Triple World (Thailand)
              </h1>
              <p className="text-sm md:text-base text-orange-100 font-medium">
                Food Chemical Supplier
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 group ${isActive
                      ? "text-white bg-red-600 shadow-lg"
                      : "text-orange-50 hover:text-white hover:bg-orange-500/50"
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Gradient overlay สำหรับ active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-orange-700/40 rounded-lg"></div>
                  )}

                  {/* เส้นใต้ active */}
                  <div
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-300 ${isActive ? "w-10" : "w-0 group-hover:w-8"
                      }`}
                  ></div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative w-10 h-10 rounded-lg bg-orange-500 hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 relative">
              <span
                className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "top-2 rotate-45" : "top-1"
                  }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-white top-2 transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "top-2 -rotate-45" : "top-3"
                  }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen
              ? "max-h-screen opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <nav className="flex flex-col space-y-2 pt-2 border-t border-orange-700">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative px-5 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${isActive
                      ? "text-white bg-orange-700 border-l-4 border-yellow-400 shadow-md"
                      : "text-orange-50 hover:text-white hover:bg-orange-500/50"
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