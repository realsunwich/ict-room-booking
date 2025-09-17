"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar, Alert, Divider, } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Header from "@/components/header";

import EditBookingDialog from "@/components/RoomModal/EditBookingDialog";
import CancelDialog from "@/components/RoomModal/CancleDialog";
import BookingFilter from "@/components/BookingFilter";
import ExportBookingExcelButton from "@/components/ExportExcel/ExportBookingExcelButton";
import FormPDFButton from "@/components/PDFbutton";

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

    CancelReason?: string;
    RejectReason?: string;

    signatureFileName?: string | null;
}

export default function BookingHistory() {
    const { data: session, status } = useSession();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterRoom, setFilterRoom] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const [userSignatureFileName, setUserSignatureFileName] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    useEffect(() => {
        document.title = "ประวัติการจอง | ระบบจองห้องประชุม ICT";
    }, []);

    useEffect(() => {
        const today = new Date();

        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(today.getDate() - 30);

        const fifteenDaysLater = new Date();
        fifteenDaysLater.setDate(today.getDate() + 30);

        const formatDateForInput = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        setFilterStartDate(formatDateForInput(fifteenDaysAgo));
        setFilterEndDate(formatDateForInput(fifteenDaysLater));
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

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const availableRooms = Array.from(new Set(bookings.map((b) => b.RoomName)));

    const parseDateForFilter = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    const filteredBookings = bookings.filter((booking) => {
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);

        const isFilterDateEmpty = !filterStartDate && !filterEndDate;

        const isInCurrentMonth =
            startDate.getMonth() === currentMonth &&
            startDate.getFullYear() === currentYear;

        const matchRoom = !filterRoom || booking.RoomName === filterRoom;
        const matchStatus = !filterStatus || booking.SendStatus.trim() === filterStatus;
        const matchStartDate = !filterStartDate || startDate >= parseDateForFilter(filterStartDate);
        const matchEndDate = !filterEndDate || endDate <= new Date(parseDateForFilter(filterEndDate).setHours(23, 59, 59, 999));

        const isUserOwner = session?.user?.role === "99" || session?.user?.email === booking.senderEmail;

        return (
            isUserOwner &&
            matchRoom &&
            matchStatus &&
            matchStartDate &&
            matchEndDate &&
            (isFilterDateEmpty ? isInCurrentMonth : true)
        );
    });

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/booking/history?startDate=${filterStartDate}&endDate=${filterEndDate}`);
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            setBookings(data);
        } catch (err) {
            console.error("โหลดข้อมูลการจองล้มเหลว", err);
            setSnackbarMessage("โหลดข้อมูลล้มเหลว");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!filterStartDate || !filterEndDate) return;
        fetchBookings();
    }, [filterStartDate, filterEndDate]);

    useEffect(() => {
        if (!editDialogOpen) {
        }
    }, [editDialogOpen]);


    if (status === "loading") {
        return (
            <Box textAlign="center" mt={10}>
                <CircularProgress />
                <Typography mt={2}>กำลังโหลดข้อมูลผู้ใช้...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                marginTop:
                    session?.user?.role === "1"
                        ? { xs: 23, sm: 15 }
                        : { xs: 23, sm: 15 },
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
                    <Typography variant="h4" fontWeight={600}>
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
                    {session?.user?.role === "99" && (
                        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 3 }}>
                            <ExportBookingExcelButton
                                data={filteredBookings}
                                columns={[
                                    { header: "วัน เวลา ที่เริ่ม", key: "startDate", width: 25 },
                                    { header: "วัน เวลา ที่สิ้นสุด", key: "endDate", width: 25 },
                                    { header: "สถานที่", key: "RoomName", width: 40 },
                                    { header: "วัตถุประสงค์", key: "purpose", width: 50 },
                                    { header: "จำนวน (คน)", key: "capacity", width: 20 },
                                    { header: "สถานะ", key: "SendStatus", width: 15 },
                                    { header: "เหตุผลที่ยกเลิก", key: "CancelReason", width: 15 },
                                    { header: "เหตุผลที่ไม่อนุมัติ", key: "RejectReason", width: 15 },
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
                    )}
                </Box>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
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
                                    minWidth: 900, // กำหนดให้ table ขยายเต็มเหมือน desktop
                                    "& .MuiTableCell-root": {
                                        fontSize: { xs: "0.65rem", sm: "0.95rem" },
                                        px: { xs: 0.3, sm: 1 },
                                        py: { xs: 0.5, sm: 1 },
                                        whiteSpace: "normal",
                                        wordBreak: "break-word",
                                    },
                                }}
                            >
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            bgcolor: "primary.main",
                                            "& .MuiTableCell-head": {
                                                color: "white",
                                                fontWeight: "bold",
                                                fontSize: {
                                                    xs: "0.75rem",
                                                    sm: "0.85rem",
                                                    md: "1rem",
                                                },
                                            },
                                        }}
                                    >
                                        <TableCell>#</TableCell>
                                        <TableCell align="center">เริ่ม</TableCell>
                                        <TableCell align="center">สิ้นสุด</TableCell>
                                        <TableCell align="center">สถานที่</TableCell>
                                        <TableCell align="center">วัตถุประสงค์</TableCell>
                                        <TableCell align="center">จำนวนคน</TableCell>
                                        <TableCell align="center">สถานะ</TableCell>
                                        <TableCell align="center">แก้ไข</TableCell>
                                        <TableCell align="center">ยกเลิก</TableCell>
                                        <TableCell align="center">เหตุผล</TableCell>
                                        <TableCell align="center">ดู</TableCell>
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
                                                <TableCell sx={{ maxWidth: 10, width: 10 }}>{index + 1}</TableCell>
                                                <TableCell sx={{ maxWidth: 60, width: 50 }}>
                                                    {new Date(booking.startDate).toLocaleString("th-TH", {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })}
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 60, width: 50 }}>
                                                    {new Date(booking.endDate).toLocaleString("th-TH", {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })}
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 50, width: 50 }} align="center">{booking.RoomName}</TableCell>
                                                <TableCell
                                                    sx={{
                                                        width: 120,
                                                        maxWidth: 120,
                                                        whiteSpace: "normal",
                                                        wordBreak: "break-word",
                                                        overflowWrap: "break-word",
                                                        fontSize: { xs: "0.65rem", sm: "0.95rem" },
                                                        lineHeight: 1.4,
                                                        maxHeight: 60,
                                                        p: 1,
                                                    }}
                                                >
                                                    {(() => {
                                                        const purpose = booking.purpose;
                                                        // ถ้าความยาวเกิน 120 ให้แบ่งบรรทัด, ถ้าไม่เกินให้แสดงปกติ
                                                        if (!purpose || purpose.length <= 120) return purpose;
                                                        const words = purpose.split(" ");
                                                        if (words.length <= 1) return purpose;
                                                        const mid = Math.ceil(words.length / 2);
                                                        return (
                                                            <>
                                                                {words.slice(0, mid).join(" ")}
                                                                <br />
                                                                {words.slice(mid).join(" ")}
                                                            </>
                                                        );
                                                    })()}
                                                </TableCell>
                                                <TableCell align="center" sx={{ maxWidth: 20, width: 20 }}>{booking.capacity}</TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        color:
                                                            booking.SendStatus.trim() === "กำลังรอ" ? "darkorange" :
                                                                booking.SendStatus.trim() === "อนุมัติ" ? "navy" :
                                                                    booking.SendStatus.trim() === "เสร็จสิ้น" ? "seagreen" :
                                                                        ["ถูกยกเลิก", "ไม่อนุมัติ"].includes(booking.SendStatus.trim()) ? "crimson" :
                                                                            "black",
                                                        fontWeight: 600,
                                                        textAlign: "center",
                                                        maxWidth: 20, width: 20
                                                    }}
                                                >
                                                    {booking.SendStatus}
                                                </TableCell>
                                                <TableCell align="center" sx={{ maxWidth: 20, width: 20 }}>
                                                    <Tooltip title="แก้ไขคำขอ">
                                                        <span>
                                                            <Button
                                                                onClick={() => {
                                                                    setSelectedBooking(booking);
                                                                    setEditDialogOpen(true);
                                                                }}
                                                                color="primary"
                                                                sx={{ minWidth: 0, p: 1 }}
                                                                disabled={
                                                                    session?.user?.role !== "99" && (
                                                                        !["กำลังรอ", "ไม่อนุมัติ"].includes(booking.SendStatus.trim()) ||
                                                                        session?.user?.email !== booking.senderEmail
                                                                    )
                                                                }
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                        </span>
                                                    </Tooltip>
                                                </TableCell>

                                                <TableCell align="center" sx={{ maxWidth: 20, width: 20 }}>
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
                                                <TableCell sx={{ maxWidth: 60, width: 60 }}>
                                                    {booking.SendStatus.trim() === "ถูกยกเลิก"
                                                        ? booking.CancelReason
                                                        : booking.SendStatus.trim() === "ไม่อนุมัติ"
                                                            ? booking.RejectReason
                                                            : "-"}
                                                </TableCell>
                                                <TableCell align="center" sx={{ maxWidth: 20, width: 20 }}>
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
                                                            fetchBookings(); // refresh หลังยกเลิกสำเร็จ
                                                        }}
                                                    />
                                                )}
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {selectedBooking && (
                            <EditBookingDialog
                                open={editDialogOpen}
                                onClose={() => {
                                    setEditDialogOpen(false);
                                    fetchBookings(); // refresh หลังปิด dialog
                                }}
                                roomName={selectedBooking.RoomName}
                                defaultData={selectedBooking}
                            />
                        )}
                    </>
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