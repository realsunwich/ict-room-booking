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

interface ExportAssessmentExcelProps {
    data: AssessmentDetail[];
    filter: {
        room: string;
        gender: string;
        role: string;
    };
}

export default function ExportAssessmentExcel({ data, filter }: ExportAssessmentExcelProps) {
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("ผลสรุปแบบละเอียด");

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
                5: "ด้านความพึงพอใจโดยรวม",
            };

            let currentSection = 0;
            let allScores: number[] = [];

            responsesArray
                .sort((a, b) => parseInt(a.title.split(".")[0]) - parseInt(b.title.split(".")[0]))
                .forEach(({ title, responses }) => {
                    const sectionNumber = parseInt(title.split(".")[0]);

                    if (sectionNumber !== currentSection) {
                        currentSection = sectionNumber;

                        const scores = Object.values(responses).map((score) => Number(score));
                        const sumScore = scores.reduce((a, b) => a + b, 0);
                        const maxScore = 5 * scores.length;
                        const percent = maxScore > 0 ? ((sumScore / maxScore) * 100).toFixed(2) : "0.00";

                        worksheet.addRow(
                            currentSection === 1
                                ? {
                                    ...baseInfo,
                                    question: `หมวด ${sectionNumber}. ${sectionNames[sectionNumber] || ""}`,
                                    score: `${percent} %`,
                                }
                                : {
                                    index: "",
                                    room: "",
                                    gender: "",
                                    role: "",
                                    comment: "",
                                    question: `หมวด ${sectionNumber}. ${sectionNames[sectionNumber] || ""}`,
                                    score: `${percent} %`,
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
                                allScores.push(Number(score));
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

            const totalScore = allScores.reduce((a, b) => a + b, 0);
            const totalMaxScore = allScores.length * 5;
            const totalPercent = totalMaxScore > 0 ? ((totalScore / totalMaxScore) * 100).toFixed(2) : "0.00";

            worksheet.addRow({
                index: "",
                room: "",
                gender: "",
                role: "",
                comment: "",
                question: "คะแนนเฉลี่ยรวม",
                score: `${totalPercent} %`,
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

        const worksheet2 = workbook.addWorksheet("ผลสรุปแบบย่อ");

        const summaryColumns = [
            { header: "ลำดับ", key: "index", width: 10, style: { alignment: { horizontal: "center" as const } } },
            { header: "ห้อง", key: "room", width: 25, style: { alignment: { horizontal: "center" as const } } },
            { header: "เพศ", key: "gender", width: 12, style: { alignment: { horizontal: "center" as const } } },
            { header: "สถานภาพ", key: "role", width: 20, style: { alignment: { horizontal: "center" as const } } },
            { header: "หมวดที่ 1 (%)", key: "section1", width: 16, style: { alignment: { horizontal: "center" as const } } },
            { header: "หมวดที่ 2 (%)", key: "section2", width: 16, style: { alignment: { horizontal: "center" as const } } },
            { header: "หมวดที่ 3 (%)", key: "section3", width: 16, style: { alignment: { horizontal: "center" as const } } },
            { header: "หมวดที่ 4 (%)", key: "section4", width: 16, style: { alignment: { horizontal: "center" as const } } },
            { header: "หมวดที่ 5 (%)", key: "section5", width: 16, style: { alignment: { horizontal: "center" as const } } },
            { header: "คะแนนเฉลี่ยรวม (%)", key: "total", width: 22, style: { alignment: { horizontal: "center" as const } } },
        ];

        worksheet2.columns = summaryColumns.map((col) => ({
            header: col.header,
            key: col.key,
            width: col.width,
            style: {
            font: { name: "TH Niramit AS", size: 14, bold: true },
            alignment: col.style.alignment,
            },
        }));

        worksheet2.getRow(1).eachCell((cell) => {
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

        const grouped = new Map<string, { room: string; gender: string; role: string; scores: Record<number, number[]> }>();

        for (const item of data) {
            const key = `${item.room}|||${item.gender}|||${item.role}`;
            if (!grouped.has(key)) {
            grouped.set(key, {
                room: item.room,
                gender: item.gender,
                role: item.role,
                scores: { 1: [], 2: [], 3: [], 4: [], 5: [] },
            });
            }

            const group = grouped.get(key)!;

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

            responsesArray.forEach(({ title, responses }) => {
            const sectionNumber = parseInt(title.split(".")[0]);
            if (group.scores[sectionNumber]) {
                group.scores[sectionNumber].push(...Object.values(responses).map(Number));
            }
            });
        }

        for (const group of grouped.values()) {
            const sectionPercents: Record<number, string> = {};
            let totalSum = 0;
            let totalCount = 0;

            for (let i = 1; i <= 5; i++) {
            const section = group.scores[i] || [];
            const sectionSum = section.reduce((a, b) => a + b, 0);
            const sectionMax = section.length * 5;
            const percent = sectionMax > 0 ? (sectionSum / sectionMax) * 100 : 0;
            sectionPercents[i] = percent.toFixed(2);
            totalSum += sectionSum;
            totalCount += section.length * 5;
            }

            const totalPercent = totalCount > 0 ? (totalSum / totalCount) * 100 : 0;

            const row = worksheet2.addRow({
            index: worksheet2.rowCount,
            room: group.room,
            gender: group.gender,
            role: group.role,
            section1: sectionPercents[1],
            section2: sectionPercents[2],
            section3: sectionPercents[3],
            section4: sectionPercents[4],
            section5: sectionPercents[5],
            total: totalPercent.toFixed(2),
            });

            row.eachCell((cell, colNumber) => {
            const align = summaryColumns[colNumber - 1]?.style.alignment.horizontal || "center";
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

        worksheet2.eachRow((row, rowNumber) => {
            row.height = 25;
            row.eachCell((cell, colNumber) => {
            const align = summaryColumns[colNumber - 1]?.style.alignment.horizontal || "center";
            cell.font = { bold: true, size: 16, name: "TH Niramit AS" };
            cell.alignment = { horizontal: align as any, vertical: "middle", wrapText: true };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
            });
        });

        const worksheet3 = workbook.addWorksheet("สรุปผลแบบแยกตามกลุ่ม");

        const sectionHeaders = [
            "กลุ่ม",
            "หมวดที่ 1 (%)",
            "หมวดที่ 2 (%)",
            "หมวดที่ 3 (%)",
            "หมวดที่ 4 (%)",
            "หมวดที่ 5 (%)",
            "คะแนนเฉลี่ยรวม (%)",
        ];

        worksheet3.columns = sectionHeaders.map((_header, idx) => ({
            key: `col${idx}`,
            width: idx === 0 ? 30 : 22, 
            style: {
            font: { bold: true, size: 16, name: "TH Niramit AS" },
            alignment: { horizontal: "center" },
            height: 25,
            },
        }));

        const addSummarySection = (
            title: string,
            getGroupKey: (item: AssessmentDetail) => string,
            getLabel: (key: string) => string,
            isFirstSection = false
        ) => {
            if (!isFirstSection) worksheet3.addRow({});

            const titleRow = worksheet3.addRow([title]);
            titleRow.font = { bold: true, size: 16, name: "TH Niramit AS" };
            titleRow.alignment = { horizontal: "center", vertical: "middle" };
            worksheet3.mergeCells(`A${titleRow.number}:G${titleRow.number}`);

            const headerRow = worksheet3.addRow(sectionHeaders);
            headerRow.eachCell((cell) => {
                cell.font = { bold: true, size: 16, name: "TH Niramit AS" };
                cell.alignment = { horizontal: "center", vertical: "middle" };
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFCCE5FF" },
                };
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });

            const grouped = new Map<string, number[][]>();
            for (const item of data) {
                const key = getGroupKey(item);
                if (!grouped.has(key)) {
                    grouped.set(key, [[], [], [], [], []]);
                }

                const group = grouped.get(key)!;

                const responsesArray = Array.isArray(item.responses)
                    ? item.responses
                    : Object.entries(item.responses).map(([title, resp]) => ({
                        title,
                        responses: Object.fromEntries(
                            Object.entries(
                                resp as Record<string, { score: number } | number>
                            ).map(([key, value]) =>
                                typeof value === "object" && value !== null && "score" in value
                                    ? [key, value.score]
                                    : [key, value as number]
                            )
                        ),
                    }));

                responsesArray.forEach(({ title, responses }) => {
                    const section = parseInt(title.split(".")[0]);
                    if (section >= 1 && section <= 5) {
                        group[section - 1].push(...Object.values(responses).map(Number));
                    }
                });
            }

            for (const [key, scores] of grouped.entries()) {
                const sectionPercents: string[] = [];
                let totalSum = 0;
                let totalMax = 0;

                scores.forEach((sectionScores) => {
                    const sum = sectionScores.reduce((a, b) => a + b, 0);
                    const max = sectionScores.length * 5;
                    const percent = max ? (sum / max) * 100 : 0;
                    sectionPercents.push(percent.toFixed(2));
                    totalSum += sum;
                    totalMax += max;
                });

                const row = worksheet3.addRow([
                    getLabel(key),
                    ...sectionPercents.map((p) => Math.round(Number(p))),
                    totalMax > 0 ? Math.round((totalSum / totalMax) * 100) : 0,
                ]);

                row.eachCell((cell, colNumber) => {
                    cell.alignment = {
                        horizontal: colNumber === 1 ? "left" : "center",
                        vertical: "middle",
                    };
                    cell.font = { bold: true, size: 16, name: "TH Niramit AS" };
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" },
                    };
                });
            }
        };

        addSummarySection("สรุปผลตามห้อง", (d) => d.room, (room) => `${room}`, true);
        addSummarySection("สรุปผลตามเพศ", (d) => d.gender, (gender) => gender === "อื่น ๆ" ? "เพศทางเลือก" : gender ? `เพศ${gender}` : "ไม่ระบุ");
        addSummarySection("สรุปผลตามสถานภาพ", (d) => d.role, (role) => `${role}`);

        const buffer = await workbook.xlsx.writeBuffer();
        const sanitizeForFilename = (text?: string) => {
            return text?.trim() ? text.replace(/[^\wก-๙]/g, "_").trim() : "";
        };

        const genderPart =
            filter.gender === "อื่น ๆ"
                ? "ที่เป็นเพศทางเลือก"
                : filter.gender
                    ? `ที่เป็นเพศ${sanitizeForFilename(filter.gender)}`
                    : "";

        const parts = [
            sanitizeForFilename(filter.room),
            genderPart,
            filter.role ? `โดย${sanitizeForFilename(filter.role)}` : "",
        ].filter(Boolean);

        const filename = `สรุปผลการประเมิน${parts.join("")}.xlsx`;

        saveAs(
            new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
            filename
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
};