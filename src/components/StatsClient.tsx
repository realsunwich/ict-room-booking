"use client";

import React from "react";
import { Box, Typography, CircularProgress, Tabs, Tab, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import ExportRoomStat from "@/components/ExportExcel/ExportRoomStat";

import TimeStats from "@/components/StatTabs/TimeStats";
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

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
    return value === index ? <Box sx={{ px: 2 }}>{children}</Box> : null;
}

export default function StatsPage() {
    const searchParams = useSearchParams();
    const room = searchParams.get("room");
    const { data: session } = useSession();
    const router = useRouter();

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
                marginTop:
                    session?.user?.role === "1"
                        ? { xs: 28, sm: 15 }
                        : { xs: 23, sm: 15 },
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
                <Typography
                    variant="h5"
                    align="center"
                    fontWeight={600}
                    mb={2}
                    fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
                >
                    {room ? `สถิติการใช้งาน${room}` : "สถิติการใช้งานห้องประชุม"}
                </Typography>

                {loading ? (
                    <Box textAlign="center">
                        <CircularProgress />
                    </Box>
                ) : stats.length === 0 ? (
                    <Typography variant="body1" textAlign="center" mt={4}>
                        ไม่มีข้อมูลสถิติการใช้งาน
                    </Typography>
                ) : (
                    stats.map((stat, index) => (
                        <Box key={index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 2,
                                    textAlign: { xs: "center", sm: "left" },
                                    width: "100%",
                                    mb: 2,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => router.push("/dashboard")}
                                    startIcon={<ArrowBackIcon />}
                                    sx={{ whiteSpace: "nowrap" }}
                                >
                                    กลับไปยังหน้าปฏิทิน
                                </Button>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    fontSize={{ xs: "1rem", sm: "1.25rem" }}
                                    sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}
                                >
                                    {stat.RoomName} ถูกใช้งาน {stat.totalUsage} ครั้ง
                                </Typography>

                                <Box>
                                    <ExportRoomStat
                                        data={[stat]}
                                        filename={`สถิติ${stat.RoomName}.xlsx`}
                                    />
                                </Box>
                            </Box>

                            <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)}
                                sx={{
                                    mb: 2,
                                    "& .MuiTabs-flexContainer": {
                                        justifyContent: { xs: "center", sm: "flex-start" },
                                    },
                                }}
                            >
                                <Tab label="การใช้งานตามช่วงเวลา" />
                                <Tab label="สถานะและเหตุผล" />
                            </Tabs>

                            <TabPanel value={tabIndex} index={0}>
                                <TimeStats usageByMonth={stat.usageByMonth} usageByYear={stat.usageByYear} />
                            </TabPanel>

                            <TabPanel value={tabIndex} index={1}>
                                <StatusStats statusCounts={stat.statusCounts} canceledOrRejected={canceledOrRejected.filter(item => item.RoomName === stat.RoomName)} />
                            </TabPanel>
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    );
}