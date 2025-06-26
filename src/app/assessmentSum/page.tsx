"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper, Divider, Table, TableBody, TableRow, TableCell, } from "@mui/material";
import Header from "@/components/header";
import AssessmentFilter, { FilterOptions } from "@/components/AssessmentFilter";

interface AssessmentDetail {
    id: string;
    room: string;
    gender: string;
    role: string;
    comment: string;
    responses: {
        title: string;
        responses: Record<string, { label: string; score: number }> | Record<string, number>;
    }[];
}

function RenderResponses({
    responses,
}: {
    responses: { title: string; responses: Record<string, number> }[];
}) {
    const grandTotalScore = responses.reduce(
        (sum, { responses }) =>
            sum + Object.values(responses).reduce((s, v) => s + v, 0),
        0
    );
    const grandMaxScore = responses.reduce(
        (sum, { responses }) => sum + Object.keys(responses).length * 5,
        0
    );
    const grandPercentage = grandMaxScore > 0 ? (grandTotalScore / grandMaxScore) * 100 : 0;

    return (
        <Box>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                คะแนนรวมทั้งหมด ({grandPercentage.toFixed(2)}%)
            </Typography>

            {responses
                .sort((a, b) => {
                    const getGroupNumber = (title: string) => parseInt(title.split(".")[0]) || 99;
                    return getGroupNumber(a.title) - getGroupNumber(b.title);
                })
                .map(({ title, responses: questions }) => {
                    const totalScore = Object.values(questions).reduce((sum, score) => sum + score, 0);
                    const maxScore = Object.keys(questions).length * 5;
                    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

                    return (
                        <Box key={title} sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                {title} — {percentage.toFixed(2)}%
                            </Typography>
                            <Table size="small" sx={{ maxWidth: 400 }}>
                                <TableBody>
                                    {Object.entries(questions)
                                        .sort(([a], [b]) => {
                                            const parse = (str: string) =>
                                                str.match(/^\d+\.\d+/)?.[0]?.split(".").map(Number) ?? [99];
                                            const [aMain = 0, aSub = 0] = parse(a);
                                            const [bMain = 0, bSub = 0] = parse(b);
                                            return aMain - bMain || aSub - bSub;
                                        })
                                        .map(([label, score]) => (
                                            <TableRow key={label}>
                                                <TableCell>{label}</TableCell>
                                                <TableCell align="right">{score}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                    );
                })}
        </Box>
    );
}

interface Summary {
    total: number;
    assessments: AssessmentDetail[];
}

export default function AssessmentSum() {
    const { data: session } = useSession();
    const [showContact, setShowContact] = useState(true);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterOptions>({
        room: "",
        role: "",
        gender: "",
    });

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
        document.title = "สรุปผลการประเมิน | ระบบจองห้องประชุม ICT";
    }, []);

    const rooms = summary ? [...new Set(summary.assessments.map((a) => a.room))].filter(Boolean) : [];
    const roles = summary ? [...new Set(summary.assessments.map((a) => a.role))].filter(Boolean) : [];
    const genders = summary ? [...new Set(summary.assessments.map((a) => a.gender))].filter(Boolean) : [];

    const filteredAssessments = summary
        ? summary.assessments.filter((a) =>
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
                        Object.entries(resp as Record<string, any>).map(([key, value]) =>
                            typeof value === "object" && value !== null && "score" in value
                                ? [key, value.score]
                                : [key, value as number]
                        )
                    ),
                }));

            responsesArray.forEach(({ responses: questions }) => {
                Object.values(questions).forEach((score) => {
                    totalScore += score ?? 0;
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
        <Box sx={{ marginTop: session?.user?.role === "User" ? { xs: 23, sm: 15 } : { xs: 19, sm: 15 } }}>
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
                            🔢 ผลการประเมินทั้งหมด {filteredAssessments.length} ครั้ง
                            {filteredAssessments.length !== summary.total && ` จากทั้งหมด ${summary.total} ครั้ง`}
                        </Typography>
                        {filteredAssessments.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        flexWrap: "wrap",
                                        alignItems: { xs: "flex-start", sm: "center" },
                                        gap: { xs: 0.5, sm: 2 },
                                    }}
                                >
                                    <Typography variant="body1" fontWeight={600} sx={{ minWidth: "fit-content" }}>
                                        🏢 คะแนนเฉลี่ยรายห้อง
                                    </Typography>
                                    {calculateRoomAveragePercentages(filteredAssessments).map((room) => (
                                        <Typography
                                            key={room.room}
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: "0.9rem", sm: "1rem" },
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {room.room} มีผลการประเมิน {room.average.toFixed(2)}%
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        )}
                        <Divider sx={{ my: 2 }} />
                        {summary.assessments?.length === 0 && (
                            <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}>
                                ไม่มีข้อมูลการประเมิน
                            </Typography>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                flexWrap: "wrap",
                                gap: 2,
                                justifyContent: { sm: "flex-start" },
                            }}
                        >
                            {filteredAssessments.length > 0 ? (
                                filteredAssessments.map((item, index) => (
                                    <Paper
                                        key={index}
                                        sx={{
                                            p: { xs: 1.5, sm: 2 },
                                            borderRadius: 2,
                                            boxShadow: 1,
                                            width: { xs: "100%", sm: "calc(25% - 16px)" },
                                            minWidth: 200,
                                        }}
                                        elevation={2}
                                    >
                                        <Typography variant="h6" fontWeight={600}>
                                            รหัสการประเมิน {index + 1}
                                        </Typography>
                                        <Typography variant="body2">สถานที่ {item.room}</Typography>
                                        <Typography variant="body2">เพศ {item.gender}</Typography>
                                        <Typography variant="body2">สถานภาพ {item.role}</Typography>
                                        <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                                            ความคิดเห็น {item.comment || "-"}
                                        </Typography>
                                        <Typography sx={{ mt: 1, fontWeight: 400 }}>
                                            รายละเอียดการประเมิน
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 2,
                                                p: { xs: 1, sm: 2 },
                                                borderRadius: 1,
                                                overflowX: "auto",
                                                maxHeight: { xs: 220, sm: 300 },
                                            }}
                                        >
                                            <RenderResponses
                                                responses={
                                                    Array.isArray(item.responses)
                                                        ? item.responses.map(({ title, responses }) => ({
                                                            title,
                                                            responses: Object.fromEntries(
                                                                Object.entries(responses).map(([key, value]) =>
                                                                    typeof value === "object" && value !== null && "score" in value
                                                                        ? [key, value.score]
                                                                        : [key, value as number]
                                                                )
                                                            ),
                                                        }))
                                                        : Object.entries(item.responses).map(([title, resp]) => ({
                                                            title,
                                                            responses: Object.fromEntries(
                                                                Object.entries(resp as Record<string, any>).map(([key, value]) =>
                                                                    typeof value === "object" && value !== null && "score" in value
                                                                        ? [key, value.score]
                                                                        : [key, value as number]
                                                                )
                                                            ),
                                                        }))
                                                }
                                            />
                                        </Box>
                                    </Paper>
                                ))
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: 200,
                                    }}>
                                    <Typography
                                        variant="body1"
                                        sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
                                    >
                                        ไม่มีข้อมูลที่ตรงกับเงื่อนไข
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </>
                ) : (
                    <Typography color="error">ไม่พบข้อมูลสรุป</Typography>
                )}
            </Box>
        </Box>
    );
}
