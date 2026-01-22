import { NextResponse } from "next/server";
import { prisma } from "@njilo/db";
import { LeadDepartment } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName ?? "");
    const email = String(body.email ?? "");
    const phone = body.phone ? String(body.phone) : null;
    const companyName = body.companyName ? String(body.companyName) : null;
    const message = body.message ? String(body.message) : null;
    const department = String(body.department ?? "SALES") as LeadDepartment;
    const source = String(body.source ?? "public-web");

    if (!fullName || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await prisma.lead.create({
      data: {
        fullName,
        email,
        phone,
        companyName,
        department,
        message,
        source
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Unable to save lead" }, { status: 500 });
  }
}
