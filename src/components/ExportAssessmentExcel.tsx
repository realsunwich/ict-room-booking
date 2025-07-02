"use client";

import { Button } from "@mui/material";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface AssessmentDetail {
    id: string;
    room: string;
    gender: string;
    role: string;
    comment: string;
    responses: {
        title: string;
        responses: Record<string, { label: string; score: number }> | Record<string, number>;
    }[];
}

export default function ExportAssessmentExcel({ data }: { data: AssessmentDetail[] }) {
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("สรุปผลการประเมิน");

        const columns = [
            { header: "ลำดับ", key: "index", width: 8, style: { alignment: { horizontal: "center" as const } } },
            { header: "สถานที่", key: "room", width: 20, style: { alignment: { horizontal: "left" as const } } },
            { header: "เพศ", key: "gender", width: 10, style: { alignment: { horizontal: "center" as const } } },
            { header: "สถานภาพ", key: "role", width: 20, style: { alignment: { horizontal: "center" as const } } },
            { header: "ความคิดเห็น", key: "comment", width: 50, style: { alignment: { horizontal: "left" as const } } },
            { header: "ข้อคำถาม", key: "question", width: 80, style: { alignment: { horizontal: "left" as const } } },
            { header: "คะแนน", key: "score", width: 8, style: { alignment: { horizontal: "center" as const } } },
        ];

        worksheet.columns = columns.map((col) => ({
            header: col.header,
            key: col.key,
            width: col.width,
            style: {
                font: { name: 'TH Niramit AS', size: 14, bold: true },
                alignment: col.style.alignment,
            },
        }));

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, size: 16, name: 'TH Niramit AS' };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFCCE5FF" },
            };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {
                row.eachCell((cell) => {
                    row.height = 25;
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" },
                    };
                    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
                    cell.font = { bold: true, size: 16, name: 'TH Niramit AS' };
                });
            }
        });

        let index = 1;

        data.forEach((item) => {
            const baseInfo = {
                index,
                room: item.room,
                gender: item.gender,
                role: item.role,
                comment: item.comment || "-",
            };

            const responsesArray = Array.isArray(item.responses)
                ? item.responses
                : Object.entries(item.responses).map(([title, resp]) => ({
                    title,
                    responses: Object.fromEntries(
                        Object.entries(resp as Record<string, { score: number } | number>).map(([key, value]) =>
                            typeof value === "object" && value !== null && "score" in value
                                ? [key, value.score]
                                : [key, value as number]
                        )
                    ),
                }));

            let firstRow = true;

            responsesArray.forEach(({ responses }) => {
                Object.entries(responses).forEach(([question, score]) => {
                    worksheet.addRow({
                        ...(firstRow ? baseInfo : {}),
                        question,
                        score,
                    });
                    firstRow = false;
                });
            });

            worksheet.addRow({});
            index++;
        });

        worksheet.getRow(1).font = { bold: true };

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "assessment_summary.xlsx");
    };

    return (
        <Button variant="outlined" color="primary" onClick={handleExport}
            sx={{ ":hover": { backgroundColor: "primary.main", color: "white" } }}
        >
            บันทึกเป็น Excel
        </Button>
    );
}