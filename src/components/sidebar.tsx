"use client";

import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push(path);
        setDrawerOpen(false);
    };

    const menuItems = [
        { label: "จองห้องประชุม", path: "/booking", icon: <BookOnlineIcon /> },
        { label: "การจองของฉัน", path: "/my-booking", icon: <FolderCopyIcon /> },
        { label: "จัดการห้องประชุม", path: "/rooms", icon: <RoomPreferencesIcon /> },
    ];

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };


    return (
        <>
            <Tooltip title="เมนู">
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => setDrawerOpen(true)}
                    sx={{ color: "primary.main" }}
                >
                    <MenuIcon />
                </IconButton>
            </Tooltip>

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box
                    sx={{
                        width: 250,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        py: 2,
                    }}
                    role="presentation"
                >
                    {/* เมนูด้านบน */}
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                key={item.path}
                                disablePadding
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "primary.main",
                                        color: "white",
                                        "& .MuiListItemIcon-root": {
                                            color: "white",
                                        },
                                    },
                                }}
                            >
                                <ListItemButton onClick={() => handleNavigate(item.path)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* ปุ่มออกจากระบบด้านล่าง */}
                    <List>
                        <ListItem
                            disablePadding
                            sx={{
                                "&:hover": {
                                    backgroundColor: "primary.main",
                                    color: "white",
                                    "& .MuiListItemIcon-root": {
                                        color: "white",
                                    },
                                },
                            }}
                        >
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="ออกจากระบบ" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
