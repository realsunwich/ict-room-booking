import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { bookingId, status, reason } = await req.json();

        if (!bookingId || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let updateData: any = {
            SendStatus: status,
            updatedAt: new Date(),
        };

        if (status === "ไม่อนุมัติ") {
            updateData.reason = reason ?? "";
        } else if (status === "อนุมัติ") {
            updateData.reason = null;
        }

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
