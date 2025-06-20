import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const thaiTime = (dateStr: string) => {
    const utc = new Date(dateStr);
    const offsetMs = 7 * 60 * 60 * 1000;
    return new Date(utc.getTime() + offsetMs);
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            RoomName,
            sender,
            jobName,
            phoneIn,
            phoneOut,
            officeLocation,
            purpose,
            startDate,
            endDate,
            capacity,
            cfSender,
            cfPhone,
        } = body;

        const booking = await prisma.bookingInfo.create({
            data: {
                RoomName,
                sender,
                jobName,
                phoneIn,
                phoneOut,
                officeLocation,
                purpose,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                capacity: capacity ? parseInt(capacity) : null,
                cfSender,
                cfPhone,
                createdAt: thaiTime(new Date().toISOString()),
                RecordStatus: "N",
                SendStatus: "กำลังรอ"
            },
        });

        return NextResponse.json({ message: "จองเรียบร้อยแล้ว", booking }, { status: 200 });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json({ message: "เกิดข้อผิดพลาดในการจอง" }, { status: 500 });
    }
}
