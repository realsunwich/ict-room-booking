import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const userEmail = req.nextUrl.searchParams.get("userEmail");

    if (!userEmail) {
        return NextResponse.json({ error: "Missing Email" }, { status: 400 });
    }

    try {
        const user = await prisma.users.findUnique({
            where: { userEmail: userEmail },
            select: { userEmail: true , RecordStatus: true },
        });

        console.log("Received Email: ", userEmail);


        if (!user || user.RecordStatus !== 'N') {
            return NextResponse.json({ result: "F" }, { status: 404 });
        }

        return NextResponse.json({ result: "T" });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}