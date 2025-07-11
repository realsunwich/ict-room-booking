import { google } from "googleapis";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

const credentials = JSON.parse(
    readFileSync(path.join(process.cwd(), "src/app/lib/google-service-account.json"), "utf-8")
);

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

export async function POST() {
    const bookings = await prisma.bookingInfo.findMany();

    const calendarIdsByRoom: Record<string, string> = {
        "ห้องประชุมคณะ ICT": "c_e1dd4b1b64e4e05076472f39b630df6d809a3ee6b7514663cd7e9172b0bd0268@group.calendar.google.com",
        "ห้องประชุมแม่กา": "c_8f3cb3dc7ac30369b6993c93eb9e28208dfc86ff39646babf97bd6e72b244579@group.calendar.google.com",
        "ห้องบัณฑิตศึกษา ICT1318": "c_bb07d69b9b55b95c06b227efc733624525fb4fa3e150245a8b8f4e1250d4bfbf@group.calendar.google.com",
        "ลานกิจกรรมใต้ถุนอาคาร ICT": "c_353cd6e59378ddf27d7b1ebfd1e552d7fb4565e2cc923dc3c5469c50c3eddd23@group.calendar.google.com",
    };

    for (const booking of bookings) {
        const calendarId = calendarIdsByRoom[booking.RoomName ?? ""];
        if (!calendarId) continue;

        try {
            const res = await calendar.events.insert({
                calendarId,
                requestBody: {
                    summary: booking.purpose ?? "ไม่ระบุวัตถุประสงค์",
                    location: booking.RoomName ?? "",
                    description: `ผู้จอง: ${booking.sender ?? ""}, เบอร์: ${booking.phoneOut ?? ""}`,
                    start: {
                        dateTime: new Date(booking.startDate!).toISOString(),
                        timeZone: "Asia/Bangkok",
                    },
                    end: {
                        dateTime: new Date(booking.endDate!).toISOString(),
                        timeZone: "Asia/Bangkok",
                    },
                },
            });
            console.log("✅ Event created:", res.data.id);
        } catch (err) {
            console.error("❌ Failed to create event:", err);
        }
    }

    return NextResponse.json({ status: "Synced via service account" });
}
