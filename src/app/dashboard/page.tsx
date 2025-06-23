"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Header from "@/components/header";
import BookingModal from "@/components/RoomModal/roomBooking";

interface Room {
    name: string;
    image: string;
    detailImage_1: string;
    detailImage_2?: string;
    description: string;
}

const rooms: Room[] = [
    {
        name: "ห้องประชุมคณะ ICT",
        image: "/images/ห้องประชุม ICT-1.jpg",
        detailImage_1: "/images/ห้องประชุม ICT.jpg",
        detailImage_2: "/images/ผังห้องประชุม ICT.jpg",
        description: "รองรับได้ 98 ที่นั่ง"
    },
    {
        name: "ห้องประชุมแม่กา",
        image: "/images/ห้องประชุมแม่กา1.jpg",
        detailImage_1: "/images/ห้องประชุมแม่กา.jpg",
        detailImage_2: "/images/ผังห้องประชุมแม่กา.jpg",
        description: "รองรับได้ 38 ที่นั่ง"
    },
    {
        name: "ห้องบัณฑิตศึกษา ICT1318",
        image: "/images/ห้องบัณฑิตศึกษา1.jpg",
        detailImage_1: "/images/ห้องบัณฑิตศึกษา.jpg",
        detailImage_2: "/images/ผังห้องบัณฑิตศึกษา.jpg",
        description: "รองรับได้ 30 ที่นั่ง"
    },
    {
        name: "ลานกิจกรรมใต้ถุนอาคาร ICT",
        image: "/images/test.jpg",
        detailImage_1: "/images/detail_ict.jpg",
        detailImage_2: "/images/detail_ict.jpg",
        description: "รองรับได้ 300 ที่นั่ง"
    },
];

export default function Dashboard() {
    const { data: session } = useSession();
    const [showContact, setShowContact] = useState(true);
    const [openBooking, setOpenBooking] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<string>("");
    const [roomDetailOpen, setRoomDetailOpen] = useState(false);
    const [selectedRoomDetail, setSelectedRoomDetail] = useState<Room | null>(
        null
    );
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);

    useEffect(() => {
        document.title = "ระบบจองห้องประชุม ICT";
    }, []);

    const handleOpenRoomDetail = (room: Room) => {
        setSelectedRoomDetail(room);
        setRoomDetailOpen(true);
    };

    const handleOpenBooking = (roomName: string) => {
        setSelectedRoom(roomName);
        setOpenBooking(true);
    };

    const handleImageClick = (img?: string) => {
        if (img) {
            setSelectedImage(img);
            setImageDialogOpen(true);
        }
    };

    return (
        <Box sx={{ marginTop: { xs: 25, sm: 17 } }}>
            <Header />
            <Box
                sx={{
                    display: "flex", flexDirection: "column",
                    minHeight: "auto", bgcolor: "white",
                    px: { xs: 2, sm: 4 }, pt: { xs: 2, sm: 4 },
                    pb: 4, mt: 10, borderRadius: 7,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Box
                    sx={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        justifyContent: "center", textAlign: "center", mb: 4,
                    }}
                >
                    {session?.user?.role === "User" && (
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            ตัวอย่างห้องประชุมภายในคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                        </Typography>
                    )}
                    {session?.user?.role === "Admin" && (
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            ปฏิทินห้องประชุมภายในคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                        </Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, mb: 4,
                    }}
                >
                    {rooms.map((room) => (
                        <Box
                            key={room.name}
                            sx={{
                                width: 320, borderRadius: 3, boxShadow: 2, bgcolor: "background.paper", overflow: "hidden",
                            }}
                        >
                            <Box
                                component="img" src={room.image} alt={room.name} sx={{ width: "100%", height: 180, objectFit: "cover" }}
                            />
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6" fontWeight={700}>
                                    {room.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        textAlign: "left",
                                        fontSize: { xs: "0.9rem", sm: "0.95rem" },
                                        color: "text.secondary",
                                    }}
                                >
                                    {room.description}
                                </Typography>
                                <Box sx={{ gap: 1 }}>
                                    {session?.user?.role === "User" && (
                                        <>
                                            <Button
                                                variant="outlined" fullWidth sx={{ mb: 1 }} onClick={() => handleOpenRoomDetail(room)}
                                            >
                                                รายละเอียดห้องประชุม
                                            </Button>
                                            <Button
                                                variant="contained" fullWidth color="primary" sx={{ mb: 1 }} onClick={() => handleOpenBooking(room.name)}
                                            >
                                                จองห้องประชุม
                                            </Button>
                                        </>
                                    )}
                                    <Button variant="outlined" fullWidth color="primary">
                                        ปฏิทินห้องประชุม
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <BookingModal
                    open={openBooking}
                    onClose={() => setOpenBooking(false)}
                    roomName={selectedRoom}
                />

                <Dialog
                    open={roomDetailOpen}
                    onClose={() => setRoomDetailOpen(false)}
                    fullScreen={typeof window !== "undefined" && window.innerWidth < 600}
                    maxWidth="md" fullWidth scroll="body"
                >
                    <DialogTitle
                        align="center"
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: "1.1rem", sm: "1.25rem" }, bgcolor: "#f5f5f5",
                            px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 },
                        }}
                    >
                        {selectedRoomDetail?.name}
                    </DialogTitle>

                    <DialogContent
                        dividers
                        sx={{
                            bgcolor: "#fafafa",
                            px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 },
                            maxHeight: "80vh", overflowY: "auto",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex", flexWrap: "wrap",
                                justifyContent: "center", gap: 2,
                            }}
                        >
                            {[selectedRoomDetail?.detailImage_1, selectedRoomDetail?.detailImage_2]
                                .filter(Boolean)
                                .map((img, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            width: "100%",
                                            maxWidth: { xs: "100%", sm: 400 },
                                            borderRadius: 2, boxShadow: 2, bgcolor: "white",
                                        }}
                                    >
                                        <Zoom>
                                            <Box
                                                component="img"
                                                src={img}
                                                alt={`room-detail-${idx + 1}`}
                                                sx={{
                                                    width: "100%", height: "auto", objectFit: "cover", cursor: "zoom-in", display: "block",
                                                }}
                                            />
                                        </Zoom>
                                        <Box sx={{ py: 1 }}>
                                            <Typography
                                                variant="body2" align="center"
                                                sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                                                color="text.primary"
                                            >
                                                {idx === 0 ? "ภาพภายในห้อง" : "ผังห้องประชุม"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                        </Box>
                    </DialogContent>

                    <DialogActions
                        sx={{
                            justifyContent: "center", py: { xs: 1.5, sm: 2 },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setRoomDetailOpen(false)}
                            sx={{
                                minWidth: 100,
                                fontSize: { xs: "0.9rem", sm: "1rem" },
                                ":hover": {
                                    bgcolor: "primary.main", color: "white", borderColor: "primary.main",
                                },
                            }}
                        >
                            ปิด
                        </Button>
                    </DialogActions>
                </Dialog>

                <Box
                    sx={{
                        position: "fixed", bottom: 24, right: 24, zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1,
                    }}
                >
                    {showContact && (
                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                p: 2, borderRadius: 2,
                                boxShadow: 2, minWidth: 250,
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
                                minWidth: 0, width: 30, height: 30, borderRadius: "50%",
                                bgcolor: "primary.main", color: "white",
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