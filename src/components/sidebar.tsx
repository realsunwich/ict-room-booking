"use client";

import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BadgeIcon from '@mui/icons-material/Badge';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssessmentModal from "@/components/AssessmentModal";

export default function Sidebar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const [openAssessmentModal, setOpenAssessmentModal] = useState(false);

    const handleNavigate = (path: string) => {
        router.push(path);
        setDrawerOpen(false);
    };

    const menuItems = [
        { label: "จองห้องประชุม", path: "/booking", icon: <BookOnlineIcon /> },
        { label: "ประวัติการจอง", path: "/booking", icon: <FolderCopyIcon /> },
        { label: "จัดการบทบาท", path: "/roles", icon: <GroupsIcon /> },
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
                            <label htmlFor="upload-signature" style={{ width: "100%" }}>
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
                                <ListItemButton component="span">
                                    <ListItemIcon>
                                        <BadgeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="อัปโหลดลายเซ็น" />
                                </ListItemButton>
                            </label>

                        </ListItem>
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
                            <ListItemButton onClick={() => setOpenAssessmentModal(true)}>
                                <ListItemIcon>
                                    <AssessmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="แบบประเมินโครงการ" />
                                <AssessmentModal
                                    open={openAssessmentModal}
                                    onClose={() => setOpenAssessmentModal(false)}
                                />
                            </ListItemButton>
                        </ListItem>
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
            <AssessmentModal
                open={openAssessmentModal}
                onClose={() => setOpenAssessmentModal(false)}
            />
        </>
    );
}
