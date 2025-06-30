"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, } from "@mui/material";

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

interface StatsDialogProps {
    open: boolean;
    onClose: () => void;
    stats: RoomStat[];
    statusCounts: Record<string, number>;
    canceledOrRejected: {
        RoomName: string;
        SendStatus: string;
        RejectReason?: string | null;
        CancelReason?: string | null;
    }[];
}

function formatThaiMonthYear(isoMonth: string): string {
    const [yearStr, monthStr] = isoMonth.split("-");
    const year = parseInt(yearStr, 10) + 543;
    const month = parseInt(monthStr, 10);
    const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    return `${thaiMonths[month - 1] || "ไม่ทราบเดือน"} ${year}`;
}

function formatThaiYear(year: string): string {
    return `${parseInt(year, 10) + 543}`;
}

export default function StatsDialog({
    open,
    onClose,
    stats,
    canceledOrRejected,
}: StatsDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>สถิติการใช้งานห้องประชุม</DialogTitle>

            <DialogContent dividers>
                {/* สถิติรายห้อง */}
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
                                    {stat.RoomName} ถูกใช้งาน {stat.totalUsage} ครั้ง
                                </Typography>

                                {/* แสดงสถานะคำขอในแต่ละห้อง */}
                                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                                    สถิติการใช้งานห้องประชุม
                                </Typography>
                                {stat.statusCounts && Object.entries(stat.statusCounts).map(([status, count]) => (
                                    <Typography key={status} variant="body2" sx={{ ml: 2 }}>
                                        คำขอ{status} จำนวน {count} ครั้ง
                                    </Typography>
                                ))}
                                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                                    รายการที่ถูกยกเลิก / ไม่อนุมัติ
                                </Typography>
                                {canceledOrRejected.filter(item => item.RoomName === stat.RoomName).length > 0 ? (
                                    canceledOrRejected
                                        .filter(item => item.RoomName === stat.RoomName)
                                        .map((item, idx) => (
                                            <Box key={idx} sx={{ ml: 2, mb: 1 }}>
                                                <Typography variant="body2">
                                                    สถานะคำขอ <strong>{item.SendStatus}</strong>
                                                </Typography>
                                                {item.CancelReason && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        เหตุผล {item.CancelReason}
                                                    </Typography>
                                                )}
                                                {item.RejectReason && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        เหตุผล {item.RejectReason}
                                                    </Typography>
                                                )}
                                            </Box>
                                        ))
                                ) : (
                                    <Typography variant="body2" sx={{ ml: 2 }}>
                                        ไม่มีรายการถูกยกเลิกหรือไม่อนุมัติ
                                    </Typography>
                                )}

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
