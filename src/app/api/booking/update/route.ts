import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            bookingID,
            RoomName,
            sender,
            phoneIn,
            phoneOut,
            jobName,
            officeLocation,
            purpose,
            startDate,
            endDate,
            capacity,
            cfSender,
            cfPhone,
            SendStatus,
            updatedAt
        } = body;

        const updated = await prisma.bookingInfo.update({
            where: { bookingID },
            data: {
                sender,
                jobName,
                phoneIn,
                phoneOut,
                officeLocation,
                purpose,
                RoomName,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                capacity: Number(capacity),
                cfSender,
                cfPhone,
                SendStatus: 'กำลังรอ',
                updatedAt: new Date(updatedAt)
            },
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error("Update booking error:", error);
        return NextResponse.json({ error: "เกิดข้อผิดพลาดขณะอัปเดตคำขอ" }, { status: 500 });
    }
}
