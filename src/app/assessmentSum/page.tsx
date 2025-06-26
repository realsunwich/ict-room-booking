"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Tooltip,
    CircularProgress,
    Paper,
    Divider,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Header from "@/components/header";

interface AssessmentDetail {
    id: string;
    room: string;
    gender: string;
    role: string;
    comment: string;
    responses: {
        title: string;
        responses: Record<string, { label: string; score: number }>;
    }[];
}

function RenderResponses({
    responses,
}: {
    responses: { title: string; responses: Record<string, number> }[];
}) {
    let grandTotalScore = 0;
    let grandMaxScore = 0;

    return (
        <Box>
            {responses
                .sort((a, b) => {
                    const getGroupNumber = (title: string) => parseInt(title.split(".")[0]) || 99;
                    return getGroupNumber(a.title) - getGroupNumber(b.title);
                })
                .map(({ title, responses: questions }) => {
                    const totalScore = Object.values(questions).reduce((sum, score) => sum + score, 0);
                    const maxScore = Object.keys(questions).length * 5;
                    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

                    // สะสมคะแนนรวมทั้งหมด
                    grandTotalScore += totalScore;
                    grandMaxScore += maxScore;

                    return (
                        <Box key={title} sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                คะแนนรวมทั้งหมด ({((grandTotalScore / grandMaxScore) * 100).toFixed(2)}%)
                            </Typography>

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
    const [showContact, setShowContact] = useState(true);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <Box sx={{ marginTop: { xs: 25, sm: 15 } }}>
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
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight={600}>
                        สรุปผลการประเมินห้องประชุม
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : summary ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            🔢 ผลการประเมินทั้งหมด {summary.total} ครั้ง
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {summary.assessments?.length === 0 && (
                            <Typography>ไม่มีข้อมูลการประเมิน</Typography>
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
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    flexWrap: "wrap",
                                    gap: 2,
                                    justifyContent: { sm: "flex-start" },
                                }}
                            >
                                {summary.assessments?.length > 0 &&
                                    summary.assessments.map((item, index) => (
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
                                                    responses={Array.isArray(item.responses)
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
                                                        : Object.entries(item.responses).map(([title, responses]) => ({
                                                            title,
                                                            responses: Object.fromEntries(
                                                                Object.entries(responses as Record<string, any>).map(([key, value]) =>
                                                                    typeof value === "object" && value !== null && "score" in value
                                                                        ? [key, value.score]
                                                                        : [key, value as number]
                                                                )
                                                            ),
                                                        }))}
                                                />
                                            </Box>
                                        </Paper>
                                    ))
                                }
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Typography color="error">ไม่พบข้อมูลสรุป</Typography>
                )}

                <Box
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 1,
                    }}
                >
                    {showContact && (
                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                p: 2,
                                borderRadius: 2,
                                boxShadow: 2,
                                minWidth: 250,
                            }}
                        >
                            <Typography variant="body2" gutterBottom>
                                ผู้รับผิดชอบ : นายอนุวัฒน์ โลมากุล
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                ตำแหน่ง : นักวิชาการโสตทัศนศึกษา
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                เบอร์โทรติดต่อ : 098-9562398
                            </Typography>
                        </Box>
                    )}
                    <Tooltip title={showContact ? "ซ่อนข้อมูลติดต่อ" : "แสดงข้อมูลติดต่อ"}>
                        <Button
                            onClick={() => setShowContact((prev) => !prev)}
                            sx={{
                                minWidth: 0,
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                color: "white",
                                "&:hover": { bgcolor: "primary.dark" },
                            }}
                        >
                            {showContact ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
}
