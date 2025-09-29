import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";

const db1 = new PrismaClientDB1();

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            bookingID,
            RoomName,
            sender,
            senderEmail,
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
        } = body;

        const updated = await db1.bookingInfo.update({
            where: { bookingID },
            data: {
                sender,
                senderEmail,
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
                updatedAt: new Date(),
                RecordStatus: "N"
            },
        });

        if (!bookingID) {
            return NextResponse.json({ error: "bookingID is required" }, { status: 400 });
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error("Update booking error:", error);
        return NextResponse.json({ error: "เกิดข้อผิดพลาดขณะอัปเดตคำขอ" }, { status: 500 });
    }
}
