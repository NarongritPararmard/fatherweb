'use client'

import axios from "axios";
import {
  ChevronRight,
  Award,
  Shield,
  Truck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/categories`)
      setCategories(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <img src={process.env.PATH_LOGO}></img>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Triple World
                </h1>
                <p className="text-sm text-gray-600">Food Chemical Supplier</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                หน้าแรก
              </a>
              <a
                href="/products"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                สินค้า
              </a>
              <a
                href="/about-us"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                เกี่ยวกับเรา
              </a>
              <a
                href="/contect"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                ติดต่อ
              </a>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                เคมีอาหาร
              </span>
              <br />
              <span className="text-white">คุณภาพสูง</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              ผู้นำเข้าและจำหน่ายเคมีอาหาร สำหรับอุตสาหกรรมและงานวิจัย
              พร้อมบริการครบครัน
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => router.push('/products')} className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                ดูสินค้าทั้งหมด
                <ChevronRight className="inline ml-2 w-5 h-5" />
              </button>
              <button 
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
                onClick={() => router.push('/contact')}
              >
                ติดต่อเรา
              </button>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white rounded-full opacity-30 animate-pulse delay-500"></div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                คุณภาพมาตรฐาน
              </h3>
              <p className="text-gray-600">
                ผลิตภัณฑ์ได้มาตรฐานสากล ผ่านการรับรองคุณภาพ
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ปลอดภัย</h3>
              <p className="text-gray-600">
                เคมีอาหารปลอดภัย ผ่านการตรวจสอบคุณภาพเข้มงวด
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                จัดส่งรวดเร็ว
              </h3>
              <p className="text-gray-600">
                บริการจัดส่งทั่วประเทศ รวดเร็วและเชื่อถือได้
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              หมวดหมู่สินค้า
            </h2>
            <p className="text-xl text-gray-600">
              เลือกเคมีอาหารตามความต้องการของคุณ
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((item, i) => (
              <a key={i} href={`/products?category=${item.name}`}>
                <div
                  className="group relative p-8 bg-white border-2 border-gray-100 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  <div
                  className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <div className="relative">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  {/* <p className="text-sm text-gray-600">{item.desc}</p> */}
                </div>
              </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              สินค้าแนะนำ
            </h2>
            <p className="text-xl text-gray-600">
              สินค้าคุณภาพสูงที่ได้รับความนิยม
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "CMC Food Grade",
                price: "฿2,500/กก.",
                desc: "คุณภาพพรีเมี่ยม เหมาะสำหรับอุตสาหกรรมอาหาร",
                badge: "ขายดี",
              },
              {
                name: "Citric Acid Monohydrate",
                price: "฿450/กก.",
                desc: "กรดซิตริกคุณภาพสูง สำหรับปรับรสและถนอมอาหาร",
                badge: "แนะนำ",
              },
              {
                name: "Sodium Benzoate",
                price: "฿680/กก.",
                desc: "สารกันเสียธรรมชาติ ปลอดภัยสำหรับอาหาร",
                badge: "ใหม่",
              },
            ].map((product, i) => (
              <div
                key={i}
                className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.badge === "ขายดี"
                        ? "bg-red-100 text-red-600"
                        : product.badge === "แนะนำ"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                    สอบถาม
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">พร้อมให้บริการคุณ</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            ทีมงานมืออาชีพพร้อมให้คำปรึกษาและบริการหลังการขาย
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6" />
              <span className="text-lg">081-066-7469</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6" />
              <span className="text-lg">tripleworld.th@gmail.com</span>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
            ติดต่อเราวันนี้
          </button>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src={process.env.PATH_LOGO}></img>
                </div>
                <h3 className="text-xl font-bold text-white">Triple World</h3>
              </div>
              <p className="text-gray-400 mb-4">
                ผู้จำหน่ายเคมีอาหารคุณภาพสูง
                ให้บริการอุตสาหกรรมอาหารและเครื่องดื่ม
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">กรุงเทพมหานคร ประเทศไทย</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">บริษัท</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    เกี่ยวกับเรา
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    ประวัติบริษัท
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    ใบรับรอง
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    ติดต่อเรา
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">บริการ</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    สินค้าทั้งหมด
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    ขนส่ง
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    รับประกันคุณภาพ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition">
                    หลังการขาย
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 Triple World Co., Ltd. สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

