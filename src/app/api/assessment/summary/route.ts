import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const assessments = await prisma.assessment.findMany();

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

