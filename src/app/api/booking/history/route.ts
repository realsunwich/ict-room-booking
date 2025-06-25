import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const bookings = await prisma.bookingInfo.findMany({
            where: {
                RecordStatus: "N",
            },
            orderBy: {
                sendDate: "desc",
            },
        });

        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        console.error("Error fetching booking history:", error);
        return NextResponse.json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล" }, { status: 500 });
    }
}
