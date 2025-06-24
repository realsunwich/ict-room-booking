import { NextResponse } from "next/server";
import { updateRoomUsageStats } from "@/app/lib/updateRoomStats";

export async function POST() {
    try {
        await updateRoomUsageStats();
        return NextResponse.json({ message: "อัปเดตสถิติสำเร็จ" });
    } catch (error) {
        console.error("Update room usage stats failed:", error);
        return NextResponse.json({ message: "เกิดข้อผิดพลาด", error }, { status: 500 });
    }
}