"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Divider,
    Tabs,
    Tab,
} from "@mui/material";

import Header from "@/components/header";
import AssessmentFilter, { FilterOptions } from "@/components/AssessmentFilter";
import ExportAssessmentExcel from "@/components/ExportExcel/ExportAssessmentExcel";

import AssessmentList from "@/components/assumTabs/AssessmentList";
import AssessmentChart from "@/components/assumTabs/AssessmentChart";

interface AssessmentDetail {
    id: string;
    room: string;
    gender: string;
    role: string;
    comment: string;
    responses: {
        title: string;
        responses: Record<string, number>;
    }[];
}

interface Summary {
    total: number;
    assessments: AssessmentDetail[];
}

export default function AssessmentSum() {
    const { data: session } = useSession();
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterOptions>({
        room: "",
        role: "",
        gender: "",
    });
    const [tab, setTab] = useState(0);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch("/api/assessment/summary");
                const data = await res.json();
                setSummary(data);
            } catch (err) {
                console.error("ไม่สามารถโหลดสรุปผลได้", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    useEffect(() => {
        document.title = "สรุปผลการประเมิน | ระบบจองห้องประชุม ICT";
    })

    const rooms = summary ? [...new Set(summary.assessments.map((a) => a.room))].filter(Boolean) : [];
    const roles = summary ? [...new Set(summary.assessments.map((a) => a.role))].filter(Boolean) : [];
    const genders = summary ? [...new Set(summary.assessments.map((a) => a.gender))].filter(Boolean) : [];

    const filteredAssessments = summary
        ? summary.assessments.filter(
            (a) =>
                (!filter.room || a.room === filter.room) &&
                (!filter.role || a.role === filter.role) &&
                (!filter.gender || a.gender === filter.gender)
        )
        : [];

    function calculateRoomAveragePercentages(assessments: AssessmentDetail[]) {
        const roomMap: Record<string, { totalScore: number; maxScore: number }> = {};

        assessments.forEach(({ room, responses }) => {
            let totalScore = 0;
            let maxScore = 0;

            const responsesArray = Array.isArray(responses)
                ? responses
                : Object.entries(responses).map(([title, resp]) => ({
                    title,
                    responses: Object.fromEntries(
                        Object.entries(resp as Record<string, ResponseInit | number>).map(([key, value]) =>
                            typeof value === "object" && value !== null && "score" in value
                                ? [key, value.score]
                                : [key, value as number]
                        )
                    ),
                }));

            responsesArray.forEach(({ responses: questions }) => {
                Object.values(questions).forEach((score) => {
                    const numericScore = typeof score === "number"
                        ? score
                        : (typeof score === "object" && score !== null && "score" in score)
                            ? (score as { score: number }).score
                            : 0;
                    totalScore += numericScore;
                    maxScore += 5;
                });
            });

            if (!roomMap[room]) roomMap[room] = { totalScore: 0, maxScore: 0 };
            roomMap[room].totalScore += totalScore;
            roomMap[room].maxScore += maxScore;
        });

        return Object.entries(roomMap).map(([room, { totalScore, maxScore }]) => ({
            room,
            average: maxScore > 0 ? (totalScore / maxScore) * 100 : 0,
        }));
    }

    return (
        <Box
            sx={{
                marginTop: session?.user?.role === "User" ? { xs: 23, sm: 15 } : { xs: 19, sm: 15 },
            }}
        >
            <Header />
            <Box
                sx={{
                    bgcolor: "white",
                    px: { xs: 2, sm: 4 },
                    pt: { xs: 2, sm: 4 },
                    pb: 4,
                    mt: 10,
                    borderRadius: 7,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5" fontWeight={600}>
                        สรุปผลการประเมินห้องประชุม
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ mt: 5, mb: 3, px: { xs: 1, sm: 2 } }}>
                    <AssessmentFilter
                        filter={filter}
                        setFilter={setFilter}
                        availableRooms={rooms}
                        availableRoles={roles}
                        availableGenders={genders}
                    />
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : summary ? (
                    <>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                            ผลการประเมินทั้งหมด {filteredAssessments.length} ครั้ง
                        </Typography>
                        {filteredAssessments.length !== summary.total && ` จากทั้งหมด ${summary.total} ครั้ง`}
                        {filteredAssessments.length > 0 && (
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                                    <Typography variant="body1" fontWeight={600} sx={{ minWidth: "fit-content" }}>
                                        คะแนนเฉลี่ยรายห้อง
                                    </Typography>
                                    {calculateRoomAveragePercentages(filteredAssessments)
                                        .sort((a, b) => a.room.localeCompare(b.room))
                                        .map((room, idx) => (
                                            <Typography
                                                key={room.room}
                                                variant="body2"
                                                sx={{
                                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                                    whiteSpace: "nowrap",
                                                    mr: idx !== calculateRoomAveragePercentages(filteredAssessments).length - 1 ? 2 : 0,
                                                }}
                                            >
                                                {room.room} {room.average.toFixed(2)}%
                                            </Typography>
                                        ))
                                    }
                                </Box>
                                <Box>
                                    <ExportAssessmentExcel data={filteredAssessments} filter={filter} />
                                </Box>
                            </Box>
                        )}

                        {summary.assessments?.length === 0 && (
                            <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}>
                                ไม่มีข้อมูลการประเมิน
                            </Typography>
                        )}

                        <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} sx={{ mb: 2 }}>
                            <Tab label="รายการประเมิน" />
                            <Tab label="กราฟสรุป" />
                        </Tabs>

                        {tab === 0 && <AssessmentList data={filteredAssessments} />}
                        {tab === 1 && <AssessmentChart data={filteredAssessments} />}
                    </>
                ) : (
                    <Typography color="error">ไม่พบข้อมูลสรุป</Typography>
                )}
            </Box>
        </Box>
    );
}