import { NextResponse } from "next/server";
import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";

const db1 = new PrismaClientDB1();

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
        const body = await req.json();
        const bookingId = Number(body.bookingId);
        const status = body.status as string;
        const rejectReason = typeof body.RejectReason === "string" && body.RejectReason.trim() !== ''
            ? body.RejectReason.trim()
            : null;

        const cancelReason = typeof body.CancelReason === "string" && body.CancelReason.trim() !== ''
            ? body.CancelReason.trim()
            : null;

        if (!bookingId || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updateData: any = {
            SendStatus: status,
            updatedAt: new Date(),
            ...(status === "เสร็จสิ้น" ? { RecordStatus: "F" } : {}),
            ...(status === "ไม่อนุมัติ" || status === "ถูกยกเลิก" ? { RecordStatus: "U" } : {}),
        };

        if (status === "ไม่อนุมัติ") {
            if (rejectReason) updateData.RejectReason = rejectReason; 
        }

        if (status === "ถูกยกเลิก") {
            if (cancelReason) updateData.CancelReason = cancelReason;
        }

        const updated = await db1.bookingInfo.update({
            where: { bookingID: Number(bookingId) },
            data: updateData,
        });

        if (["อนุมัติ", "เสร็จสิ้น"].includes(status)) {
            const current = await db1.bookingInfo.findUnique({
                where: { bookingID: Number(bookingId) },
                select: { approvedNumber: true },
            });

            if (!current?.approvedNumber) {
                const buddhistYear = new Date().getFullYear() + 543;
                const currentYearStr = toThaiNumber(buddhistYear);

                const existing = await db1.bookingInfo.findMany({
                    where: {
                        approvedNumber: {
                            endsWith: `/${currentYearStr}`,
                        },
                    },
                    select: {
                        approvedNumber: true,
                    },
                });

                let nextNumber = 1;

                if (existing.length > 0) {
                    const maxRunning = existing
                        .map(b => b.approvedNumber?.split('/')[0] || '')
                        .map(thai => toArabicNumber(thai))
                        .reduce((max, curr) => (curr > max ? curr : max), 0);

                    nextNumber = maxRunning + 1;
                }

                const approvedNumber = `${toThaiNumber(nextNumber.toString().padStart(4, '0'))}/${currentYearStr}`;

                await db1.bookingInfo.update({
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