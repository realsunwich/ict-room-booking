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
    }, []);

    return (
        <Box sx={{ marginTop: { xs: 21, sm: 17 } }}>
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
                    borderRadius: 7,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Box>
                    ส่วนของปฏิทินการจองห้องประชุมจะถูกแสดงที่นี่
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 24, right: 24,
                        bgcolor: "background.paper",
                        p: 2, borderRadius: 2, boxShadow: 2, minWidth: 250,
                    }}
                >
                    <Typography variant="body2" gutterBottom>
                        ผู้รับผิดชอบ : นายอนุวัฒน์ โลมากุล
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        ตำแหน่ง : นักวิชาการโสตทัศนศึกษา
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        เบอร์โทรติดต่อ : 098-9562398
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
