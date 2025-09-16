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
    <header className="bg-gradient-to-r from-orange-500/95 to-orange-600/95 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-orange-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-5 group">
            <div className="relative w-13 h-13 md:w-15 md:h-15 rounded-xl border-2 border-white/90 shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden bg-white/90 group-hover:scale-105">
              {logo ? (
                <img
                  src={logo}
                  alt="Triple World Logo"
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="text-orange-600 font-black text-xl md:text-2xl tracking-tight">TW</span>
              )}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black text-white group-hover:text-yellow-200 transition-all duration-300 tracking-tight leading-tight">
                Triple World (Thailand)
              </h1>
              <p className="text-sm text-orange-50/90 tracking-wide mt-0.5">
                Food Chemical Supplier
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 group ${isActive
                      ? "text-white bg-white/20 shadow-lg backdrop-blur-sm border border-white/30"
                      : "text-orange-50/90 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm"
                    }`}
                >
                  <span className="relative z-10 tracking-wide">{item.name}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl"></div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full shadow-sm"></div>
                    </>
                  )}

                  {/* Hover indicator */}
                  <div
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-yellow-300/80 to-yellow-400/80 rounded-full transition-all duration-300 ${isActive ? "w-0" : "w-0 group-hover:w-4"
                      }`}
                  ></div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-opacity-75 border border-white/20"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute block w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "top-2.5 rotate-45" : "top-1.5"
                  }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-white rounded-full top-2.5 transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "top-2.5 -rotate-45" : "top-3.5"
                  }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-out ${isMenuOpen
              ? "max-h-96 opacity-100 pb-6"
              : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <nav className="flex flex-col space-y-2 pt-4 border-t border-white/20">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative px-6 py-4 rounded-xl font-bold text-base transition-all duration-200 ${isActive
                      ? "text-white bg-white/20 border-l-4 border-yellow-400 shadow-md backdrop-blur-sm"
                      : "text-orange-50/90 hover:text-white hover:bg-white/10 hover:pl-8"
                    }`}
                >
                  <span className="tracking-wide">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-sm"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}