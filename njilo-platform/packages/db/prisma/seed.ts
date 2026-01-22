/* packages/db/prisma/seed.ts */

/**
 * Seed script for local demo.
 * Notes:
 * - We use require("bcryptjs") to avoid TS typing issues when running via ts-node in a monorepo.
 * - We include a minimal `process` declaration so the file compiles even if VSCode/tsconfig doesn't
 *   pick up Node types inside this package.
 */

// Minimal process typing (safe for seed script)
declare const process: { exitCode?: number };

import {
  PrismaClient,
  RoleName,
  LeadDepartment,
  OpportunityStage,
  VacancyStatus
} from "@prisma/client";

// Reliable import for ts-node seed execution in monorepos
declare function require(moduleName: string): any;
const bcrypt = require("bcryptjs") as {
  hash: (s: string, rounds: number) => Promise<string>;
};

const prisma = new PrismaClient();

async function main() {
  // -------------------------
  // Roles
  // -------------------------
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

  // -------------------------
  // Users
  // -------------------------
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

  // -------------------------
  // Services
  // -------------------------
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

  // -------------------------
  // Partners
  // -------------------------
  await prisma.partner.createMany({
    skipDuplicates: true,
    data: [
      { name: "Metro Utilities", logoUrl: "/media/stock/partner-1.svg", sortOrder: 1 },
      { name: "Civic Logistics", logoUrl: "/media/stock/partner-2.svg", sortOrder: 2 },
      { name: "TransNova", logoUrl: "/media/stock/partner-3.svg", sortOrder: 3 }
    ]
  });

  // -------------------------
  // Testimonials
  // -------------------------
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        client: "A. Nkosi",
        quote: "Njilo delivers consistent uptime and executive-ready reporting.",
        role: "Operations Director"
      },
      {
        client: "L. Patel",
        quote: "Their compliance workflow reduced our fines exposure dramatically.",
        role: "Fleet Manager"
      }
    ]
  });

  // -------------------------
  // Leads
  // -------------------------
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

  // -------------------------
  // Opportunities
  // -------------------------
  await prisma.opportunity.createMany({
    skipDuplicates: true,
    data: [
      { name: "Urban Civils Fleet Renewal", value: 1250000, stage: OpportunityStage.DISCOVERY },
      { name: "Green Corridor Waste Ops", value: 840000, stage: OpportunityStage.PROPOSAL }
    ]
  });

  // -------------------------
  // Vacancies
  // -------------------------
  await prisma.vacancy.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Fleet Operations Coordinator",
        location: "Johannesburg",
        status: VacancyStatus.ACTIVE,
        summary: "Coordinate fleet schedules and vendor delivery."
      },
      {
        title: "HR Business Partner",
        location: "Cape Town",
        status: VacancyStatus.CLOSED,
        summary: "Support talent operations and compliance."
      }
    ]
  });

  // -------------------------
  // Vehicles
  // -------------------------
  await prisma.vehicle.createMany({
    skipDuplicates: true,
    data: [
      { vin: "VIN001", make: "Toyota", model: "Hilux", year: 2022, status: "Active" },
      { vin: "VIN002", make: "Isuzu", model: "N-Series", year: 2021, status: "Active" }
    ]
  });

  // -------------------------
  // Waste Jobs
  // -------------------------
  await prisma.wasteJob.createMany({
    skipDuplicates: true,
    data: [
      { jobNumber: "WJ-1001", status: "Scheduled", site: "Midrand Hub", scheduledAt: new Date() },
      { jobNumber: "WJ-1002", status: "In Progress", site: "Durban Port", scheduledAt: new Date() }
    ]
  });

  // -------------------------
  // Directory & departments
  // -------------------------
  await prisma.department.createMany({
    skipDuplicates: true,
    data: [
      { name: "Operations", code: "OPS" },
      { name: "Fleet Services", code: "FLEET" },
      { name: "Finance", code: "FIN" }
    ]
  });

  await prisma.jobTitle.createMany({
    skipDuplicates: true,
    data: [
      { name: "Operations Lead", grade: "M2" },
      { name: "Fleet Supervisor", grade: "M1" },
      { name: "Finance Analyst", grade: "P2" }
    ]
  });

  const opsDepartment = await prisma.department.findFirst({ where: { code: "OPS" } });
  const fleetDepartment = await prisma.department.findFirst({ where: { code: "FLEET" } });
  const financeDepartment = await prisma.department.findFirst({ where: { code: "FIN" } });
  const opsTitle = await prisma.jobTitle.findFirst({ where: { name: "Operations Lead" } });
  const fleetTitle = await prisma.jobTitle.findFirst({ where: { name: "Fleet Supervisor" } });
  const financeTitle = await prisma.jobTitle.findFirst({ where: { name: "Finance Analyst" } });

  if (opsDepartment && fleetDepartment && financeDepartment && opsTitle && fleetTitle && financeTitle) {
    await prisma.employee.createMany({
      skipDuplicates: true,
      data: [
        {
          fullName: "Thandi Mokoena",
          email: "thandi.mokoena@njilo.local",
          status: "ACTIVE",
          departmentId: opsDepartment.id,
          jobTitleId: opsTitle.id,
          phone: "+27 11 555 1200",
          extension: "1200",
          emergencyContact: "Sipho Mokoena · +27 82 555 2211"
        },
        {
          fullName: "Joel Petersen",
          email: "joel.petersen@njilo.local",
          status: "ON_LEAVE",
          departmentId: fleetDepartment.id,
          jobTitleId: fleetTitle.id,
          phone: "+27 11 555 1320",
          extension: "1320",
          emergencyContact: "Lebo Petersen · +27 83 555 1122"
        },
        {
          fullName: "Ayesha Khan",
          email: "ayesha.khan@njilo.local",
          status: "ACTIVE",
          departmentId: financeDepartment.id,
          jobTitleId: financeTitle.id,
          phone: "+27 11 555 1420",
          extension: "1420",
          emergencyContact: "Imran Khan · +27 84 555 3344"
        }
      ]
    });
  }

  // -------------------------
  // Documents
  // -------------------------
  await prisma.document.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Waste Services SLA Pack",
        category: "CONTRACTS",
        status: "APPROVED",
        version: "3.1",
        owner: "Contracts Office",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
        fileRef: "SLA-2024-OPS.pdf"
      },
      {
        title: "Fleet Compliance Checklist",
        category: "COMPLIANCE",
        status: "DRAFT",
        version: "1.4",
        owner: "Compliance Team",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45),
        fileRef: "FLEET-COMPLIANCE-CHK.docx"
      }
    ]
  });

  // -------------------------
  // Work orders & compliance
  // -------------------------
  await prisma.workOrder.createMany({
    skipDuplicates: true,
    data: [
      {
        jobNumber: "OPS-2001",
        client: "Green Corridor Logistics",
        location: "Pretoria East",
        assignedAsset: "Fleet-204",
        assignedTeam: "Ops Alpha",
        status: "SCHEDULED",
        scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24)
      },
      {
        jobNumber: "OPS-2002",
        client: "Metro Waste Authority",
        location: "Johannesburg CBD",
        assignedAsset: "Plant-019",
        assignedTeam: "Ops Bravo",
        status: "IN_PROGRESS",
        scheduledFor: new Date()
      }
    ]
  });

  await prisma.complianceRecord.createMany({
    skipDuplicates: true,
    data: [
      {
        type: "DRIVER_LICENSE",
        reference: "DRV-43902",
        status: "Renewal due",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
        owner: "Compliance Desk",
        notes: "Schedule medical renewal."
      },
      {
        type: "AUDIT",
        reference: "AUD-2024-08",
        status: "Open",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
        owner: "Internal Audit",
        notes: "Mid-year compliance audit."
      }
    ]
  });

  // -------------------------
  // Assets
  // -------------------------
  await prisma.asset.createMany({
    skipDuplicates: true,
    data: [
      {
        assetTag: "ASSET-1001",
        name: "Isuzu N-Series 14t",
        type: "VEHICLE",
        trackingId: "TRK-00911",
        serviceIntervalDays: 90,
        status: "ACTIVE"
      },
      {
        assetTag: "ASSET-2001",
        name: "CAT 320 Excavator",
        type: "PLANT",
        trackingId: "TRK-01044",
        serviceIntervalDays: 120,
        status: "IN_MAINTENANCE"
      }
    ]
  });

  // -------------------------
  // Helpdesk & procurement
  // -------------------------
  await prisma.helpdeskTicket.createMany({
    skipDuplicates: true,
    data: [
      {
        subject: "New laptop for dispatch",
        category: "Devices",
        priority: "HIGH",
        status: "IN_PROGRESS",
        requester: "Dispatch Team",
        assignedTo: "IT Support",
        details: "Laptop required for shift planning."
      },
      {
        subject: "VPN access for finance contractor",
        category: "Access",
        priority: "MEDIUM",
        status: "OPEN",
        requester: "Finance Team",
        assignedTo: "Security Admin",
        details: "Grant VPN access for month-end."
      }
    ]
  });

  await prisma.procurementRequest.createMany({
    skipDuplicates: true,
    data: [
      {
        item: "PPE Starter Kits",
        quantity: 12,
        requester: "Ops Supervisor",
        department: "Operations",
        status: "APPROVED",
        notes: "New hires onboarding."
      },
      {
        item: "Fuel Cards",
        quantity: 6,
        requester: "Fleet Lead",
        department: "Fleet Services",
        status: "REQUESTED",
        notes: "Additional cards for new vehicles."
      }
    ]
  });

  // -------------------------
  // Finance invoices
  // -------------------------
  await prisma.invoiceRequest.createMany({
    skipDuplicates: true,
    data: [
      {
        client: "Metro Waste Authority",
        amount: 245000,
        status: "SUBMITTED",
        requester: "Finance Team",
        details: "July waste collection services."
      },
      {
        client: "Green Corridor Logistics",
        amount: 98000,
        status: "APPROVED",
        requester: "Account Manager",
        details: "Fleet rental services."
      }
    ]
  });

  // -------------------------
  // Clients & contracts
  // -------------------------
  await prisma.client.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Metro Waste Authority",
        contractStart: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
        contractEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        serviceScope: "Municipal waste collection and recycling",
        status: "ACTIVE"
      },
      {
        name: "Green Corridor Logistics",
        contractStart: new Date(Date.now() - 1000 * 60 * 60 * 24 * 200),
        contractEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 165),
        serviceScope: "Fleet leasing and maintenance",
        status: "PENDING_RENEWAL"
      }
    ]
  });

  const metroClient = await prisma.client.findFirst({ where: { name: "Metro Waste Authority" } });
  const corridorClient = await prisma.client.findFirst({ where: { name: "Green Corridor Logistics" } });

  if (metroClient && corridorClient) {
    await prisma.contract.createMany({
      skipDuplicates: true,
      data: [
        {
          name: "Metro Waste SLA 2024",
          clientId: metroClient.id,
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
          status: "ACTIVE",
          documentRef: "SLA-2024-OPS.pdf"
        },
        {
          name: "Green Corridor Fleet Lease",
          clientId: corridorClient.id,
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 200),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 165),
          status: "PENDING_RENEWAL",
          documentRef: "FLEET-LEASE-2024.pdf"
        }
      ]
    });
  }

  // -------------------------
  // Incidents & maintenance
  // -------------------------
  await prisma.incident.createMany({
    skipDuplicates: true,
    data: [
      {
        incidentType: "Minor spill",
        severity: "LOW",
        location: "Depot 3",
        reportedBy: "Safety Officer",
        rootCause: "Loose coupling",
        correctiveAction: "Replace coupling and retrain staff",
        status: "Monitoring"
      },
      {
        incidentType: "Vehicle collision",
        severity: "HIGH",
        location: "R21 Highway",
        reportedBy: "Dispatch",
        rootCause: "Driver fatigue",
        correctiveAction: "Shift review and safety briefing",
        status: "Under investigation"
      }
    ]
  });

  await prisma.maintenanceSchedule.createMany({
    skipDuplicates: true,
    data: [
      {
        serviceType: "Quarterly service",
        nextServiceAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        status: "UPCOMING",
        notes: "Fleet service batch A."
      },
      {
        serviceType: "Hydraulic inspection",
        nextServiceAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        status: "OVERDUE",
        notes: "Plant maintenance backlog."
      }
    ]
  });

  // -------------------------
  // Reports & settings
  // -------------------------
  await prisma.reportExport.createMany({
    skipDuplicates: true,
    data: [
      { title: "Monthly Fleet Performance", period: "Aug 2024", status: "Queued" },
      { title: "Compliance Risk Summary", period: "Aug 2024", status: "Generated" }
    ]
  });

  await prisma.systemSetting.createMany({
    skipDuplicates: true,
    data: [
      { key: "fleet_uptime_target", value: "97" },
      { key: "compliance_risk_threshold", value: "30" }
    ]
  });

  console.log("✅ Seed completed");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
