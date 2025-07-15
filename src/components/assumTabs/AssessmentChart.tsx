"use client";

import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

        data.forEach(({ room, responses }) => {
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

            const totalScore = responsesArray.reduce((sumResponses, { responses: questions }) => {
                const sumScores = Object.values(questions).reduce((s, score) => s + score, 0);
                return sumResponses + sumScores;
            }, 0);

            const maxScore = responsesArray.reduce((sumMax, { responses: questions }) => {
                return sumMax + Object.keys(questions).length * 5;
            }, 0);

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
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                กราฟแสดงคะแนนเฉลี่ยรายห้อง (%)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="room" />
                    <YAxis unit="%" domain={[0, 100]} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                    <Bar dataKey="average" fill="#1976d2" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}
