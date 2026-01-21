import { NextResponse } from "next/server";
import { prisma } from "@njilo/db";
import { LeadDepartment } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "");

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    await prisma.lead.create({
      data: {
        fullName: "Newsletter Subscriber",
        email,
        department: LeadDepartment.SALES,
        source: "newsletter"
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Unable to save signup" }, { status: 500 });
  }
}
