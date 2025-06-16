import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const rooms = await prisma.iCTRoom.findMany({
            where: {
                RecordStatus: 'N'
            },
            orderBy: {
                RoomID: 'asc'
            },
        });
        return NextResponse.json(rooms);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'ไม่สามารถโหลดข้อมูลห้องได้' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { RoomID, RoomName, RoomLocation, RoomCapacity } = await request.json();

    try {
        const newRoom = await prisma.iCTRoom.create({
            data: {
                RoomName,
                RoomLocation,
                RoomCapacity,
                RoomStatus: "พร้อมใช้งาน",
                RecordStatus: 'N',
            },
        });
        return NextResponse.json(newRoom, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'ไม่สามารถเพิ่มห้องได้' }, { status: 500 });
    }
}