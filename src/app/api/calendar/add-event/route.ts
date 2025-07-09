import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { accessToken, booking } = await req.json();

        if (!accessToken || !booking) {
            return NextResponse.json({ error: "Missing accessToken or booking data" }, { status: 400 });
        }

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const event = {
            summary: `จองห้อง ${booking.RoomName}`,
            description: `โดย ${booking.sender}\nรายละเอียด: ${booking.purpose}`,
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
            calendarId: "primary",
            requestBody: event,
        });

        return NextResponse.json({ eventId: response.data.id }, { status: 200 });

    } catch (error) {
        console.error("❌ Error creating calendar event:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}