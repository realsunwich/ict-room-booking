"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        document.title = "ภาพรวม | ระบบจองห้องประชุม ICT";

        // if (status === "unauthenticated") {
        //     // ✅ ป้องกัน Router Error ด้วย setTimeout หรือตรวจเช็คว่า browser พร้อม
        //     setTimeout(() => {
        //         router.push("/login");
        //     }, 100);
        // }
    }, []);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "auto",
            bgcolor: "white",
            px: { xs: 2, sm: 4 },
            pt: { xs: 2, sm: 4 },
            pb: 4,
            mt: 10,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        }}>
            <Header />
        </Box>
    );
}
