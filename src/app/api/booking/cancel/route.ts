import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";
const db1 = new PrismaClientDB1();
import { google } from "googleapis";
import path from "path";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { bookingID, cancelReason } = body;

        if (!bookingID) {
            return NextResponse.json({ error: 'Missing booking id' }, { status: 400 });
        }

        const booking = await db1.bookingInfo.findUnique({
            where: { bookingID },
        });

        if (!booking) {
            return NextResponse.json({ error: 'ไม่พบคำขอที่ต้องการยกเลิก' }, { status: 404 });
        }

        if (!booking.SendStatus || !['กำลังรอ', 'อนุมัติ'].includes(booking.SendStatus.trim())) {
            return NextResponse.json({ error: 'ไม่สามารถยกเลิกคำขอที่ดำเนินการแล้ว' }, { status: 400 });
        }

        if (booking.calendarEventId && booking.SendStatus.trim() === "อนุมัติ") {
            const auth = new google.auth.GoogleAuth({
                keyFile: path.join(process.cwd(), "src/app/lib/google-service-account.json"),
                scopes: ["https://www.googleapis.com/auth/calendar"],
            });

            const calendarIdsByRoom: Record<string, string> = {
                "ห้องประชุมคณะ ICT": "c_115762728572ef369a1f034a14e03dfba66e66e3fae391c5f375c36095a64b7d@group.calendar.google.com",
                "ห้องประชุมแม่กา": "c_5a4c4b6cac6f5f96ff83f7ea590eb72907cdba720dfea25f8ec67830df7f7ee8@group.calendar.google.com",
                "ห้องบัณฑิตศึกษา ICT1318": "c_b1833a5e16f505281f701dedaf0f08b24ea531f777ab93ed86a559fe025a1a7e@group.calendar.google.com",
                "ลานกิจกรรมใต้ถุนอาคาร ICT": "c_73c08d749e07202961c12649cccfe8cb74f888b3ce499ac45acd72f2e3bdb0a3@group.calendar.google.com",
            };

            const calendarId = calendarIdsByRoom[booking.RoomName ?? ""];

            if (calendarId) {
                try {
                    const authClient = await auth.getClient();
                    const calendar = google.calendar({
                        version: "v3",
                        auth: authClient as unknown as Parameters<typeof google.calendar>[0]["auth"],
                    });

                    await calendar.events.delete({
                        calendarId,
                        eventId: booking.calendarEventId,
                    });

                    console.log("✅ ลบ event ใน Google Calendar สำเร็จ:", booking.calendarEventId);
                } catch (err) {
                    console.error("❌ ลบ event ใน Google Calendar ล้มเหลว:", err);
                }
            } else {
                console.warn("⚠️ ไม่พบ calendarId สำหรับห้อง:", booking.RoomName);
            }
        }

        await db1.bookingInfo.update({
            where: { bookingID },
            data: {
                SendStatus: 'ถูกยกเลิก',
                CancelReason: cancelReason || null,
                calendarEventId: null,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({ message: 'ยกเลิกคำขอสำเร็จ' }, { status: 200 });
    } catch (error) {
        console.error('ยกเลิกคำขอล้มเหลว:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }, { status: 500 });
    }
}
