import type { MetadataRoute } from "next";
import { services } from "@njilo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://njiloconsulting.co.za";
  const staticRoutes = [
    "",
    "/our-services",
    "/about-us",
    "/testimonials",
    "/media-gallery",
    "/video-gallery",
    "/publications",
    "/company-events",
    "/career-pursuit",
    "/active-vacancies",
    "/closed-vacancies",
    "/contact-us",
    "/industries",
    "/compliance-governance",
    "/accreditations",
    "/fleet-solutions",
    "/waste-management",
    "/case-studies",
    "/newsroom",
    "/faq",
    "/downloads",
    "/privacy-policy",
    "/terms",
    "/popia-notice"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date()
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/our-services/${service.slug}`,
      lastModified: new Date()
    }))
  ];
}
