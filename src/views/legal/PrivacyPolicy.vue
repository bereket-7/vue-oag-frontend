<template>
  <LegalDocument
    eyebrow="Legal"
    title="Privacy Policy"
    subtitle="How KELEM collects, uses, and protects your information when you browse, buy, or sell art."
    last-updated="August 14, 2026"
    :sections="sections"
    :related="related"
  />
</template>

<script setup>
import LegalDocument from '@/components/legal/LegalDocument.vue';

const related = {
  title: 'Terms of use',
  description: 'Read the rules for accounts, purchases, auctions, and listings.',
  to: '/terms',
  label: 'View Terms and Conditions'
};

const sections = [
  {
    id: 'introduction',
    icon: 'fas fa-shield-alt',
    title: 'Introduction',
    paragraphs: [
      'KELEM Online Art Gallery (“KELEM”, “we”, “us”) operates this website to connect artists, collectors, and organizations in Ethiopia and beyond. This policy explains what data we collect and why.',
      'By creating an account or using the gallery, you agree to this Privacy Policy together with our Terms and Conditions.'
    ]
  },
  {
    id: 'collect',
    icon: 'fas fa-database',
    title: 'Information we collect',
    paragraphs: [
      'We collect information you provide and information generated as you use the platform.'
    ],
    bullets: [
      'Account details: name, email, username, phone, address, age, and role (collector, artist, organization, or staff).',
      'Profile and listings: biography, profile photo, artwork images, titles, prices, and certificates.',
      'Orders and auctions: shipping details, bid history, invoices, and payment status.',
      'Support: messages you send through contact forms, reports, or in-app chat.',
      'Technical data: browser type, device, approximate location, and pages visited, used to keep the site secure and working.'
    ]
  },
  {
    id: 'use',
    icon: 'fas fa-sliders-h',
    title: 'How we use your information',
    paragraphs: [
      'We use personal data only for operating KELEM, not to sell it to third parties.'
    ],
    bullets: [
      'Create and manage your account, dashboard, and role-based access.',
      'Process purchases, auctions, shipping, and artist payouts.',
      'Moderate artwork, competitions, and community standards.',
      'Send order updates, account alerts, and (if you opt in) gallery news.',
      'Detect fraud, abuse, and unauthorized access.',
      'Improve search, recommendations, and site performance.'
    ]
  },
  {
    id: 'payments',
    icon: 'fas fa-credit-card',
    title: 'Payments',
    paragraphs: [
      'Card and PayPal checkout is handled by our payment providers. KELEM does not store full card numbers on our servers.',
      'Providers receive only what they need to complete a transaction and may have their own privacy policies.'
    ]
  },
  {
    id: 'cookies',
    icon: 'fas fa-cookie-bite',
    title: 'Cookies and local storage',
    paragraphs: [
      'We use cookies and browser storage to keep you signed in, remember dark mode, and restore your cart or session.',
      'You can block cookies in your browser, but login, checkout, and saved preferences may not work correctly.'
    ]
  },
  {
    id: 'sharing',
    icon: 'fas fa-share-alt',
    title: 'When we share data',
    paragraphs: [
      'We share information only when needed to run the gallery or when the law requires it.'
    ],
    bullets: [
      'Payment, shipping, and hosting partners who process data on our instructions.',
      'Artists or buyers, limited to what is required to complete an order or auction.',
      'Authorities if we receive a valid legal request.',
      'A successor if KELEM is merged or transferred, under the same privacy commitments.'
    ]
  },
  {
    id: 'retention',
    icon: 'fas fa-clock',
    title: 'How long we keep data',
    paragraphs: [
      'We keep account and order records while your account is active and for a reasonable period afterward for invoices, disputes, and legal requirements.',
      'You may request deletion of your account. Some records (for example completed payments) may be retained where we must do so by law.'
    ]
  },
  {
    id: 'rights',
    icon: 'fas fa-user-check',
    title: 'Your choices',
    paragraphs: [
      'Depending on applicable law, you may ask to access, correct, or delete personal data, or to close your account.'
    ],
    bullets: [
      'Update profile details from Profile Settings.',
      'Change your password and review login activity from your dashboard.',
      'Contact us to request a copy of your data or account deletion.',
      'Unsubscribe from marketing emails using the link in those messages.'
    ]
  },
  {
    id: 'security',
    icon: 'fas fa-lock',
    title: 'Security',
    paragraphs: [
      'We use encrypted connections, session tokens, and access controls to protect accounts. No online service is completely secure, so please use a strong unique password and sign out on shared devices.'
    ]
  },
  {
    id: 'children',
    icon: 'fas fa-child',
    title: 'Age requirement',
    paragraphs: [
      'KELEM is intended for users 18 years and older. We do not knowingly collect personal information from children. If you believe a minor has created an account, please contact us so we can remove it.'
    ]
  },
  {
    id: 'contact',
    icon: 'fas fa-envelope',
    title: 'Contact',
    paragraphs: [
      'For privacy questions, email info@kelem.art or write to KELEM Online Art Gallery, Bole Sheger House, 3rd floor, Addis Ababa, Ethiopia. You can also use the Contact page.'
    ]
  }
];
</script>
