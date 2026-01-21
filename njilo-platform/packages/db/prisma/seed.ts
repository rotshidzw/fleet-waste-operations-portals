import { PrismaClient, RoleName, LeadDepartment, OpportunityStage, VacancyStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: RoleName.ADMIN },
    update: {},
    create: { name: RoleName.ADMIN }
  });
  await prisma.role.upsert({
    where: { name: RoleName.MANAGER },
    update: {},
    create: { name: RoleName.MANAGER }
  });
  await prisma.role.upsert({
    where: { name: RoleName.OPS },
    update: {},
    create: { name: RoleName.OPS }
  });
  await prisma.role.upsert({
    where: { name: RoleName.HR },
    update: {},
    create: { name: RoleName.HR }
  });
  await prisma.role.upsert({
    where: { name: RoleName.READ_ONLY },
    update: {},
    create: { name: RoleName.READ_ONLY }
  });

  const password = await bcrypt.hash("Welcome123!", 10);
  await prisma.user.upsert({
    where: { email: "admin@njilo.local" },
    update: {},
    create: {
      name: "Njilo Admin",
      email: "admin@njilo.local",
      password,
      roleId: adminRole.id
    }
  });

  await prisma.service.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Short/Long Term Vehicle Rental",
        slug: "short-long-term-vehicle-rental",
        category: "Fleet",
        summary: "Flexible rental options tailored to fleet size and operational cycles.",
        body: "## Overview\nEnterprise-grade vehicle rental with compliance-ready documentation.",
        heroImage: "/media/stock/service-fleet.svg"
      },
      {
        title: "Full Maintenance Lease (FML)",
        slug: "full-maintenance-lease",
        category: "Fleet",
        summary: "Predictable fleet costs with maintenance bundled in.",
        body: "## Benefits\n- Total cost visibility\n- Preventative maintenance\n- Replacement planning",
        heroImage: "/media/stock/service-maintenance.svg"
      },
      {
        title: "Managed Services",
        slug: "managed-services",
        category: "Fleet",
        summary: "Dedicated fleet management oversight and reporting.",
        body: "## Delivery\nDedicated account leads and monthly reviews.",
        heroImage: "/media/stock/service-managed.svg"
      },
      {
        title: "Traffic Fines Management",
        slug: "traffic-fines-management",
        category: "Compliance",
        summary: "Automated fine processing and dispute tracking.",
        body: "## Compliance\nEnd-to-end fine processing workflows.",
        heroImage: "/media/stock/service-compliance.svg"
      },
      {
        title: "Fuel Management",
        slug: "fuel-management",
        category: "Fleet",
        summary: "Fuel analytics and driver behavior insights.",
        body: "## Efficiency\nReal-time fuel spend dashboards.",
        heroImage: "/media/stock/service-fuel.svg"
      },
      {
        title: "Operating Lease (OPL)",
        slug: "operating-lease",
        category: "Fleet",
        summary: "Short-to-medium term leasing with asset flexibility.",
        body: "## Lease\nFlexible terms with predictable costs.",
        heroImage: "/media/stock/service-lease.svg"
      },
      {
        title: "Driver Training",
        slug: "driver-training",
        category: "Compliance",
        summary: "Safety and compliance training for professional drivers.",
        body: "## Outcomes\nReduced incidents and compliance alignment.",
        heroImage: "/media/stock/service-driver.svg"
      },
      {
        title: "Vehicle Tracking/Telematics/Recovery",
        slug: "vehicle-tracking",
        category: "Fleet",
        summary: "Live tracking with recovery support.",
        body: "## Visibility\nTrack asset location and driver safety.",
        heroImage: "/media/stock/service-tracking.svg"
      },
      {
        title: "Vehicle Registration",
        slug: "vehicle-registration",
        category: "Compliance",
        summary: "Registration, licensing, and renewal management.",
        body: "## Administration\nWe manage documentation lifecycles.",
        heroImage: "/media/stock/service-registration.svg"
      },
      {
        title: "Insurance",
        slug: "insurance",
        category: "Insurance & Risk",
        summary: "Comprehensive cover for fleet and operations.",
        body: "## Protection\nTailored risk mitigation plans.",
        heroImage: "/media/stock/service-insurance.svg"
      },
      {
        title: "Specialised Equipment",
        slug: "specialised-equipment",
        category: "Equipment",
        summary: "Purpose-built equipment for high-demand sites.",
        body: "## Access\nHigh-availability equipment pool.",
        heroImage: "/media/stock/service-equipment.svg"
      },
      {
        title: "Yellow Plant & Mining Equipment",
        slug: "yellow-plant-equipment",
        category: "Equipment",
        summary: "Mining-grade plant equipment logistics.",
        body: "## Reliability\nSafety-first, compliance-driven operations.",
        heroImage: "/media/stock/service-mining.svg"
      },
      {
        title: "Customer Reports",
        slug: "customer-reports",
        category: "Compliance",
        summary: "Monthly executive summaries and analytics.",
        body: "## Reporting\nData-driven fleet insights.",
        heroImage: "/media/stock/service-reports.svg"
      },
      {
        title: "Outright Purchase",
        slug: "outright-purchase",
        category: "Fleet",
        summary: "Asset acquisition support for owned fleets.",
        body: "## Ownership\nProcurement, onboarding, and lifecycle support.",
        heroImage: "/media/stock/service-purchase.svg"
      }
    ]
  });

  await prisma.partner.createMany({
    skipDuplicates: true,
    data: [
      { name: "Metro Utilities", logoUrl: "/media/stock/partner-1.svg", sortOrder: 1 },
      { name: "Civic Logistics", logoUrl: "/media/stock/partner-2.svg", sortOrder: 2 },
      { name: "TransNova", logoUrl: "/media/stock/partner-3.svg", sortOrder: 3 }
    ]
  });

  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      { client: "A. Nkosi", quote: "Njilo delivers consistent uptime and executive-ready reporting.", role: "Operations Director" },
      { client: "L. Patel", quote: "Their compliance workflow reduced our fines exposure dramatically.", role: "Fleet Manager" }
    ]
  });

  await prisma.lead.createMany({
    skipDuplicates: true,
    data: [
      {
        fullName: "Sam Dlamini",
        email: "sam@example.com",
        phone: "+27 11 555 1234",
        companyName: "Urban Civils",
        department: LeadDepartment.SALES,
        message: "Looking for managed services.",
        source: "public-site"
      },
      {
        fullName: "Maria Santos",
        email: "maria@example.com",
        phone: "+27 21 555 9888",
        companyName: "Green Corridor",
        department: LeadDepartment.OPS,
        message: "Need fleet tracking and compliance.",
        source: "public-site"
      }
    ]
  });

  await prisma.opportunity.createMany({
    skipDuplicates: true,
    data: [
      { name: "Urban Civils Fleet Renewal", value: 1250000, stage: OpportunityStage.DISCOVERY },
      { name: "Green Corridor Waste Ops", value: 840000, stage: OpportunityStage.PROPOSAL }
    ]
  });

  await prisma.vacancy.createMany({
    skipDuplicates: true,
    data: [
      { title: "Fleet Operations Coordinator", location: "Johannesburg", status: VacancyStatus.ACTIVE, summary: "Coordinate fleet schedules and vendor delivery." },
      { title: "HR Business Partner", location: "Cape Town", status: VacancyStatus.CLOSED, summary: "Support talent operations and compliance." }
    ]
  });

  await prisma.vehicle.createMany({
    skipDuplicates: true,
    data: [
      { vin: "VIN001", make: "Toyota", model: "Hilux", year: 2022, status: "Active" },
      { vin: "VIN002", make: "Isuzu", model: "N-Series", year: 2021, status: "Active" }
    ]
  });

  await prisma.wasteJob.createMany({
    skipDuplicates: true,
    data: [
      { jobNumber: "WJ-1001", status: "Scheduled", site: "Midrand Hub", scheduledAt: new Date() },
      { jobNumber: "WJ-1002", status: "In Progress", site: "Durban Port", scheduledAt: new Date() }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
