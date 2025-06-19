"use client";

import { useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Button, } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import BadgeIcon from '@mui/icons-material/Badge';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { useState } from "react";
import { useRouter } from "next/navigation";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssessmentModal from "@/components/AssessmentModal";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const Header = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    return (
        <AppBar position="fixed" sx={{ bgcolor: "white", color: "primary.main", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                    sx={{ display: "flex", alignItems: "center", py: 2, cursor: { xs: "pointer", sm: "default" } }}
                    onClick={() => {
                        if (window.innerWidth < 600) {
                            router.push("/dashboard");
                        }
                    }}
                >
                    <Image
                        src="/images/brand.png"
                        alt="ICT Logo"
                        width={70}
                        height={70}
                    />
                </Box>

                <Box sx={{
                    fontWeight: "bold", color: "primary.main", textAlign: "center", display: { xs: "none", sm: "block" }
                }}>
                    <Typography variant="h4" align="center" noWrap sx={{ fontWeight: 900, cursor: "pointer" }} onClick={() => router.push("/dashboard")}>
                        ระบบขอจองใช้บริการห้องประชุมคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
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
                            ตัวอย่างห้องประชุม
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
                            onClick={() => setOpen(true)}
                            sx={{ fontSize: "1.3rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                        >
                            แบบประเมินห้องประชุม
                        </Button>

                        <input
                            id="upload-signature"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    alert(`อัปโหลดไฟล์: ${file.name}`);
                                }
                            }}
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
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", color: "primary.main", flexDirection: "column" }}>
                    <Typography variant="h6" noWrap
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                        สวัสดี !, คุณ sunwich real
                    </Typography>
                    <Button
                        color="primary"
                        onClick={handleLogout}
                        sx={{ fontSize: "1rem", fontWeight: 600, textTransform: "none" }}
                        startIcon={<LogoutIcon />}
                    >
                        ออกจากระบบ
                    </Button>
                </Box>
            </Toolbar>
            <Box sx={{
                fontWeight: "bold", color: "primary.main", textAlign: "center", display: { xs: "block", sm: "none" }
            }}>
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
                        onClick={() => setOpen(true)}
                        sx={{ fontSize: "0.737rem", py: 1, px: 2, fontWeight: 600, textTransform: "none" }}
                    >
                        แบบประเมินห้องประชุม
                    </Button>

                    <input
                        id="upload-signature"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                alert(`อัปโหลดไฟล์: ${file.name}`);
                            }
                        }}
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

            <AssessmentModal
                open={open}
                onClose={() => setOpen(false)} roomId={""}
            />
        </AppBar>
    );
}

export default Header;