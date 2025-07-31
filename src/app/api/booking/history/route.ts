import { NextResponse } from "next/server";
import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";

const db1 = new PrismaClientDB1();

export async function GET() {
    try {
        const bookings = await db1.bookingInfo.findMany({
            where: { RecordStatus: "N" },
            orderBy: { sendDate: "desc" },
        });

        const emails = bookings
            .map((b) => b.senderEmail)
            .filter((e): e is string => typeof e === "string" && e.trim() !== "");

        const signatures = await db1.signature.findMany({
            where: {
                userEmail: { in: emails },
            },
        });

        const signatureMap = new Map(signatures.map((s) => [s.userEmail, s.fileName]));

        const bookingsWithSignature = bookings.map((b) => ({
            ...b,
            signatureFileName: b.senderEmail ? signatureMap.get(b.senderEmail) ?? null : null,
        }));

        return NextResponse.json(bookingsWithSignature, { status: 200 });
    } catch (error) {
        console.error("Error fetching booking history:", error);
        return NextResponse.json(
            { message: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
            { status: 500 }
        );
    }
}
