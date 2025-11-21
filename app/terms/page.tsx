import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Ketronica',
  description: 'Read our terms of service and conditions for using Ketronica',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Terms of Service</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Ketronica, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the terms of this agreement, you are not authorized to access or use Ketronica.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">2. Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily access the materials on Ketronica for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on Ketronica</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or mirror the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">3. Products and Services</h2>
            <p className="text-gray-700 mb-4">
              All products and services are subject to availability. We reserve the right to discontinue any product or service at any time. Prices for our products are subject to change without notice.
            </p>
            <p className="text-gray-700 mb-4">
              We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time without notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">4. Account Registration</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <p className="text-gray-700 mb-4">
              You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">5. Payment Terms</h2>
            <p className="text-gray-700 mb-4">
              Payment is due at the time of purchase. We accept various payment methods including credit cards, debit cards, and other payment methods as displayed during checkout.
            </p>
            <p className="text-gray-700 mb-4">
              All payments are processed securely. We do not store your full credit card information on our servers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">6. Shipping and Delivery</h2>
            <p className="text-gray-700 mb-4">
              We aim to process and ship orders promptly. Delivery times may vary depending on your location and chosen shipping method. Please refer to our <Link href="/shipping" className="text-black underline hover:no-underline">Shipping & Returns</Link> page for detailed information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">7. Returns and Refunds</h2>
            <p className="text-gray-700 mb-4">
              We offer a 30-day return policy on most items. Products must be returned in their original condition with all tags attached. For complete details, please visit our <Link href="/shipping" className="text-black underline hover:no-underline">Shipping & Returns</Link> page.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall Ketronica or its suppliers be liable for any damages arising out of the use or inability to use the materials on Ketronica, even if Ketronica or an authorized representative has been notified of the possibility of such damage.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">9. Modifications to Terms</h2>
            <p className="text-gray-700 mb-4">
              Ketronica may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-4">10. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us through our <Link href="/contact" className="text-black underline hover:no-underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
