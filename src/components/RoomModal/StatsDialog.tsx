"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

interface MonthlyCount {
    month: string; // เช่น "01", "02", ..., "12"
    count: number;
}

interface YearlyCount {
    year: string; // เช่น "2023", "2024"
    count: number;
}

interface RoomStat {
    RoomName: string;
    totalUsage: number;
    usageByMonth?: MonthlyCount[];
    usageByYear?: YearlyCount[];
}

interface StatsDialogProps {
    open: boolean;
    onClose: () => void;
    stats: RoomStat[];
}

function formatThaiMonthYear(isoMonth: string): string {
    const [yearStr, monthStr] = isoMonth.split("-");
    const year = parseInt(yearStr, 10) + 543;
    const month = parseInt(monthStr, 10);

    const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const thaiMonthName = thaiMonths[month - 1] || "ไม่ทราบเดือน";

    return `${thaiMonthName} ${year}`;
}

function formatThaiYear(year: string): string {
    const thYear = parseInt(year, 10) + 543;
    return `${thYear}`;
}


export default function StatsDialog({ open, onClose, stats }: StatsDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {stats.length === 1 && <DialogTitle>สถิติการใช้งาน {stats[0].RoomName}</DialogTitle>}

            <DialogContent dividers>
                {stats.length === 0 ? (
                    <Typography align="center">ไม่มีข้อมูลสถิติการใช้งาน</Typography>
                ) : (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {stats.map((stat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    bgcolor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold" mb={1}>
                                    ถูกใช้งานทั้งหมด {stat.totalUsage} ครั้ง
                                </Typography>

                                <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={0.5}>
                                    รายเดือน
                                </Typography>
                                {stat.usageByMonth && stat.usageByMonth.length > 0 ? (
                                    stat.usageByMonth.map(({ month, count }) => (
                                        <Typography key={month} variant="body2" sx={{ ml: 2 }}>
                                            {formatThaiMonthYear(month)} {count} ครั้ง
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography variant="body2" sx={{ ml: 2 }}>
                                        ไม่มีข้อมูลรายเดือน
                                    </Typography>
                                )}

                                <Typography variant="subtitle1" fontWeight="bold" mt={2} mb={0.5}>
                                    รายปี
                                </Typography>
                                {stat.usageByYear && stat.usageByYear.length > 0 ? (
                                    stat.usageByYear.map(({ year, count }) => (
                                        <Typography key={year} variant="body2" sx={{ ml: 2 }}>
                                            ปี {formatThaiYear(year)} {count} ครั้ง
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography variant="body2" sx={{ ml: 2 }}>
                                        ไม่มีข้อมูลรายปี
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>ปิด</Button>
            </DialogActions>
        </Dialog>
    );
}
