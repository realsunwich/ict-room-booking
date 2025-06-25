"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar, Alert, } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Header from "@/components/header";

import EditBookingDialog from "@/components/RoomModal/EditBookingDialog";
import CancelDialog from "@/components/RoomModal/CancleDialog";

interface Booking {
    bookingID: string;
    sender: string;
    phoneIn: string;
    phoneOut: string;
    startDate: string;
    endDate: string;
    RoomName: string;
    purpose: string;
    capacity: number;
    SendStatus: string;
    jobName: string;
    officeLocation: string;
    cfSender: string;
    cfPhone: string;
    updatedAt: string;
}

export default function BookingHistory() {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
    const [showContact, setShowContact] = useState(true);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    useEffect(() => {
        document.title = "ประวัติการจอง | ระบบจองห้องประชุม ICT";
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch("/api/booking/history");
                const data = await res.json();
                setBookings(data);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลการจอง", err);
                setSnackbarMessage("โหลดข้อมูลล้มเหลว");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

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
                        mb: 1,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        ประวัติการจองห้องประชุมภายในคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ bgcolor: "primary.main", "& .MuiTableCell-head": { color: "white" } }}>
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">เริ่ม</TableCell>
                                    <TableCell align="center">สิ้นสุด</TableCell>
                                    <TableCell align="center">สถานที่</TableCell>
                                    <TableCell align="center">วัตถุประสงค์</TableCell>
                                    <TableCell align="center">จำนวนคน</TableCell>
                                    <TableCell align="center">สถานะ</TableCell>
                                    <TableCell align="center">แก้ไข</TableCell>
                                    <TableCell align="center">ยกเลิก</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={10} align="center" sx={{ py: 2, fontSize: "1.2rem", fontWeight: 500 }}>
                                            ไม่มีข้อมูลการจองในระบบ
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bookings.map((booking, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ width: 20 }}>{index + 1}</TableCell>
                                            <TableCell sx={{ width: 200 }} align="center">
                                                {new Date(booking.startDate).toLocaleString("th-TH", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </TableCell>
                                            <TableCell sx={{ width: 200 }} align="center">
                                                {new Date(booking.endDate).toLocaleString("th-TH", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </TableCell>
                                            <TableCell sx={{ width: 130 }} align="center">{booking.RoomName}</TableCell>
                                            <TableCell sx={{ width: 300 }}>{booking.purpose}</TableCell>
                                            <TableCell align="center" sx={{ width: 20 }}>{booking.capacity}</TableCell>
                                            <TableCell align="center" sx={{ width: 20 }}>{booking.SendStatus}</TableCell>
                                            <TableCell align="center" sx={{ width: 20 }}>
                                                <Tooltip title="แก้ไขคำขอ">
                                                    <span>
                                                        <Button
                                                            onClick={() => {
                                                                setSelectedBooking(booking);
                                                                setEditDialogOpen(true);
                                                            }}
                                                            color="primary"
                                                            sx={{ minWidth: 0, p: 1 }}
                                                            disabled={booking.SendStatus.trim() !== "กำลังรอ" && !"ไม่อนุมัติ".includes(booking.SendStatus.trim())}
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                            {selectedBooking && (
                                                <EditBookingDialog
                                                    open={editDialogOpen}
                                                    onClose={() => setEditDialogOpen(false)}
                                                    roomName={selectedBooking.RoomName}
                                                    defaultData={selectedBooking}
                                                />
                                            )}
                                            <TableCell align="center" sx={{ width: 20 }}>
                                                <Tooltip
                                                    title={
                                                        ["กำลังรอ", "อนุมัติ"].includes(booking.SendStatus.trim())
                                                            ? "ยกเลิกคำขอ"
                                                            : "ไม่สามารถยกเลิกคำขอที่ดำเนินการแล้ว"
                                                    }
                                                >
                                                    <span>
                                                        <Button
                                                            color="error"
                                                            sx={{ minWidth: 0, p: 1 }}
                                                            disabled={!["กำลังรอ", "อนุมัติ"].includes(booking.SendStatus.trim())}
                                                            onClick={() => {
                                                                setCancelTarget(booking);
                                                                setCancelDialogOpen(true);
                                                            }}
                                                        >
                                                            <CancelIcon />
                                                        </Button>
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                            {cancelTarget && (
                                                <CancelDialog
                                                    open={cancelDialogOpen}
                                                    onClose={() => {
                                                        setCancelDialogOpen(false);
                                                        setCancelTarget(null);
                                                    }}
                                                    booking={cancelTarget}
                                                    onSuccess={async () => {
                                                        setSnackbarMessage("ยกเลิกคำขอสำเร็จ");
                                                        setSnackbarSeverity("success");
                                                        setSnackbarOpen(true);
                                                        const updated = await fetch("/api/booking/history");
                                                        const newData = await updated.json();
                                                        setBookings(newData);
                                                    }}
                                                />
                                            )}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

