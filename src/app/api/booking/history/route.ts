import { NextResponse } from "next/server";
import { PrismaClient as PrismaClientDB1, Prisma } from "@/../generated/db1";

const db1 = new PrismaClientDB1();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        const whereClause: Prisma.BookingInfoWhereInput = {
            RecordStatus: { in: ["N", "F", "U"] },
        };

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            whereClause.OR = [
                {
                    startDate: { lte: end },
                    endDate: { gte: start },
                },
            ];
        }

        const bookings = await db1.bookingInfo.findMany({
            where: whereClause,
            orderBy: { sendDate: "desc" },
        });

        const emails = bookings
            .map((b) => b.senderEmail)
            .filter((e): e is string => typeof e === "string" && e.trim() !== "");

        const signatures = await db1.signature.findMany({
            where: { userEmail: { in: emails } },
        });

        const signatureMap = new Map(
            signatures.map((s) => [s.userEmail, s.fileName])
        );

        const bookingsWithSignature = bookings.map((b) => ({
            ...b,
            signatureFileName: b.senderEmail
                ? signatureMap.get(b.senderEmail) ?? null
                : null,
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
