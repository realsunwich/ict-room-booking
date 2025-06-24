import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const stats = await prisma.roomUsageStats.findMany({
            orderBy: { totalUsage: "desc" },
        });

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Failed to fetch room stats:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}