export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-50 to-white">
        <h1 className="text-5xl font-bold mb-4 text-blue-700">เคมีอาหารคุณภาพสูงงงงงงงงงงงงง</h1>
        <p className="text-gray-600 mb-6">สำหรับอุตสาหกรรมและงานวิจัย</p>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          ดูสินค้า
        </button>
      </section>

      {/* Categories */}
      <section className="py-12 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {["CMC", "Citric Acid", "น้ำตาล", "อื่นๆ"].map((item, i) => (
          <div key={i} className="p-6 border rounded-lg text-center shadow hover:scale-105 transition">
            {item}
          </div>
        ))}
      </section>

      {/* Featured */}
      <section className="py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">สินค้าแนะนำ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["สินค้า A", "สินค้า B", "สินค้า C"].map((p, i) => (
            <div key={i} className="p-6 border rounded-lg shadow hover:shadow-lg transition">{p}</div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-sm text-gray-600">
        © 2025 FoodChem Supply - ติดต่อเรา: 02-xxx-xxxx
      </footer>
    </div>
  );
}