import { NextResponse } from "next/server";
import { prisma } from "@njilo/db";
import { validateLeadPayload } from "@/lib/leads";

export async function POST(request: Request) {
  const body = await request.json();

  const validation = validateLeadPayload(body);

  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      company: body.company ?? null,
      message: body.message,
      source: "WEBSITE"
    }
  });

  return NextResponse.json({ id: lead.id });
}
