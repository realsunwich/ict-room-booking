"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar, Alert, Divider, } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Header from "@/components/header";

import EditBookingDialog from "@/components/RoomModal/EditBookingDialog";
import CancelDialog from "@/components/RoomModal/CancleDialog";
import BookingFilter from "@/components/BookingFilter";
import ExportBookingExcelButton from "@/components/ExportBookingExcelButton";

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
    const { data: session } = useSession();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
    const [showContact, setShowContact] = useState(true);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterRoom, setFilterRoom] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    useEffect(() => {
        document.title = "ประวัติการจอง | ระบบจองห้องประชุม ICT";
    }, []);

    const currentMonth = new Date().getMonth(); // 0-based (0 = Jan)
    const currentYear = new Date().getFullYear();

    const availableRooms = Array.from(new Set(bookings.map((b) => b.RoomName)));

    const filteredBookings = bookings.filter((booking) => {
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);

        const isFilterDateEmpty = !filterStartDate && !filterEndDate;

        const isInCurrentMonth =
            startDate.getMonth() === currentMonth &&
            startDate.getFullYear() === currentYear;

        const matchRoom = !filterRoom || booking.RoomName === filterRoom;
        const matchStatus = !filterStatus || booking.SendStatus.trim() === filterStatus;
        const matchStartDate = !filterStartDate || startDate >= new Date(filterStartDate);
        const matchEndDate = !filterEndDate || endDate <= new Date(filterEndDate);

        return (
            matchRoom &&
            matchStatus &&
            matchStartDate &&
            matchEndDate &&
            (isFilterDateEmpty ? isInCurrentMonth : true)
        );
    });

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
                        mb: 1,
                    }}
                >
                    <Typography variant="h5" fontWeight={600}>
                        ประวัติการจองห้องประชุม
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ mt: 5, mb: 1, px: { xs: 1, sm: 2 } }}>
                    <BookingFilter
                        filterRoom={filterRoom}
                        setFilterRoom={setFilterRoom}
                        filterStatus={filterStatus}
                        setFilterStatus={setFilterStatus}
                        filterStartDate={filterStartDate}
                        setFilterStartDate={setFilterStartDate}
                        filterEndDate={filterEndDate}
                        setFilterEndDate={setFilterEndDate}
                        availableRooms={availableRooms}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <ExportBookingExcelButton
                            data={filteredBookings}
                            columns={[
                                { header: "วัน เวลา ที่เริ่ม", key: "startDate", width: 25 },
                                { header: "วัน เวลา ที่สิ้นสุด", key: "endDate", width: 25 },
                                { header: "สถานที่", key: "RoomName", width: 40 },
                                { header: "วัตถุประสงค์", key: "purpose", width: 50 },
                                { header: "จำนวน (คน)", key: "capacity", width: 20 },
                                { header: "สถานะ", key: "SendStatus", width: 15 },
                                { header: "ผู้ขอ", key: "sender", width: 25 },
                                { header: "ตำแหน่ง", key: "jobName", width: 25 },
                                { header: "โทรศัพท์", key: "phoneOut", width: 20 },
                                { header: "โทรภายใน", key: "phoneIn", width: 20 },
                            ]}
                            filterStartDate={filterStartDate}
                            filterEndDate={filterEndDate}
                            filterRoom={filterRoom}
                            filterStatus={filterStatus}
                            buttonLabel="บันทึกเป็น Excel"
                        />
                    </Box>
                </Box>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <TableContainer component={Paper}>
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
                                    {filteredBookings.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={10} align="center" sx={{ py: 2, fontSize: "1.2rem", fontWeight: 500 }}>
                                                ไม่มีข้อมูลการจองในระบบ
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredBookings.map((booking, index) => (
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
                                                <TableCell sx={{ width: 280 }}>{booking.purpose}</TableCell>
                                                <TableCell align="center" sx={{ width: 40 }}>{booking.capacity}</TableCell>
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
                                                        defaultData={{
                                                            ...selectedBooking,
                                                            capacity: selectedBooking.capacity.toString(),
                                                        }}
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
                    </>
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

