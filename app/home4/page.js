export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/1200/400')" }}
      >
        <div className="bg-black bg-opacity-40 absolute inset-0"></div>
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Food Chemicals Online</h1>
          <button className="px-8 py-3 bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition">
            เริ่มช้อปเลย
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {["CMC", "Citric Acid", "น้ำตาล", "อื่นๆ"].map((cat, i) => (
          <div key={i} className="p-6 border rounded-lg text-center shadow hover:scale-105 transition">
            {cat}
          </div>
        ))}
      </section>

      {/* Product Grid */}
      <section className="py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">สินค้าทั้งหมด</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["สินค้า A", "สินค้า B", "สินค้า C", "สินค้า D"].map((p, i) => (
            <div key={i} className="p-6 border rounded-lg shadow hover:shadow-lg transition">{p}</div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-6">ทำไมต้องเลือกเรา?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>✔ คุณภาพ</div>
          <div>✔ ราคาดี</div>
          <div>✔ จัดส่งไว</div>
          <div>✔ มีใบรับรอง</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-sm text-gray-600">
        © 2025 FoodChem Supply - ติดต่อเรา: 02-xxx-xxxx
      </footer>
    </div>
  );
}