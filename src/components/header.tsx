"use client";

import { AppBar, Toolbar, Typography, IconButton, Box, } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "./sidebar";

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <AppBar position="fixed" sx={{ bgcolor: "white", color: "primary.main" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => router.push("/dashboard")}>
                    <Image
                        src="/images/brand.png"
                        alt="ICT Logo"
                        width={40}
                        height={40}
                    />
                    <Typography variant="h6">
                        ระบบขอจองใช้บริการห้องประชุมคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
                </Box>


                <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "primary.main" }}>
                    <Typography variant="body1" noWrap
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                        สวัสดี, sunwich
                    </Typography>
                </Box>
            </Toolbar>
            <Sidebar />
        </AppBar>
    );
};

export default Header;