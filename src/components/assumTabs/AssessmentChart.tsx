"use client";

import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#1976d2", "#dc004e", "#388e3c", "#fbc02d", "#7b1fa2", "#ffa726", "#00838f", "#d32f2f"];

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

export default function AssessmentChart({
    data,
}: {
    data: AssessmentDetail[];
}) {
    const calculateAveragePercentages = () => {
        const roomMap: Record<string, { totalScore: number; maxScore: number }> = {};
        let totalScore = 0;
        let maxScore = 0;

        data.forEach(({ room, responses }) => {
            const responsesArray = Array.isArray(responses)
                ? responses
                : Object.entries(responses).map(([title, resp]) => ({
                    title,
                    responses: Object.fromEntries(
                        Object.entries(resp as Record<string, ResponseInit | number>).map(([key, value]) =>
                            typeof value === "object" && value !== null && "score" in value
                                ? [key, value.score]
                                : [key, value as number]
                        ),
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
            average: maxScore > 0 ? parseFloat(((totalScore / maxScore) * 100).toFixed(2)) : 0,
        }));
    };

    const chartData = calculateAveragePercentages();

    return (
        <Box>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="room" />
                    <YAxis unit="%" domain={[0, 100]} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                    <Bar dataKey="average">
                        {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2, textAlign: "center" }}>
                กราฟแสดงคะแนนเฉลี่ยรายห้อง (%)
            </Typography>
        </Box>
    );
}
