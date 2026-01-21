export const companyProfile = {
  name: "Njilo Consulting & Logistics (Pty) Ltd",
  founded: "2013",
  bbbee: "BBBEE Level One Contributor",
  procurement: "Procurement Recognition Level 135%",
  tagline: "We make fleet management SIMPLE",
  contactPerson: "Sanelisiwe Nteleza",
  headOffice: {
    label: "Head Office",
    address: "Unit 1B, Westgate Office Park, 646 Westgate Road, Sophiatown, Johannesburg",
    phone: "+27 10 140 0000",
    email: "info@njiloconsulting.co.za"
  },
  gautengBranch: {
    label: "Gauteng Branch",
    address: "No. 3, 45 St. James Street, Kempton Park, Gauteng",
    phone: "+27 10 140 0001",
    email: "gauteng@njiloconsulting.co.za"
  }
};

export const navigation = {
  primary: [
    { label: "HOME", href: "/" },
    { label: "OUR SERVICES", href: "/our-services" },
    { label: "ABOUT US", href: "/about-us" },
    { label: "TESTIMONIALS", href: "/testimonials" },
    {
      label: "MEDIA",
      href: "#",
      children: [
        { label: "MEDIA GALLERY", href: "/media-gallery" },
        { label: "VIDEO GALLERY", href: "/video-gallery" },
        { label: "PUBLICATIONS", href: "/publications" },
        { label: "COMPANY EVENTS", href: "/company-events" }
      ]
    },
    {
      label: "CAREERS",
      href: "#",
      children: [
        { label: "CAREER PURSUIT", href: "/career-pursuit" },
        { label: "ACTIVE VACANCIES", href: "/active-vacancies" },
        { label: "CLOSED VACANCIES", href: "/closed-vacancies" }
      ]
    },
    { label: "CONTACT US", href: "/contact-us" }
  ]
};

export const services = [
  {
    slug: "short-and-long-term-vehicle-rental",
    title: "Short and Long Term Vehicle Rental",
    summary: "Flexible rentals tailored for operational peaks, special projects, and long-term mobility needs."
  },
  {
    slug: "full-maintenance-lease",
    title: "Full Maintenance Lease (FML)",
    summary: "End-to-end leasing with preventative maintenance, repairs, and lifecycle cost control."
  },
  {
    slug: "managed-services",
    title: "Managed Services",
    summary: "Dedicated fleet management teams and systems to keep your assets compliant and productive."
  },
  {
    slug: "traffic-fines-management-solution",
    title: "Traffic Fines Management Solution",
    summary: "Consolidated fines processing, adjudication support, and visibility of driver behavior."
  },
  {
    slug: "fuel-management",
    title: "Fuel Management",
    summary: "Fuel usage tracking, card controls, and consumption analytics to reduce costs."
  },
  {
    slug: "operating-lease",
    title: "Operating Lease (OPL)",
    summary: "Asset access with predictable monthly fees and tailored service inclusions."
  },
  {
    slug: "driver-training",
    title: "Driver Training",
    summary: "Safety-first training programmes focused on compliance, efficiency, and customer care."
  },
  {
    slug: "vehicle-tracking-telematics-monitoring-and-recovery",
    title: "Vehicle Tracking, Telematics, Monitoring and Recovery",
    summary: "Real-time vehicle visibility with actionable data and recovery support."
  },
  {
    slug: "vehicle-registration",
    title: "Vehicle Registration",
    summary: "Registration management and licensing administration to keep fleets road legal."
  },
  {
    slug: "insurance",
    title: "Insurance",
    summary: "Fleet insurance solutions aligned to operational risk, claims, and compliance."
  },
  {
    slug: "specialised-equipment",
    title: "Specialised Equipment",
    summary: "Purpose-built equipment sourcing, fitment, and lifecycle planning."
  },
  {
    slug: "yellow-plant-and-mining-equipment",
    title: "Yellow Plant and Mining Equipment",
    summary: "Heavy equipment procurement, management, and utilization advisory."
  },
  {
    slug: "customer-reports",
    title: "Customer Reports",
    summary: "Executive dashboards and custom reporting for full fleet transparency."
  },
  {
    slug: "outright-purchase",
    title: "Outright Purchase",
    summary: "Capital purchase support with specification advisory and procurement management."
  }
];

export const industries = [
  "Utilities",
  "Public Sector",
  "Private Sector",
  "Mining",
  "Construction",
  "Logistics"
];

export const testimonials = [
  {
    name: "Executive Director, Utilities Partner",
    quote: "Njilo Consulting & Logistics delivers a disciplined, transparent fleet program with measurable savings and exceptional service."
  },
  {
    name: "Operations Manager, Logistics Client",
    quote: "Their fleet management team feels like an extension of our operations department."
  },
  {
    name: "Head of Procurement, Public Sector",
    quote: "A trusted Level 1 BBBEE partner with a proven track record in compliance and governance."
  }
];

export const publications = [
  {
    title: "COVID-19 Response",
    date: "2020-06-15",
    body: "Njilo Consulting & Logistics remains committed to safeguarding staff, clients, and communities. We adopted staggered shifts, expanded sanitation, and ensured operational continuity across essential services."
  }
];

export const events = [
  {
    title: "Our People",
    date: "2023-10-01",
    body: "Our people are the core of our success. We invest in training, safety, and a culture of accountability to sustain a world-class fleet management operation."
  }
];

export const careerPursuit = {
  title: "Career Pursuit",
  body: "We believe in building careers through continuous development, leadership coaching, and an inclusive workplace that values operational excellence."
};

export const closedVacancies = [
  { title: "Fleet Controller", location: "Johannesburg", closedDate: "2023-05-30" },
  { title: "Maintenance Coordinator", location: "Gauteng", closedDate: "2023-02-12" },
  { title: "Operations Administrator", location: "Johannesburg", closedDate: "2022-11-04" }
];

export const caseStudies = [
  {
    title: "Municipal Fleet Optimisation",
    summary: "Reduced vehicle downtime by 22% through proactive maintenance scheduling and telematics alerts.",
    industry: "Public Sector"
  },
  {
    title: "National Logistics Rental Program",
    summary: "Delivered 120 vehicles within 30 days with end-to-end compliance reporting.",
    industry: "Logistics"
  },
  {
    title: "Mining Support Fleet",
    summary: "Implemented heavy equipment management and safety training across three sites.",
    industry: "Mining"
  }
];

export const faqs = [
  {
    question: "Do you support short-term rentals?",
    answer: "Yes. We provide short and long term rentals with flexible contract terms and rapid deployment."
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "We integrate with major telematics and fuel providers and can align reporting to your governance requirements."
  },
  {
    question: "How do you support compliance?",
    answer: "Our team manages licensing, insurance, audits, and governance controls aligned to client policies."
  }
];

export const videoGallery = [
  {
    title: "Fleet Management Overview",
    type: "youtube",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Operations Walkthrough",
    type: "local",
    url: "/media/video/operations-placeholder.mp4"
  }
];

export const partnerLogos = [
  "/media/stock/partner-1.png",
  "/media/stock/partner-2.png",
  "/media/stock/partner-3.png",
  "/media/stock/partner-4.png",
  "/media/stock/partner-5.png"
];

export const mediaGallery = [
  {
    title: "Fleet Operations",
    image: "/media/stock/fleet-operations.jpg"
  },
  {
    title: "Waste Management",
    image: "/media/stock/waste-management.jpg"
  },
  {
    title: "Industrial Logistics",
    image: "/media/stock/industrial-logistics.jpg"
  }
];

export const insights = [
  {
    title: "Operational Resilience in Fleet Management",
    date: "2024-02-12",
    summary: "How disciplined maintenance and telemetry keep fleets productive."
  },
  {
    title: "Compliance Readiness for Public Sector Contracts",
    date: "2024-01-25",
    summary: "Governance controls that streamline audits and procurement reviews."
  }
];
