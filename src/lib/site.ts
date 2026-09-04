export const site = {
  name: "Gladys Aforo Pedee Newman Foundation",
  tagline: "Holy-Charity Ministry · Accra, Ghana",
  verse: {
    text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
    ref: "2 Corinthians 9:7",
  },
  contact: {
    address: "66th Patrice Lumumba Street, Airport Residential, Accra",
    phones: ["0555 296 706", "0540 127 253"],
    email: "philipjosiah252022@gmail.com",
    momo: [
      { network: "MTN Mobile Money", number: "0555 296 706" },
      { network: "Vodafone Cash", number: "0540 127 253" },
    ],
  },
  social: {
    facebook: "#",
    instagram: "#",
    whatsapp: "https://wa.me/233555296706",
  },
  paystack: {
    shopLink: "https://paystack.shop/pay/28h9yp9czt",
  },
};

export const navLinks = [
  { href: "/programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/impact", label: "Impact" },
  { href: "/leadership", label: "Leadership" },
  { href: "/support", label: "Request Support" },
  { href: "/contact", label: "Contact" },
];

export const supportRequestOptions = {
  roles: ["Nurse", "Caregiver", "Social Worker", "Community Health Worker", "Other"],
  districts: [
    "Accra Metropolitan",
    "Ablekuma",
    "Ayawaso",
    "Ga East",
    "Ga West",
    "Ga South",
    "Adenta",
    "Ledzokuku",
    "Krowor",
    "Madina",
    "Other",
  ],
  supportTypes: [
    "Medical care & treatment",
    "Maternal & child health needs",
    "Nutrition & food support",
    "Emergency & essential needs",
    "Other critical family needs",
  ],
  urgencyLevels: ["Low", "Medium", "High", "Critical / Emergency"],
};

export const supportRequestInfo = {
  whoCanSubmit:
    "Nurses, caregivers, social workers, or community health workers who have identified a family or individual in genuine need can submit a request for support.",
  whatWeSupport: [
    { title: "Medical care & treatment", icon: "heart-pulse" },
    { title: "Maternal & child health needs", icon: "baby" },
    { title: "Nutrition & food support", icon: "soup" },
    { title: "Emergency & essential needs", icon: "shield-plus" },
    { title: "Other critical family needs", icon: "hand-heart" },
  ],
  commitment:
    "All requests are reviewed with care and confidentiality. We are committed to serving with compassion, dignity, and transparency.",
};

export const stats = [
  { label: "Mothers & Babies Supported", value: "100+", icon: "heart-handshake" },
  { label: "Orphans Fed Monthly", value: "150+", icon: "soup" },
  { label: "Active Programs", value: "4", icon: "hand-heart" },
  { label: "Partner Hospitals", value: "5+", icon: "building-2" },
  { label: "Years of Service", value: "2+", icon: "calendar-heart" },
];

export const programs = [
  {
    slug: "nicu-picu",
    title: "NICU & PICU Initiative",
    tag: "Ongoing",
    subtitle: "Supporting the tiniest lives with critical care.",
    description:
      "Supporting babies who require neonatal and pediatric intensive care in hospitals across Accra, covering medications, procedures, and extended care costs for families who cannot afford them.",
    location:
      "Partner Hospitals: 37 Military Hospital, PML Children's Hospital, Maamobi General Hospital, Pentecost Hospital, Madina",
    image: "/images/gallery/g7.jpg",
    icon: "heart-pulse",
  },
  {
    slug: "feed-the-orphans",
    title: "Feed the Orphans",
    tag: "Ongoing",
    subtitle: "Nourishing bodies. Restoring dignity. Sharing God's love.",
    description:
      "Providing monthly hot meals served to over 150 orphans at the Osu Boaster Home in Accra — every month, without interruption, for over two years.",
    location: "Location: Osu Boaster Home, Accra",
    image: "/images/gallery/g8.jpg",
    icon: "soup",
  },
  {
    slug: "health-awareness",
    title: "Raising Health Awareness",
    tag: "New",
    subtitle: "Knowledge empowers. Awareness saves lives.",
    description:
      "A new initiative to educate and empower Ghanaian mothers and families with vital health information — covering maternal nutrition, infant care, hygiene, and early warning signs.",
    location: "Outreach: Hospitals & Communities Across Accra",
    image: "/images/gallery/g4.jpg",
    icon: "shield-plus",
  },
  {
    slug: "diapers-for-babies",
    title: "Diapers for Babies",
    tag: "New",
    subtitle: "Meeting a basic need. Bringing relief and dignity.",
    description:
      "A new initiative providing monthly or periodic diaper donations to new mothers across Ghana — meeting a basic need that is often out of reach for vulnerable families.",
    location: "Across Hospitals & Communities in Ghana",
    image: "/images/gallery/g2.jpg",
    icon: "baby",
  },
];

export const impactMetrics = [
  { label: "GHS 50", desc: "Provides essential medications for a mother or baby.", icon: "stethoscope" },
  { label: "GHS 100", desc: "Provides a hot meal for an orphan for one month.", icon: "soup" },
  { label: "GHS 150", desc: "Provides diapers for a baby for one month.", icon: "baby" },
  { label: "GHS 200", desc: "Supports NICU/PICU care for a baby in critical condition.", icon: "building-2" },
  { label: "Any Amount", desc: "Every cedi makes a difference in the life of a child.", icon: "hand-heart" },
];

export const boardOfDirectors = [
  { initials: "AY", name: "Amiratu Yamusah-Sarkodee", role: "Founder / Managing Director" },
  { initials: "ES", name: "Eva-Florence Sarkodee", role: "Co-Founder" },
  { initials: "RS", name: "Robert Sarkodee", role: "Executive Board Member" },
  { initials: "RY", name: "Ramzi Yamusah", role: "Executive Board Member" },
  { initials: "SK", name: "Mrs. Sheila Koney Yamusah", role: "Executive Board Member & Strategy Advisor" },
];

export const executiveStaff = [
  {
    initials: "PJ",
    name: "Philip Anthony Josiah",
    role: "Projects Manager · Operations & Finance Lead",
    description:
      "Overseeing daily operations, financial planning, and project execution to ensure efficiency and accountability across all programs.",
  },
  {
    initials: "DA",
    name: "Derrick Aryee",
    role: "Fundraising & Project Outreach Manager",
    description:
      "Leading fundraising initiatives, partnerships, and outreach efforts to expand impact and sustain the mission.",
  },
];

export const coreValues = [
  { title: "Compassion", desc: "We serve with love, dignity, and empathy.", icon: "hand-heart" },
  { title: "Faith", desc: "Rooted in Christ, guided by His calling.", icon: "cross" },
  { title: "Equality", desc: "We serve every mother and child without discrimination.", icon: "users" },
  { title: "Integrity", desc: "We are accountable, transparent, and faithful in all we do.", icon: "handshake" },
];

export const commitments = [
  { title: "Faith Guided", desc: "We follow Christ's example in all we do.", icon: "cross" },
  { title: "Integrity First", desc: "We act with honesty, transparency, and accountability.", icon: "shield" },
  { title: "People Centered", desc: "We put mothers and children at the center of our work.", icon: "users" },
  { title: "Impact Driven", desc: "We focus on lasting change and measurable impact.", icon: "hand-heart" },
  { title: "Stewardship", desc: "We manage resources responsibly for God's glory.", icon: "landmark" },
];

export const trustBadges = [
  { title: "100% Secure", desc: "Your payment is protected by industry-standard encryption.", icon: "shield-check" },
  { title: "Direct Impact", desc: "Your gift goes directly to programs that save lives and restore hope.", icon: "hand-heart" },
  { title: "Accountability", desc: "We are committed to transparency and responsible stewardship.", icon: "file-check" },
  { title: "Faith-Driven", desc: "Every act of giving reflects Christ's love in action.", icon: "cross" },
];

// Photos of Ms. Gladys Aforo Pedee Newman used in the homepage hero slideshow.
// This is intentionally a simple array so an admin panel can later read/write
// it (e.g. from a database or CMS) without changing how the slideshow works —
// just add more { src, alt } entries here or wire this up to that data source.
export const memorialPhotos = [
  {
    src: "/images/memorial/mama-1.jpg",
    alt: "Ms. Gladys Aforo Pedee Newman smiling at home",
  },
  {
    src: "/images/memorial/mama-2.jpg",
    alt: "Ms. Gladys Aforo Pedee Newman smiling among family",
  },
];

export const galleryImages = Array.from({ length: 11 }, (_, i) => ({
  src: `/images/gallery/g${i + 1}.jpg`,
  alt: `Gladys Aforo Pedee Newman Foundation outreach photo ${i + 1}`,
}));
