"use client";

import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { LoginButton } from "@/components/365buttonlogin";
import Image from "next/image";

const LoginPage = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (message: string, variant: "success" | "error" | "info" | "warning") => {
        enqueueSnackbar(message, {
            variant,
            autoHideDuration: 4000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    };

    useEffect(() => {
        document.title = "เข้าสู่ระบบผู้ใช้งาน | ระบบจองห้องประชุม ICT";
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
                <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
                    เข้าสู่ระบบจองห้องประชุม ICT
                </Typography>

                <Box>
                    <Box>
                        <LoginButton />
                    </Box>
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

const LoginPageWithSnackbar = () => (
    <SnackbarProvider maxSnack={3}>
        <LoginPage />
    </SnackbarProvider>
);

export default LoginPageWithSnackbar;