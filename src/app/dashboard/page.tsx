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
    detailImage_2: string;
}

const rooms: Room[] = [
    {
        name: "ห้องประชุมคณะ ICT",
        image: "/images/test.jpg",
        detailImage_1: "/images/ห้องประชุม ICT.jpg",
        detailImage_2: "/images/ผังห้องประชุม ICT.jpg",
    },
    {
        name: "ห้องประชุมแม่กา",
        image: "/images/test.jpg",
        detailImage_1: "/images/ห้องประชุมแม่กา.jpg",
        detailImage_2: "/images/ผังห้องประชุมแม่กา.jpg",
    },
    {
        name: "ห้องบัณฑิตศึกษา ICT1318",
        image: "/images/test.jpg",
        detailImage_1: "/images/detail_ict.jpg",
        detailImage_2: "/images/detail_ict.jpg",
    },
    {
        name: "ลานกิจกรรมใต้ถุนอาคาร ICT",
        image: "/images/test.jpg",
        detailImage_1: "/images/detail_ict.jpg",
        detailImage_2: "/images/detail_ict.jpg",
    },
];

export default function Dashboard() {
    useSession();
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
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        ตัวอย่างห้องประชุมภายในคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
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
                                <Box sx={{ gap: 1 }}>
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
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle align="center">{selectedRoomDetail?.name}</DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                            {[selectedRoomDetail?.detailImage_1, selectedRoomDetail?.detailImage_2].map(
                                (img, idx) => (
                                    <Box
                                        key={idx} component="img" src={img}
                                        sx={{
                                            width: "50%", borderRadius: 3, cursor: "pointer",
                                            objectFit: "cover", boxShadow: 1, transition: "transform 0.2s",
                                            "&:hover": { transform: "scale(1.05)" },
                                        }}
                                        alt={`room-detail-${idx + 1}`}
                                        onClick={() => handleImageClick(img)}
                                    />
                                )
                            )}
                            <Dialog
                                open={imageDialogOpen}
                                onClose={() => setImageDialogOpen(false)}
                                maxWidth="md"
                                fullWidth
                            >
                                <DialogContent>
                                    {selectedImage && (
                                        <Zoom>
                                            <img
                                                src={selectedImage}
                                                alt="room-large"
                                                style={{
                                                    width: "100%", height: "auto", maxWidth: "90vw",
                                                    maxHeight: "60vh", objectFit: "contain", borderRadius: 8, display: "block",
                                                }}
                                                className="responsive-room-image"
                                            />
                                            <style jsx global>{`
                                                @media (max-width: 600px) {
                                                    .responsive-room-image {
                                                        max-width: 98vw !important;
                                                        max-height: 40vh !important;
                                                        border-radius: 6px !important;
                                                    }
                                                }
                                            `}</style>
                                        </Zoom>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setRoomDetailOpen(false)}>ปิด</Button>
                    </DialogActions>
                </Dialog>

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