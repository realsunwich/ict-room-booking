"use client";

import { Box, Paper, Typography, Table, TableBody, TableCell, TableRow } from "@mui/material";

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

export default function AssessmentList({
    data,
}: {
    data: AssessmentDetail[];
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
            }}
        >
            {data.map((item, index) => (
                <Paper
                    key={item.id}
                    sx={{
                        p: 2,
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
                    <Box
                        sx={{
                            mt: 1,
                            maxHeight: 250,
                            overflowY: "auto",
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
                                            Object.entries(resp as Record<string, { score: number } | number>).map(([key, value]) =>
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
            ))}
        </Box>
    );
}
