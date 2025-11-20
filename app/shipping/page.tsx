import Link from 'next/link';

export const metadata = {
  title: 'Shipping & Returns - Ionizi',
  description: 'Learn about our European shipping methods, delivery times, and return policy',
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Shipping & Returns</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Shipping & Returns
        </h1>
        <p className="text-gray-600 mb-8">Everything you need to know about shipping and returns</p>

        <div className="prose prose-lg max-w-none">
          {/* Shipping Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Shipping Information</h2>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">European Delivery</h3>
              <p className="text-gray-700 mb-4">
                We deliver to all European Union countries and selected European nations. Our shipping service ensures your products arrive safely and quickly at your doorstep.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Shipping Methods & Delivery Times</h3>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg p-6 mb-4">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-orange-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Fast Delivery Across Europe</h4>
                    <p className="text-lg text-gray-700 mt-1">Approximately 24-48 hours</p>
                  </div>
                </div>
                <p className="text-center text-gray-600">
                  We ship to all European countries with express courier service
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                * Delivery times are estimates and may vary based on destination and courier availability. Shipping costs vary depending on the destination country and order weight. For exact delivery times and costs for your location, please contact us.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Payment Methods</h3>
              <p className="text-gray-700 mb-4">
                We offer flexible payment options to suit your needs:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Cash on Delivery (COD):</strong> Pay when you receive your order. Available in most European countries. COD fees vary by country.</li>
                <li><strong>Bank Transfer:</strong> Complete your order and receive payment instructions by email.</li>
                <li><strong>Online Payment:</strong> Secure payment via our payment gateway (where available).</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Processing Time</h3>
              <p className="text-gray-700 mb-4">
                Orders are typically processed within 1-2 business days. During peak seasons or special promotions, processing may take up to 3 business days. You will receive a confirmation email once your order has been dispatched.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Order Tracking</h3>
              <p className="text-gray-700 mb-4">
                Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our courier's website. If you need assistance with tracking, please <Link href="/contact" className="text-black underline hover:no-underline">contact us</Link>.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Customs and Import Duties</h3>
              <p className="text-gray-700 mb-4">
                For shipments outside the European Union, customs fees, duties, and taxes may apply. These charges are the responsibility of the recipient and are determined by your country's customs authorities.
              </p>
            </div>
          </section>

          {/* Returns Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Return Policy</h2>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">30-Day Return Window</h3>
              <p className="text-gray-700 mb-4">
                We offer a 30-day return policy from the date of delivery. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Return Requirements</h3>
              <p className="text-gray-700 mb-4">
                To be eligible for a return, items must meet the following conditions:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Items must be unused and in the same condition that you received them</li>
                <li>Items must be in the original packaging with all accessories and documentation</li>
                <li>All tags and labels must be attached</li>
                <li>Proof of purchase (receipt or order confirmation) is required</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Non-Returnable Items</h3>
              <p className="text-gray-700 mb-4">
                The following items cannot be returned for hygiene and safety reasons:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Personal care products that have been opened or used</li>
                <li>Food items and perishables</li>
                <li>Custom-made or personalized items</li>
                <li>Items marked as final sale or clearance</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">How to Return an Item</h3>
              <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-3">
                <li>
                  <strong>Contact Us:</strong> Email us at returns@ionizi.com or use our <Link href="/contact" className="text-black underline hover:no-underline">Contact form</Link> with your order number and reason for return.
                </li>
                <li>
                  <strong>Return Authorization:</strong> We will provide you with return instructions and, if applicable, a return authorization number.
                </li>
                <li>
                  <strong>Package Your Return:</strong> Carefully pack the item(s) in the original packaging. Include all accessories, manuals, and documents.
                </li>
                <li>
                  <strong>Ship Your Return:</strong> Send the package to the address provided in our return instructions. We recommend using a tracked shipping service.
                </li>
                <li>
                  <strong>Refund Processing:</strong> Once we receive and inspect your return, we will process your refund within 7-10 business days.
                </li>
              </ol>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Return Shipping Costs</h3>
              <p className="text-gray-700 mb-4">
                Return shipping costs are the responsibility of the customer unless:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>The item is defective or damaged upon arrival</li>
                <li>We sent the wrong item</li>
                <li>The item does not match the product description</li>
              </ul>
              <p className="text-gray-700 mb-4">
                In these cases, we will provide a prepaid return label or reimburse your return shipping costs.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Refund Method</h3>
              <p className="text-gray-700 mb-4">
                Refunds will be issued to your original payment method:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Cash on Delivery orders: Refund via bank transfer (please provide your bank details)</li>
                <li>Bank Transfer orders: Refund to the same bank account</li>
                <li>Online Payment orders: Refund to the original payment card or account</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Exchanges</h3>
              <p className="text-gray-700 mb-4">
                If you wish to exchange an item for a different size, color, or model, please return the original item and place a new order. This ensures the fastest processing time and guarantees product availability.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Damaged or Defective Items</h3>
              <p className="text-gray-700 mb-4">
                If you receive a damaged or defective item, please <Link href="/contact" className="text-black underline hover:no-underline">contact us</Link> within 48 hours of delivery. Include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Your order number</li>
                <li>Clear photos of the damaged item and packaging</li>
                <li>Description of the defect or damage</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We will arrange for a replacement to be sent at no additional cost, or provide a full refund including original shipping costs.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Frequently Asked Questions</h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-black mb-2">When will my refund be processed?</h3>
              <p className="text-gray-700">
                Refunds are processed within 7-10 business days after we receive and inspect your return. Please allow additional time for your bank to process the refund.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-black mb-2">Can I return an item after 30 days?</h3>
              <p className="text-gray-700">
                Returns after 30 days are evaluated on a case-by-case basis. Please <Link href="/contact" className="text-black underline hover:no-underline">contact us</Link> to discuss your situation.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-black mb-2">What if my order arrives late?</h3>
              <p className="text-gray-700">
                If your order hasn't arrived within the estimated delivery timeframe, please <Link href="/contact" className="text-black underline hover:no-underline">contact us</Link> with your order number and we'll track down your package.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-black mb-2">Do you ship to addresses outside Europe?</h3>
              <p className="text-gray-700">
                Currently, we only ship to European countries. We are working to expand our shipping destinations in the future.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-black mb-2">Is Cash on Delivery available in my country?</h3>
              <p className="text-gray-700">
                Cash on Delivery is available in most European countries. During checkout, you will see the available payment methods for your delivery address.
              </p>
            </div>
          </section>

          <section className="mb-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-black mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about shipping or returns that aren't answered here, our customer support team is ready to assist you.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold rounded-full hover:from-orange-700 hover:to-amber-600 transition-colors"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
