import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const bookings = await prisma.bookingInfo.findMany({
            where: { SendStatus: "เสร็จสิ้น" },
            select: {
                RoomName: true,
                startDate: true,
            },
        });

        const statsMap: Record<string, {
            totalUsage: number;
            usageByMonth: Record<string, number>;
            usageByYear: Record<string, number>;
        }> = {};

        bookings.forEach(({ RoomName, startDate }) => {
            if (!RoomName || !startDate) return;

            if (!statsMap[RoomName]) {
                statsMap[RoomName] = {
                    totalUsage: 0,
                    usageByMonth: {},
                    usageByYear: {},
                };
            }

            const stat = statsMap[RoomName];
            stat.totalUsage++;

            const date = new Date(startDate);
            const year = date.getFullYear().toString();
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 01-12
            const monthKey = `${year}-${month}`;

            stat.usageByMonth[monthKey] = (stat.usageByMonth[monthKey] || 0) + 1;

            stat.usageByYear[year] = (stat.usageByYear[year] || 0) + 1;
        });

        const stats = Object.entries(statsMap).map(([RoomName, data]) => ({
            RoomName,
            totalUsage: data.totalUsage,
            usageByMonth: Object.entries(data.usageByMonth)
                .map(([month, count]) => ({ month, count }))
                .sort((a, b) => a.month.localeCompare(b.month)),
            usageByYear: Object.entries(data.usageByYear)
                .map(([year, count]) => ({ year, count }))
                .sort((a, b) => a.year.localeCompare(b.year)),
        }));

        return NextResponse.json(stats);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
