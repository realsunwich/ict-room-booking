import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateBookingPayload {
    bookingId: number;
    status: string;
    RejectReason?: string;
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

        return NextResponse.json({ success: true, updated });
    } catch (error) {
        console.error("Update status failed:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}