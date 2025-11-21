import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200')] bg-cover bg-center opacity-15" />
        <div className="relative max-w-[1600px] mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-6">
                Trusted by thousands across Europe
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Smart Home Solutions for Modern Living
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Premium appliances delivered to your door. From climate control to kitchen essentials.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/shipping"
                  className="px-6 py-3 bg-transparent text-white font-semibold border-2 border-white/50 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-white">24-48h</div>
                    <div className="text-white/80 text-sm">Fast Delivery</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-white">30</div>
                    <div className="text-white/80 text-sm">Days Return</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-white">COD</div>
                    <div className="text-white/80 text-sm">Pay on Delivery</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-white">2yr</div>
                    <div className="text-white/80 text-sm">Warranty</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">Quality Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium">Cash on Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm font-medium">Easy Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for a comfortable home, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 h-64">
              <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9UC2jnDXxVaulW9JTuY7xQ98Vx_bgElaWhw&s')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">Air Conditioners</h3>
                <p className="text-white/80 text-sm">Portable & wall-mounted units</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 p-6 h-64">
              <div className="absolute inset-0 bg-[url('https://www.gruppomade.com/wp-content/uploads/2022/04/termosifoni-elettrici.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">Heaters & Fans</h3>
                <p className="text-white/80 text-sm">Year-round climate control</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 h-64">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">Kitchen Appliances</h3>
                <p className="text-white/80 text-sm">Blenders, mixers & more</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 p-6 h-64">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">Home Devices</h3>
                <p className="text-white/80 text-sm">Vacuums, humidifiers & more</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Welcome */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Welcome to Ketronica</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your trusted partner for home appliances and everyday essentials. We carefully select quality products that combine performance, durability, and value.
              </p>
              <p className="text-gray-600 mb-8">
                With fast delivery across Europe and hassle-free cash on delivery, shopping for your home has never been easier.
              </p>
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600">10k+</div>
                  <div className="text-gray-500 text-sm">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">25+</div>
                  <div className="text-gray-500 text-sm">Countries Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-gray-500 text-sm">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
                <p className="text-sm text-gray-500">24-48h across Europe</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">2 Year Warranty</h3>
                <p className="text-sm text-gray-500">On all products</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Pay on Delivery</h3>
                <p className="text-sm text-gray-500">Cash or card</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">30 Day Returns</h3>
                <p className="text-sm text-gray-500">No questions asked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Browse our products or get in touch with our team for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/shipping"
              className="px-8 py-4 bg-transparent text-white font-semibold border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Shipping Info
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Visit our <Link href="/contact" className="text-blue-600 font-medium hover:underline">Contact page</Link> ·
            <Link href="/shipping" className="text-blue-600 font-medium hover:underline ml-1">Shipping & Returns</Link> ·
            <Link href="/terms" className="text-blue-600 font-medium hover:underline ml-1">Terms</Link> ·
            <Link href="/privacy" className="text-blue-600 font-medium hover:underline ml-1">Privacy</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
