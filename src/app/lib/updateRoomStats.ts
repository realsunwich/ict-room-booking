import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";

const db1 = new PrismaClientDB1();

export async function updateRoomUsageStats() {
    const usageStats = await db1.bookingInfo.groupBy({
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
        await db1.roomUsageStats.upsert({
            where: { RoomName: stat.RoomName },
            update: {
                totalUsage: stat._count.bookingID,
                totalWorkHours: stat._count.bookingID,
                updatedAt: new Date(),
            },
            create: {
                RoomName: stat.RoomName,
                totalUsage: stat._count.bookingID,
                totalWorkHours: stat._count.bookingID,
                updatedAt: new Date(),
            },
        });
    }
}