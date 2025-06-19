import { NextResponse } from "next/server";
import { IncomingForm, Fields, Files } from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { promises as fsPromises, createReadStream, createWriteStream } from "fs";

export const config = {
    api: { bodyParser: false },
};

// ฟังก์ชันช่วยย้ายไฟล์ (copy + ลบต้นทาง)
async function moveFile(source: string, dest: string) {
    return new Promise<void>((resolve, reject) => {
        const readStream = createReadStream(source);
        const writeStream = createWriteStream(dest);

        readStream.on("error", reject);
        writeStream.on("error", reject);

        writeStream.on("finish", async () => {
            try {
                await fsPromises.unlink(source);
                resolve();
            } catch (err) {
                reject(err);
            }
        });

        readStream.pipe(writeStream);
    });
}

// สร้างคลาสจำลอง Request เพื่อให้ formidable ทำงานกับ buffer ได้
class FakeReq extends Readable {
    headers: Record<string, string>;

    constructor(buffer: Buffer, headers: Record<string, string>) {
        super();
        this.headers = headers;
        this.push(buffer);
        this.push(null);
    }
    _read() { }
}

export async function POST(request: Request) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // สร้างโฟลเดอร์ uploads หากยังไม่มี
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // อ่านข้อมูล request body เป็น buffer
    const buf = Buffer.from(await request.arrayBuffer());

    // เตรียม headers สำหรับ fakeReq
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
    });

    const fakeReq = new FakeReq(buf, headers);
    const form = new IncomingForm();

    try {
        // แปลงข้อมูล form-data ด้วย formidable
        const { fields, files } = await new Promise<{ fields: Fields; files: Files }>(
            (resolve, reject) => {
                form.parse(fakeReq as any, (err, fields, files) => {
                    if (err) reject(err);
                    else resolve({ fields, files });
                });
            }
        );

        // ดึง userId จาก fields
        const userId = Array.isArray(fields.userId) ? fields.userId[0] : fields.userId;
        if (!userId) {
            return NextResponse.json({ message: "Missing userId" }, { status: 400 });
        }

        // ดึงไฟล์ลายเซ็น
        const signatureFile = Array.isArray(files.signature) ? files.signature[0] : files.signature;
        if (!signatureFile) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        // สร้างโฟลเดอร์ user หากยังไม่มี
        const userDir = path.join(uploadDir, userId);
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }

        // ตั้งชื่อไฟล์และที่เก็บ
        const fileName = `signature${path.extname(signatureFile.originalFilename || "")}`;
        const filePath = path.join(userDir, fileName);

        // ย้ายไฟล์จาก temp ไปยังที่เก็บจริง
        await moveFile(signatureFile.filepath, filePath);

        return NextResponse.json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ message: "Error processing upload" }, { status: 500 });
    }
}
