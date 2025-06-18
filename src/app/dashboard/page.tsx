"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button, Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Header from "@/components/header";
import BookingModal from "@/components/RoomModal/roomBooking";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [showContact, setShowContact] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<string>("");

    useEffect(() => {
        document.title = "ระบบจองห้องประชุม ICT";
    }, []);

    return (
        <Box sx={{ marginTop: { xs: 25, sm: 17 } }}>
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        mb: 4,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        ตัวอย่างห้องประชุมภายในคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 3,
                        mb: 4,
                    }}
                >
                    {[
                        {
                            name: "ห้องประชุมคณะ ICT",
                            image: "/images/test.jpg",
                            detail: "ความจุ 20 คน",
                        },
                        {
                            name: "ห้องประชุมแม่กา",
                            image: "/images/test.jpg",
                            detail: "ความจุ 30 คน",
                        },
                        {
                            name: "ห้องบัณฑิตศึกษา ICT1318",
                            image: "/images/test.jpg",
                            detail: "ความจุ 98 คน",
                        },
                        {
                            name: "ลานกิจกรรมใต้ถุนอาคาร ICT",
                            image: "/images/test.jpg",
                            detail: "ความจุ 300 คน",
                        },
                    ].map((room, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 320,
                                borderRadius: 3,
                                boxShadow: 2,
                                bgcolor: "background.paper",
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                component="img"
                                src={room.image}
                                alt={room.name}
                                sx={{ width: "100%", height: 180, objectFit: "cover" }}
                            />
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6" fontWeight={700}>
                                    {room.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {room.detail}
                                </Typography>
                                <Box sx={{ gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                    >
                                        รายละเอียดห้องประชุม
                                    </Button>
                                    
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                        sx={{ mb: 1 }}
                                        onClick={() => {
                                            setSelectedRoom(room.name);
                                            setOpen(true);
                                        }}
                                    >
                                        จองห้องประชุม
                                    </Button>
                                    <BookingModal
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        roomName={selectedRoom}
                                    />

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                    >
                                        ปฏิทินห้องประชุม
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 1,
                    }}
                >
                    {showContact && (
                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                p: 2,
                                borderRadius: 2,
                                boxShadow: 2,
                                minWidth: 250,
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
                    )}
                    <Tooltip title={showContact ? "ซ่อนข้อมูลติดต่อ" : "แสดงข้อมูลติดต่อ"}>
                        <Button
                            onClick={() => setShowContact((prev) => !prev)}
                            sx={{
                                minWidth: 0,
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                color: "white",
                                "&:hover": { bgcolor: "primary.dark" },
                            }}
                        >
                            {showContact ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
}
