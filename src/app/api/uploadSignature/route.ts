import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/next-auth";
import { PrismaClient as PrismaClientDB1 } from "@/../generated/db1";

const db1 = new PrismaClientDB1();
import { writeFile } from "fs/promises";
import path from "path";

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

    const allowedExtensions = ["jpg", "jpeg", "png"];
    const ext = (file.name.split(".").pop() || "").toLowerCase();

    if (!allowedExtensions.includes(ext)) {
        return NextResponse.json({ message: "อนุญาตเฉพาะไฟล์ .jpg หรือ .png เท่านั้น" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const safeEmail = session.user.email.replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `signature_${safeEmail}.${ext}`;

    const filePath = path.join(process.cwd(), "public/uploads/signatures", fileName);

    await writeFile(filePath, buffer);

    await db1.signature.upsert({
        where: { userEmail: session.user.email },
        update: { fileName },
        create: {
            userEmail: session.user.email,
            fileName,
        },
    });

    return NextResponse.json({ message: "อัปโหลดเรียบร้อย", fileName });
}
