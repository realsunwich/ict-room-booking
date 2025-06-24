import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export async function updateRoomUsageStats() {
    const usageStats = await prisma.bookingInfo.groupBy({
        by: ["RoomName"],
        where: {
            SendStatus: "เสร็จสิ้น",
            RoomName: {
                not: null,
            },
        },
        _count: {
            bookingID: true,
        },
    });

    for (const stat of usageStats) {
        if (stat.RoomName === null) continue;
        await prisma.roomUsageStats.upsert({
            where: { RoomName: stat.RoomName },
            update: {
                totalUsage: stat._count.bookingID,
                updatedAt: new Date(),
            },
            create: {
                RoomName: stat.RoomName,
                totalUsage: stat._count.bookingID,
                updatedAt: new Date(),
            },
        });
    }
}