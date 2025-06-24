"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, Snackbar, Alert, } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Header from "@/components/header";
import BookingModal from "@/components/RoomModal/roomBooking";
import RoomDetailDialog from "@/components/RoomModal/RoomDetailDialog";
import StatsDialog from "@/components/RoomModal/StatsDialog";

interface Room {
    name: string;
    image: string;
    detailImage_1: string;
    detailImage_2?: string;
    description: string;
}

interface RoomStat {
    RoomName: string;
    totalUsage: number;
}

const rooms: Room[] = [
    {
        name: "ห้องประชุมคณะ ICT",
        image: "/images/ห้องประชุม ICT-1.jpg",
        detailImage_1: "/images/ห้องประชุม ICT.jpg",
        detailImage_2: "/images/ผังห้องประชุม ICT.jpg",
        description: "รองรับได้ 98 ที่นั่ง",
    },
    {
        name: "ห้องประชุมแม่กา",
        image: "/images/ห้องประชุมแม่กา1.jpg",
        detailImage_1: "/images/ห้องประชุมแม่กา.jpg",
        detailImage_2: "/images/ผังห้องประชุมแม่กา.jpg",
        description: "รองรับได้ 38 ที่นั่ง",
    },
    {
        name: "ห้องบัณฑิตศึกษา ICT1318",
        image: "/images/ห้องบัณฑิตศึกษา1.jpg",
        detailImage_1: "/images/ห้องบัณฑิตศึกษา.jpg",
        detailImage_2: "/images/ผังห้องบัณฑิตศึกษา.jpg",
        description: "รองรับได้ 30 ที่นั่ง",
    },
    {
        name: "ลานกิจกรรมใต้ถุนอาคาร ICT",
        image: "/images/test.jpg",
        detailImage_1: "/images/detail_ict.jpg",
        detailImage_2: "/images/detail_ict.jpg",
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
    const [statsDialogOpen, setStatsDialogOpen] = useState(false);
    const [roomStats, setRoomStats] = useState<RoomStat[]>([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

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

    const updateAndFetchRoomStats = async (roomName: string) => {
        setRoomStats([]);
        setStatsDialogOpen(false);

        try {
            await fetch("/api/update-room-stats", { method: "POST" });

            const res = await fetch("/api/room-usage-stats");
            const allStats = await res.json();

            const filtered = allStats.filter((stat: RoomStat) => stat.RoomName === roomName);

            setRoomStats(filtered);
            setStatsDialogOpen(true);
        } catch (err) {
            console.error(err);
            setRoomStats([]);
            setStatsDialogOpen(true);
        }
    };

    const RoomCard = ({ room }: { room: Room }) => (
        <Box
            key={room.name}
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
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 1 }}
                                onClick={() => handleOpenRoomDetail(room)}
                            >
                                รายละเอียดห้องประชุม
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                color="primary"
                                sx={{ mb: 1 }}
                                onClick={() => handleOpenBooking(room.name)}
                            >
                                จองห้องประชุม
                            </Button>
                        </>
                    )}
                    <Button variant="outlined" fullWidth color="primary" sx={{ mb: 1 }}>
                        ปฏิทินห้องประชุม
                    </Button>
                    {session?.user?.role === "Admin" && (
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mb: 1 }}
                            color="primary"
                            onClick={() => updateAndFetchRoomStats(room.name)}
                        >
                            ดูสถิติการใช้งานห้อง
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ marginTop: { xs: 25, sm: 15 } }}>
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
                            ? "ตัวอย่างห้องประชุมภายในคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา"
                            : "ปฏิทินห้องประชุมภายในคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา"}
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

                <StatsDialog
                    open={statsDialogOpen}
                    onClose={() => setStatsDialogOpen(false)}
                    stats={roomStats}
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
