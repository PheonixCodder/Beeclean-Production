import type { Metadata } from "next";
import LegalLayout from "@/components/legal/legal-layout";
import LegalSection from "@/components/legal/legal-section";

export const metadata: Metadata = {
  title: "Privacy Policy - Beeclean",
  description:
    "Privacy Policy for Beeclean - Learn how we protect your privacy, handle data, and keep your information secure when using our iPhone cleaning and optimization app.",
  keywords: [
    "privacy policy",
    "data protection",
    "iPhone privacy",
    "iOS privacy",
    "Beeclean privacy",
    "GDPR",
    "CCPA",
  ],
  authors: [{ name: "Beeclean Team" }],
  openGraph: {
    title: "Privacy Policy - Beeclean",
    description:
      "Privacy Policy for Beeclean - Learn how we protect your privacy, handle data, and keep your information secure.",
    type: "website",
    locale: "en_US",
    siteName: "Beeclean",
    url: "https://beeclean.com/privacy-policy",
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

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 6, 2026">
      <LegalSection heading="Introduction" number={1}>
        <p>
          Beeclean ("we", "our", or "us") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you use our mobile application
          Beeclean and any related services (collectively, the "Service").
        </p>
        <p>
          Please read this Privacy Policy carefully. By using the Service, you
          consent to the practices described in this policy. If you do not agree
          with the terms of this Privacy Policy, please do not access the
          Service.
        </p>
        <p>
          This Privacy Policy is tailored for users in the United States and
          complies with applicable privacy laws including the California
          Consumer Privacy Act (CCPA) and the General Data Protection Regulation
          (GDPR) for users in the European Economic Area.
        </p>
      </LegalSection>

      <LegalSection heading="Information We Collect" number={2}>
        <p>
          We collect several types of information from and about users of our
          Service:
        </p>
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              2.1 Personal Information
            </h3>
            <p>
              When you create an account or use premium features, we may
              collect:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-500">
              <li>Your name and email address</li>
              <li>Apple ID information (as provided by Sign in with Apple)</li>
              <li>
                Subscription status and payment information (processed by Apple)
              </li>
              <li>Customer support communications</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              2.2 Device and Usage Information
            </h3>
            <p>
              We automatically collect certain information about your device and
              usage of the Service:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-500">
              <li>Device type, model, and operating system version</li>
              <li>Unique device identifiers (IDFV/IDFA)</li>
              <li>App usage statistics and performance metrics</li>
              <li>Crash logs and diagnostic data</li>
              <li>Language and region settings</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              2.3 Photos and Media (Important)
            </h3>
            <p>
              <strong>
                Beeclean processes your photos and videos locally on your
                device.
              </strong>{" "}
              We do not upload, store, or have access to your personal media
              files on our servers. All image analysis, duplicate detection, and
              cleanup operations happen directly on your iPhone. We only collect
              metadata about cleanup actions (e.g., "X duplicates removed") for
              analytics purposes, without any identifiable content.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">2.4 Analytics Data</h3>
            <p>
              We use third-party analytics services (such as Firebase Analytics
              and App Store Connect Analytics) to understand how users interact
              with our app. These services collect anonymous usage data that
              helps us improve the Service. You can opt out of analytics
              tracking through your device settings.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection heading="How We Use Your Information" number={3}>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            Provide, maintain, and improve the Beeclean Service and its features
          </li>
          <li>
            Process your subscriptions and manage your account through Apple's
            systems
          </li>
          <li>
            Send you service-related notifications (e.g., scan completion,
            subscription updates)
          </li>
          <li>
            Respond to your comments, questions, and customer support requests
          </li>
          <li>
            Monitor and analyze trends, usage, and activities in connection with
            the Service
          </li>
          <li>
            Detect, prevent, and address technical issues, fraud, or security
            concerns
          </li>
          <li>
            Personalize your experience and deliver content relevant to your
            interests
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Data Sharing and Disclosure" number={4}>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties except in the following circumstances:
        </p>
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              4.1 Service Providers
            </h3>
            <p>
              We work with trusted third-party service providers who assist us
              in operating our Service, including:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-500">
              <li>
                Apple Inc. (for App Store distribution, in-app purchases, and
                Sign in with Apple)
              </li>
              <li>
                Firebase (Google) for analytics and crash reporting (data is
                anonymized)
              </li>
              <li>
                Cloud service providers for backend infrastructure (no user
                media stored)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              4.2 Legal Requirements
            </h3>
            <p>
              We may disclose your information if required to do so by law or in
              response to valid requests by public authorities (e.g., a court or
              government agency).
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              4.3 Business Transfers
            </h3>
            <p>
              If Beeclean is involved in a merger, acquisition, or sale of all
              or substantially all its assets, your information may be
              transferred as part of that transaction. We will provide notice
              via our website or email before such a transfer occurs.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              4.4 Protection of Rights
            </h3>
            <p>
              We may disclose information to protect the rights, property, or
              safety of Beeclean, our users, or others. This includes enforcing
              our Terms & Conditions.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection heading="Data Security" number={5}>
        <p>
          The security of your data is our top priority. We implement
          industry-standard security measures to protect your information:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            <strong>Local Processing:</strong> All photo and video analysis is
            performed directly on your device. No personal media is uploaded to
            our servers.
          </li>
          <li>
            <strong>Encryption:</strong> All data transmitted between your
            device and our servers is encrypted using HTTPS/TLS.
          </li>
          <li>
            <strong>Access Controls:</strong> We restrict access to personal
            information to employees, contractors, and agents who need to know
            that information to process it.
          </li>
          <li>
            <strong>Regular Security Audits:</strong> We regularly review our
            data collection, storage, and processing practices to guard against
            unauthorized access.
          </li>
        </ul>
        <p className="mt-4">
          However, no method of transmission over the Internet or electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your information, we cannot guarantee its absolute
          security.
        </p>
      </LegalSection>

      <LegalSection heading="Your Data Rights" number={6}>
        <p>
          Depending on your jurisdiction, you may have the following rights
          regarding your personal data:
        </p>
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              6.1 Access & Portability
            </h3>
            <p>
              You can request a copy of the personal information we hold about
              you in a structured, commonly used, and machine-readable format.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              6.2 Correction & Deletion
            </h3>
            <p>
              You may request that we correct inaccurate information or delete
              your personal data. Note that we may retain certain information as
              required by law or for legitimate business purposes.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              6.3 Restriction & Objection
            </h3>
            <p>
              You may object to or request restriction of certain processing of
              your data, particularly for direct marketing purposes.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              6.4 How to Exercise Your Rights
            </h3>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@beeclean.com"
                className="text-black font-bold hover:underline"
              >
                privacy@beeclean.com
              </a>
              . We will respond to your request within 30 days.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">6.5 Complaints</h3>
            <p>
              If you are not satisfied with our response, you may lodge a
              complaint with your local data protection authority.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection heading="Cookies and Tracking" number={7}>
        <p>
          Our mobile application does not use traditional web cookies. However,
          we may use:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            <strong>Third-party SDKs:</strong> Analytics platforms may use their
            own tracking technologies. These are configured to respect user
            privacy choices (e.g., App Tracking Transparency on iOS).
          </li>
          <li>
            <strong>Device identifiers:</strong> For analytics and to detect
            unique installations, we collect IDFA/IDFV as allowed by your device
            settings.
          </li>
        </ul>
        <p className="mt-4">
          You can control tracking through your iOS Settings under Privacy &amp;
          Security &gt; Tracking. Opting out may affect certain analytics
          features but does not impact core functionality of Beeclean.
        </p>
      </LegalSection>

      <LegalSection heading="Children's Privacy" number={8}>
        <p>
          Beeclean is not intended for use by children under the age of 13. We
          do not knowingly collect personal information from children under 13.
          If you are a parent or guardian and believe your child has provided us
          with personal information, please contact us immediately at{" "}
          <a
            href="mailto:privacy@beeclean.com"
            className="text-primary hover:underline"
          >
            privacy@beeclean.com
          </a>{" "}
          and we will promptly delete such information.
        </p>
      </LegalSection>

      <LegalSection heading="Data Retention" number={9}>
        <p>
          We retain your personal information only for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy, unless a longer
          retention period is required or permitted by law.
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            Account data is retained until you delete your account (through App
            Store subscription cancellation)
          </li>
          <li>Analytics data is anonymized and retained for up to 26 months</li>
          <li>
            Customer support correspondence is retained for 3 years for quality
            assurance
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Third-Party Services" number={10}>
        <p>
          Our Service integrates with the following third-party services, each
          with its own privacy policy:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            <strong>Apple Inc.</strong> - App Store, in-app purchases, Sign in
            with Apple. See Apple&apos;s Privacy Policy:{" "}
            <a
              href="https://www.apple.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              apple.com/privacy
            </a>
          </li>
          <li>
            <strong>Firebase (Google)</strong> - Analytics and crash reporting.
            See Google&apos;s Privacy Policy:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              policies.google.com/privacy
            </a>
          </li>
        </ul>
        <p className="mt-4">
          We are not responsible for the privacy practices of these third
          parties. We encourage you to read their privacy policies before
          providing any information.
        </p>
      </LegalSection>

      <LegalSection heading="International Data Transfers" number={11}>
        <p>
          Beeclean is based in the United States. Your information may be stored
          and processed in the United States or other countries where our
          service providers operate. By using the Service, you consent to the
          transfer of your data to these jurisdictions, which may have different
          data protection laws than your country.
        </p>
        <p className="mt-4">
          For users in the European Economic Area (EEA), we ensure appropriate
          safeguards (such as Standard Contractual Clauses approved by the
          European Commission) are in place when transferring personal data
          outside the EEA.
        </p>
      </LegalSection>

      <LegalSection heading="GDPR Compliance" number={12}>
        <p>
          If you are a resident of the European Economic Area (EEA), you have
          specific data protection rights under the General Data Protection
          Regulation (GDPR):
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>The right to be informed about how your data is processed</li>
          <li>The right of access to your personal data</li>
          <li>The right to rectification of inaccurate data</li>
          <li>The right to erasure (the right to be forgotten)</li>
          <li>The right to restrict processing in certain circumstances</li>
          <li>The right to data portability</li>
          <li>The right to object to processing</li>
          <li>Rights related to automated decision-making and profiling</li>
        </ul>
        <p className="mt-4">
          We will not discriminate against you for exercising any of these
          rights. To exercise GDPR rights, contact us at{" "}
          <a
            href="mailto:privacy@beeclean.com"
            className="text-primary hover:underline"
          >
            privacy@beeclean.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="CCPA Compliance" number={13}>
        <p>
          For California residents, the California Consumer Privacy Act (CCPA)
          provides specific rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            <strong>Right to Know:</strong> Request disclosure of the personal
            information we collect, use, or share.
          </li>
          <li>
            <strong>Right to Delete:</strong> Request deletion of your personal
            information (with exceptions).
          </li>
          <li>
            <strong>Right to Opt-Out:</strong> Direct us not to sell your
            personal information. We do not sell personal information.
          </li>
          <li>
            <strong>Right to Non-Discrimination:</strong> We will not
            discriminate for exercising your CCPA rights.
          </li>
        </ul>
        <p className="mt-4">
          To make a CCPA request, email us at{" "}
          <a
            href="mailto:privacy@beeclean.com"
            className="text-primary hover:underline"
          >
            privacy@beeclean.com
          </a>
          . We may verify your identity before fulfilling your request.
        </p>
      </LegalSection>

      <LegalSection heading="Updates to This Privacy Policy" number={14}>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. When we make material changes, we will:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-500 mt-2">
          <li>
            Update the &quot;Last updated&quot; date at the top of this policy
          </li>
          <li>
            Notify you via the app or email (if we have your email address)
          </li>
          <li>
            Post the updated policy on this page and in the App Store
            description
          </li>
        </ul>
        <p className="mt-4">
          Your continued use of the Service after such modifications constitutes
          acceptance of the updated Privacy Policy. We encourage you to review
          this policy periodically.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us" number={15}>
        <p>
          If you have questions or concerns about this Privacy Policy or our
          data practices, please contact us:
        </p>
        <div className="mt-4 space-y-2 text-gray-500">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:privacy@beeclean.com"
              className="text-primary hover:underline"
            >
              privacy@beeclean.com
            </a>
          </p>
          <p>
            <strong>Subject:</strong> Privacy Policy Inquiry
          </p>
        </div>
      </LegalSection>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
