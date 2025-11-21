'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const noLayoutPages = ['/dongle', '/airwave'];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = noLayoutPages.some(page => pathname?.startsWith(page));

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
