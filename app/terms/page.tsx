import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Niagara Renovation Company",
  description: "Terms of Service for Niagara Renovation Company. Read our terms for using our website and renovation services.",
  alternates: { canonical: "https://www.niagararenovationcompany.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: March 17, 2026</p>

        <div className="space-y-8 text-gray-700">

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using the website at www.niagararenovationcompany.com (&ldquo;the Website&rdquo;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this Website. These terms apply to all visitors, users, and clients of Niagara Renovation Company (a Taylor and Co Company).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">2. Description of Services</h2>
            <p className="leading-relaxed">
              Niagara Renovation Company is a licensed home renovation contractor serving homeowners and businesses throughout Niagara Region, Ontario, Canada. Our Website provides information about our renovation services, service areas, and provides a means for prospective clients to request free estimates and contact our team. The Website does not constitute an offer to enter into a contract — all renovation projects are governed by separate written contracts executed between Niagara Renovation Company and each individual client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">3. Estimates and Quotes</h2>
            <p className="leading-relaxed">
              Submitting a quote request form through this Website does not create a binding contract or guarantee of service. All estimates and quotes provided by Niagara Renovation Company are non-binding until a formal written contract is signed by both parties. Estimates are based on information provided by the client and are subject to revision following a site visit and detailed assessment. Prices are quoted in Canadian dollars (CAD) and do not include applicable taxes unless specifically stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">4. Accuracy of Information</h2>
            <p className="leading-relaxed">
              We make every reasonable effort to ensure the information on this Website is accurate and up to date. However, we make no warranty or representation regarding the accuracy, completeness, or currency of Website content. Information about services, pricing, timelines, and availability is subject to change without notice. Always confirm details directly with our team before making decisions based on Website content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this Website — including text, images, graphics, logos, and design — is the property of Niagara Renovation Company or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any Website content without our express written permission. Limited use for personal, non-commercial reference is permitted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">6. User Conduct</h2>
            <p className="leading-relaxed mb-3">When using this Website, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Submit false or misleading information through our contact forms</li>
              <li>Attempt to gain unauthorized access to any part of our Website or systems</li>
              <li>Use automated tools to scrape, crawl, or extract data from this Website</li>
              <li>Engage in any activity that disrupts or interferes with the Website&apos;s operation</li>
              <li>Use this Website for any unlawful purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">7. Third-Party Links</h2>
            <p className="leading-relaxed">
              This Website may contain links to third-party websites. These links are provided for convenience only. Niagara Renovation Company has no control over the content or practices of linked third-party sites and accepts no responsibility for them. Accessing linked third-party websites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by applicable law, Niagara Renovation Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this Website or its content. Our total liability for any claim arising from use of this Website shall not exceed $100 CAD. This limitation does not apply to our obligations under executed renovation contracts, which are governed by the terms of those contracts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">9. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify and hold harmless Niagara Renovation Company, its directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of this Website, your violation of these Terms, or your violation of any third party&apos;s rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">10. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms of Service are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes arising from these Terms or your use of this Website shall be subject to the exclusive jurisdiction of the courts of Ontario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">11. Changes to These Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of the Website following any changes constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">12. Contact</h2>
            <p className="leading-relaxed">
              Questions about these Terms of Service should be directed to:
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Niagara Renovation Company</strong> (a Taylor and Co Company)</li>
              <li><strong>Email:</strong> info@niagararenovationcompany.com</li>
              <li><strong>Phone:</strong> (647) 797-9471</li>
            </ul>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4 text-sm">
          <Link href="/" className="text-red-600 hover:underline font-medium">&larr; Back to Home</Link>
          <Link href="/privacy-policy" className="text-red-600 hover:underline font-medium">Privacy Policy &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
