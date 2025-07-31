import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";

const db1 = new PrismaClientDB1();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const booking = body.booking?.updated || body.booking;

        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(process.cwd(), "src/app/lib/google-service-account.json"),
            scopes: ["https://www.googleapis.com/auth/calendar"],
        });

        const authClient = await auth.getClient();
        const calendar = google.calendar({
            version: "v3",
            auth: authClient as unknown as Parameters<typeof google.calendar>[0]["auth"],
        });

        const calendarIdsByRoom: Record<string, string> = {
            "ห้องประชุมคณะ ICT": "c_115762728572ef369a1f034a14e03dfba66e66e3fae391c5f375c36095a64b7d@group.calendar.google.com",
            "ห้องประชุมแม่กา": "c_5a4c4b6cac6f5f96ff83f7ea590eb72907cdba720dfea25f8ec67830df7f7ee8@group.calendar.google.com",
            "ห้องบัณฑิตศึกษา ICT1318": "c_b1833a5e16f505281f701dedaf0f08b24ea531f777ab93ed86a559fe025a1a7e@group.calendar.google.com",
            "ลานกิจกรรมใต้ถุนอาคาร ICT": "c_73c08d749e07202961c12649cccfe8cb74f888b3ce499ac45acd72f2e3bdb0a3@group.calendar.google.com",
        };

        const calendarId = calendarIdsByRoom[booking.RoomName ?? ""];

        if (!calendarId) {
            return NextResponse.json({ error: "Calendar ID not found" }, { status: 400 });
        }

        const event = {
            summary: `📝 ${booking.purpose}`,
            location: `📌 ${booking.RoomName ?? ""}`,
            description: `🧑‍💼 ผู้จอง ${booking.sender ?? ""} 📞 โทรศัพท์ ${booking.phoneOut || "ไม่ระบุ"}
👥 จำนวนคน ${booking.capacity} คน`,
            start: {
                dateTime: new Date(booking.startDate!).toISOString(),
                timeZone: "Asia/Bangkok",
            },
            end: {
                dateTime: new Date(booking.endDate!).toISOString(),
                timeZone: "Asia/Bangkok",
            },
        };

        console.log("event : ",event)

        const response = await calendar.events.insert({
            calendarId,
            requestBody: event,
        });

        const eventId = response.data.id;

        if (eventId && booking.bookingID) {
            await db1.bookingInfo.update({
                where: { bookingID: Number(booking.bookingID) },
                data: { calendarEventId: eventId },
            });
            console.log("✅ Event added from Google Calendar:", booking.calendarEventId);
        }

        return NextResponse.json({ eventId: response.data.id }, { status: 200 });
    } catch (error) {
        console.error("❌ Error creating calendar event:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
