import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";

const db1 = new PrismaClientDB1();

interface UserInfo {
    meetingRoom?: string;
    gender?: string;
    role?: string;
}

interface ResponseItem {
    label: string;
    score: number;
}

interface Responses {
    [key: string]: ResponseItem;
}

interface BodyType {
    userInfo?: UserInfo;
    responses?: Responses;
    comment?: string;
}


export async function POST(req: NextRequest) {
    try {
        const body: BodyType = await req.json();

        if (!body.userInfo || !body.responses) {
            return NextResponse.json(
                { message: "ข้อมูลไม่ครบถ้วน: userInfo และ responses ต้องถูกส่งมา" },
                { status: 400 }
            );
        }

        const { meetingRoom, gender, role } = body.userInfo;

        if (
            typeof meetingRoom !== "string" ||
            typeof gender !== "string" ||
            typeof role !== "string"
        ) {
            return NextResponse.json(
                { message: "ข้อมูล userInfo ไม่ถูกต้อง" },
                { status: 400 }
            );
        }

        // สร้างเรคอร์ดใหม่
        const assessment = await db1.assessment.create({
            data: {
                meetingRoom,
                gender,
                role,
                responses: JSON.parse(JSON.stringify(body.responses)),
                comment: body.comment || null,
            },
        });

        return NextResponse.json({ message: 'บันทึกสำเร็จ', id: assessment.id });
    } catch (error) {
        console.error('[API:POST /api/assessments]', error);
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาดขณะบันทึกข้อมูล' },
            { status: 500 }
        );
    }
}
