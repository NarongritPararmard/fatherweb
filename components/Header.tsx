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
    { name: "ติดต่อ", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl  transition-all duration-300 flex items-center justify-center overflow-hidden">
              {logo ? (
                <img
                  src={logo}
                  alt="Triple World Logo"
                  className=""
                />
              ) : (
                <span className="text-white font-bold text-lg md:text-xl">TW</span>
              )}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-500 transition-all duration-300">
                Triple World (Thailand)
              </h1>
              <p className="text-xs md:text-sm text-gray-600 font-medium">
                Food Chemical Supplier
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg"></div>
                  )}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ${
                    isActive ? "w-6" : "w-0 group-hover:w-6"
                  }`}></div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 relative">
              <span
                className={`absolute block w-full h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "top-2 rotate-45" : "top-1"
                }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-gray-600 top-2 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "top-2 -rotate-45" : "top-3"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="flex flex-col space-y-1 pt-2 border-t border-gray-100">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
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