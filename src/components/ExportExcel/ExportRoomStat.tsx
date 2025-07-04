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
    usageByMonth?: MonthlyCount[];
    usageByYear?: YearlyCount[];
    statusCounts?: Record<string, number>;
}

interface ExportProps {
    data: RoomStat[];
    filename: string;
    buttonLabel?: string;
}

export default function ExportRoomStat({ data, filename, buttonLabel = "Export" }: ExportProps) {
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Room Stats");

        // Add header
        sheet.addRow(["ห้อง", "จำนวนใช้งานรวม", "เดือน", "จำนวน (เดือน)", "ปี", "จำนวน (ปี)", "สถานะ", "จำนวน (สถานะ)"]);

        data.forEach(stat => {
            const maxLen = Math.max(
                stat.usageByMonth?.length || 0,
                stat.usageByYear?.length || 0,
                Object.keys(stat.statusCounts || {}).length
            );

            for (let i = 0; i < maxLen; i++) {
                sheet.addRow([
                    i === 0 ? stat.RoomName : "",
                    i === 0 ? stat.totalUsage : "",
                    stat.usageByMonth?.[i]?.month || "",
                    stat.usageByMonth?.[i]?.count || "",
                    stat.usageByYear?.[i]?.year || "",
                    stat.usageByYear?.[i]?.count || "",
                    Object.entries(stat.statusCounts || {})[i]?.[0] || "",
                    Object.entries(stat.statusCounts || {})[i]?.[1] || "",
                ]);
            }

            sheet.addRow([]); // blank row between rooms
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
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
