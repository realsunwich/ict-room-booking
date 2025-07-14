import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
import path from "path";

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

        // ✅ Sync กับ Google Calendar เฉพาะเมื่อ "อนุมัติ"
        if (status === "อนุมัติ") {
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

            const calendarId = calendarIdsByRoom[updated.RoomName ?? ""];
            if (calendarId) {
                try {
                    const authClient = await auth.getClient();
                    const calendar = google.calendar({
                        version: "v3",
                        auth: authClient as any,
                    });

                    await calendar.events.insert({
                        calendarId,
                        requestBody: {
                            summary: updated.purpose ?? "ไม่ระบุวัตถุประสงค์",
                            location: updated.RoomName ?? "",
                            description: `ผู้จอง: ${updated.sender ?? ""}, เบอร์: ${updated.phoneOut ?? ""}`,
                            start: {
                                dateTime: new Date(updated.startDate!).toISOString(),
                                timeZone: "Asia/Bangkok",
                            },
                            end: {
                                dateTime: new Date(updated.endDate!).toISOString(),
                                timeZone: "Asia/Bangkok",
                            },
                        },
                    });

                    console.log("✅ Google Calendar synced for", updated.RoomName);
                } catch (calendarErr) {
                    console.error("❌ Failed to sync calendar:", calendarErr);
                }
            } else {
                console.warn("⚠️ ไม่พบ calendarId สำหรับห้อง:", updated.RoomName);
            }
        }

        return NextResponse.json({ success: true, updated });
    } catch (error) {
        console.error("Update status failed:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
