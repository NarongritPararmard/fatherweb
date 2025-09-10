export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Search */}
      <section className="py-20 text-center bg-gray-50">
        <h1 className="text-5xl font-bold mb-6 text-green-700">ค้นหาสารเคมีที่คุณต้องการ</h1>
        <input
          type="text"
          placeholder="เช่น Citric Acid"
          className="px-6 py-3 w-1/2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </section>

      {/* Popular Products */}
      <section className="py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">สินค้าขายดี</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["CMC", "Citric Acid", "น้ำตาล", "อื่นๆ"].map((p, i) => (
            <div key={i} className="p-6 border rounded-lg shadow hover:scale-105 transition">{p}</div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-green-50">
        <h2 className="text-3xl font-semibold text-center mb-6">ลูกค้าพูดถึงเรา</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="italic text-lg text-gray-700">"บริการดี จัดส่งไว คุณภาพตรงตามมาตรฐาน"</p>
          <p className="mt-2 text-gray-600">— บริษัท โรงงานอาหาร</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <button className="px-10 py-4 bg-green-600 text-white text-lg rounded-lg shadow hover:bg-green-700 transition">
          ขอใบเสนอราคา
        </button>
      </section>
    </div>
  );
}