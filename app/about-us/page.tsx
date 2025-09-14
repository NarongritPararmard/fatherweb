import { Award, Users, Globe, Target, Eye, Heart, CheckCircle, TrendingUp, Shield, Zap, Building, Calendar } from "lucide-react";

export default function AboutUs() {
  const milestones = [
    { year: "2015", title: "ก่อตั้งบริษัท", description: "เริ่มต้นธุรกิจด้วยทีมงานเพียง 5 คน" },
    { year: "2017", title: "ขยายสาขา", description: "เปิดคลังสินค้าแห่งที่ 2 ในภาคใต้" },
    { year: "2019", title: "รับรองมาตรฐาน", description: "ได้รับการรับรอง ISO 9001:2015" },
    { year: "2021", title: "ขยายตลาด", description: "เริ่มส่งออกไปยังประเทศเพื่อนบ้าน" },
    { year: "2023", title: "นวัตกรรม", description: "เปิดตัวแพลตฟอร์มออนไลน์" },
    { year: "2025", title: "ความสำเร็จ", description: "ครบรอบ 10 ปี พร้อมลูกค้า 500+ ราย" }
  ];

  const team = [
    {
      name: "นายสมชาย วิทยาศิลป์",
      position: "ประธานกรรมการบริหาร",
      experience: "15+ ปี",
      education: "ปริญญาโทเคมีอุตสาหการ จุฬาลงกรณ์มหาวิทยาลัย",
      expertise: "การจัดการธุรกิจ, พัฒนาผลิตภัณฑ์"
    },
    {
      name: "นางสาวรัตนา เทคโนโลยี",
      position: "ผู้จัดการฝ่ายขาย",
      experience: "12+ ปี",
      education: "ปริญญาตรีเคมี มหาวิทยาลัยเกษตรศาสตร์",
      expertise: "การขายและการตลาด, ความสัมพันธ์ลูกค้า"
    },
    {
      name: "นายวิทยา คุณภาพดี",
      position: "หัวหน้าควบคุมคุณภาพ",
      experience: "18+ ปี",
      education: "ปริญญาโทวิทยาศาสตร์อาหาร มหาวิทยาลัยมหิดล",
      expertise: "ควบคุมคุณภาพ, มาตรฐานสากล"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "คุณภาพ",
      description: "มุ่งมั่นส่งมอบผลิตภัณฑ์คุณภาพสูงที่ได้มาตรฐานสากล",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Heart,
      title: "ความไว้วางใจ",
      description: "สร้างความเชื่อมั่นและความไว้วางใจกับลูกค้าทุกราย",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Zap,
      title: "นวัตกรรม",
      description: "พัฒนาและปรับปรุงบริการให้ทันสมัยและตอบโจทย์ลูกค้า",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "การบริการ",
      description: "ให้บริการด้วยความเอาใจใส่และความเป็นมืออาชีพ",
      color: "from-green-500 to-green-600"
    }
  ];

  const certifications = [
    { name: "ISO 9001:2015", description: "ระบบการจัดการคุณภาพ" },
    { name: "HACCP", description: "ระบบการวิเคราะห์อันตรายและจุดวิกฤตที่ต้องควบคุม" },
    { name: "FDA Registration", description: "การขึ้นทะเบียนกับองค์การอาหารและยา" },
    { name: "GMP", description: "หลักเกณฑ์การผลิตที่ดี" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="bg-white shadow-sm sticky top-0 z-50">
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
              <a href="/products" className="text-gray-700 hover:text-blue-600 transition">สินค้า</a>
              <a href="/about-us" className="text-blue-600 font-semibold border-b-2 border-blue-600">เกี่ยวกับเรา</a>
              <a href="/contect" className="text-gray-700 hover:text-blue-600 transition">ติดต่อ</a>
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
                เกี่ยวกับเรา
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              ผู้นำด้านเคมีอาหารมานานกว่า 10 ปี ด้วยความมุ่งมั่นในคุณภาพและการบริการ
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Triple World</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                บริษัท Triple World จำกัด ก่อตั้งขึ้นในปี 2015 ด้วยวิสัยทัศน์ที่จะเป็นผู้จำหน่าย
                เคมีอาหารชั้นนำในประเทศไทย เรามุ่งมั่นในการส่งมอบผลิตภัณฑ์คุณภาพสูงและบริการที่เป็นเลิศ
                ให้กับลูกค้าในอุตสาหกรรมอาหารและเครื่องดื่ม
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                ด้วยประสบการณ์และความเชี่ยวชาญกว่า 10 ปี เราได้สร้างเครือข่ายธุรกิจที่แข็งแกร่ง
                และเป็นที่ไว้วางใจของลูกค้ามากกว่า 500 รายทั่วประเทศ
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">ลูกค้า</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-gray-600">ผลิตภัณฑ์</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-2xl">
                <div className="absolute inset-8 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <Building className="w-24 h-24 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">พันธกิจและวิสัยทัศน์</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">พันธกิจ</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                "ส่งมอบเคมีอาหารคุณภาพสูงและบริการที่เป็นเลิศ เพื่อสนับสนุนการเติบโตของอุตสาหกรรมอาหาร
                โดยยึดหลักความปลอดภัย คุณภาพ และความยั่งยืน"
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">วิสัยทัศน์</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                "เป็นผู้จำหน่ายเคมีอาหารชั้นนำในภูมิภาคเอเชียตะวันออกเฉียงใต้ 
                ที่ได้รับการยอมรับในด้านคุณภาพ นวัตกรรม และความเป็นมืออาชีพ"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ค่านิยมหลัก</h2>
            <p className="text-xl text-gray-600">หลักการที่เราใช้ในการดำเนินธุรกิจ</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">เส้นทางความสำเร็จ</h2>
            <p className="text-xl text-gray-600">ประวัติการเติบโตของเราตลอด 10 ปีที่ผ่านมา</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-400 to-blue-600"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                      <div className={`inline-flex items-center space-x-2 mb-3 ${index % 2 === 0 ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ทีมผู้บริหาร</h2>
            <p className="text-xl text-gray-600">ผู้นำที่มีประสบการณ์และความเชี่ยวชาญ</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.position}</p>
                  <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full mb-4">
                    <TrendingUp className="w-4 h-4 text-gray-600 mr-1" />
                    <span className="text-sm text-gray-600">{member.experience}</span>
                  </div>
                  <div className="text-left space-y-2 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-700 mb-1">การศึกษา:</p>
                      <p className="text-gray-600">{member.education}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-700 mb-1">ความเชี่ยวชาญ:</p>
                      <p className="text-gray-600">{member.expertise}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">การรับรองและมาตรฐาน</h2>
            <p className="text-xl text-gray-600">เราได้รับการรับรองจากองค์กรมาตรฐานชั้นนำ</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">พร้อมเป็นพันธมิตรกับคุณ</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            ร่วมเติบโตไปกับเราในการสร้างผลิตภัณฑ์อาหารที่มีคุณภาพและปลอดภัย
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
              ติดต่อเราวันนี้
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300">
              ดูสินค้าของเรา
            </button>
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