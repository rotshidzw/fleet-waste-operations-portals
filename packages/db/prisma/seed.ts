import { prisma } from "../src";
import {
  partnerLogos,
  testimonials,
  publications,
  events,
  services,
  closedVacancies,
  careerPursuit
} from "@njilo/config";

async function main() {
  await prisma.partnerLogo.createMany({
    data: partnerLogos.map((logo, index) => ({
      name: `Partner ${index + 1}`,
      imageUrl: logo,
      order: index + 1
    })),
    skipDuplicates: true
  });

  await prisma.testimonial.createMany({
    data: testimonials.map((testimonial) => ({
      name: testimonial.name,
      quote: testimonial.quote
    })),
    skipDuplicates: true
  });

  await prisma.publication.createMany({
    data: publications.map((publication) => ({
      title: publication.title,
      body: publication.body,
      date: new Date(publication.date)
    })),
    skipDuplicates: true
  });

  await prisma.event.createMany({
    data: events.map((event) => ({
      title: event.title,
      body: event.body,
      date: new Date(event.date)
    })),
    skipDuplicates: true
  });

  await prisma.serviceBlock.createMany({
    data: services.map((service) => ({
      slug: service.slug,
      heroImage: "/media/stock/service-hero.jpg",
      content: `# ${service.title}\n\n${service.summary}\n\n## What it is\n\n${service.summary}\n\n## How it works\n\nWe align the service to your operational requirements, provide governance reporting, and maintain continuous improvement.\n\n## Key benefits\n\n- Governance and compliance controls\n- Predictable operating costs\n- Service-level accountability\n\n## Process steps\n\n1. Diagnostic and fleet assessment\n2. Implementation and onboarding\n3. Ongoing reporting and optimisation\n\n## FAQs\n\n**What is the onboarding time?**\nTypically 2-4 weeks depending on fleet size.\n\n**Can you integrate with our systems?**\nYes, we align with existing telematics and fuel providers.\n\n## CTA\n\nRequest a Quote`
    })),
    skipDuplicates: true
  });

  await prisma.vacancy.createMany({
    data: [
      {
        title: "Fleet Administrator",
        location: "Johannesburg",
        description: careerPursuit.body,
        status: "ACTIVE"
      },
      ...closedVacancies.map((vacancy) => ({
        title: vacancy.title,
        location: vacancy.location,
        description: "Position closed.",
        status: "CLOSED"
      }))
    ],
    skipDuplicates: true
  });

  await prisma.vehicle.createMany({
    data: [
      { vin: "NJILO-FLT-001", plate: "JHB 123 GP", status: "Active", assignedTo: "Municipal Contract" },
      { vin: "NJILO-FLT-002", plate: "JHB 456 GP", status: "In Maintenance", assignedTo: "Logistics Program" }
    ],
    skipDuplicates: true
  });

  await prisma.driver.createMany({
    data: [
      { name: "Thabo M.", license: "EC1", phone: "+27 82 000 0001" },
      { name: "Lerato K.", license: "C1", phone: "+27 82 000 0002" }
    ],
    skipDuplicates: true
  });

  await prisma.workOrder.createMany({
    data: [
      { title: "Routine service - NJILO-FLT-001", status: "OPEN" },
      { title: "Brake inspection - NJILO-FLT-002", status: "IN_PROGRESS" }
    ],
    skipDuplicates: true
  });

  await prisma.trafficFine.createMany({
    data: [
      { reference: "FINE-2024-001", amount: 950, status: "Pending" },
      { reference: "FINE-2024-002", amount: 520, status: "In Review" }
    ],
    skipDuplicates: true
  });

  await prisma.fuelLog.createMany({
    data: [
      { vehicleId: "NJILO-FLT-001", litres: 120, cost: 2800 },
      { vehicleId: "NJILO-FLT-002", litres: 95, cost: 2200 }
    ],
    skipDuplicates: true
  });

  await prisma.wasteJob.createMany({
    data: [
      { client: "City Utilities", location: "Soweto Depot", jobDate: new Date(), status: "SCHEDULED" },
      { client: "Mining Partner", location: "Rustenburg Site", jobDate: new Date(), status: "IN_PROGRESS" }
    ],
    skipDuplicates: true
  });

  await prisma.equipment.createMany({
    data: [
      { name: "Compactor Unit A1", type: "Compactor", status: "Active" },
      { name: "Bin 24L", type: "Bin", status: "Active" }
    ],
    skipDuplicates: true
  });

  await prisma.complianceNote.createMany({
    data: [
      { summary: "Waste transfer manifests reviewed for Q1 compliance." },
      { summary: "PPE audit completed for logistics crews." }
    ],
    skipDuplicates: true
  });

  await prisma.mediaItem.createMany({
    data: [
      { title: "Fleet Operations", type: "IMAGE", url: "/media/stock/fleet-operations.jpg" },
      { title: "Waste Management", type: "IMAGE", url: "/media/stock/waste-management.jpg" }
    ],
    skipDuplicates: true
  });

  await prisma.videoItem.createMany({
    data: [
      { title: "Fleet Management Overview", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", provider: "YouTube" },
      { title: "Operations Walkthrough", url: "/media/video/operations-placeholder.mp4", provider: "Local" }
    ],
    skipDuplicates: true
  });

  await prisma.document.createMany({
    data: [
      { title: "Fleet SOP", url: "/docs/fleet-sop.pdf", folder: "Operations", role: "OPS" },
      { title: "HR Policy Handbook", url: "/docs/hr-policy.pdf", folder: "HR", role: "HR" }
    ],
    skipDuplicates: true
  });

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@njiloconsulting.co.za",
      password: "admin123",
      role: "ADMIN"
    }
  }).catch(() => undefined);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
