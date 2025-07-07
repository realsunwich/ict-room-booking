import { Suspense, useEffect } from "react";
import StatsClient from "@/components/StatsClient";
import { Box } from "@mui/material";

export default function BookingStatPage() {
    useEffect(() => {
        document.title = "กำลังดึงข้อมูล...";
    }, []);

    return (
        <Suspense fallback={<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={2} marginTop={40}>กำลังดึงข้อมูล...</Box>}>
            <StatsClient />
        </Suspense>
    );
}