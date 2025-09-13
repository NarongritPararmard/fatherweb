"use client";

import { useState } from "react";
import React from "react";
import {
  Save,
  X,
  Plus,
  Upload,
  AlertCircle,
  CheckCircle,
  Eye,
  ArrowLeft,
  Package,
} from "lucide-react";

// --- Types ---
export interface ProductFormData {
  id: number;
  name: string;
  chemical_formula?: string;
  packaging?: string;
  price?: number;
  description?: string;
  properties?: string;
  characteristicsId: number;
  origin_countryId: number;
  categoryId: number;
  createdAt?: Date;
  imageUrl?: string;
  unit?: string;
  inStock?: boolean;
  badge?: string;
}

export type FormErrors = Partial<Record<keyof ProductFormData, string>>;

export interface ProductPreviewProps {
  data: ProductFormData;
  onBack: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function CreateProduct() {
  const [formData, setFormData] = useState<ProductFormData>({
    id: 0,
    name: "",
    chemical_formula: "",
    packaging: "",
    price: undefined,
    description: "",
    properties: "",
    characteristicsId: 0,
    origin_countryId: 0,
    categoryId: 0,
    createdAt: undefined,
    imageUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

  const categories = [
    "CMC",
    "กรดซิตริก",
    "น้ำตาลและสารให้ความหวาน",
    "สารกันเสีย",
    "สีผสมอาหาร",
    "สารปรุงแต่งรส",
    "เอนไซม์",
    "สารก่อฟอง",
    "สารเพิ่มความข้น",
    "อื่นๆ",
  ];

  const units = ["กก.", "กรัม", "ลิตร", "มิลลิลิตร", "แกลลอน", "ถุง", "กล่อง"];
  const badges = ["", "ขายดี", "แนะนำ", "ใหม่", "พิเศษ"];
  const certificationOptions = [
    "ISO 9001",
    "HACCP",
    "FDA",
    "GMP",
    "Halal",
    "Organic",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // If the field is price, convert to number or undefined
      if (name === "price") {
        return {
          ...prev,
          [name]: value === "" ? undefined : Number(value),
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Removed array and checkbox handlers for fields not in interface

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "กรุณากรอกชื่อสินค้า";
    if (formData.price === undefined || isNaN(formData.price))
      newErrors.price = "กรุณากรอกราคาเป็นตัวเลข";
    if (!formData.description?.trim())
      newErrors.description = "กรุณากรอกคำอธิบาย";
    // Add more validations as needed for required fields in ProductFormData
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log("Product Data:", formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form or redirect
    }, 3000);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  if (showPreview) {
    return (
      <ProductPreview
        data={formData}
        onBack={() => setShowPreview(false)}
        onSave={handleSubmit}
      />
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900">
                  Triple World
                </h1>
                <p className="text-sm text-gray-600">Admin Panel</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-blue-600 font-semibold border-b-2 border-blue-600"
              >
                จัดการสินค้า
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                คำสั่งซื้อ
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                ลูกค้า
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>บันทึกสินค้าใหม่เรียบร้อยแล้ว!</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  เพิ่มสินค้าใหม่
                </h1>
                <p className="text-gray-600 mt-1">
                  กรอกข้อมูลสินค้าที่ต้องการเพิ่มเข้าสู่ระบบ
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handlePreview}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center space-x-2"
              >
                <Eye className="w-5 h-5" />
                <span>ดูตัวอย่าง</span>
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>บันทึก</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ข้อมูลพื้นฐาน
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อสินค้า *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="เช่น CMC Food Grade (High Viscosity)"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ราคา *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price ?? ""}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="2500"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.price}
                  </p>
                )}
              </div>
                          {/* --- Unit --- */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หน่วย
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">เลือกหน่วย</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            {/* --- In Stock --- */}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="inStock"
                id="inStock"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inStock: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                มีในสต็อก
              </label>
            </div>
            {/* --- Badge --- */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Badge
              </label>
              <select
                name="badge"
                value={formData.badge}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {badges.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge === "" ? "ไม่มี" : badge}
                  </option>
                ))}
              </select>
            </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  คำอธิบายสั้น *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="คำอธิบายสั้นๆ เกี่ยวกับสินค้า"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  สูตรเคมี
                </label>
                <input
                  type="text"
                  name="chemical_formula"
                  value={formData.chemical_formula ?? ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="เช่น C6H8O7"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  บรรจุภัณฑ์
                </label>
                <input
                  type="text"
                  name="packaging"
                  value={formData.packaging ?? ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="เช่น 25 กก./ถุง"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Properties
                </label>
                <input
                  type="text"
                  name="properties"
                  value={formData.properties ?? ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมวดหมู่ (ID)
                </label>
                <input
                  type="number"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ลักษณะเฉพาะ (characteristicsId)
                </label>
                <input
                  type="number"
                  name="characteristicsId"
                  value={formData.characteristicsId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ประเทศต้นทาง (origin_countryId)
                </label>
                <input
                  type="number"
                  name="origin_countryId"
                  value={formData.origin_countryId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รูปภาพ (URL)
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl ?? ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Removed detailed info fields not in ProductFormData */}

          {/* Removed specifications, applications, certifications, safetyInfo, tags sections */}

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              ยกเลิก
            </button>
            <button
              onClick={handlePreview}
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center space-x-2"
            >
              <Eye className="w-5 h-5" />
              <span>ดูตัวอย่าง</span>
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>บันทึกสินค้า</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Preview Component
function ProductPreview({ data, onBack, onSave }: ProductPreviewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4"></div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-gray-600 transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                ตัวอย่างสินค้า
              </h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onSave}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>บันทึก</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Preview Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900">{data.name}</h2>
          <p className="text-gray-600">{data.description}</p>
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <span className="font-medium">สูตรเคมี:</span>{" "}
              {data.chemical_formula}
            </p>
            <p>
              <span className="font-medium">บรรจุภัณฑ์:</span> {data.packaging}
            </p>
            <p>
              <span className="font-medium">ราคา:</span> {data.price}
            </p>
            <p>
              <span className="font-medium">หน่วย:</span> {data.unit}
            </p>
            <p>
              <span className="font-medium">มีในสต็อก:</span>{" "}
              {data.inStock ? "ใช่" : "ไม่"}
            </p>
            <p>
              <span className="font-medium">Badge:</span> {data.badge}
            </p>
            <p>
              <span className="font-medium">หมวดหมู่ (ID):</span>{" "}
              {data.categoryId}
            </p>
            <p>
              <span className="font-medium">
                ลักษณะเฉพาะ (characteristicsId):
              </span>{" "}
              {data.characteristicsId}
            </p>
            <p>
              <span className="font-medium">
                ประเทศต้นทาง (origin_countryId):
              </span>{" "}
              {data.origin_countryId}
            </p>
          </div>
          {data.properties && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Properties
              </h3>
              <p className="text-gray-700 leading-relaxed">{data.properties}</p>
            </div>
          )}
          {data.imageUrl && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                รูปภาพ
              </h3>
              <img
                src={data.imageUrl}
                alt={data.name}
                className="max-w-xs max-h-64 rounded-lg shadow"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
