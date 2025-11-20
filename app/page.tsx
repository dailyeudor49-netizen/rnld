import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Home Appliances & Essentials
            </h1>
            <p className="text-xl text-white/95 mb-8">
              From air conditioners to kitchen appliances. Quality products for modern living, delivered across Europe.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Welcome to Ionizi</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Your trusted destination for home appliances and everyday essentials. We offer a carefully selected range of air conditioners, heaters, kitchen appliances, and small household devices that make your life easier.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            From cooling solutions to practical utilities, we bring quality and convenience to your doorstep with fast delivery across Europe.
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our range of quality appliances and home essentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[url('https://www.asterservice.it/images/2020/08/31/clima-3.jpg')] bg-cover bg-center"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Air Conditioners</h3>
                <p className="text-gray-600 text-sm">
                  Portable and wall-mounted AC units for every room size. Stay cool all summer long.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[url('https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRTpmVDRoD16G-ylTgk0-Ca4KJ_aDCZ5S8DC2lYLlQjNbHdlzEUhY96IsiDSVygUIoHkNh9bIL7FuKYW242S-VCeha4X_RigGt4Uhuso7HUdEwAGpf92fpj')] bg-cover bg-center"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Heaters & Fans</h3>
                <p className="text-gray-600 text-sm">
                  Electric heaters, fan heaters, and ventilation solutions for optimal comfort.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1585515320310-259814833e62?w=300')] bg-cover bg-center"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Kitchen Appliances</h3>
                <p className="text-gray-600 text-sm">
                  Blenders, toasters, coffee makers, and essential kitchen gadgets for your home.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300')] bg-cover bg-center"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Small Appliances</h3>
                <p className="text-gray-600 text-sm">
                  Vacuum cleaners, humidifiers, dehumidifiers, and more practical devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Banner */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="text-sm font-semibold tracking-wide uppercase opacity-90">Popular This Season</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Air Conditioning Solutions
            </h2>
            <p className="text-lg mb-8 opacity-95">
              Beat the heat with our selection of portable and fixed air conditioners. Energy-efficient models suitable for any room size, from compact units to powerful cooling systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur">Portable AC Units</span>
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur">Split Systems</span>
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur">Energy Efficient</span>
              <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur">Easy Installation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Examples */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our most sought-after appliances and home essentials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-48 bg-[url('https://www.asterservice.it/images/2020/08/31/clima-3.jpg')] bg-cover bg-center"></div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Portable Air Conditioners</h3>
              <p className="text-sm text-gray-600 mb-3">7000-12000 BTU units, perfect for any room</p>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Bestseller</span>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-48 bg-[url('https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRTpmVDRoD16G-ylTgk0-Ca4KJ_aDCZ5S8DC2lYLlQjNbHdlzEUhY96IsiDSVygUIoHkNh9bIL7FuKYW242S-VCeha4X_RigGt4Uhuso7HUdEwAGpf92fpj')] bg-cover bg-center"></div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Electric Heaters</h3>
              <p className="text-sm text-gray-600 mb-3">Ceramic and oil-filled radiator heaters</p>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Winter Ready</span>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-48 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400')] bg-cover bg-center"></div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Kitchen Essentials</h3>
              <p className="text-sm text-gray-600 mb-3">Blenders, mixers, and food processors</p>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Top Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Ionizi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make appliance shopping simple, reliable, and convenient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Europe-Wide Delivery</h3>
              <p className="text-gray-600">Fast and reliable shipping to all European countries</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cash on Delivery</h3>
              <p className="text-gray-600">Pay conveniently when you receive your order</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Certified appliances with warranty and support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
            Explore our range of quality appliances. From air conditioners to kitchen essentials, we have everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-50 transition-colors inline-block"
            >
              Contact Us
            </Link>
            <Link
              href="/shipping"
              className="px-8 py-4 bg-transparent text-white font-semibold border-2 border-white rounded-full hover:bg-white hover:text-orange-600 transition-colors inline-block"
            >
              Shipping Information
            </Link>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-700 mb-4">
              Have questions? Visit our <Link href="/contact" className="text-orange-600 font-semibold underline hover:no-underline">Contact page</Link> or check our <Link href="/shipping" className="text-orange-600 font-semibold underline hover:no-underline">Shipping & Returns policy</Link>.
            </p>
            <p className="text-sm text-gray-600">
              For more information, please review our <Link href="/terms" className="underline hover:text-orange-600">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-orange-600">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
