"use client";

import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Snackbar, Alert, } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import BadgeIcon from "@mui/icons-material/Badge";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { useRouter } from "next/navigation";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssessmentModal from "@/components/AssessmentModal";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import FeedbackIcon from '@mui/icons-material/Feedback';
import WebIcon from '@mui/icons-material/Web';

const Header = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error" | "warning" | "info"
    >("info");

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    const showSnackbar = (
        message: string,
        severity: "success" | "error" | "warning" | "info" = "info"
    ) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("signature", file);

        try {
            const res = await fetch("/api/uploadSignature", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                showSnackbar("อัปโหลดลายเซ็นสำเร็จ: " + data.message, "success");
            } else {
                showSnackbar("เกิดข้อผิดพลาดในการอัปโหลด: " + data.message, "error");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            showSnackbar("เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
        }
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Toolbar sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                        sx={{ display: "flex", alignItems: "center", py: 2, cursor: { xs: "pointer", sm: "default" }, width: 120 }}
                        onClick={() => {
                            if (window.innerWidth < 600) {
                                router.push("/dashboard");
                            }
                        }}
                    >
                        <Box position="relative" width={70} height={70}>
                            <Image
                                src="/images/brand.png"
                                alt="ICT Logo"
                                fill
                                sizes="(max-width: 600px) 50vw, 100px"
                                style={{ objectFit: "contain" }}
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            textAlign: "center",
                            display: { xs: "none", sm: "block" },
                            flexGrow: 1, px: 2
                        }}
                    >
                        <Typography
                            variant="h5"
                            align="center"
                            noWrap
                            sx={{ fontWeight: 900, cursor: "pointer" }}
                            onClick={() => router.push("/dashboard")}
                        >
                            ระบบขอจองใช้บริการห้องประชุมคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                        </Typography>

                        {session?.user?.role === "User" && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "100%",
                                    flexWrap: "wrap",
                                    top: 0,
                                }}
                            >
                                <Button
                                    startIcon={<MeetingRoomIcon />}
                                    onClick={() => router.push("/dashboard")}
                                    sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                >
                                    ห้องประชุม
                                </Button>
                                <Button
                                    startIcon={<FolderCopyIcon />}
                                    onClick={() => router.push("/bookinghistory")}
                                    sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                >
                                    ประวัติการจอง
                                </Button>
                                <Button
                                    startIcon={<AssessmentIcon />}
                                    onClick={() => setOpenModal(true)}
                                    sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                >
                                    แบบประเมิน
                                </Button>
                                <Button
                                    startIcon={<WebIcon />}
                                    onClick={() => router.push("/WebProgress")}
                                    sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                >
                                    การขอใช้บริการ
                                </Button>
                                <input
                                    id="upload-signature"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="upload-signature" style={{ cursor: "pointer" }}>
                                    <Button
                                        startIcon={<BadgeIcon />}
                                        component="span"
                                        sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                    >
                                        อัปโหลดลายเซ็น
                                    </Button>
                                </label>
                            </Box>
                        )}

                        {session?.user?.role === "Admin" && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "100%",
                                    flexWrap: "wrap",
                                    top: 0,
                                }}
                            >
                                <Button
                                    startIcon={<FeedbackIcon />}
                                    onClick={() => router.push("/bookingrequest")}
                                    sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                >
                                    คำขอใช้บริการ
                                </Button>
                                <Button
                                    startIcon={<FolderCopyIcon />}
                                    onClick={() => router.push("/bookinghistory")}
                                    sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                >
                                    ประวัติการจอง
                                </Button>
                                <Button
                                    startIcon={<AssessmentIcon />}
                                    onClick={() => router.push("/assessmentSum")}
                                    sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                >
                                    สรุปผลการประเมิน
                                </Button>
                                <Button
                                    startIcon={<WebIcon />}
                                    onClick={() => router.push("/WebProgress")}
                                    sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                >
                                    การขอใช้บริการ
                                </Button>
                                <input
                                    id="upload-signature"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="upload-signature" style={{ cursor: "pointer" }}>
                                    <Button
                                        startIcon={<BadgeIcon />}
                                        component="span"
                                        sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                    >
                                        อัปโหลดลายเซ็น
                                    </Button>
                                </label>
                            </Box>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: { xs: "end", sm: "flex-end" },
                            color: "primary.main",
                            flexDirection: "column",
                            width: { xs: "100%", sm: 200 },
                            textAlign: { xs: "center", sm: "right" },
                            ml: { xs: 0, sm: 2 },
                        }}
                    >
                        <Button
                            color="primary"
                            onClick={handleLogout}
                            sx={{
                                fontSize: { xs: "0.95rem", sm: "1rem" },
                                fontWeight: 600,
                                textTransform: "none",
                                minWidth: { xs: 0, sm: "auto" },
                                px: { xs: 1, sm: 2 },
                            }}
                            startIcon={<LogoutIcon />}
                        >
                            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                                ออกจากระบบ
                            </Box>
                        </Button>
                        {session?.user?.name && (
                            <Typography
                                variant="subtitle1"
                                noWrap
                                sx={{
                                    fontWeight: "bold",
                                    color: "primary.main",
                                    fontSize: { xs: "0.95rem", sm: "1.1rem" },
                                    maxWidth: { xs: "none", sm: "none" },
                                }}
                            >
                                สวัสดี! {session.user.name}
                            </Typography>
                        )}
                    </Box>
                </Toolbar>

                {/* สำหรับมือถือ */}
                {session?.user?.role === "User" && (
                    <Box
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            textAlign: "center",
                            display: { xs: "block", sm: "none" },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                width: "100%",
                                flexWrap: "wrap",
                                top: 0,
                            }}
                        >
                            <Button
                                startIcon={<MeetingRoomIcon />}
                                onClick={() => router.push("/dashboard")}
                                sx={{ fontSize: "0.737rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                            >
                                ตัวอย่างห้องประชุม
                            </Button>

                            <Button
                                startIcon={<FolderCopyIcon />}
                                onClick={() => router.push("/bookinghistory")}
                                sx={{ fontSize: "0.737rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                            >
                                ประวัติการจอง
                            </Button>

                            <Button
                                startIcon={<AssessmentIcon />}
                                onClick={() => setOpenModal(true)}
                                sx={{ fontSize: "0.737rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                            >
                                แบบประเมินห้องประชุม
                            </Button>

                            <input
                                id="upload-signature"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="upload-signature" style={{ cursor: "pointer" }}>
                                <Button
                                    startIcon={<BadgeIcon />}
                                    component="span"
                                    sx={{ fontSize: "0.737rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                                >
                                    อัปโหลดลายเซ็น
                                </Button>
                            </label>
                        </Box>
                    </Box>
                )}

                {session?.user?.role === "Admin" && (
                    <Box
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            textAlign: "center",
                            display: { xs: "block", sm: "none" },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                width: "100%",
                                flexWrap: "wrap",
                                top: 0,
                            }}
                        >
                            <Button
                                startIcon={<FeedbackIcon />}
                                onClick={() => router.push("/bookingrequest")}
                                sx={{ fontSize: "0.737rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                            >
                                คำขอใช้บริการ
                            </Button>

                            <Button
                                startIcon={<AssessmentIcon />}
                                onClick={() => router.push("/bookinghistory")}
                                sx={{ fontSize: "0.737rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                            >
                                ประวัติการจอง
                            </Button>

                            <Button
                                startIcon={<AssessmentIcon />}
                                onClick={() => router.push("/assessmentSum")}
                                sx={{ fontSize: "0.737rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                            >
                                สรุปผลการประเมิน
                            </Button>
                        </Box>
                    </Box>
                )}

                <AssessmentModal open={openModal} onClose={() => setOpenModal(false)} roomId={""} />
            </AppBar>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Header;
