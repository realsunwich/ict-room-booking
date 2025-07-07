import { Box, Typography } from "@mui/material";

interface YearlyCount {
    year: string;
    count: number;
}

function formatThaiYear(year: string): string {
    return `${parseInt(year, 10) + 543}`;
}

export default function YearlyStats({ usageByYear }: { usageByYear?: YearlyCount[] }) {
    return (
        <Box>
            <Typography variant="subtitle1" fontWeight="bold" mt={2}>รายปี</Typography>
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
