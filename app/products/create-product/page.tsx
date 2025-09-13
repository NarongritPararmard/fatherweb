"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";
import { Category } from "@prisma/client";

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
  category: string;
  createdAt?: Date;
  imageUrl?: string;
  unit?: string;
  inStock?: boolean;
  badge?: string;
}

export type FormErrors = Partial<Record<keyof ProductFormData, string>>;

export interface ProductPreviewProps {
  data: ProductFormData & {
    characteristicName?: string;
    countryName?: string;
  };
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
    category: "",
    createdAt: undefined,
    imageUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [categories, setCategories] = useState([]);
  const [characteristics, setCharacteristics] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCharacteristics = async () => {
    try {
      const response = await axios.get(`/api/characteristics`);
      setCharacteristics(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCountries = async () => {
    try {
      const response = await axios.get(`/api/countries`);
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const units = ["กก.", "กรัม", "ลิตร", "มิลลิลิตร", "แกลลอน", "ถุง", "กล่อง"];
  const badges = ["", "ขายดี", "แนะนำ", "ใหม่", "พิเศษ"];

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
      // Handle category: set by name instead of ID
      if (name === "category") {
        return {
          ...prev,
          category: value,
        };
      }
      // Dropdowns for characteristicsId and origin_countryId: store as number
      if (name === "characteristicsId" || name === "origin_countryId") {
        return {
          ...prev,
          [name]: value === "" ? 0 : Number(value),
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

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    // Name
    if (!formData.name || !formData.name.trim()) newErrors.name = "กรุณากรอกชื่อสินค้า";
    // Price
    if (
      formData.price === undefined ||
      formData.price === null ||
      isNaN(Number(formData.price)) ||
      formData.price === 0
    ) {
      newErrors.price = "กรุณากรอกราคาเป็นตัวเลข";
    }
    // Description
    if (!formData.description || !formData.description.trim())
      newErrors.description = "กรุณากรอกคำอธิบาย";
    // Chemical formula
    if (!formData.chemical_formula || !formData.chemical_formula.trim())
      newErrors.chemical_formula = "กรุณากรอกสูตรเคมี";
    // Packaging
    if (!formData.packaging || !formData.packaging.trim())
      newErrors.packaging = "กรุณากรอกบรรจุภัณฑ์";
    // Properties
    if (!formData.properties || !formData.properties.trim())
      newErrors.properties = "กรุณากรอก properties";
    // Unit
    if (!formData.unit || !formData.unit.trim())
      newErrors.unit = "กรุณาเลือกหน่วย";
    // inStock (must be true or false, not undefined)
    // if (typeof formData.inStock !== "boolean")
    //   newErrors.inStock = "กรุณาระบุสถานะสต็อก";
    // Badge
    if (typeof formData.badge === "undefined" || formData.badge === null)
      newErrors.badge = "กรุณาเลือก badge";
    // Category (string; actual validation in handleSubmit for existence)
    if (!formData.category || !formData.category.trim())
      newErrors.category = "กรุณาเลือกหมวดหมู่";
    // characteristicsId (must be present and not 0)
    if (!formData.characteristicsId || isNaN(Number(formData.characteristicsId)) || Number(formData.characteristicsId) === 0)
      newErrors.characteristicsId = "กรุณาเลือกคุณลักษณะ";
    // origin_countryId (must be present and not 0)
    if (!formData.origin_countryId || isNaN(Number(formData.origin_countryId)) || Number(formData.origin_countryId) === 0)
      newErrors.origin_countryId = "กรุณาเลือกประเทศต้นทาง";
    // imageUrl (file upload validated in handleSubmit)
    return newErrors;
  };

  // Submit handler using FormData for file upload, with dropdown/file validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    let hasDropdownError = false;
    // Validate category
    let categoryId: number | undefined = undefined;
    if (!formData.category || formData.category === "") {
      newErrors.category = "กรุณาเลือกหมวดหมู่";
      hasDropdownError = true;
    } else if (categories.length > 0) {
      const catObj = categories.find(
        (cat: Category) => cat.name === formData.category
      );
      if (!catObj) {
        newErrors.category = "หมวดหมู่ไม่ถูกต้อง";
        hasDropdownError = true;
      } else {
        categoryId = catObj.id;
      }
    }
    // Validate characteristicsId (must exist in list)
    if (
      !formData.characteristicsId ||
      isNaN(Number(formData.characteristicsId)) ||
      Number(formData.characteristicsId) === 0 ||
      !characteristics.find((c) => c.id === Number(formData.characteristicsId))
    ) {
      newErrors.characteristicsId = "เลือกคุณลักษณะให้ถูกต้อง";
      hasDropdownError = true;
    }
    // Validate origin_countryId (must exist in list)
    if (
      !formData.origin_countryId ||
      isNaN(Number(formData.origin_countryId)) ||
      Number(formData.origin_countryId) === 0 ||
      !countries.find((c) => c.id === Number(formData.origin_countryId))
    ) {
      newErrors.origin_countryId = "เลือกประเทศต้นทางให้ถูกต้อง";
      hasDropdownError = true;
    }
    // Validate file upload (required)
    const fileInput = document.querySelector(
      'input[type="file"][name="imageUrl"]'
    ) as HTMLInputElement | null;
    const file =
      fileInput && fileInput.files && fileInput.files[0]
        ? fileInput.files[0]
        : null;
    if (!file) {
      newErrors.imageUrl = "กรุณาเลือกรูปภาพสินค้า (ไฟล์)";
    }
    // If any errors, set and show alert
    if (
      Object.keys(newErrors).length > 0 ||
      hasDropdownError ||
      !file
    ) {
      setErrors(newErrors);
      let errorMsg = "กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง";
      if (newErrors.imageUrl) errorMsg = newErrors.imageUrl;
      window.alert(errorMsg);
      return;
    }

    try {
      const fd = new FormData();
      // Append all fields except imageUrl, category, characteristicsId, origin_countryId
      Object.entries(formData).forEach(([key, value]) => {
        if (
          key === "imageUrl" ||
          key === "category" ||
          key === "characteristicsId" ||
          key === "origin_countryId"
        )
          return;
        if (typeof value !== "undefined" && value !== null) {
          fd.append(key, value as any);
        }
      });
      // Only append categoryId if valid
      if (typeof categoryId === "number" && !isNaN(categoryId)) {
        fd.append("categoryId", String(categoryId));
      }
      // Only append characteristicsId if valid and not 0
      if (
        formData.characteristicsId &&
        !isNaN(Number(formData.characteristicsId)) &&
        Number(formData.characteristicsId) !== 0
      ) {
        fd.append("characteristicsId", String(formData.characteristicsId));
      }
      // Only append origin_countryId if valid and not 0
      if (
        formData.origin_countryId &&
        !isNaN(Number(formData.origin_countryId)) &&
        Number(formData.origin_countryId) !== 0
      ) {
        fd.append("origin_countryId", String(formData.origin_countryId));
      }
      // File is required and validated above
      fd.append("file", file);

      await fetch("/api/products", {
        method: "POST",
        body: fd,
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form fields and image preview
        setFormData({
          id: 0,
          name: "",
          chemical_formula: "",
          packaging: "",
          price: undefined,
          description: "",
          properties: "",
          characteristicsId: 0,
          origin_countryId: 0,
          category: "",
          createdAt: undefined,
          imageUrl: "",
        });
        // Reset file input value
        if (fileInput) fileInput.value = "";
      }, 3000);
    } catch (err) {
      // Optionally: handle error, show error message
      console.error(err);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  useEffect(() => {
    fetchCategories();
    fetchCharacteristics();
    fetchCountries();
  }, []);

  if (showPreview) {
    // Map characteristicsId and origin_countryId to names for preview
    const characteristicObj = characteristics.find(
      (c) => c.id === formData.characteristicsId
    );
    const countryObj = countries.find(
      (c) => c.id === formData.origin_countryId
    );
    return (
      <ProductPreview
        data={{
          ...formData,
          characteristicName: characteristicObj ? characteristicObj.name : "",
          countryName: countryObj ? countryObj.name : "",
        }}
        onBack={() => setShowPreview(false)}
        onSave={handleSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm sticky top-0 z-50">
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
      </header> */}

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
                <div className="relative">
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white pr-10 ${errors.unit ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">เลือกหน่วย</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                      <path d="M7 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {errors.unit && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.unit}
                  </p>
                )}
              </div>
              {/* --- In Stock --- */}
              {/* <div className="flex items-center mt-2">
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
                <label
                  htmlFor="inStock"
                  className="text-sm font-medium text-gray-700"
                >
                  มีในสต็อก
                </label>
              </div> */}
              {/* --- Badge --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge
                </label>
                <div className="relative">
                  <select
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white pr-10 ${errors.badge ? "border-red-500" : "border-gray-300"}`}
                  >
                    {badges.map((badge) => (
                      <option key={badge} value={badge}>
                        {badge === "" ? "ไม่มี" : badge}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                      <path d="M7 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {errors.badge && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.badge}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  คำอธิบาย
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.chemical_formula ? "border-red-500" : "border-gray-300"}`}
                  placeholder="เช่น C6H8O7"
                />
                {errors.chemical_formula && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.chemical_formula}
                  </p>
                )}
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.packaging ? "border-red-500" : "border-gray-300"}`}
                  placeholder="เช่น 25 กก./ถุง"
                />
                {errors.packaging && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.packaging}
                  </p>
                )}
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.properties ? "border-red-500" : "border-gray-300"}`}
                  placeholder=""
                />
                {errors.properties && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.properties}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมวดหมู่ *
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white pr-10 ${errors.category ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">เลือกหมวดหมู่</option>
                    {categories.map((cat: Category) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                      <path d="M7 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ลักษณะเฉพาะ
                </label>
                <div className="relative">
                  <select
                    name="characteristicsId"
                    value={formData.characteristicsId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white pr-10 ${errors.characteristicsId ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">เลือกคุณลักษณะ</option>
                    {characteristics.map((char) => (
                      <option key={char.id} value={char.id}>
                        {char.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                      <path d="M7 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {errors.characteristicsId && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.characteristicsId}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ประเทศต้นทาง
                </label>
                <div className="relative">
                  <select
                    name="origin_countryId"
                    value={formData.origin_countryId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white pr-10 ${errors.origin_countryId ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">เลือกประเทศต้นทาง</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                      <path d="M7 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {errors.origin_countryId && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.origin_countryId}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รูปภาพ (ไฟล์)
                </label>
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setFormData((prev) => ({
                        ...prev,
                        imageUrl: url,
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        imageUrl: "",
                      }));
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.imageUrl ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.imageUrl && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.imageUrl}
                  </p>
                )}
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="mt-2 max-w-xs max-h-48 rounded-lg shadow"
                  />
                )}
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
            {/* <p>
              <span className="font-medium">มีในสต็อก:</span>{" "}
              {data.inStock ? "ใช่" : "ไม่"}
            </p> */}
            <p>
              <span className="font-medium">Badge:</span> {data.badge}
            </p>
            <p>
              <span className="font-medium">หมวดหมู่:</span> {data.category}
            </p>
            <p>
              <span className="font-medium">ลักษณะเฉพาะ:</span>{" "}
              {data.characteristicName || data.characteristicsId}
            </p>
            <p>
              <span className="font-medium">ประเทศต้นทาง:</span>{" "}
              {data.countryName || data.origin_countryId}
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
