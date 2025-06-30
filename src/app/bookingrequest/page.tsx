"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar, Alert, IconButton, Tooltip, } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Header from "@/components/header";
import FormPDFButton from "@/components/PDFbutton";
import ManageBookingDialog from "@/components/RoomModal/ManageBookingDialog";
import CheckRoomDialog from "@/components/RoomModal/CheckRoomDialog";
import RevertApprovalDialog from "@/components/RoomModal/RevertApprovalDialog";

interface Booking {
    bookingID: string;
    startDate: string;
    endDate: string;
    RoomName: string;
    purpose: string;
    capacity: number;
    SendStatus: string;

    sendDate?: string;
    sender?: string;
    jobname?: string;
    phoneIn?: string;
    phoneOut?: string;
    department?: string;
    cfSender?: string;
    cfPhone?: string;
}

export default function BookingHistory() {
    const { data: session } = useSession();
    const [showContact, setShowContact] = useState(true);
    const [loading, setLoading] = useState(true);
    const [manageDialogOpen, setManageDialogOpen] = useState(false);
    const [checkDialogOpen, setCheckDialogOpen] = useState(false);
    const [revertDialogOpen, setRevertDialogOpen] = useState(false)
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
        "success"
    );

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/booking/history");
            const data = await res.json();
            setBookings(data);
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลการจอง", error);
            showSnackbar("โหลดข้อมูลล้มเหลว", "error");
        } finally {
            setLoading(false);
        }
    }, [setBookings, setLoading]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const showSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleStatusChange = async (status: string, reason?: string) => {
        if (!selectedBooking) {
            showSnackbar("ไม่พบข้อมูลการจองที่เลือก", "error");
            return;
        }

        const res = await fetch("/api/booking/updateStatus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                bookingId: selectedBooking.bookingID,
                status,
                reason,
            }),
        });

        if (res.ok) {
            await res.json();
            fetchBookings();
            setManageDialogOpen(false);
            showSnackbar("บันทึกข้อมูลสำเร็จแล้ว", "success");
        } else {
            const err = await res.json();
            showSnackbar(err?.error || "เกิดข้อผิดพลาดในการบันทึกสถานะ", "error");
        }
    };

    useEffect(() => {
        document.title = "คำขอใช้บริหาร | ระบบจองห้องประชุม ICT";
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
                        คำขอใช้บริการห้องประชุม
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
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
                                <TableRow
                                    sx={{ bgcolor: "primary.main", "& .MuiTableCell-head": { color: "white" } }}
                                >
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">เริ่ม</TableCell>
                                    <TableCell align="center">สิ้นสุด</TableCell>
                                    <TableCell align="center">สถานที่</TableCell>
                                    <TableCell align="center">วัตถุประสงค์</TableCell>
                                    <TableCell align="center">จำนวนคน</TableCell>
                                    <TableCell align="center">สถานะ</TableCell>
                                    <TableCell align="center">ดู</TableCell>
                                    <TableCell align="center">จัดการ</TableCell>
                                    <TableCell align="center">ตรวจเช็ค</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={10}
                                            align="center"
                                            sx={{ py: 2, fontSize: "1.2rem", fontWeight: 500 }}
                                        >
                                            ไม่มีข้อมูลการจองในระบบ
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bookings.map((booking, index) => (
                                        <TableRow key={booking.bookingID}>
                                            <TableCell sx={{ width: 20 }}>{index + 1}</TableCell>
                                            <TableCell sx={{ width: 190 }} align="center">
                                                {new Date(booking.startDate).toLocaleString("th-TH", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </TableCell>
                                            <TableCell sx={{ width: 190 }} align="center">
                                                {new Date(booking.endDate).toLocaleString("th-TH", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </TableCell>
                                            <TableCell sx={{ width: 140 }} align="center">
                                                {booking.RoomName}
                                            </TableCell>
                                            <TableCell sx={{ width: 290 }}>{booking.purpose}</TableCell>
                                            <TableCell align="center" sx={{ width: 20 }}>
                                                {booking.capacity}
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: 20 }}>
                                                {booking.SendStatus}
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: 20 }}>
                                                <FormPDFButton
                                                    booking={{
                                                        ...booking,
                                                        startDate: new Date(booking.startDate),
                                                        endDate: new Date(booking.endDate),
                                                        sendDate: new Date(booking.sendDate ?? booking.startDate),
                                                        sender: booking.sender ?? "",
                                                        jobname: booking.jobname ?? "",
                                                        phoneIn: booking.phoneIn ?? "",
                                                        phoneOut: booking.phoneOut ?? "",
                                                        department: booking.department ?? "",
                                                        cfSender: booking.cfSender ?? "",
                                                        cfPhone: booking.cfPhone ?? "",
                                                        capacity: String(booking.capacity),
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: 20 }}>
                                                {["กำลังรอ", "อนุมัติ"].includes(booking.SendStatus.trim()) ? (
                                                    <Tooltip
                                                        title={
                                                            booking.SendStatus.trim() === "กำลังรอ"
                                                                ? "จัดการคำขอ"
                                                                : "ยกเลิกการอนุมัติ"
                                                        }
                                                    >
                                                        <span>
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => {
                                                                    setSelectedBooking(booking);
                                                                    if (booking.SendStatus.trim() === "กำลังรอ") {
                                                                        setManageDialogOpen(true);
                                                                    } else {
                                                                        setRevertDialogOpen(true);
                                                                    }
                                                                }}
                                                            >
                                                                <SettingsIcon />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                ) : (
                                                    <Tooltip title="ไม่สามารถจัดการคำขอที่เสร็จสิ้นแล้ว">
                                                        <span>
                                                            <IconButton disabled>
                                                                <SettingsIcon />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                            {selectedBooking && (
                                                <RevertApprovalDialog
                                                    open={revertDialogOpen}
                                                    onClose={() => setRevertDialogOpen(false)}
                                                    bookingID={selectedBooking.bookingID}
                                                    onSuccess={() => {
                                                        fetchBookings();
                                                        showSnackbar("ยกเลิกการอนุมัติแล้ว", "success");
                                                    }}
                                                />
                                            )}
                                            {selectedBooking && (
                                                <ManageBookingDialog
                                                    open={manageDialogOpen}
                                                    onClose={() => setManageDialogOpen(false)}
                                                    booking={selectedBooking}
                                                    onStatusChange={handleStatusChange}
                                                />
                                            )}
                                            <TableCell align="center" sx={{ width: 20 }}>
                                                <Tooltip
                                                    title={
                                                        booking.SendStatus.trim() === "อนุมัติ"
                                                            ? "ดำเนินการตรวจเช็ค"
                                                            : "สามารถตรวจเช็คได้เมื่อคำขอได้รับการอนุมัติแล้ว"
                                                    }
                                                >
                                                    <span>
                                                        <IconButton
                                                            color="success"
                                                            onClick={() => {
                                                                setSelectedBooking(booking);
                                                                setCheckDialogOpen(true);
                                                            }}
                                                            disabled={booking.SendStatus.trim() !== "อนุมัติ"}
                                                        >
                                                            <CheckCircleIcon />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                            {selectedBooking && (
                                                <CheckRoomDialog
                                                    open={checkDialogOpen}
                                                    onClose={() => setCheckDialogOpen(false)}
                                                    bookingID={selectedBooking.bookingID}
                                                    onCheckComplete={() => {
                                                        fetchBookings();
                                                        setSnackbarMessage("บันทึกการตรวจเช็คเรียบร้อย");
                                                        setSnackbarSeverity("success");
                                                        setSnackbarOpen(true);
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
