import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { bookingID,updatedAt } = body;

        if (!bookingID) {
            return NextResponse.json({ error: 'Missing booking id' }, { status: 400 });
        }

        const booking = await prisma.bookingInfo.findUnique({
            where: { bookingID },
        });

        if (!booking) {
            return NextResponse.json({ error: 'ไม่พบคำขอที่ต้องการยกเลิก' }, { status: 404 });
        }

        if (!booking.SendStatus || !['กำลังรอ', 'อนุมัติ'].includes(booking.SendStatus.trim())) {
            return NextResponse.json({ error: 'ไม่สามารถยกเลิกคำขอที่ดำเนินการแล้ว' }, { status: 400 });
        }

        await prisma.bookingInfo.update({
            where: { bookingID },
            data: {
                SendStatus: 'คำขอถูกยกเลิก',
                updatedAt: new Date()
            },
        });

        return NextResponse.json({ message: 'ยกเลิกคำขอสำเร็จ' }, { status: 200 });
    } catch (error) {
        console.error('ยกเลิกคำขอล้มเหลว:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
    }
}
