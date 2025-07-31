import { NextResponse } from "next/server";
import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";

const db1 = new PrismaClientDB1();

export async function GET() {
    try {
        const assessments = await db1.assessment.findMany({
            orderBy: {
                createdAt: "desc", // เรียงจากล่าสุดไปเก่าสุด
            },
        });

        const total = assessments.length;

        const assessmentsFormatted = assessments.map((a) => ({
            id: a.id.toString(),
            room: a.meetingRoom || "-",
            gender: a.gender || "-",
            role: a.role || "-",
            comment: a.comment || "-",
            responses: a.responses,
        }));

        return NextResponse.json({
            total,
            assessments: assessmentsFormatted,
        });
    } catch (error) {
        console.error("Error fetching summary:", error);
        return NextResponse.json(
            { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
            { status: 500 }
        );
    }
}
