import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    if (!accessToken) return NextResponse.json({ error: "No access token" }, { status: 401 });

    const bookings = await prisma.bookingInfo.findMany();

    const calendarIdsByRoom: Record<string, string> = {
        "ห้องประชุมคณะ ICT": "c_e1dd4b1b64e4e05076472f39b630df6d809a3ee6b7514663cd7e9172b0bd0268@group.calendar.google.com",
        "ห้องประชุมแม่กา": "c_8f3cb3dc7ac30369b6993c93eb9e28208dfc86ff39646babf97bd6e72b244579@group.calendar.google.com",
        "ห้องบัณฑิตศึกษา ICT1318": "c_bb07d69b9b55b95c06b227efc733624525fb4fa3e150245a8b8f4e1250d4bfbf@group.calendar.google.com",
        "ลานกิจกรรมใต้ถุนอาคาร ICT": "c_353cd6e59378ddf27d7b1ebfd1e552d7fb4565e2cc923dc3c5469c50c3eddd23@group.calendar.google.com",
    };

    for (const booking of bookings) {
        const roomName = booking.RoomName;
        if (typeof roomName !== "string") {
            console.warn("Booking missing valid RoomName : ", booking.bookingID);
            continue;
        }
        const calendarId = calendarIdsByRoom[roomName];
        if (!calendarId) {
            console.warn(`No calendar ID for room : ${roomName}`);
            continue;
        }

        console.log("---- Booking to sync ----");
        console.log("AccessToken:", accessToken?.slice(0, 20) + "...");
        console.log("Room:", roomName);
        console.log("CalendarId:", calendarId);
        console.log("Start:", booking.startDate);
        console.log("End:", booking.endDate);
        console.log("Purpose:", booking.purpose);

        const session = await getServerSession(authOptions);
        console.log("Token", session?.accessToken);

        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                summary: booking.purpose,
                location: roomName,
                description: `ผู้จอง: ${booking.sender} เบอร์ ${booking.phoneOut}`,
                start: {
                    dateTime: booking.startDate,
                    timeZone: "Asia/Bangkok",
                },
                end: {
                    dateTime: booking.endDate,
                    timeZone: "Asia/Bangkok",
                },
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("❌ Google Calendar API error:", result);
        } else {
            console.log("✅ Event created:", result.id);
        }
    }

    return NextResponse.json({ status: "Synced" });
}
