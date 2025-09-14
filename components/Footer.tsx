'use client'

import { MapPin } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Footer() {

    const logo = process.env.NEXT_PUBLIC_PATH_LOGO;

  return      (<footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src={logo} alt="Logo" />
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
      </footer>)
}