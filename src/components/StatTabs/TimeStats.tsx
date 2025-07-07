import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

interface MonthlyCount {
    month: string;
    count: number;
}
interface YearlyCount {
    year: string;
    count: number;
}
interface Props {
    usageByMonth?: MonthlyCount[];
    usageByYear?: YearlyCount[];
}

const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

function formatThaiMonth(isoMonth: string): string {
    const [year, month] = isoMonth.split("-");
    const monthIndex = +month - 1;
    const thaiMonth = thaiMonths[monthIndex] || "ไม่ทราบเดือน";
    const buddhistYear = +year + 543;
    return `เดือน${thaiMonth} ${buddhistYear}`;
}

function formatThaiYear(year: string): string {
    return `ปี ${+year + 543}`;
}

function ChartSection({
    title,
    rawData,
    formatLabel,
    barColor,
    chartLabel,
}: {
    title: string;
    rawData: { label: string; value: number }[];
    formatLabel: (label: string) => string;
    barColor: string;
    chartLabel: string;
}) {
    const chartData = rawData.map(({ label, value }) => ({
        name: formatLabel(label),
        count: value
    }));

    return (
        <Box>
            <Typography variant="h6" fontWeight="bold">
                {title}
            </Typography>

            {rawData.length === 0 ? (
                <Typography variant="body2">ไม่มีข้อมูล</Typography>
            ) : (
                <Box display="flex" flexDirection={{ xs: "column", md: "row" }} >
                    <Box flex={1}>
                        {rawData.map(({ label, value }) => (
                            <Typography key={label} variant="body2" mb={0.5}>
                                {formatLabel(label)} จำนวน {value} ครั้ง
                            </Typography>
                        ))}
                    </Box>

                    <Box flex={2} minWidth={0}>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                                data={chartData}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    interval={0}
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(label) => label.replace("เดือน", "").replace("ปี ", "")}
                                />
                                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value: any) => [`${value} ครั้ง`, "จำนวนการใช้งาน"]}
                                />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Bar
                                    dataKey="count"
                                    fill={barColor}
                                    name={chartLabel}
                                    barSize={35}
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default function TimeStats({ usageByMonth = [], usageByYear = [] }: Props) {
    const monthData = usageByMonth.map(({ month, count }) => ({
        label: month,
        value: count
    }));

    const yearData = usageByYear.map(({ year, count }) => ({
        label: year,
        value: count
    }));

    return (
        <Box display="flex" flexDirection="column" >
            <ChartSection
                title="รายเดือน"
                rawData={monthData}
                formatLabel={formatThaiMonth}
                barColor="#1976d2"
                chartLabel="สถิติการใช้งานรายเดือน"
            />
            <ChartSection
                title="รายปี"
                rawData={yearData}
                formatLabel={formatThaiYear}
                barColor="#388e3c"
                chartLabel="สถิติการใช้งานรายปี"
            />
        </Box>
    );
}