import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    try {
        const { bookingID } = await req.json();

        if (!bookingID) {
            return NextResponse.json({ error: "Missing bookingID" }, { status: 400 });
        }

        const booking = await prisma.bookingInfo.findUnique({
            where: { bookingID },
        });

        if (!booking) {
            return NextResponse.json({ error: "ไม่พบคำขอ" }, { status: 404 });
        }

        if ((booking.SendStatus ?? "").trim() !== "อนุมัติ") {
            return NextResponse.json(
                { error: "สามารถยกเลิกการอนุมัติได้เฉพาะคำขอที่อยู่ในสถานะ 'อนุมัติ'" },
                { status: 400 }
            );
        }

        await prisma.bookingInfo.update({
            where: { bookingID },
            data: { SendStatus: "กำลังรอ" },
        });

        return NextResponse.json({ message: "เปลี่ยนกลับเป็น 'กำลังรอ' สำเร็จ" }, { status: 200 });
    } catch (err) {
        console.error("Revert approval error:", err);
        return NextResponse.json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
    }
}