import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
    console.log("📥 API /api/calendar/add-event ถูกเรียกใช้แล้ว");

    try {
        const body = await req.json();
        const booking = body.booking?.updated || body.booking;

        console.log("📦 ข้อมูล booking ที่รับมา:", booking);

        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(process.cwd(), "src/app/lib/google-service-account.json"),
            scopes: ["https://www.googleapis.com/auth/calendar"],
        });

        const authClient = await auth.getClient();
        const calendar = google.calendar({
            version: "v3",
            auth: authClient as any,
        });

        const calendarIdsByRoom: Record<string, string> = {
            "ห้องประชุมคณะ ICT": "c_e1dd4b1b64e4e05076472f39b630df6d809a3ee6b7514663cd7e9172b0bd0268@group.calendar.google.com",
            "ห้องประชุมแม่กา": "c_8f3cb3dc7ac30369b6993c93eb9e28208dfc86ff39646babf97bd6e72b244579@group.calendar.google.com",
            "ห้องบัณฑิตศึกษา ICT1318": "c_bb07d69b9b55b95c06b227efc733624525fb4fa3e150245a8b8f4e1250d4bfbf@group.calendar.google.com",
            "ลานกิจกรรมใต้ถุนอาคาร ICT": "c_353cd6e59378ddf27d7b1ebfd1e552d7fb4565e2cc923dc3c5469c50c3eddd23@group.calendar.google.com",
        };

        const calendarId = calendarIdsByRoom[booking.RoomName ?? ""];

        if (!calendarId) {
            return NextResponse.json({ error: "Calendar ID not found" }, { status: 400 });
        }

        const toThaiDatetimeString = (date: string) =>
            new Date(date).toLocaleString("th-TH", {
                timeZone: "Asia/Bangkok",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });

        const event = {
            summary: `📌 จองห้อง ${booking.RoomName}`,
            description: `🧑‍💼 ผู้จอง ${booking.sender}
📞 โทรศัพท์ ${booking.phoneOut || "ไม่ระบุ"}
📝 วัตถุประสงค์ ${booking.purpose}
👥 จำนวนคน ${booking.capacity} คน
📅 เริ่ม ${toThaiDatetimeString(booking.startDate)}
🕓 สิ้นสุด ${toThaiDatetimeString(booking.endDate)}`,

            start: {
                dateTime: booking.startDate,
                timeZone: "Asia/Bangkok",
            },
            end: {
                dateTime: booking.endDate,
                timeZone: "Asia/Bangkok",
            },
        };

        const response = await calendar.events.insert({
            calendarId,
            requestBody: event,
        });

        return NextResponse.json({ eventId: response.data.id }, { status: 200 });
    } catch (error) {
        console.error("❌ Error creating calendar event:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
