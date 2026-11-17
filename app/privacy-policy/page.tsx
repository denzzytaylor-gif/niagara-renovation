import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Niagara Renovation Company. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://www.niagararenovationcompany.com/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: March 17, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">1. Who We Are</h2>
            <p className="leading-relaxed">
              Niagara Renovation Company (a Taylor and Co Company) operates the website at{" "}
              <a href="https://www.niagararenovationcompany.com" className="text-red-600 hover:underline">
                www.niagararenovationcompany.com
              </a>. We are a licensed home renovation contractor serving homeowners throughout Niagara Region, Ontario, Canada. Our contact information is:
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Email:</strong> info@niagararenovationcompany.com</li>
              <li><strong>Phone:</strong> (647) 797-9471</li>
              <li><strong>Service Area:</strong> Niagara Region, Ontario, Canada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="leading-relaxed mb-3">
              We collect personal information only when you voluntarily provide it to us through our contact forms, email communications, or phone calls. The types of personal information we may collect include:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Your full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Property address or general location (city/neighbourhood)</li>
              <li>Description of your renovation project</li>
              <li>Any other information you choose to provide</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              We do not automatically collect sensitive personal data, financial information, or government identification numbers through this website. We do not use tracking cookies beyond standard analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-3">We use the personal information you provide for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>To respond to your renovation inquiry or request for a quote</li>
              <li>To schedule free in-home consultations and site visits</li>
              <li>To prepare and deliver written renovation estimates</li>
              <li>To communicate with you about your ongoing renovation project</li>
              <li>To follow up on quotes we have provided (with your consent)</li>
              <li>To improve our website and services</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              We will never sell, rent, or trade your personal information to third parties. We will never add you to marketing email lists without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">4. Form Submissions and Third-Party Processors</h2>
            <p className="leading-relaxed">
              Our website contact forms are processed through Formspree (formspree.io), a third-party form handling service. When you submit a form on our website, your information is transmitted through Formspree&apos;s servers and delivered to our email inbox. Formspree&apos;s privacy policy is available at formspree.io. We have selected Formspree because of its commitment to data privacy and security. Form submission data is not stored indefinitely on third-party servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">5. Cookies and Analytics</h2>
            <p className="leading-relaxed">
              Our website may use standard web analytics tools (such as Google Analytics) to understand how visitors interact with our site. These tools may collect anonymized information such as pages visited, time spent on the site, and general geographic location. This data is collected in aggregate and cannot be used to identify individual visitors. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">6. Data Security</h2>
            <p className="leading-relaxed">
              We take reasonable precautions to protect your personal information from unauthorized access, use, or disclosure. Our website uses HTTPS encryption for all data transmission. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security of information transmitted through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">7. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected — generally for the duration of our business relationship and any applicable warranty periods. If you request that we delete your personal information, we will do so promptly, subject to any legal obligations to retain certain records.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">8. Your Rights (PIPEDA)</h2>
            <p className="leading-relaxed mb-3">
              As a Canadian resident, you have rights under the Personal Information Protection and Electronic Documents Act (PIPEDA) regarding your personal information, including the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Know what personal information we hold about you</li>
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Withdraw consent for the collection and use of your information</li>
              <li>Request deletion of your personal information</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              To exercise any of these rights, please contact us at info@niagararenovationcompany.com or call (647) 797-9471.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">9. Children&apos;s Privacy</h2>
            <p className="leading-relaxed">
              Our website is not directed at children under the age of 18. We do not knowingly collect personal information from children. If you believe a child has submitted personal information through our website, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">10. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will post the updated policy on this page with a revised &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-3">11. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Email:</strong> info@niagararenovationcompany.com</li>
              <li><strong>Phone:</strong> (647) 797-9471</li>
            </ul>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4 text-sm">
          <Link href="/" className="text-red-600 hover:underline font-medium">&larr; Back to Home</Link>
          <Link href="/terms" className="text-red-600 hover:underline font-medium">Terms of Service &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
