"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

export default function Roles() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        document.title = "จัดการบทบาท | ระบบจองห้องประชุม ICT";
    }, []);

    return (
        <Box sx={{ marginTop: { xs: 2, sm: 10 } }}>
            <Header />
            <Box
                sx={{
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
                }}
            >
                <Typography variant="h5" gutterBottom>
                    จัดการบทบาท
                </Typography>
            </Box>
        </Box>
    );
}
