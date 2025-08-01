import { Button } from "@mui/material";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface MonthlyCount {
    month: string;
    count: number;
}
interface YearlyCount {
    year: string;
    count: number;
}
interface RoomStat {
    RoomName: string;
    totalUsage: number;
    totalWorkHours: number;
    totalWorkHoursText?: string;
    usageByMonth?: MonthlyCount[];
    usageByYear?: YearlyCount[];
    statusCounts?: Record<string, number>;
}

interface ExportProps {
    data: RoomStat[];
    filename: string;
}

const FONT_NAME = "TH Niramit AS";
const FONT_SIZE = 16;

export default function ExportRoomStat({ data, }: ExportProps) {
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("สถิติการใช้งาน");

        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();
        const formattedDate = `${day}${month}${year}`;

        const roomName = data[0]?.RoomName || "ไม่ทราบชื่อห้อง";
        const safeRoomName = roomName.replace(/[\\/:*?"<>|]/g, "_");

        const filename = `สถิติ_${safeRoomName}_${formattedDate}.xlsx`;

        const formatThaiMonth = (isoMonth: string): string => {
            const [yearStr, monthStr] = isoMonth.split("-");
            const year = parseInt(yearStr, 10) + 543;
            const month = parseInt(monthStr, 10);
            const thaiMonths = [
                "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
                "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
            ];
            return `${thaiMonths[month - 1] || "ไม่ทราบ"} ${year}`;
        };

        const formatThaiYear = (year: string): string => {
            return `${parseInt(year, 10) + 543}`;
        };

        const headers = [
            "ห้อง", "จำนวนใช้งานรวม", "จำนวนชั่วโมงการใช้งาน", "เดือน", "จำนวน (เดือน)", "ปี", "จำนวน (ปี)", "สถานะ", "จำนวน (สถานะ)"
        ];

        sheet.columns = headers.map((header, idx) => ({
            header,
            key: `col${idx}`,
            width: 20,
        }));

        const headerRow = sheet.getRow(1);
        headerRow.height = 30;
        headerRow.eachCell((cell) => {
            cell.font = { name: FONT_NAME, size: FONT_SIZE, bold: true };
            cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
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

        let currentRow = 2;

        data.forEach(stat => {
            const maxLen = Math.max(
                stat.usageByMonth?.length || 0,
                stat.usageByYear?.length || 0,
                Object.keys(stat.statusCounts || {}).length
            );

            for (let i = 0; i < maxLen; i++) {
                const row = sheet.getRow(currentRow++);
                row.height = 25;

                row.getCell(1).value = i === 0 ? stat.RoomName : "";
                row.getCell(2).value = i === 0 ? stat.totalUsage : "";
                row.getCell(3).value = i === 0 ? stat.totalWorkHoursText : "";
                row.getCell(4).value = stat.usageByMonth?.[i]?.month ? formatThaiMonth(stat.usageByMonth[i].month) : "";
                row.getCell(5).value = stat.usageByMonth?.[i]?.count || "";
                row.getCell(6).value = stat.usageByYear?.[i]?.year ? formatThaiYear(stat.usageByYear[i].year) : "";
                row.getCell(7).value = stat.usageByYear?.[i]?.count || "";

                const statusEntries = Object.entries(stat.statusCounts || {});
                row.getCell(8).value = statusEntries[i]?.[0] || "";
                row.getCell(9).value = statusEntries[i]?.[1] || "";

                row.eachCell((cell, colNumber) => {
                    cell.font = { name: FONT_NAME, size: FONT_SIZE };
                    cell.alignment = {
                        vertical: "middle",
                        horizontal: colNumber === 1
                            ? "left" : "center",
                        wrapText: true,
                    };
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" },
                    };
                });
            }


            currentRow++;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, filename);
    };

    return (
        <Button
            onClick={handleExport}
            variant="outlined"
            color="primary"
            sx={{ mt: 1, mb: 2, ":hover": { backgroundColor: "primary.main", color: "white" } }}
        >
            บันทึกเป็น Excel
        </Button>
    );
}
