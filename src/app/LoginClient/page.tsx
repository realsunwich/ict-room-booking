'use client';

import { Typography, Box } from "@mui/material";
import LoginButton from "@/components/365buttonlogin";
import Image from "next/image";
import { useEffect } from "react";

const LoginClient = () => {
    useEffect(() => {
        document.title = "เข้าสู่ระบบ | ระบบจองห้องประชุม ICT";
    }, []);

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            padding: 2,
        }}>
            <Box sx={{ mt: 10, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
                    เข้าสู่ระบบจองห้องประชุม ICT
                </Typography>

                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={2}>
                    <Box><LoginButton /></Box>
                    <Box>
                        <Image
                            src="/images/University-of-Phayao-logo.jpg"
                            alt="Login with Microsoft 365"
                            width={200}
                            height={50}
                            style={{ display: "block", margin: "0 auto", marginTop: "10px" }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginClient;
