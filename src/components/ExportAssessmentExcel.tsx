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
                font: { name: "TH Niramit AS", size: 14, bold: true },
                alignment: col.style.alignment,
            },
        }));

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, size: 16, name: "TH Niramit AS" };
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

        let index = 1;

        for (const item of data) {
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

            const sectionNames: Record<number, string> = {
                1: "ด้านมาตรฐานของการปฏิบัติงาน",
                2: "ด้านความเต็มใจในการให้บริการ",
                3: "ด้านคุณภาพการให้บริการ",
                4: "ด้านการปรับปรุงบริการ",
                5: "ความพึงพอใจโดยรวม",
            };

            let currentSection = 0;

            responsesArray
                .sort((a, b) => parseInt(a.title.split(".")[0]) - parseInt(b.title.split(".")[0]))
                .forEach(({ title, responses }) => {
                    const sectionNumber = parseInt(title.split(".")[0]);

                    if (sectionNumber !== currentSection) {
                        currentSection = sectionNumber;
                        worksheet.addRow(
                            currentSection === 1
                                ? {
                                    ...baseInfo,
                                    question: `หมวด ${sectionNumber}. ${sectionNames[sectionNumber] || ""}`,
                                    score: "",
                                }
                                : {
                                    index: "",
                                    room: "",
                                    gender: "",
                                    role: "",
                                    comment: "",
                                    question: `หมวด ${sectionNumber}. ${sectionNames[sectionNumber] || ""}`,
                                    score: "",
                                }
                        );
                        Object.entries(responses)
                            .sort(([a], [b]) => {
                                const parse = (str: string) =>
                                    str.match(/^\d+\.\d+/)?.[0]?.split(".").map(Number) ?? [99];
                                const [aMain = 0, aSub = 0] = parse(a);
                                const [bMain = 0, bSub = 0] = parse(b);
                                return aMain - bMain || aSub - bSub;
                            })
                            .forEach(([question, score]) => {
                                worksheet.addRow({
                                    index: "",
                                    room: "",
                                    gender: "",
                                    role: "",
                                    comment: "",
                                    question,
                                    score,
                                });
                            });
                    }
                });
            worksheet.addRow({});
            index++;
        }

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {
                row.height = 25;
                row.eachCell((cell, colNumber) => {
                    const align = columns[colNumber - 1]?.style.alignment.horizontal || "center";
                    cell.font = { bold: true, size: 16, name: "TH Niramit AS" };
                    cell.alignment = { horizontal: align as any, vertical: "middle", wrapText: true };
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" },
                    };
                });
            }
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(
            new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
            "assessment_summary.xlsx"
        );
    };

    return (
        <Button
            variant="outlined"
            color="primary"
            onClick={handleExport}
            sx={{ ":hover": { backgroundColor: "primary.main", color: "white" } }}
        >
            บันทึกเป็น Excel
        </Button>
    );
}
