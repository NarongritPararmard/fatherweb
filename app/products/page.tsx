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
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">สินค้าเคมีอาหาร</h1>
            <p className="text-xl text-blue-100 mb-8">ครบครันในที่เดียว คุณภาพมาตรฐานสากล</p>
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-2 flex items-center max-w-md w-full">
                <Search className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า..."
                  className="flex-1 py-2 px-2 text-gray-700 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">ตัวกรอง</h3>
                <button
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">หมวดหมู่</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory("ทั้งหมด")}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === "ทั้งหมด"
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      ทั้งหมด
                    </button>
                    {categories.map((category: any) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === category.name
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">เรียงตาม</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="name">ชื่อ A-Z</option>
                    <option value="price-low">ราคาต่ำสุด</option>
                    <option value="price-high">ราคาสูงสุด</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                แสดงผล {sortedProducts.length} รายการ
                {selectedCategory !== "ทั้งหมด" && ` ใน "${selectedCategory}"`}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedProducts.map((product: Product) => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-blue-200">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
                    <div className="h-56 flex items-center justify-center relative">
                      <img
                        src={product.imageUrl || '/placeholder.png'}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Subtle overlay for better image presentation */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                        product.badge === 'ขายไม่ดี' ? 'bg-red-500/90 text-white' :
                        product.badge === 'แนะนำ' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                        'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                      }`}>
                        {product.badge}
                      </span>
                    )}

                    {/* Out of Stock Overlay */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-red-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border-2 border-white/20">
                          สินค้าหมด
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    {/* Category and Rating */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                        {product.category?.name || 'ไม่ระบุหมวดหมู่'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price Section */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-end justify-between mb-4">
                        <div className="flex items-baseline space-x-1">
                          <span className="text-3xl font-bold text-blue-600">
                            ฿{product.price?.toLocaleString() || 'ติดต่อ'}
                          </span>
                          {product.unit && (
                            <span className="text-gray-500 text-sm font-medium">
                              /{product.unit}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3">
                        <button 
                          className="flex-shrink-0 p-3 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-blue-200"
                          onClick={() => openProductModal(product)}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        
                        <button
                          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                            product.inStock
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                          onClick={() => { router.push(`/contact`) }}
                        >
                          {product.inStock ? (
                            <>
                              <ShoppingCart className="w-5 h-5" />
                              <span>สอบถามราคา</span>
                            </>
                          ) : (
                            <span>สินค้าหมด</span>
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
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบสินค้า</h3>
                <p className="text-gray-600">ลองเปลี่ยนเงื่อนไขการค้นหาหรือหมวดหมู่</p>
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
      <section className="bg-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ทำไมต้องเลือก Triple World</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">คุณภาพมาตรฐาน</h3>
              <p className="text-gray-600 text-sm">ผลิตภัณฑ์ได้มาตรฐาน ISO และ FDA</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">จัดส่งรวดเร็ว</h3>
              <p className="text-gray-600 text-sm">ส่งถึงมือคุณภายใน 1-3 วันทำการ</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">บริการหลังการขาย</h3>
              <p className="text-gray-600 text-sm">ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษา</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TW</span>
              </div>
              <h3 className="text-xl font-bold text-white">Triple World</h3>
            </div>
            <p className="text-gray-400 mb-4">
              ผู้จำหน่ายเคมีอาหารคุณภาพสูง ให้บริการอุตสาหกรรมอาหารและเครื่องดื่ม
            </p>
            <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500">
              <p>&copy; 2025 Triple World Co., Ltd. สงวนลิขสิทธิ์</p>
            </div>
          </div>
        </div>
      </footer> */}
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