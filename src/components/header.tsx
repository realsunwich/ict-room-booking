"use client";

import { AppBar, Toolbar, Typography, IconButton, Box, } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };

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
                    <Typography variant="h6" noWrap sx={{ ml: 2 }}>
                        ระบบจองห้องประชุมภายในคณะเทคโนโลยีสารสนเทศและการสื่อสาร
                    </Typography>
                </Box>

                {
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "primary.main" }}>
                        <Typography variant="body1">
                            👤 sandwich
                        </Typography>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;