import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ hasSignature: false, error: "Missing email" }, { status: 400 });
    }

    const signature = await prisma.signature.findUnique({
        where: { userEmail: email },
    });

    return NextResponse.json({ hasSignature: !!signature });
}
