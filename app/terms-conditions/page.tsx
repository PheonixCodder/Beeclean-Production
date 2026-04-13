import type { Metadata } from "next";
import LegalLayout from "@/components/legal/legal-layout";
import LegalSection from "@/components/legal/legal-section";

export const metadata: Metadata = {
  title: "Terms & Conditions - Beeclean",
  description:
    "Terms and Conditions for Beeclean - Professional iPhone Cleaning & Optimization app. Read about acceptable use, subscriptions, and legal terms.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "user agreement",
    "Beeclean terms",
    "app terms",
    "EULA",
  ],
  authors: [{ name: "Beeclean Team" }],
  openGraph: {
    title: "Terms & Conditions - Beeclean",
    description:
      "Terms and Conditions for Beeclean - Professional iPhone Cleaning & Optimization app.",
    type: "website",
    locale: "en_US",
    siteName: "Beeclean",
    url: "https://beeclean.com/terms-conditions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const TermsConditions = () => {
  return (
    <LegalLayout
      title="Terms & Conditions"
      lastUpdated="April 6, 2026"
    >
      <LegalSection heading="Acceptance of Terms" number={1}>
        <p>
          Welcome to Beeclean! By downloading, installing, accessing, or using
          the Beeclean mobile application and any related services
          (collectively, the &quot;Service&quot;), you agree to be bound by
          these Terms & Conditions (&quot;Terms&quot;). These Terms constitute a
          legally binding agreement between you and Beeclean (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;).
        </p>
        <p className="mt-4">
          If you do not agree to these Terms, you may not access or use the
          Service. By using the Service, you represent that you are at least 13
          years of age and have the legal capacity to enter into this
          agreement.
        </p>
        <p className="mt-4">
          Please read these Terms carefully, along with our Privacy Policy,
          which governs your use of the Service. Accessing or continuing to use
          the Service after any changes to these Terms constitutes your
          acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection heading="Description of Service" number={2}>
        <p>
          Beeclean is a mobile application designed to help users clean,
          organize, and optimize their iPhone storage. The Service provides
          tools to:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>Identify and remove duplicate photos and videos</li>
          <li>Organize screenshots and similar media</li>
          <li>Compress large files to save storage space</li>
          <li>Clean up contacts and email (with permission)</li>
          <li>Provide storage analytics and insights</li>
          <li>Offer premium features through in-app subscriptions</li>
        </ul>
        <p className="mt-4">
          The Service is available on iOS devices compatible with our app. We
          reserve the right to modify, suspend, or discontinue any part of the
          Service at any time without notice.
        </p>
      </LegalSection>

      <LegalSection heading="User Accounts and Registration" number={3}>
        <p>
          While basic cleanup features are available without an account,
          premium features require registration via:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            <strong>Sign in with Apple</strong> - Your Apple ID information is
            handled according to Apple&apos;s privacy policy
          </li>
        </ul>
        <p className="mt-4">
          You agree to provide accurate and complete information when creating
          an account and to keep your account credentials secure. You are
          responsible for all activities that occur under your account. Notify us
          immediately of any unauthorized use.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable Use Policy" number={4}>
        <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            Use the Service in any way that violates any applicable law or
            regulation
          </li>
          <li>
            Attempt to gain unauthorized access to our systems, networks, or
            user accounts
          </li>
          <li>
            Interfere with or disrupt the Service or servers connected to the
            Service
          </li>
          <li>
            Use the Service to transmit malware, viruses, or any malicious code
          </li>
          <li>
            Reverse engineer, decompile, or attempt to extract the source code
            of the app
          </li>
          <li>
            Use automated scripts or bots to access the Service without our
            permission
          </li>
          <li>
            Misuse the Service to harm other users or their data
          </li>
          <li>
            Use the Service for commercial purposes without our written consent
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Intellectual Property" number={5}>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">5.1 Our Intellectual Property</h3>
            <p>
              The Service and its original content, features, and functionality
              are owned by Beeclean and are protected by international copyright,
              trademark, patent, trade secret, and other intellectual property
              laws. The Service is licensed, not sold, to you.
            </p>
            <p className="mt-2">
              You may not copy, modify, create derivative works from, decompile,
              or reverse-engineer any part of the Service without our prior
              written consent.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">5.2 User Content</h3>
            <p>
              The Service processes your photos and media locally on your device.
              You retain all ownership rights to your content. However, by using
              the Service, you grant us a limited, non-exclusive license to
              access, read, and process your media solely for the purpose of
              providing the Service to you.
            </p>
            <p className="mt-2">
              We do not claim ownership of your content. We will not share,
              publish, or distribute your personal media without your explicit
              consent.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">5.3 Trademarks</h3>
            <p>
              Beeclean, the Beeclean logo, and all related names, logos, product
              names, and service names are trademarks of Beeclean. You may not
              use these marks without our prior written permission.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection heading="Subscriptions and Billing" number={6}>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">6.1 Free and Premium Tiers</h3>
            <p>
              The Service offers both free and subscription-based (Premium)
              features. The free version includes basic cleanup tools with
              limitations. Premium features require a paid subscription.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">6.2 Payment Processing</h3>
            <p>
              All payments are processed through Apple&apos;s in-app purchase
              system. Subscription prices and billing cycles are displayed before
              purchase. Payment terms are between you and Apple Inc. Beeclean is
              not responsible for payment processing errors or disputes.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">6.3 Automatic Renewal</h3>
            <p>
              Unless you cancel at least 24 hours before the end of the current
              billing period, your Premium subscription will automatically renew.
              You can manage or cancel subscriptions through your Apple ID
              account settings. Cancellation takes effect at the end of the
              current billing cycle.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">6.4 Refunds</h3>
            <p>
              All sales are final. Refund requests must be directed to Apple
              Support, as Apple manages all App Store transactions. Beeclean does
              not directly handle refunds.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">6.5 Price Changes</h3>
            <p>
              We may change subscription prices with reasonable notice (at least
              30 days) before the change takes effect. Continued use after a
              price change constitutes acceptance of the new price.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection heading="Disclaimer of Warranties" number={7}>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
          WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE
          MAXIMUM EXTENT PERMITTED BY LAW, BEECLEAN DISCLAIMS ALL WARRANTIES,
          INCLUDING:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
          </li>
          <li>
            THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE FROM
            HARMFUL COMPONENTS
          </li>
          <li>
            THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS
          </li>
          <li>
            THAT THE CONTENT OR INFORMATION PROVIDED THROUGH THE SERVICE IS
            ACCURATE OR RELIABLE
          </li>
        </ul>
        <p className="mt-4">
          Beeclean does not warrant that cleanup operations will recover a
          specific amount of storage space or that no data loss will occur. Always
          back up important data before performing cleanup operations.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability" number={8}>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, BEECLEAN AND ITS OFFICERS,
          DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
          ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE
          SERVICE, INCLUDING:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>LOSS OF DATA, FILES, OR PERSONAL INFORMATION</li>
          <li>LOSS OF PROFITS, REVENUE, OR GOODWILL</li>
          <li>BUSINESS INTERRUPTION</li>
          <li>PERSONAL INJURY OR PROPERTY DAMAGE</li>
          <li>ANY DAMAGES ARISING FROM DATA LOSS OR FILE DELETION</li>
        </ul>
        <p className="mt-4">
          OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM THESE TERMS OR
          THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE PAST 12
          MONTHS (OR $100 WHICHEVER IS LESS). SOME JURISDICTIONS DO NOT ALLOW
          THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO THIS LIMITATION MAY
          NOT APPLY TO YOU.
        </p>
      </LegalSection>

      <LegalSection heading="Indemnification" number={9}>
        <p>
          You agree to indemnify, defend, and hold harmless Beeclean and its
          affiliates, officers, agents, and employees from and against any and
          all claims, damages, costs, liabilities, and expenses (including
          reasonable attorneys&apos; fees) arising out of or related to:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>Your use of the Service</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any third-party rights</li>
          <li>Any claim that your content caused damage to a third party</li>
        </ul>
        <p className="mt-4">
          We reserve the right, at our own expense, to assume the exclusive
          defense and control of any matter otherwise subject to indemnification
          by you.
        </p>
      </LegalSection>

      <LegalSection heading="Termination" number={10}>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">10.1 By You</h3>
            <p>
              You may stop using the Service at any time. To terminate your
              account, delete the app from your device and cancel any active
              subscription through your Apple ID settings.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">10.2 By Beeclean</h3>
            <p>
              We may suspend or terminate your access to the Service at our sole
              discretion, without notice or liability, for any reason including
              but not limited to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-500">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Non-payment of subscription fees</li>
              <li>Extended periods of inactivity</li>
              <li>Technical or security concerns</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">10.3 Effect of Termination</h3>
            <p>
              Upon termination, all rights granted to you under these Terms will
              immediately cease. Your account data and any content stored on our
              servers will be deleted in accordance with our data retention
              policy (local media is never stored on our servers). Premium
              subscriptions will not be refunded unless required by Apple&apos;s
              policies.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection heading="Governing Law and Dispute Resolution" number={11}>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">11.1 Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of California, United States, without regard
              to its conflict of law principles.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">11.2 Dispute Resolution</h3>
            <p>
              Any dispute arising out of or relating to these Terms or the
              Service shall first be attempted to be resolved through Informal
              Negotiations. If unsuccessful within 30 days, disputes shall be
              resolved through binding arbitration in accordance with the rules
              of the American Arbitration Association.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              11.3 Class Action Waiver
            </h3>
            <p>
              You agree that any disputes shall be resolved individually, and
              you waive any right to participate in a class action or
              consolidated proceeding.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection heading="Changes to Terms" number={12}>
        <p>
          We may update these Terms from time to time. When we do, we will:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            Update the &quot;Last updated&quot; date at the top of these Terms
          </li>
          <li>
            Notify you via the app, email (if we have your address), or through
            the App Store
          </li>
          <li>
            Provide at least 30 days notice for material changes affecting
            billing or user rights
          </li>
        </ul>
        <p className="mt-4">
          Continued use of the Service after changes constitutes your acceptance
          of the new Terms. If you do not agree to the modified Terms, you must
          stop using the Service.
        </p>
      </LegalSection>

      <LegalSection heading="Severability" number={13}>
        <p>
          If any provision of these Terms is held to be invalid, illegal, or
          unenforceable by a court of competent jurisdiction, such provision
          shall be severed from these Terms. The remaining provisions shall
          continue in full force and effect.
        </p>
      </LegalSection>

      <LegalSection heading="No Waiver" number={14}>
        <p>
          Our failure to enforce any right or provision of these Terms will not
          be considered a waiver of those rights. Any waiver of any provision of
          these Terms will be effective only if in writing and signed by us.
        </p>
      </LegalSection>

      <LegalSection heading="Entire Agreement" number={15}>
        <p>
          These Terms, together with our Privacy Policy, constitute the entire
          agreement between you and Beeclean regarding the Service and supersede
          all prior or contemporaneous agreements, communications, and
          proposals, whether oral or written.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Information" number={16}>
        <p>
          For any questions about these Terms & Conditions, please contact us:
        </p>
        <div className="mt-4 space-y-2 text-gray-500">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:legal@beeclean.com"
              className="text-black font-bold hover:underline"
            >
              legal@beeclean.com
            </a>
          </p>
          <p>
            <strong>Subject:</strong> Terms & Conditions Inquiry
          </p>
          <p>
            <strong>Mailing Address:</strong> Beeclean, Inc., 123 Tech Street,
            San Francisco, CA 94105, United States
          </p>
        </div>
      </LegalSection>
    </LegalLayout>
  );
};

export default TermsConditions;
