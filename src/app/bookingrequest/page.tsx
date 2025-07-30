"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar, Alert, IconButton, Tooltip, } from "@mui/material";
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
    approvedNumber: string;

    sendDate?: string;
    sender?: string;
    senderEmail?: string;
    jobName?: string;
    phoneIn?: string;
    phoneOut?: string;
    officeLocation?: string;
    cfSender?: string;
    cfPhone?: string;

    signatureFileName?: string | null;
}

export default function BookingRequest() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [manageDialogOpen, setManageDialogOpen] = useState(false);
    const [checkDialogOpen, setCheckDialogOpen] = useState(false);
    const [revertDialogOpen, setRevertDialogOpen] = useState(false)
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [userSignatureFileName, setUserSignatureFileName] = useState<string | null>(null);

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
            const updatedBooking = await res.json();

            if (status === "อนุมัติ") {
                try {
                    await fetch("/api/calendar/add-event", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ booking: updatedBooking }),
                    });
                } catch (error) {
                    console.error("❌ ไม่สามารถซิงค์ Google Calendar ได้:", error);
                    showSnackbar("❌ ไม่สามารถซิงค์ Google Calendar ได้", "error");
                }
            }

            fetchBookings();
            setManageDialogOpen(false);
            showSnackbar("บันทึกข้อมูลสำเร็จแล้ว", "success");
        } else {
            const err = await res.json();
            showSnackbar(err?.error || "เกิดข้อผิดพลาดในการบันทึกสถานะ", "error");
        }
    };

    useEffect(() => {
        document.title = "คำขอใช้บริการ | ระบบจองห้องประชุม ICT";
    }, []);

    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchSignature = async () => {
            try {
                const emailEncoded = encodeURIComponent(session.user.email);
                const res = await fetch(`/api/signature?email=${emailEncoded}`);
                if (!res.ok) {
                    console.error("Failed to fetch signature:", await res.text());
                    return;
                }
                const data = await res.json();
                if (data.fileName) {
                    setUserSignatureFileName(data.fileName);
                }
            } catch (err) {
                console.error("Error fetching signature:", err);
            }
        };

        fetchSignature();
    }, [session]);

    if (status === "loading") {
        return (
            <Box textAlign="center" mt={10}>
                <CircularProgress />
                <Typography mt={2}>กำลังโหลดข้อมูลผู้ใช้...</Typography>
            </Box>
        );
    }

    if (session?.user?.role !== "99") {
        return (
            <Box textAlign="center" mt={10}>
                <Typography variant="h6" color="error">
                    คุณไม่มีสิทธิ์เข้าถึงหน้านี้ (สำหรับผู้ดูแลระบบเท่านั้น)
                </Typography>
            </Box>
        );
    }

    if (session?.user?.role == "99") {

        return (
            <Box
                sx={{
                    marginTop: { xs: 23, sm: 15 }
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
                        <TableContainer
                            component={Paper}
                            sx={{
                                width: { xs: "100%", sm: "100%" },
                                maxWidth: { xs: 400, sm: "100%" },
                                overflowX: "auto",
                                mx: "auto",
                            }}
                        >
                            <Table
                                size="small"
                                sx={{
                                    "& .MuiTableCell-root": {
                                        fontSize: { xs: "0.65rem", sm: "0.95rem" },
                                        px: { xs: 0.3, sm: 1 },
                                        py: { xs: 0.5, sm: 1 },
                                        whiteSpace: "nowrap",
                                    },
                                }}
                            >
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
                                                            jobName: booking.jobName ?? "",
                                                            phoneIn: booking.phoneIn ?? "",
                                                            phoneOut: booking.phoneOut ?? "",
                                                            officeLocation: booking.officeLocation ?? "",
                                                            cfSender: booking.cfSender ?? "",
                                                            cfPhone: booking.cfPhone ?? "",
                                                            capacity: String(booking.capacity),
                                                            approvedNumber: booking.approvedNumber !== undefined ? String(booking.approvedNumber) : ""
                                                        }}
                                                        signatureUrl={
                                                            booking.signatureFileName
                                                                ? `/uploads/signatures/${booking.signatureFileName}`
                                                                : userSignatureFileName
                                                                    ? `/uploads/signatures/${userSignatureFileName}`
                                                                    : undefined
                                                        }
                                                        includeApprovalSignature={["อนุมัติ", "เสร็จสิ้น"].includes(booking.SendStatus.trim())}
                                                        approvalDate={
                                                            ["อนุมัติ", "เสร็จสิ้น"].includes(booking.SendStatus.trim())
                                                                ? new Date().toLocaleDateString("th-TH", { day: "2-digit", month: "long", year: "numeric" })
                                                                : undefined
                                                        }
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
}
