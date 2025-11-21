import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Ketronica"
                width={180}
                height={50}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Your trusted online store for home appliances and everyday essentials. Quality products delivered throughout Europe.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              We specialize in providing high-quality air conditioners, heaters, kitchen appliances, and small household devices that make your life easier.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Information</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 Ketronica. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 mt-4 md:mt-0">
              Fast shipping across Europe
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
