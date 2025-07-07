import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell } from "recharts";

interface StatusStatsProps {
    statusCounts?: Record<string, number>;
    canceledOrRejected: {
        SendStatus: string;
        RejectReason?: string | null;
        CancelReason?: string | null;
    }[];
}

const statusColors: Record<string, string> = {
    "กำลังรอ": "#1976d2",
    "อนุมัติ": "#7b1fa2",
    "เสร็จสิ้น": "#388e3c",
    "ไม่อนุมัติ": "#d32f2f",
    "ถูกยกเลิก": "#f57c00",
};

export default function StatusStats({ statusCounts, canceledOrRejected }: StatusStatsProps) {
    const chartData = Object.entries(statusCounts || {}).map(([status, count]) => ({
        name: status,
        count,
    }));

    return (
        <Box>
            <Typography variant="subtitle1" fontWeight="bold" mt={2}>สถานะคำขอ</Typography>

            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
                <Box flex={1}>
                    {chartData.map(({ name, count }) => (
                        <Typography key={name} variant="body2" sx={{ ml: 2 }}>
                            คำขอ{name} จำนวน {count} ครั้ง
                        </Typography>
                    ))}

                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>รายการที่ถูกยกเลิก / ไม่อนุมัติ</Typography>
                    {canceledOrRejected.length > 0 ? (
                        canceledOrRejected.map((item, idx) => (
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
                </Box>

                <Box flex={1.5} minWidth={0}>
                    {chartData.length > 0 && (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={chartData}
                                margin={{ top: 10, right: 30, bottom: 30, left: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                                <Tooltip formatter={(value: any) => [`${value} ครั้ง`, "จำนวนคำขอ"]} />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Bar
                                    dataKey="count"
                                    fill="#7b1fa2"
                                    name="จำนวนคำขอ"
                                    barSize={35}
                                    radius={[4, 4, 0, 0]}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={statusColors[entry.name] || "#8884d8"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
