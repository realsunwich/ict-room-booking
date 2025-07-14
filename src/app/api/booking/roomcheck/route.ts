import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
import path from "path";

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

        if (
            !bookingID ||
            !clearStatus ||
            (clearStatus === "not_clear" && (!remark || !damageAction))
        ) {
            return NextResponse.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
        }

        const booking = await prisma.bookingInfo.findUnique({
            where: { bookingID: Number(bookingID) },
        });

        if (!booking) {
            return NextResponse.json({ error: "ไม่พบคำขอ" }, { status: 404 });
        }

        if (booking.calendarEventId && booking.SendStatus === "อนุมัติ") {
            const auth = new google.auth.GoogleAuth({
                keyFile: path.join(process.cwd(), "src/app/lib/google-service-account.json"),
                scopes: ["https://www.googleapis.com/auth/calendar"],
            });

            const calendarIdsByRoom: Record<string, string> = {
                "ห้องประชุมคณะ ICT": "c_e1dd4b1b64e4e05076472f39b630df6d809a3ee6b7514663cd7e9172b0bd0268@group.calendar.google.com",
                "ห้องประชุมแม่กา": "c_8f3cb3dc7ac30369b6993c93eb9e28208dfc86ff39646babf97bd6e72b244579@group.calendar.google.com",
                "ห้องบัณฑิตศึกษา ICT1318": "c_bb07d69b9b55b95c06b227efc733624525fb4fa3e150245a8b8f4e1250d4bfbf@group.calendar.google.com",
                "ลานกิจกรรมใต้ถุนอาคาร ICT": "c_353cd6e59378ddf27d7b1ebfd1e552d7fb4565e2cc923dc3c5469c50c3eddd23@group.calendar.google.com",
            };

            const calendarId = calendarIdsByRoom[booking.RoomName ?? ""];

            if (calendarId) {
                try {
                    const authClient = await auth.getClient();
                    const calendar = google.calendar({
                        version: "v3",
                        auth: authClient as any,
                    });

                    await calendar.events.delete({
                        calendarId,
                        eventId: booking.calendarEventId,
                    });

                    console.log("✅ ลบ event สำเร็จ:", booking.calendarEventId);
                } catch (err) {
                    console.error("❌ ลบ event ล้มเหลว:", err);
                }
            } else {
                console.warn("⚠️ ไม่พบ calendarId สำหรับห้อง:", booking.RoomName);
            }
        }

        await prisma.bookingInfo.update({
            where: { bookingID: Number(bookingID) },
            data: {
                clearStatus,
                damageAction: clearStatus === "not_clear" ? damageAction : null,
                remark: clearStatus === "not_clear" ? remark : null,
                SendStatus: "เสร็จสิ้น",
                calendarEventId: null,
                updatedAt: new Date(),
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
