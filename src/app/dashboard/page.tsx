"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, Snackbar, Alert, } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import Header from "@/components/header";
import BookingModal from "@/components/RoomModal/roomBooking";
import RoomDetailDialog from "@/components/RoomModal/RoomDetailDialog";

import { useRouter } from "next/navigation";

interface Room {
    name: string;
    image: string;
    image2: string;
    image3: string;
    image4: string;
    detailImage_1: string;
    detailImage_2?: string;
    description: string;
}

const rooms: Room[] = [
    {
        name: "ห้องประชุมคณะ ICT",
        image: "/images/ห้องประชุม ICT-1.jpg",
        image2: "/images/ห้องประชุม ICT-2.jpg",
        image3: "/images/ห้องประชุม ICT-3.jpg",
        image4: "/images/ห้องประชุม ICT-8.jpg",
        detailImage_1: "/images/ห้องประชุม ICT.jpg",
        detailImage_2: "/images/ผังห้องประชุม ICT.jpg",
        description: "รองรับได้ 86 ที่นั่ง",
    },
    {
        name: "ห้องประชุมแม่กา",
        image: "/images/ห้องประชุมแม่กา1.jpg",
        image2: "/images/ห้องประชุมแม่กา3.jpg",
        image3: "/images/ห้องประชุมแม่กา4.jpg",
        image4: "/images/ห้องประชุมแม่กา6.jpg",
        detailImage_1: "/images/ห้องประชุมแม่กา.jpg",
        detailImage_2: "/images/ผังห้องประชุมแม่กา.jpg",
        description: "รองรับได้ 30 ที่นั่ง",
    },
    {
        name: "ห้องบัณฑิตศึกษา ICT1318",
        image: "/images/ห้องบัณฑิตศึกษา1.jpg",
        image2: "/images/ห้องบัณฑิตศึกษา3.jpg",
        image3: "/images/ห้องบัณฑิตศึกษา4.jpg",
        image4: "/images/ห้องบัณฑิตศึกษา6.jpg",
        detailImage_1: "/images/ห้องบัณฑิตศึกษา.jpg",
        detailImage_2: "/images/ผังห้องบัณฑิตศึกษา.jpg",
        description: "รองรับได้ 30 ที่นั่ง",
    },
    {
        name: "ลานกิจกรรมใต้ถุนอาคาร ICT",
        image: "/images/ลานกิจกรรมใต้ถุนอาคาร1.jpg",
        image2: "/images/ลานกิจกรรมใต้ถุนอาคาร2.jpg",
        image3: "/images/ลานกิจกรรมใต้ถุนอาคาร3.jpg",
        image4: "/images/ลานกิจกรรมใต้ถุนอาคาร4.jpg",
        detailImage_1: "/images/ลานกิจกรรมใต้ถุนอาคาร.jpg",
        detailImage_2: "/images/ผังลานกิจกรรมใต้ถุนอาคาร.jpg",
        description: "รองรับได้ 300 ที่นั่ง",
    },
];

export default function Dashboard() {
    const { data: session } = useSession();
    const [showContact, setShowContact] = useState(true);
    const [openBooking, setOpenBooking] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<string>("");
    const [roomDetailOpen, setRoomDetailOpen] = useState(false);
    const [selectedRoomDetail, setSelectedRoomDetail] = useState<Room | null>(null);
    const [hasSignature, setHasSignature] = useState(false);
    const router = useRouter();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    useEffect(() => {
        document.title = "ระบบจองห้องประชุม ICT | ระบบจองห้องประชุม ICT";
    }, []);

    const handleOpenRoomDetail = (room: Room) => {
        setSelectedRoomDetail(room);
        setRoomDetailOpen(true);
    };

    const handleOpenBooking = (roomName: string) => {
        setSelectedRoom(roomName);
        setOpenBooking(true);
    };

    const navButtonStyle = (position: "left" | "right") => ({
        position: "absolute",
        top: "50%",
        [position]: 8,
        width: 32,
        height: 32,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "50%",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transform: "translateY(-50%)",
        "&::after": {
            fontSize: "16px",
        },
    });

    useEffect(() => {
        const checkSignature = async () => {
            if (!session?.user?.email) return;

            const res = await fetch(`/api/signature?email=${session.user.email}`);
            const data = await res.json();

            setHasSignature(data.hasSignature);
        };

        checkSignature();
    }, [session]);

    const RoomCard = ({ room }: { room: Room }) => {
        const safeClassName = room.name.replace(/\s/g, "-");

        return (
            <Box sx={{ width: 320, borderRadius: 3, boxShadow: 2, bgcolor: "background.paper", overflow: "hidden" }}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{
                        nextEl: `.swiper-button-next-${safeClassName}`,
                        prevEl: `.swiper-button-prev-${safeClassName}`,
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    style={{ width: "100%", height: 180, position: "relative" }}
                >
                    {[room.image, room.image2, room.image3, room.image4]
                        .filter(Boolean)
                        .map((src, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    component="img"
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    sx={{ width: "100%", height: 180, objectFit: "cover" }}
                                />
                            </SwiperSlide>
                        ))}
                    <Box className={`swiper-button-prev-${safeClassName}`} sx={navButtonStyle("left")}>
                        <ArrowBackIosNewIcon fontSize="small" />
                    </Box>
                    <Box className={`swiper-button-next-${safeClassName}`} sx={navButtonStyle("right")}>
                        <ArrowForwardIosIcon fontSize="small" />
                    </Box>
                </Swiper>

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
                                <Button variant="outlined" fullWidth sx={{ mb: 1 }} onClick={() => handleOpenRoomDetail(room)}>
                                    รายละเอียดห้องประชุม
                                </Button>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    sx={{ mb: 1 }}
                                    onClick={() => handleOpenBooking(room.name)}
                                    disabled={!hasSignature}
                                >
                                    จองห้องประชุม
                                </Button>

                                {!hasSignature && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ fontSize: 13, textAlign: "center", mt: -1.5, mb: 1 }}
                                    >
                                        กรุณาอัปโหลดลายเซ็นก่อนทำการจอง
                                    </Typography>
                                )}
                            </>
                        )}
                        <Button
                            variant="outlined"
                            fullWidth
                            color="primary"
                            sx={{ mb: 1 }}
                            onClick={() => {
                                const calendarMap: Record<string, string> = {
                                    "ห้องประชุมคณะ ICT": "c_e1dd4b1b64e4e05076472f39b630df6d809a3ee6b7514663cd7e9172b0bd0268@group.calendar.google.com",
                                    "ห้องประชุมแม่กา": "c_8f3cb3dc7ac30369b6993c93eb9e28208dfc86ff39646babf97bd6e72b244579@group.calendar.google.com",
                                    "ห้องบัณฑิตศึกษา ICT1318": "c_bb07d69b9b55b95c06b227efc733624525fb4fa3e150245a8b8f4e1250d4bfbf@group.calendar.google.com",
                                    "ลานกิจกรรมใต้ถุนอาคาร ICT": "c_353cd6e59378ddf27d7b1ebfd1e552d7fb4565e2cc923dc3c5469c50c3eddd23@group.calendar.google.com",
                                };

                                const calendarId = calendarMap[room.name];
                                const url = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=Asia/Bangkok`;
                                window.open(url, "_blank");
                            }}
                        >
                            ปฏิทินห้องประชุม
                        </Button>

                        {session?.user?.role === "Admin" && (
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mb: 1 }}
                                color="primary"
                                onClick={() => router.push(`/BookingStat?room=${encodeURIComponent(room.name)}`)}
                            >
                                ดูสถิติการใช้งานห้อง
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        )
    };

    return (
        <Box
            sx={{
                marginTop:
                    session?.user?.role === "User"
                        ? { xs: 23, sm: 15 }
                        : { xs: 19, sm: 15 },
            }}
        >
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
                        {session?.user?.role === "User"
                            ? "ห้องประชุม"
                            : "ปฏิทินห้องประชุม"}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
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
                    {rooms.map((room) => (
                        <RoomCard key={room.name} room={room} />
                    ))}
                </Box>

                <BookingModal open={openBooking} onClose={() => setOpenBooking(false)} roomName={selectedRoom} />

                <RoomDetailDialog
                    open={roomDetailOpen}
                    onClose={() => setRoomDetailOpen(false)}
                    room={selectedRoomDetail}
                />
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

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
