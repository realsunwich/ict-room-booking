"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import Header from "@/components/header";

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
interface CanceledItem {
    RoomName: string;
    SendStatus: string;
    RejectReason?: string | null;
    CancelReason?: string | null;
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

export default function StatsPage() {
    const searchParams = useSearchParams();
    const room = searchParams.get("room");
    const { data: session } = useSession();

    const [stats, setStats] = useState<RoomStat[]>([]);
    const [canceledOrRejected, setCanceledOrRejected] = useState<CanceledItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/room-usage-stats");
                const data = await res.json();

                if (Array.isArray(data?.stats)) {
                    const filteredStats = room
                        ? data.stats.filter((s: RoomStat) => s.RoomName === room)
                        : data.stats;

                    setStats(filteredStats);
                    setCanceledOrRejected(data.canceledOrRejected || []);
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [room]);

    useEffect(() => {
        if (room) {
            document.title = `สถิติ${room} | ระบบจองห้องประชุม ICT`;
        } else {
            document.title = "สถิติการใช้งานห้องประชุมทั้งหมด | ระบบจองห้องประชุม ICT";
        }
    }, [room]);

    return (
        <Box
            sx={{
                marginTop:
                    session?.user?.role === "User"
                        ? { xs: 23, sm: 15 }
                        : { xs: 19, sm: 15 },
            }}
        >
            <Header />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "auto",
                    bgcolor: "white",
                    px: { xs: 2, sm: 4 },
                    pt: { xs: 2, sm: 4 },
                    pb: 4,
                    mt: 10,
                    borderRadius: 7,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        mb: 4,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {room ? `สถิติการใช้งาน${room}` : "สถิติการใช้งานห้องประชุมทั้งหมด"}
                    </Typography>
                </Box>

                {loading ? (
                    <Box textAlign="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : stats.length === 0 ? (
                    <Typography>ไม่มีข้อมูลสถิติการใช้งาน</Typography>
                ) : (
                    stats.map((stat, index) => (
                        <Box key={index} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h6" fontWeight="bold" mb={1}>
                                {stat.RoomName} ถูกใช้งาน {stat.totalUsage} ครั้ง
                            </Typography>

                            {stat.statusCounts && (
                                <>
                                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>สถานะคำขอ</Typography>
                                    {Object.entries(stat.statusCounts).map(([status, count]) => (
                                        <Typography key={status} variant="body2" sx={{ ml: 2 }}>
                                            คำขอ{status} จำนวน {count} ครั้ง
                                        </Typography>
                                    ))}
                                </>
                            )}

                            <Typography variant="subtitle1" fontWeight="bold" mt={2}>รายการที่ถูกยกเลิก / ไม่อนุมัติ</Typography>
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

                            <Typography variant="subtitle1" fontWeight="bold" mt={1}>รายเดือน</Typography>
                            {Array.isArray(stat.usageByMonth) && stat.usageByMonth.length > 0 ? (
                                stat.usageByMonth.map(({ month, count }) => (
                                    <Typography key={month}>{formatThaiMonthYear(month)} {count} ครั้ง</Typography>
                                ))
                            ) : (
                                <Typography variant="body2" sx={{ ml: 2 }}>ไม่มีข้อมูลรายเดือน</Typography>
                            )}

                            <Typography variant="subtitle1" fontWeight="bold" mt={2}>รายปี</Typography>
                            {Array.isArray(stat.usageByYear) && stat.usageByYear.length > 0 ? (
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
                    ))
                )}
            </Box>
        </Box>
    );
}