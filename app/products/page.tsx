"use client";

import { useEffect, useState } from "react";
import axios from 'axios'
import { Search, Filter, Star, ShoppingCart, Eye, ChevronDown, Package, Award, Truck, Phone, X, FlaskConical, MapPin, Package2, Info } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

import React, { Suspense } from "react"

// Product interface
export interface Product {
  id: number;
  name: string;
  chemical_formula?: string;
  packaging?: string;
  price?: number;
  description?: string;
  properties?: string;
  characteristicsId: number;
  origin_countryId: number;
  category: any;
  createdAt?: Date;
  imageUrl?: string;
  unit?: string;
  inStock?: boolean;
  badge?: string;
}

// Product Detail Modal Component
function ProductDetailModal({ product, isOpen, onClose }: { product: Product | null, isOpen: boolean, onClose: () => void }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {product.badge && (
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                product.badge === 'ขายไม่ดี' ? 'bg-red-500/90' :
                product.badge === 'แนะนำ' ? 'bg-blue-500/90' :
                'bg-green-500/90'
              }`}>
                {product.badge}
              </span>
            )}
            
            <h2 className="text-3xl font-bold mb-2 pr-12">{product.name}</h2>
            <div className="flex items-center space-x-4 text-blue-100">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                {product.category?.name || 'ไม่ระบุหมวดหมู่'}
              </span>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm ml-1">(4.8)</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              
              {/* Product Image */}
              <div className="space-y-6">
                <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden">
                  <div className="aspect-square flex items-center justify-center p-8">
                    <img
                      src={product.imageUrl || '/placeholder.png'}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="bg-red-500 text-white px-6 py-3 rounded-full text-sm font-bold">
                        สินค้าหมด
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Section */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-end justify-between mb-4">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-bold text-blue-600">
                        ฿{product.price?.toLocaleString() || 'ติดต่อสอบถาม'}
                      </span>
                      {product.unit && (
                        <span className="text-gray-500 text-lg font-medium">
                          /{product.unit}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      product.inStock
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                    onClick={() => { window.location.href = '/contact' }}
                  >
                    {product.inStock ? (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        <span className="text-lg">สอบถามราคา</span>
                      </>
                    ) : (
                      <span className="text-lg">สินค้าหมด</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                
                {/* Description */}
                {product.description && (
                  <div>
                    <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
                      <Info className="w-6 h-6 mr-2 text-blue-600" />
                      รายละเอียดสินค้า
                    </h3>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Chemical Formula */}
                {product.chemical_formula && (
                  <div>
                    <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
                      <FlaskConical className="w-6 h-6 mr-2 text-green-600" />
                      สูตรเคมี
                    </h3>
                    <div className="bg-green-50 border-l-4 border-green-400 rounded-r-xl p-4">
                      <code className="text-lg font-mono text-green-800 font-semibold">
                        {product.chemical_formula}
                      </code>
                    </div>
                  </div>
                )}

                {/* Properties */}
                {product.properties && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">คุณสมบัติ</h3>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-gray-700 leading-relaxed">{product.properties}</p>
                    </div>
                  </div>
                )}

                {/* Packaging */}
                {product.packaging && (
                  <div>
                    <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
                      <Package2 className="w-6 h-6 mr-2 text-orange-600" />
                      บรรจุภัณฑ์
                    </h3>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <p className="text-gray-700 font-medium">{product.packaging}</p>
                    </div>
                  </div>
                )}

                {/* Additional Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">รหัสสินค้า</h4>
                    <p className="text-gray-600">#{product.id.toString().padStart(6, '0')}</p>
                  </div>
                  
                  {product.unit && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">หน่วยขาย</h4>
                      <p className="text-gray-600">{product.unit}</p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">สถานะสินค้า</h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? '✅ มีสินค้า' : '❌ สินค้าหมด'}
                    </span>
                  </div>
                  
                  {product.createdAt && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">วันที่เพิ่มสินค้า</h4>
                      <p className="text-gray-600">
                        {new Date(product.createdAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// แยก component ที่ใช้ useSearchParams ออกมา
function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const search = searchParams.get('category') || 'ทั้งหมด'
  const [selectedCategory, setSelectedCategory] = useState(search);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categories, setCategories] = useState([])

  console.log("Selected Category:", selectedCategory);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/categories`)
      setCategories(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/products`)
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "ทั้งหมด" || product.category.name === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0)
      case "price-high":
        return (b.price || 0) - (a.price || 0)
      case "rating":
        return 0; // Since rating is not in the interface, return 0
      default:
        return a.name.localeCompare(b.name, 'th');
    }
  });

  // Modal functions
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/25 backdrop-blur-sm rounded-full text-orange-50 text-sm font-medium mb-6 border border-white/30">
              ✨ คุณภาพมาตรฐานสากล ISO & FDA
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              สินค้า<span className="text-amber-200">เคมีอาหาร</span>
            </h1>
            <p className="text-xl sm:text-2xl text-orange-50 mb-10 max-w-3xl mx-auto leading-relaxed">
              ครบครันในที่เดียว คุณภาพระดับโลก ส่งตรงถึงมือคุณ
            </p>
            
            <div className="flex justify-center max-w-2xl mx-auto">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 flex items-center w-full shadow-2xl border border-white/20">
                <Search className="w-6 h-6 text-orange-400 mx-4 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="ค้นหาสินค้าที่ต้องการ..."
                  className="flex-1 py-3 px-2 text-gray-700 placeholder-gray-500 focus:outline-none text-lg bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                  ค้นหา
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Sidebar */}
          <div className="xl:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Filter className="w-6 h-6 mr-3" />
                    ตัวกรอง
                  </h3>
                  <button
                    className="xl:hidden bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className={`p-6 space-y-6 ${showFilters ? 'block' : 'hidden xl:block'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">หมวดหมู่สินค้า</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory("ทั้งหมด")}
                                              className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${selectedCategory === "ทั้งหมด"
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500 border border-gray-200 hover:border-orange-300'
                        }`}
                    >
                      🎯 ทั้งหมด
                    </button>
                    {categories.map((category: any) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${selectedCategory === category.name
                          ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500 border border-gray-200 hover:border-orange-300'
                          }`}
                      >
                        📦 {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">เรียงลำดับ</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-4 text-gray-700 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 bg-white transition-all duration-300 font-medium"
                  >
                    <option value="name">🔤 ชื่อ A-Z</option>
                    <option value="price-low">💰 ราคาต่ำสุด</option>
                    <option value="price-high">💎 ราคาสูงสุด</option>
                  </select>
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-1">{sortedProducts.length}</div>
                    <div className="text-orange-600 font-medium">รายการสินค้า</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory !== "ทั้งหมด" ? selectedCategory : "สินค้าทั้งหมด"}
                </h2>
                <p className="text-gray-600 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-orange-400" />
                  พบ {sortedProducts.length} รายการ
                  {selectedCategory !== "ทั้งหมด" && (
                    <span className="ml-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                      {selectedCategory}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {sortedProducts.map((product: Product) => (
                <div key={product.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border-2 border-orange-100 hover:border-orange-300 relative">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                    <div className="h-64 flex items-center justify-center relative p-6">
                      <img
                        src={product.imageUrl || '/placeholder.png'}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-lg"
                      />
                      
                      {/* Animated overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none group-hover:from-orange-100/20 transition-all duration-500"></div>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold shadow-2xl backdrop-blur-md border-2 ${
                        product.badge === 'ขายไม่ดี' ? 'bg-red-500/90 text-white border-red-300' :
                        product.badge === 'แนะนำ' ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-300' :
                        'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-green-300'
                      }`}>
                        ⭐ {product.badge}
                      </span>
                    )}

                    {/* Out of Stock Overlay */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl border-4 border-white/30 transform rotate-12">
                          🚫 สินค้าหมด
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-5">
                    {/* Category and Rating */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 text-sm font-bold rounded-full border-2 border-orange-200">
                        📂 {product.category?.name || 'ไม่ระบุหมวดหมู่'}
                      </span>
                      <div className="flex items-center space-x-1 bg-amber-50 px-3 py-2 rounded-full border border-amber-200">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-sm text-amber-700 font-semibold ml-2">(4.8)</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-gray-900 text-xl leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Price Section */}
                    <div className="pt-4 border-t-2 border-orange-100">
                      <div className="flex items-end justify-between mb-6">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                            ฿{product.price?.toLocaleString() || 'ติดต่อ'}
                          </span>
                          {product.unit && (
                            <span className="text-gray-500 text-base font-semibold">
                              /{product.unit}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3">
                        <button 
                          className="flex-shrink-0 p-4 bg-gradient-to-r from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 text-orange-500 hover:text-orange-600 rounded-2xl transition-all duration-300 hover:scale-110 border-2 border-orange-200 hover:border-orange-300 shadow-lg hover:shadow-xl"
                          onClick={() => openProductModal(product)}
                        >
                          <Eye className="w-6 h-6" />
                        </button>
                        
                        <button
                          className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl font-bold transition-all duration-300 text-lg ${
                            product.inStock
                              ? 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-transparent hover:border-orange-300'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed border-2 border-gray-300'
                          }`}
                          onClick={() => { router.push(`/contact`) }}
                        >
                          {product.inStock ? (
                            <>
                              <ShoppingCart className="w-6 h-6" />
                              <span>💬 สอบถาม</span>
                            </>
                          ) : (
                            <span>❌ สินค้าหมด</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-orange-200">
                  <Package className="w-16 h-16 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🔍 ไม่พบสินค้าที่ต้องการ</h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                  ลองเปลี่ยนเงื่อนไขการค้นหาหรือเลือกหมวดหมู่อื่น
                </p>
                <button 
                  onClick={() => {setSelectedCategory("ทั้งหมด"); setSearchTerm("");}}
                  className="mt-6 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  🔄 รีเซ็ตการค้นหา
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />

      {/* Features Section */}
      <section className="bg-gradient-to-br from-white via-orange-50 to-amber-50 py-20 mt-20 border-t-4 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full font-bold mb-6 shadow-lg">
              ⭐ ทำไมต้องเลือกเรา
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              ทำไมต้องเลือก <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Triple World</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              เรามีความมุ่งมั่นในการให้บริการที่ดีที่สุดแก่ลูกค้าทุกท่าน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">🏆 คุณภาพมาตรฐาน</h3>
              <p className="text-gray-600 leading-relaxed">
                ผลิตภัณฑ์ทุกชิ้นได้รับการรับรองมาตรฐาน ISO และ FDA 
                พร้อมใบรับรองคุณภาพครบถ้วน
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">🚀 จัดส่งรวดเร็ว</h3>
              <p className="text-gray-600 leading-relaxed">
                ระบบจัดส่งที่ทันสมัย ส่งถึงมือคุณภายใน 1-3 วันทำการ 
                ทั่วประเทศไทย
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">💬 บริการหลังการขาย</h3>
              <p className="text-gray-600 leading-relaxed">
                ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาและแก้ไขปัญหา
                ตลอด 24 ชั่วโมง
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <div className="relative z-10">
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">🎯 พร้อมเริ่มต้นแล้วใช่มั้ย?</h3>
                <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
                  ติดต่อเราวันนี้เพื่อสอบถามข้อมูลเพิ่มเติมและรับใบเสนอราคาพิเศษ
                </p>
                <button 
                  onClick={() => { router.push(`/contact`) }}
                  className="bg-white text-orange-500 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-2xl border-4 border-white/20 hover:border-white/40"
                >
                  📞 ติดต่อเราเลย
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Main component ที่ export
export default function Products() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}