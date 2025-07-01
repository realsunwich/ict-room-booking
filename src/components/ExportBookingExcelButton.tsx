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
}

export default function ExportBookingExcelButton<T>({
    data,
    columns,
    filename = "booking_history.xlsx",
    buttonLabel = "Export to Excel",
}: ExportBookingExcelButtonProps<T>) {
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Booking History");

        worksheet.columns = columns.map((col) => ({
            ...col,
            key: String(col.key),
        }));
        data.forEach((item) => {
            worksheet.addRow(item);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, filename);
    };

    return (
        <Button variant="outlined" color="primary" onClick={handleExport}
            sx={{ ":hover": { backgroundColor: "primary.main", color: "white" } }}
        >
            {buttonLabel}
        </Button>
    );
}