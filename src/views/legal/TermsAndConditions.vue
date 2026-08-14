<template>
  <LegalDocument
    eyebrow="Legal"
    title="Terms and Conditions"
    subtitle="The rules for using KELEM to browse, buy, bid on, and list artwork."
    last-updated="August 14, 2026"
    :sections="sections"
    :related="related"
  />
</template>

<script setup>
import LegalDocument from '@/components/legal/LegalDocument.vue';

const related = {
  title: 'Privacy',
  description: 'See how we collect and protect account, order, and payment data.',
  to: '/privacy',
  label: 'View Privacy Policy'
};

const sections = [
  {
    id: 'agreement',
    icon: 'fas fa-file-contract',
    title: 'Agreement to these terms',
    paragraphs: [
      'These Terms and Conditions govern your use of KELEM Online Art Gallery, including the website, dashboards, auctions, competitions, and related services.',
      'By registering or using KELEM, you agree to these terms and to our Privacy Policy. If you do not agree, please do not use the platform.'
    ]
  },
  {
    id: 'accounts',
    icon: 'fas fa-user',
    title: 'Accounts and eligibility',
    paragraphs: [
      'You must be at least 18 years old to create an account. You are responsible for the accuracy of your details and for keeping your password confidential.',
      'Roles (collector, artist, organization, manager, or admin) determine what you can do. Do not share your login or attempt to access another role’s tools.'
    ]
  },
  {
    id: 'listings',
    icon: 'fas fa-palette',
    title: 'Artwork listings',
    paragraphs: [
      'Artists and organizations may upload original work they have the right to sell or exhibit. Listings must be accurate, including title, medium, price, and images.',
      'KELEM may review, hide, or remove listings that violate community standards, infringe rights, or appear fraudulent.'
    ]
  },
  {
    id: 'purchases',
    icon: 'fas fa-shopping-bag',
    title: 'Purchases and auctions',
    paragraphs: [
      'A sale is formed when checkout is completed and payment is confirmed. Auction lots go to the highest valid bid at close, subject to any reserve.',
      'Bids are binding. Do not place a bid unless you intend and are able to pay. Winning bidders must complete payment within the stated period.'
    ]
  },
  {
    id: 'payments',
    icon: 'fas fa-credit-card',
    title: 'Payments and fees',
    paragraphs: [
      'Prices are shown on each artwork or lot. Shipping may be added at checkout based on size, weight, and destination.',
      'Payments are processed by third-party providers such as PayPal. KELEM is not responsible for delays or errors caused by the payment provider. Chargebacks made in bad faith may lead to account suspension.'
    ]
  },
  {
    id: 'shipping',
    icon: 'fas fa-truck',
    title: 'Shipping and returns',
    paragraphs: [
      'Artwork is packed with care and shipped through trusted carriers. Delivery times vary by destination.',
      'Unless stated otherwise on the listing, buyers may request a return within 30 days of delivery for items purchased directly on KELEM. Custom commissions, damaged-by-buyer items, and some auction lots may be excluded. Contact us to start a return.'
    ]
  },
  {
    id: 'artists',
    icon: 'fas fa-paint-brush',
    title: 'Artist and organization duties',
    paragraphs: [
      'You confirm that you own or are licensed to display and sell the work you upload, and that it does not infringe copyright, trademark, or publicity rights.',
      'You agree to fulfill confirmed orders promptly and to keep availability and pricing up to date. KELEM may withhold payouts while a dispute is investigated.'
    ]
  },
  {
    id: 'ip',
    icon: 'fas fa-copyright',
    title: 'Intellectual property',
    paragraphs: [
      'Artists retain copyright in their original works. By uploading, you grant KELEM a license to display, promote, and reproduce the images on the site, in collections, and in related marketing.',
      'KELEM’s name, logo, and interface remain our property. You may not copy, scrape, or reuse gallery content except as allowed by these terms or by the rights holder.'
    ]
  },
  {
    id: 'conduct',
    icon: 'fas fa-ban',
    title: 'Prohibited conduct',
    paragraphs: [
      'You agree not to misuse KELEM.'
    ],
    bullets: [
      'Upload stolen, counterfeit, or unlawfully generated work presented as your own.',
      'Harass other users, manipulate auctions, or leave false reviews.',
      'Attempt to bypass security, scrape data, or interfere with the service.',
      'Use another person’s identity or payment method without permission.'
    ]
  },
  {
    id: 'liability',
    icon: 'fas fa-balance-scale',
    title: 'Limitation of liability',
    paragraphs: [
      'KELEM provides the marketplace as-is. We do not guarantee uninterrupted access, that a listing will sell, or that an artwork will match every expectation beyond the description provided.',
      'To the fullest extent allowed by law, KELEM is not liable for indirect or consequential losses. Our total liability for a claim related to a purchase is limited to the amount you paid for that order.'
    ]
  },
  {
    id: 'changes',
    icon: 'fas fa-sync-alt',
    title: 'Changes and termination',
    paragraphs: [
      'We may update these terms as the gallery grows. The “Last updated” date at the top of this page will change when we do. Continued use after an update means you accept the revised terms.',
      'We may suspend or close accounts that violate these terms or that create risk for other users. You may close your account at any time from your dashboard or by contacting us.'
    ]
  },
  {
    id: 'contact',
    icon: 'fas fa-envelope',
    title: 'Contact',
    paragraphs: [
      'Questions about these terms can be sent to info@kelem.art or through the Contact page. Our gallery is at Bole Sheger House, 3rd floor, Addis Ababa, Ethiopia.'
    ]
  }
];
</script>
