import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            bookingID,
            clearStatus,
            damageAction,
            remark,
        } = body;

        if (!bookingID || !clearStatus || (clearStatus === "not_clear" && (!remark || !damageAction))) {
            return NextResponse.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
        }

        await prisma.bookingInfo.update({
            where: { bookingID: Number(bookingID) },
            data: {
                clearStatus,
                damageAction: clearStatus === "not_clear" ? damageAction : null,
                remark: clearStatus === "not_clear" ? remark : null,
                SendStatus: "เสร็จสิ้น",
            },
        });

        return NextResponse.json({ message: "บันทึกสถานะการตรวจเช็คเรียบร้อยแล้ว" });
    } catch (error) {
        console.error("roomcheck error:", error);
        return NextResponse.json(
            { error: "ไม่สามารถอัปเดตข้อมูลได้" },
            { status: 500 }
        );
    }
}
