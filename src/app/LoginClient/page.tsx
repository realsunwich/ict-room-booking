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
        <>
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    height: "100vh",
                    backgroundImage: "url('/images/up.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(2px)",
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 6,
                        maxWidth: 420,
                        width: "100%",
                        bgcolor: "white",
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
                        เข้าสู่ระบบจองห้องประชุม ICT
                    </Typography>

                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
                        <LoginButton />
                        <Image
                            src="/images/University-of-Phayao-logo.jpg"
                            alt="Login with Microsoft 365"
                            width={200}
                            height={50}
                            style={{ marginTop: "10px" }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default LoginClient;
