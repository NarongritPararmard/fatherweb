"use client"

import { useState } from "react";
import { Search, Filter, Star, ShoppingCart, Eye, ChevronDown, Package, Award, Truck, Phone } from "lucide-react";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "ทั้งหมด",
    "CMC",
    "กรดซิตริก",
    "น้ำตาลและสารให้ความหวาน",
    "สารกันเสีย",
    "สีผสมอาหาร",
    "สารปรุงแต่งรส",
    "เอนไซม์",
    "สารก่อฟอง",
    "สารเพิ่มความข้น"
  ];

  const products = [
    {
      id: 1,
      name: "CMC Food Grade (High Viscosity)",
      category: "CMC",
      price: "2,500",
      unit: "กก.",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      reviews: 24,
      description: "Carboxymethyl Cellulose ความหนืดสูง เหมาะสำหรับผลิตไอศกรีมและเครื่องดื่ม",
      inStock: true,
      badge: "ขายดี",
      specs: ["ความหนืด: 4000-6000 cP", "ความชื้น: ≤10%", "pH: 6.5-8.5"]
    },
    {
      id: 2,
      name: "Citric Acid Monohydrate",
      category: "กรดซิตริก",
      price: "450",
      unit: "กก.",
      image: "/api/placeholder/300/200",
      rating: 4.9,
      reviews: 42,
      description: "กรดซิตริกคุณภาพสูง สำหรับปรับรสชาติและยืดอายุอาหาร",
      inStock: true,
      badge: "แนะนำ",
      specs: ["ความบริสุทธิ์: ≥99.5%", "ตาหนัก: ≤10 ppm", "ตะกั่ว: ≤0.5 ppm"]
    },
    {
      id: 3,
      name: "Sodium Benzoate",
      category: "สารกันเสีย",
      price: "680",
      unit: "กก.",
      image: "/api/placeholder/300/200",
      rating: 4.7,
      reviews: 18,
      description: "สารกันเสียธรรมชาติ ปลอดภัยสำหรับอาหารและเครื่องดื่ม",
      inStock: true,
      badge: "ใหม่",
      specs: ["ความบริสุทธิ์: ≥99%", "ความชื้น: ≤1.5%", "pH: 7-9"]
    },
    {
      id: 4,
      name: "Xanthan Gum",
      category: "สารเพิ่มความข้น",
      price: "3,200",
      unit: "กก.",
      image: "/api/placeholder/300/200",
      rating: 4.6,
      reviews: 15,
      description: "สารเพิ่มความข้นธรรมชาติ ให้เนื้อสัมผัสที่นุ่มลื่น",
      inStock: true,
      badge: "",
      specs: ["Viscosity: 1200-1600 cP", "Mesh: 80-120", "Loss on Drying: ≤15%"]
    },
    {
      id: 5,
      name: "Potassium Sorbate",
      category: "สารกันเสีย",
      price: "890",
      unit: "กก.",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      reviews: 31,
      description: "สารกันเสียที่มีประสิทธิภาพสูง เหมาะสำหรับผลิตภัณฑ์อาหาร",
      inStock: false,
      badge: "",
      specs: ["ความบริสุทธิ์: ≥98%", "ความชื้น: ≤1%", "Heavy Metals: ≤10 ppm"]
    },
    {
      id: 6,
      name: "Aspartame",
      category: "น้ำตาลและสารให้ความหวาน",
      price: "1,250",
      unit: "กก.",
      image: "/api/placeholder/300/200",
      rating: 4.5,
      reviews: 12,
      description: "สารให้ความหวานเทียม ความหวานสูงกว่าน้ำตาลทราย 200 เท่า",
      inStock: true,
      badge: "",
      specs: ["ความบริสุทธิ์: ≥98%", "ตาหนัก: ≤10 ppm", "Residue on ignition: ≤0.2%"]
    },
    {
      id: 7,
      name: "Tartrazine (Yellow 5)",
      category: "สีผสมอาหาร",
      price: "720",
      unit: "กก.",
      image: "/api/placeholder/300/200",
      rating: 4.4,
      reviews: 8,
      description: "สีเหลืองสำหรับอาหาร ให้สีสวยงามและคงทน",
      inStock: true,
      badge: "",
      specs: ["Total Dyes: ≥85%", "Volatile Matter: ≤15%", "Water Insoluble: ≤0.2%"]
    },
    {
      id: 8,
      name: "Monosodium Glutamate (MSG)",
      category: "สารปรุงแต่งรส",
      price: "125",
      unit: "กก.",
      image: "/api/placeholder/300/200",
      rating: 4.9,
      reviews: 67,
      description: "ผงชูรสคุณภาพสูง เพิ่มรสอูมามิให้อาหาร",
      inStock: true,
      badge: "ขายดี",
      specs: ["ความบริสุทธิ์: ≥99%", "ความชื้น: ≤0.5%", "pH: 6.7-7.2"]
    },
    {
      id: 9,
      name: "Alpha Amylase",
      category: "เอนไซม์",
      price: "1,800",
      unit: "กก.",
      image: "/api/placeholder/300/200",
      rating: 4.7,
      reviews: 14,
      description: "เอนไซม์สำหรับอุตสาหกรรมขนมปังและเบเกอรี่",
      inStock: true,
      badge: "",
      specs: ["Activity: ≥100,000 U/g", "Moisture: ≤8%", "Temperature: 60-70°C"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "ทั้งหมด" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace(',', '')) - parseInt(b.price.replace(',', ''));
      case "price-high":
        return parseInt(b.price.replace(',', '')) - parseInt(a.price.replace(',', ''));
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name, 'th');
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TW</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Triple World</h1>
                <p className="text-sm text-gray-600">Food Chemical Supplier</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/home" className="text-gray-700 hover:text-blue-600 transition">หน้าแรก</a>
              <a href="/products" className="text-blue-600 font-semibold border-b-2 border-blue-600">สินค้า</a>
              <a href="/about-us" className="text-gray-700 hover:text-blue-600 transition">เกี่ยวกับเรา</a>
              <a href="/contect" className="text-gray-700 hover:text-blue-600 transition">ติดต่อ</a>
            </nav>
          </div>
        </div>
      </header>

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
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                          selectedCategory === category
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category}
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="name">ชื่อ A-Z</option>
                    <option value="price-low">ราคาต่ำสุด</option>
                    <option value="price-high">ราคาสูงสุด</option>
                    <option value="rating">คะแนนสูงสุด</option>
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  {/* Product Image */}
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
                        product.badge === 'ขายดี' ? 'bg-red-100 text-red-600' :
                        product.badge === 'แนะนำ' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          สินค้าหมด
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-sm text-gray-400">({product.reviews})</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    
                    {/* Specs */}
                    <div className="mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="text-xs font-medium text-gray-500 mb-2">คุณสมบัติหลัก</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {product.specs.slice(0, 2).map((spec, i) => (
                            <li key={i}>• {spec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">฿{product.price}</span>
                        <span className="text-gray-500 text-sm">/{product.unit}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          className={`px-4 py-2 rounded-lg font-medium transition ${
                            product.inStock
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? (
                            <>
                              <ShoppingCart className="w-4 h-4 inline mr-1" />
                              สอบถาม
                            </>
                          ) : (
                            'สินค้าหมด'
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
      <footer className="bg-gray-900 text-gray-300 py-12">
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
      </footer>
    </div>
  );
}