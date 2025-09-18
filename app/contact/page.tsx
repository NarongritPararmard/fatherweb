"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Building,
  Globe,
  Facebook,
  CheckCircle,
  AlertCircle,
  MessageCircle,
} from "lucide-react";

// กำหนด type ของ form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  productInterest: string;
}

// กำหนด type ของ errors
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    productInterest: "",
  });

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "กรุณากรอกชื่อ";
    if (!formData.email.trim()) newErrors.email = "กรุณากรอกอีเมล";
    if (!formData.phone.trim()) newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    if (!formData.message.trim()) newErrors.message = "กรุณากรอกข้อความ";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/mrbawnwv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("ส่งข้อความสำเร็จ ✅");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          productInterest: "",
        });
      } else {
        alert("ส่งไม่สำเร็จ ❌");
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + error);
    }
  };

  // --- Data for contact info, branches, etc. (เหมือนของคุณ) ---
  const contactInfo = [
    {
      icon: Phone,
      title: "โทรศัพท์",
      details: ["Mobile : 081-066-7469", "Mobile : 091-688-2269", "Tel : 034-406-710"],
      subtitle: "สายด่วนฝ่ายขาย",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Mail,
      title: "อีเมล",
      details: ["tripleworld.th@gmail.com", "tripleworld2015@gmail.com"],
      subtitle: "ตอบกลับภายใน 24 ชั่วโมง",
      color: "from-green-500 to-green-600",
    },
    {
      icon: MapPin,
      title: "ที่อยู่สำนักงาน",
      details: [
        "64/66 หมู่ที่ 3 ต.คลองมะเดื่ออ.กระทุ่มแบน จ.สมุทรสาคร 74110",
        "64/66 Moo 3 Klongmaduea, Krathumban, Samutsakhon 74110 Thailand.",
      ],
      subtitle: "สำนักงานใหญ่",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Clock,
      title: "เวลาทำการ",
      details: [
        "จันทร์ - ศุกร์: 8:00 - 17:00",
        "เสาร์: 8:00 - 16:00",
        "อาทิทย์: ปิด",
      ],
      subtitle: "เวลาประเทศไทย",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const branches = [
    {
      name: "สาขาสมุทรสาคร (สำนักงานใหญ่)",
      address:
        "64/66 หมู่ที่ 3 ต.คลองมะเดื่อ อ.กระทุ่มแบน จ.สมุทรสาคร 74110 64/66 Moo 3 Klongmaduea, Krathumban, Samutsakhon 74110 Thailand.",
      phone: "081-066-7469, 091-688-2269",
      manager: "คุณไตรภพ",
    },
    {
      name: "สาขา สปป.ลาว (Tripleworld Laos)",
      address: "-",
      phone: "+856-81-251-5852",
      manager: "คุณสันติชัย ",
    },
    {
      name: "",
      address: "",
      phone: "",
      manager: "",
    },
  ];

  const productCategories: string[] = [
    "CMC",
    "กรดซิตริก",
    "น้ำตาลและสารให้ความหวาน",
    "สารกันเสีย",
    "สีผสมอาหาร",
    "สารปรุงแต่งรส",
    "เอนไซม์",
    "อื่นๆ",
  ];

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
                <p className="text-sm text-gray-600">Food Chemical Supplier</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="/home"
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
                className="text-blue-600 font-semibold border-b-2 border-blue-600"
              >
                ติดต่อ
              </a>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                ติดต่อเรา
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              พร้อมให้คำปรึกษาและบริการด้วยทีมงานมืออาชีพ
            </p>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>ส่งข้อความสำเร็จแล้ว! เราจะติดต่อกลับภายใน 24 ชั่วโมง</span>
          </div>
        </div>
      )}

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ช่องทางการติดต่อ
            </h2>
            <p className="text-xl text-gray-600">
              เลือกช่องทางที่สะดวกสำหรับคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {info.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 text-center">
                    {info.subtitle}
                  </p>
                  <div className="space-y-2">
                    {info.details.map((detail, i) => (
                      <p
                        key={i}
                        className="text-gray-700 text-center font-medium"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                ส่งข้อความถึงเรา
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ-นามสกุล *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="กรอกชื่อของคุณ"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      อีเมล *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="example@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เบอร์โทรศัพท์ *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="02-xxx-xxxx"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อบริษัท
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="ชื่อบริษัทของคุณ"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      หัวข้อ
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="หัวข้อข้อความ"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      สินค้าที่สนใจ
                    </label>
                    <select
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">เลือกหมวดหมู่สินค้า</option>
                      {productCategories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ข้อความ *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${errors.message ? "border-red-500" : "border-gray-300"
                        }`}
                      placeholder="กรุณาระบุรายละเอียดที่ต้องการสอบถาม..."
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>ส่งข้อความ</span>
                </button>
              </form>
            </div>

            {/* Map & Social */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  แผนที่
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.7167178429324!2d100.28197990000001!3d13.648334100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2bf0043c0b9ef%3A0xe55222e1d636cd29!2sTripleworld%20Thailand!5e0!3m2!1sen!2sth!4v1694858512345!5m2!1sen!2sth"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  ติดตามเรา
                </h3>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition group"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Facebook className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Facebook</h4>
                      <p className="text-sm text-gray-600">
                        Triple World Thailand
                      </p>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        LINE Official
                      </h4>
                      <p className="text-sm text-gray-600">@tripleworld</p>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                  >
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Website</h4>
                      <p className="text-sm text-gray-600">
                        www.tripleworld.co.th
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              สาขาทั่วประเทศ
            </h2>
            <p className="text-xl text-gray-600">เข้าถึงได้ง่ายในทุกภูมิภาค</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {branch.name}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">{branch.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600">{branch.phone}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-600">{branch.manager}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-xl text-gray-600">
              คำตอบสำหรับคำถามที่ลูกค้าสนใจมากที่สุด
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "ระยะเวลาในการจัดส่งสินค้าใช้เวลานานเท่าไหร่?",
                a: "สำหรับสินค้าที่มีในสต็อก เราสามารถจัดส่งได้ภายใน 1-3 วันทำการ สำหรับสินค้าพิเศษอาจใช้เวลา 5-7 วันทำการ",
              },
              {
                q: "มีการรับประกันคุณภาพสินค้าหรือไม่?",
                a: "เรารับประกันคุณภาพสินค้าทุกรายการ พร้อม Certificate of Analysis และสามารถคืนเงินได้หากสินค้าไม่ตรงตามมาตรฐาน",
              },
              {
                q: "สามารถสั่งซื้อปริมาณน้อยได้หรือไม่?",
                a: "ได้ครับ เรารับคำสั่งซื้อตั้งแต่ 1 กิโลกรัม พร้อมให้คำแนะนำเรื่องการใช้งานและการเก็บรักษา",
              },
              {
                q: "มีบริการให้คำปรึกษาทางเทคนิคหรือไม่?",
                a: "มีครับ ทีมงานของเรามีความเชี่ยวชาญด้านเคมีอาหาร พร้อมให้คำปรึกษาและแนะนำการใช้งานที่เหมาะสม",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
              ผู้จำหน่ายเคมีอาหารคุณภาพสูง
              ให้บริการอุตสาหกรรมอาหารและเครื่องดื่ม
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
