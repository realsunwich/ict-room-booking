import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PrismaClientDB2 } from '@/../generated/db2';

const db2 = new PrismaClientDB2();

export async function GET(req: NextRequest) {
    const userEmail = req.nextUrl.searchParams.get("userEmail");

    if (!userEmail) {
        return NextResponse.json({ error: "Missing Email" }, { status: 400 });
    }

    try {
        const user = await db2.user.findUnique({
            where: { U_email: userEmail },
            select: { U_email: true },
        });

        console.log("Received Email:", userEmail);

        if (!user) {
            return NextResponse.json({ result: "F" }, { status: 404 });
        }

        return NextResponse.json({ result: "T" });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}