import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateBookingPayload {
    bookingId: number;
    status: string;
    RejectReason?: string;
}

function toThaiNumber(input: number | string): string {
    const thaiDigits = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
    return input.toString().split('').map(d => thaiDigits[parseInt(d)]).join('');
}

function toArabicNumber(input: string): number {
    const thaiToArabicMap: Record<string, string> = {
        '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
        '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9',
    };
    return parseInt(input.replace(/[๐-๙]/g, d => thaiToArabicMap[d]), 10);
}

export async function POST(req: Request) {
    try {
        const { bookingId, status, RejectReason }: UpdateBookingPayload = await req.json();

        if (!bookingId || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updateData = {
            SendStatus: status,
            updatedAt: new Date(),
            RejectReason: status === "ไม่อนุมัติ" ? RejectReason ?? "" : null,
        };

        const updated = await prisma.bookingInfo.update({
            where: { bookingID: Number(bookingId) },
            data: updateData,
        });

        if (["อนุมัติ", "เสร็จสิ้น"].includes(status)) {
            const current = await prisma.bookingInfo.findUnique({
                where: { bookingID: Number(bookingId) },
                select: { approvedNumber: true },
            });

            if (!current?.approvedNumber) {
                const buddhistYear = new Date().getFullYear() + 543;
                const yearStr = toThaiNumber(buddhistYear);

                const existing = await prisma.bookingInfo.findMany({
                    where: {
                        approvedNumber: {
                            endsWith: `/${yearStr}`,
                        },
                    },
                    select: {
                        approvedNumber: true,
                    },
                });

                const maxRunning = existing
                    .map(b => b.approvedNumber?.split('/')[0] || '')
                    .map(thai => toArabicNumber(thai))
                    .reduce((max, curr) => (curr > max ? curr : max), 0);

                const nextNumber = maxRunning + 1;

                const approvedNumber = `${toThaiNumber(nextNumber.toString().padStart(4, '0'))}/${yearStr}`;

                await prisma.bookingInfo.update({
                    where: { bookingID: Number(bookingId) },
                    data: { approvedNumber },
                });
            }
        }

        return NextResponse.json({ success: true, updated });
    } catch (error) {
        console.error("Update status failed:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
