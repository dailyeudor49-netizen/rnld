import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/ionizi_logo.png"
              alt="Ionizi"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Tagline */}
          <div className="hidden md:flex items-center text-sm text-gray-600">
            <span className="font-medium">Products with Cash on Delivery</span>
          </div>
        </div>
      </div>
    </header>
  );
}
