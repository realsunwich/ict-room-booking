import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const bookings = await prisma.bookingInfo.findMany({
            select: {
                RoomName: true,
                SendStatus: true,
                CancelReason: true,
                RejectReason: true,
                createdAt: true,
            },
        });

        const roomStatsMap: Record<string, {
            totalUsage: number;
            statusCounts: Record<string, number>;
            usageByMonth: Record<string, number>;
            usageByYear: Record<string, number>;
        }> = {};

        const canceledOrRejected: {
            RoomName: string;
            SendStatus: string;
            CancelReason?: string | null;
            RejectReason?: string | null;
        }[] = [];

        bookings.forEach((b) => {
            const room = b.RoomName || "ไม่ทราบชื่อห้อง";
            const status = b.SendStatus || "ไม่ทราบสถานะ";
            const createdAt = b.createdAt ? new Date(b.createdAt) : new Date();

            const monthKey = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`;
            const yearKey = `${createdAt.getFullYear()}`;

            if (!roomStatsMap[room]) {
                roomStatsMap[room] = {
                    totalUsage: 0,
                    statusCounts: {},
                    usageByMonth: {},
                    usageByYear: {},
                };
            }

            const stats = roomStatsMap[room];

            stats.totalUsage += 1;

            // สถานะ
            stats.statusCounts[status] = (stats.statusCounts[status] || 0) + 1;

            // รายเดือน
            stats.usageByMonth[monthKey] = (stats.usageByMonth[monthKey] || 0) + 1;

            // รายปี
            stats.usageByYear[yearKey] = (stats.usageByYear[yearKey] || 0) + 1;

            // ถูกยกเลิก / ไม่อนุมัติ
            if (status === "ถูกยกเลิก" || status === "ไม่อนุมัติ") {
                canceledOrRejected.push({
                    RoomName: room,
                    SendStatus: status,
                    CancelReason: b.CancelReason,
                    RejectReason: b.RejectReason,
                });
            }
        });

        const stats = Object.entries(roomStatsMap).map(([RoomName, data]) => ({
            RoomName,
            totalUsage: data.totalUsage,
            statusCounts: data.statusCounts,
            usageByMonth: Object.entries(data.usageByMonth).map(([month, count]) => ({ month, count })),
            usageByYear: Object.entries(data.usageByYear).map(([year, count]) => ({ year, count })),
        }));

        return NextResponse.json({
            stats,
            canceledOrRejected,
        });

    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        return NextResponse.json({ error: "เกิดข้อผิดพลาดในการโหลดข้อมูล" }, { status: 500 });
    }
}
