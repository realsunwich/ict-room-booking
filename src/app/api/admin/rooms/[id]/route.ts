import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
    params: {
        id: string;  
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const RoomID = Number(params.id);

        if (isNaN(RoomID)) {
            return NextResponse.json(
                { error: 'กรุณาระบุ RoomID ใน URL ให้ถูกต้อง (ต้องเป็นตัวเลข)' },
                { status: 400 }
            );
        }

        const { RoomName, RoomLocation, RoomCapacity } = await request.json();

        const updatedRoom = await prisma.iCTRoom.update({
            where: { RoomID },
            data: {
                RoomName,
                RoomLocation,
                RoomCapacity,
            }
        });

        return NextResponse.json(updatedRoom, { status: 200 });
    } catch (error) {
        console.error('Error updating room:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการอัพเดตห้องประชุม' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const RoomID = Number(params.id);

        if (isNaN(RoomID)) {
            return NextResponse.json(
                { error: 'กรุณาระบุ RoomID ใน URL ให้ถูกต้อง (ต้องเป็นตัวเลข)' },
                { status: 400 }
            );
        }

        const updatedRoom = await prisma.iCTRoom.update({
            where: { RoomID },
            data: {
                RecordStatus: 'D',
            }
        });

        return NextResponse.json(updatedRoom, { status: 200 });
    } catch (error) {
        console.error('Error updating room:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการอัพเดตห้องประชุม' }, { status: 500 });
    }
}
