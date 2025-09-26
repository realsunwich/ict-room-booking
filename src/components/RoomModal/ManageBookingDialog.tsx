"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useState } from "react";

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

    remark?: string;

    signatureFileName?: string | null;
}

export default function ManageBookingDialog({
    open,
    onClose,
    booking,
    onStatusChange,
}: {
    open: boolean;
    onClose: () => void;
    booking: Booking;
    onStatusChange: (status: string, reason?: string) => void;
}) {
    const [reason, setReason] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleClose = () => {
        setReason("");
        onClose();
    };

    if (!booking) return null;

    async function updateBookingStatus(bookingId: number, status: string, reason?: string) {
        const payload: any = { bookingId, status };

        if (status === "ไม่อนุมัติ") {
            payload.RejectReason = reason?.trim() || null;
        }

        if (status === "ถูกยกเลิก") {
            payload.CancelReason = reason?.trim() || null;
        }

        const res = await fetch("/api/booking/updateStatus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        return await res.json();
    }

    const handleApprove = async () => {
        await updateBookingStatus(Number(booking.bookingID), "อนุมัติ");
        onStatusChange("อนุมัติ");
        handleClose();
    };

    const handleReject = async () => {
        if (!reason.trim()) {
            setSnackbarMessage("กรุณากรอกเหตุผลก่อนไม่อนุมัติ");
            setSnackbarOpen(true);
            return;
        }

        await updateBookingStatus(Number(booking.bookingID), "ไม่อนุมัติ", reason);
        onStatusChange("ไม่อนุมัติ", reason);
        handleClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                    },
                }}
            >
                <DialogTitle>จัดการคำขอใช้ห้องประชุม</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        สถานที่ {booking.RoomName || "-"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        วัตถุประสงค์ {booking.purpose || "-"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        เริ่มในวันที่ {" "}
                        {booking.startDate
                            ? new Date(booking.startDate).toLocaleString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : "-"}<br />
                        {" "}ถึงวันที่{" "}
                        {booking.endDate
                            ? new Date(booking.endDate).toLocaleString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : "-"}
                    </Typography>

                    <TextField
                        label="เหตุผล (ถ้าไม่อนุมัติ)"
                        size="small"
                        fullWidth
                        multiline
                        rows={1}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
                        <Button variant="outlined" onClick={handleClose}>
                            ปิด
                        </Button>
                    </div>
                    <Button color="error" variant="contained" onClick={handleReject}>
                        ไม่อนุมัติ
                    </Button>
                    <Button color="success" variant="contained" onClick={handleApprove}
                        sx={{
                            color: "white"
                        }}
                    >
                        อนุมัติ
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
