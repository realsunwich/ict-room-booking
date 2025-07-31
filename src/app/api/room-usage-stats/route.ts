import { NextResponse } from "next/server";
import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";

const db1 = new PrismaClientDB1();

function getWorkingHours(start: Date, end: Date): number {
    let totalHours = 0;
    const current = new Date(start);

    while (current < end) {
        const workStart = new Date(current);
        workStart.setHours(8, 30, 0, 0);

        const workEnd = new Date(current);
        workEnd.setHours(16, 30, 0, 0);

        const dayStart = current > workStart ? current : workStart;
        const dayEnd = end < workEnd ? end : workEnd;

        if (dayStart < dayEnd) {
            totalHours += (dayEnd.getTime() - dayStart.getTime()) / (1000 * 60 * 60);
        }

        // ไปวันถัดไป
        current.setDate(current.getDate() + 1);
        current.setHours(0, 0, 0, 0);
    }

    return totalHours;
}

export async function GET() {
    try {
        const bookings = await db1.bookingInfo.findMany({
            select: {
                RoomName: true,
                SendStatus: true,
                CancelReason: true,
                RejectReason: true,
                createdAt: true,
                startDate: true,
                endDate: true,
            },
        });

        const roomStatsMap: Record<string, {
            totalUsage: number;
            totalWorkHours: number;
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
                    totalWorkHours: 0,
                    statusCounts: {},
                    usageByMonth: {},
                    usageByYear: {},
                };
            }

            const stats = roomStatsMap[room];

            stats.totalUsage += 1;

            // คำนวณชั่วโมงในเวลาราชการ
            if (b.startDate && b.endDate) {
                stats.totalWorkHours += getWorkingHours(new Date(b.startDate), new Date(b.endDate));
            }

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
            totalWorkHours: parseFloat(data.totalWorkHours.toFixed(2)),
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