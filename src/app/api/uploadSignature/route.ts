import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/next-auth";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
    }

    const formData = await req.formData();
    const file: File | null = formData.get("signature") as unknown as File;

    if (!file) {
        return NextResponse.json({ message: "ไม่พบไฟล์" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const safeEmail = session.user.email.replace(/[^a-zA-Z0-9]/g, "_");
    const ext = file.name.split(".").pop();
    const fileName = `signature_${safeEmail}.${ext}`;

    const filePath = path.join(process.cwd(), "public/uploads/signatures", fileName);

    await writeFile(filePath, buffer);

    await prisma.signature.upsert({
        where: { userEmail: session.user.email },
        update: { fileName },
        create: {
            userEmail: session.user.email,
            fileName,
        },
    });

    return NextResponse.json({ message: "อัปโหลดเรียบร้อย", fileName });
}
