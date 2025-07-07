import { Box, Typography } from "@mui/material";

interface MonthlyCount {
    month: string;
    count: number;
}
interface YearlyCount {
    year: string;
    count: number;
}

function formatThaiMonthYear(isoMonth: string): string {
    const [yearStr, monthStr] = isoMonth.split("-");
    const year = parseInt(yearStr, 10) + 543;
    const month = parseInt(monthStr, 10);
    const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    return `${thaiMonths[month - 1] || "ไม่ทราบเดือน"} ${year}`;
}

function formatThaiYear(year: string): string {
    return `${parseInt(year, 10) + 543}`;
}

export default function TimeStats({
    usageByMonth,
    usageByYear,
}: {
    usageByMonth?: MonthlyCount[];
    usageByYear?: YearlyCount[];
}) {
    return (
        <Box>
            <Typography variant="subtitle1" fontWeight="bold" mt={2}>รายเดือน</Typography>
            {Array.isArray(usageByMonth) && usageByMonth.length > 0 ? (
                usageByMonth.map(({ month, count }) => (
                    <Typography key={month} variant="body2" sx={{ ml: 2 }}>
                        {formatThaiMonthYear(month)} {count} ครั้ง
                    </Typography>
                ))
            ) : (
                <Typography variant="body2" sx={{ ml: 2 }}>
                    ไม่มีข้อมูลรายเดือน
                </Typography>
            )}

            <Typography variant="subtitle1" fontWeight="bold" mt={3}>รายปี</Typography>
            {Array.isArray(usageByYear) && usageByYear.length > 0 ? (
                usageByYear.map(({ year, count }) => (
                    <Typography key={year} variant="body2" sx={{ ml: 2 }}>
                        ปี {formatThaiYear(year)} {count} ครั้ง
                    </Typography>
                ))
            ) : (
                <Typography variant="body2" sx={{ ml: 2 }}>
                    ไม่มีข้อมูลรายปี
                </Typography>
            )}
        </Box>
    );
}
