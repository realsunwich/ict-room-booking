import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userInfo, responses, comment } = body;

        const assessment = await prisma.assessment.create({
            data: {
                meetingRoom: userInfo.meetingRoom,
                gender: userInfo.gender,
                role: userInfo.role,
                responses: responses,
                comment: comment || null,
            },
        });

        return NextResponse.json({ message: 'บันทึกสำเร็จ', id: assessment.id });
    } catch (error: any) {
        console.error('[API:POST /api/assessments]', error);
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาดขณะบันทึกข้อมูล' },
            { status: 500 }
        );
    }
}
