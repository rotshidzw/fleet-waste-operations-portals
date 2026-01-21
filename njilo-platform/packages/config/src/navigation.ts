export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Services",
    href: "/our-services",
    children: [
      { label: "Service Directory", href: "/our-services" },
      { label: "Short/Long Term Vehicle Rental", href: "/services/short-long-term-vehicle-rental" },
      { label: "Full Maintenance Lease (FML)", href: "/services/full-maintenance-lease" },
      { label: "Managed Services", href: "/services/managed-services" },
      { label: "Traffic Fines Management", href: "/services/traffic-fines-management" },
      { label: "Fuel Management", href: "/services/fuel-management" },
      { label: "Operating Lease (OPL)", href: "/services/operating-lease" },
      { label: "Driver Training", href: "/services/driver-training" },
      { label: "Vehicle Tracking/Telematics/Recovery", href: "/services/vehicle-tracking" },
      { label: "Vehicle Registration", href: "/services/vehicle-registration" },
      { label: "Insurance", href: "/services/insurance" },
      { label: "Specialised Equipment", href: "/services/specialised-equipment" },
      { label: "Yellow Plant & Mining Equipment", href: "/services/yellow-plant-equipment" },
      { label: "Customer Reports", href: "/services/customer-reports" },
      { label: "Outright Purchase", href: "/services/outright-purchase" }
    ]
  },
  {
    label: "Our Impact",
    href: "/our-impact",
    children: [
      { label: "CSI", href: "/our-impact/csi" },
      { label: "Blog", href: "/our-impact/blog" },
      { label: "Our Clients", href: "/our-impact/our-clients" },
      { label: "Client Testimonials", href: "/testimonials" }
    ]
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Media Gallery", href: "/media/media-gallery" },
      { label: "Video Gallery", href: "/media/video-gallery" },
      { label: "Publications", href: "/media/publications" },
      { label: "Company Events", href: "/media/company-events" }
    ]
  },
  {
    label: "Careers",
    href: "/careers",
    children: [
      { label: "Working at Njilo", href: "/careers/career-pursuit" },
      { label: "Active Vacancies", href: "/careers/active-vacancies" },
      { label: "Closed Vacancies", href: "/careers/closed-vacancies" }
    ]
  },
  { label: "Contact Us", href: "/contact-us" }
];
