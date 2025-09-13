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
  name: string;
  category: string;
  price: string;
  unit: string;
  description: string;
  detailedDescription: string;
  inStock: boolean;
  badge: string;
  minOrder: string;
  maxOrder: string;
  shelfLife: string;
  storageCondition: string;
  origin: string;
  certification: string[];
  specs: string[];
  applications: string[];
  safetyInfo: string;
  tags: string[];
}

export type FormErrors = Partial<Record<keyof ProductFormData, string>>;

export interface ProductPreviewProps {
  data: ProductFormData;
  onBack: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function CreateProduct() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: "",
    unit: "กก.",
    description: "",
    detailedDescription: "",
    inStock: true,
    badge: "",
    minOrder: "",
    maxOrder: "",
    shelfLife: "",
    storageCondition: "",
    origin: "",
    certification: [],
    specs: [""],
    applications: [""],
    safetyInfo: "",
    tags: [],
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle checkbox type with type narrowing
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: keyof Pick<ProductFormData, "specs" | "applications">
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (
    field: keyof Pick<ProductFormData, "specs" | "applications">
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    index: number,
    field: keyof Pick<ProductFormData, "specs" | "applications">
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleCertificationChange = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certification: prev.certification.includes(cert)
        ? prev.certification.filter((c) => c !== cert)
        : [...prev.certification, cert],
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "กรุณากรอกชื่อสินค้า";
    if (!formData.category) newErrors.category = "กรุณาเลือกหมวดหมู่";
    if (!formData.price.trim()) newErrors.price = "กรุณากรอกราคา";
    if (!formData.description.trim())
      newErrors.description = "กรุณากรอกคำอธิบาย";

    // Validate price is number
    const priceNumber = parseFloat(formData.price.replace(",", ""));
    if (formData.price && isNaN(priceNumber)) {
      newErrors.price = "ราคาต้องเป็นตัวเลข";
    }

    // Validate specs (at least one non-empty spec)
    const validSpecs = formData.specs.filter((spec) => spec.trim());
    if (validSpecs.length === 0) {
      newErrors.specs = "กรุณากรอกคุณสมบัติอย่างน้อย 1 รายการ";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Filter out empty specs and applications
    const cleanedData = {
      ...formData,
      specs: formData.specs.filter((spec) => spec.trim()),
      applications: formData.applications.filter((app) => app.trim()),
    };

    console.log("Product Data:", cleanedData);

    // Simulate successful save
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
                  หมวดหมู่ *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ราคา *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="2,500"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.price}
                    </p>
                  )}
                </div>
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
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ป้าย
                </label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  {badges.map((badge) => (
                    <option key={badge} value={badge}>
                      {badge || "ไม่มี"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="inStock"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="inStock"
                  className="text-sm font-medium text-gray-700"
                >
                  มีสินค้าในสต็อก
                </label>
              </div>

              <div className="md:col-span-2">
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
            </div>
          </div>

          {/* Detailed Information */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              รายละเอียดเพิ่มเติม
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รายละเอียดครบถ้วน
                </label>
                <textarea
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                  placeholder="รายละเอียดครบถ้วนเกี่ยวกับสินค้า การใช้งาน ประโยชน์ ฯลฯ"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ปริมาณสั่งซื้อขั้นต่ำ
                  </label>
                  <input
                    type="text"
                    name="minOrder"
                    value={formData.minOrder}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="1 กก."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ปริมาณสั่งซื้อสูงสุด
                  </label>
                  <input
                    type="text"
                    name="maxOrder"
                    value={formData.maxOrder}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="1000 กก."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อายุการเก็บ
                  </label>
                  <input
                    type="text"
                    name="shelfLife"
                    value={formData.shelfLife}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="24 เดือน"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    แหล่งผลิต
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="ประเทศจีน"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เงื่อนไขการเก็บรักษา
                </label>
                <textarea
                  name="storageCondition"
                  value={formData.storageCondition}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                  placeholder="เก็บในที่แห้ง อุณหภูมิห้อง หลีกเลี่ยงแสงแดด"
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              คุณสมบัติทางเคมี *
            </h2>
            <div className="space-y-4">
              {formData.specs.map((spec, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) =>
                      handleArrayChange(index, e.target.value, "specs")
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="เช่น ความหนืด: 4000-6000 cP"
                  />
                  {formData.specs.length > 1 && (
                    <button
                      onClick={() => removeArrayItem(index, "specs")}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem("specs")}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>เพิ่มคุณสมบัติ</span>
              </button>
              {errors.specs && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.specs}
                </p>
              )}
            </div>
          </div>

          {/* Applications */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">การใช้งาน</h2>
            <div className="space-y-4">
              {formData.applications.map((app, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={app}
                    onChange={(e) =>
                      handleArrayChange(index, e.target.value, "applications")
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="เช่น ใช้ในการผลิตไอศกรีม"
                  />
                  {formData.applications.length > 1 && (
                    <button
                      onClick={() => removeArrayItem(index, "applications")}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem("applications")}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>เพิ่มการใช้งาน</span>
              </button>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">การรับรอง</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {certificationOptions.map((cert) => (
                <label
                  key={cert}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.certification.includes(cert)}
                    onChange={() => handleCertificationChange(cert)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cert}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Safety Information */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ข้อมูลความปลอดภัย
            </h2>
            <textarea
              name="safetyInfo"
              value={formData.safetyInfo}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              placeholder="คำแนะนำด้านความปลอดภัย ข้อควรระวัง การปฐมพยาบาล ฯลฯ"
            />
          </div>

          {/* Tags */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">แท็ก</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="พิมพ์แท็กแล้วกด Enter"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  เพิ่ม
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

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
              <span className="font-medium">หมวดหมู่:</span> {data.category}
            </p>
            <p>
              <span className="font-medium">ราคา:</span> {data.price} /{" "}
              {data.unit}
            </p>
            {data.badge && (
              <p>
                <span className="font-medium">ป้าย:</span> {data.badge}
              </p>
            )}
            <p>
              <span className="font-medium">สถานะ:</span>{" "}
              {data.inStock ? "มีสินค้าในสต็อก" : "สินค้าหมด"}
            </p>
          </div>

          {/* Detailed Description */}
          {data.detailedDescription && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                รายละเอียด
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {data.detailedDescription}
              </p>
            </div>
          )}

          {/* Specs */}
          {data.specs.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                คุณสมบัติทางเคมี
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {data.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Applications */}
          {data.applications.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                การใช้งาน
              </h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {data.applications.map((app, i) => (
                  <li key={i}>{app}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {data.certification.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                การรับรอง
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.certification.map((cert: string) => (
                  <span
                    key={cert}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Safety Info */}
          {data.safetyInfo && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ข้อมูลความปลอดภัย
              </h3>
              <p className="text-gray-700 leading-relaxed">{data.safetyInfo}</p>
            </div>
          )}

          {/* Tags */}
          {data.tags.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">แท็ก</h3>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
