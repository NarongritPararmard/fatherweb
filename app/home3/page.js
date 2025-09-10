export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with tagline */}
      <section className="py-20 text-center bg-gradient-to-r from-green-100 to-white">
        <h1 className="text-5xl font-bold mb-4 text-green-700">มาตรฐานสากลในทุกการจัดส่ง</h1>
        <p className="text-gray-600">สารเคมีอาหารคุณภาพเพื่อธุรกิจของคุณ</p>
      </section>

      {/* Process */}
      <section className="py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {["1. คัดเลือกวัตถุดิบ", "2. บรรจุ & ตรวจสอบ", "3. จัดส่งรวดเร็ว"].map((step, i) => (
          <div key={i} className="p-6 border rounded-lg shadow text-center hover:scale-105 transition">
            {step}
          </div>
        ))}
      </section>

      {/* Products */}
      <section className="py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">สินค้าเด่น</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["CMC", "Citric Acid", "น้ำตาล", "อื่นๆ"].map((p, i) => (
            <div key={i} className="p-6 border rounded-lg shadow hover:shadow-lg transition">{p}</div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-6">สาระน่ารู้</h2>
        <div className="max-w-3xl mx-auto text-left">
          <article className="mb-6">
            <h3 className="font-semibold text-lg mb-2">CMC ใช้ทำอะไร?</h3>
            <p className="text-gray-600">CMC ใช้ในการปรับความหนืดและเนื้อสัมผัสของอาหาร...</p>
          </article>
        </div>
      </section>
    </div>
  );
}