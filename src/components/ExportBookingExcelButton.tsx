import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

interface ExportBookingExcelButtonProps<T> {
    data: T[];
    columns: {
        header: string;
        key: keyof T;
        width?: number;
    }[];
    filename?: string;
    buttonLabel?: string;

    filterStartDate?: string;
    filterEndDate?: string;
    filterRoom?: string;
    filterStatus?: string;
}

export default function ExportBookingExcelButton<T extends { startDate: string; endDate: string; RoomName: string; SendStatus: string; }>({
    data,
    columns,
    filename,
    buttonLabel = "Export to Excel",
    filterStartDate,
    filterEndDate,
    filterRoom,
    filterStatus,
}: ExportBookingExcelButtonProps<T>) {
    const handleExport = async () => {
        const formatDateThai = (dateStr?: string) => {
            if (!dateStr) return "NA";
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return "NA";
            const yearBE = date.getFullYear() + 543;
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            return `${dd}${mm}${yearBE}`;
        };

        const startPart = formatDateThai(filterStartDate);
        const endPart = formatDateThai(filterEndDate);

        const sanitize = (text?: string) =>
            text?.trim()
                .replace(/[\/\\:*?"<>|]/g, "")
                .replace(/\s+/g, "_")
            || "";

        const roomPart = filterRoom ? `_room-${sanitize(filterRoom)}` : "";
        const statusPart = filterStatus ? `_status-${sanitize(filterStatus)}` : "";


        const dynamicFilename =
            filename
                ? filename
                : (startPart === "NA" || endPart === "NA")
                    ? `booking_history_invalid_Date${roomPart}${statusPart}.xlsx`
                    : `booking_history_${startPart}-${endPart}${roomPart}${statusPart}.xlsx`;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Booking History");

        worksheet.columns = columns.map((col) => ({
            header: col.header,
            key: String(col.key),
            width: col.width,
            style: {
                font: { name: 'TH Niramit AS', size: 14, bold: true },
                alignment: { vertical: 'middle', horizontal: 'center' }
            }
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

        const toThaiDate = (date: Date) => {
            return new Date(date.getTime() + 7 * 60 * 60 * 1000);
        };

        data.forEach((item) => {
            const rowValues: Partial<Record<keyof T, T[keyof T]>> = {};

            columns.forEach((col) => {
                const value = item[col.key];
                if ((col.key === "startDate" || col.key === "endDate") && typeof value === "string") {
                    rowValues[col.key] = toThaiDate(new Date(value)) as T[keyof T];
                } else {
                    rowValues[col.key] = value;
                }
            });

            const row = worksheet.addRow(rowValues);

            columns.forEach((col, idx) => {
                if (col.key === "startDate" || col.key === "endDate") {
                    const cell = row.getCell(idx + 1);
                    cell.numFmt = "HH:mm dd-mm-yyyy ";
                }
            });
        });

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {
                row.eachCell((cell) => {
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

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, dynamicFilename);
    };

    return (
        <Button variant="outlined" color="primary" onClick={handleExport}
            sx={{ ":hover": { backgroundColor: "primary.main", color: "white" } }}
        >
            {buttonLabel}
        </Button>
    );
}