// File: StatsPage.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Tabs, Tab } from "@mui/material";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import ExportRoomStat from "@/components/ExportExcel/ExportRoomStat";
import MonthlyStats from "@/components/StatTabs/MonthlyStats";
import YearlyStats from "@/components/StatTabs/YearlyStats";
import StatusStats from "@/components/StatTabs/StatusStats";


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

export default function StatsPage() {
    const searchParams = useSearchParams();
    const room = searchParams.get("room");
    const { data: session } = useSession();

    const [stats, setStats] = useState<RoomStat[]>([]);
    const [canceledOrRejected, setCanceledOrRejected] = useState<CanceledItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);

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
        document.title = room
            ? `สถิติ${room} | ระบบจองห้องประชุม ICT`
            : "สถิติการใช้งานห้องประชุม | ระบบจองห้องประชุม ICT";
    }, [room]);

    return (
        <Box
            sx={{
                marginTop: session?.user?.role === "User" ? { xs: 23, sm: 15 } : { xs: 19, sm: 15 },
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
                <Typography variant="h5" align="center" fontWeight={600} mb={2}>
                    {room ? `สถิติการใช้งาน${room}` : "สถิติการใช้งานห้องประชุม"}
                </Typography>

                {loading ? (
                    <Box textAlign="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Tabs
                            value={tabIndex}
                            onChange={(_, val) => setTabIndex(val)}
                            centered
                            sx={{ mb: 3 }}
                        >
                            <Tab label="รายเดือน" />
                            <Tab label="รายปี" />
                            <Tab label="สถานะและเหตุผล" />
                        </Tabs>

                        {tabIndex === 0 && (
                            <MonthlyStats usageByMonth={stats[0]?.usageByMonth} />
                        )}
                        {tabIndex === 1 && (
                            <YearlyStats usageByYear={stats[0]?.usageByYear} />
                        )}
                        {tabIndex === 2 && (
                            <StatusStats
                                statusCounts={stats[0]?.statusCounts}
                                canceledOrRejected={canceledOrRejected}
                            />
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}