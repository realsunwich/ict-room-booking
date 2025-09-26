"use client";

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, } from "@mui/material";

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

interface CancelDialogProps {
    open: boolean;
    onClose: () => void;
    booking: Booking;
    onSuccess: () => void;
}

export default function CancelDialog({
    open,
    onClose,
    booking,
    onSuccess,
}: CancelDialogProps) {
    const [reason, setReason] = useState("");

    const handleCancel = async () => {
        try {
            const res = await fetch("/api/booking/cancel", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingID: booking.bookingID,
                    cancelReason: reason,
                }),
            });

            if (!res.ok) throw new Error();
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("เกิดข้อผิดพลาดในการยกเลิกคำขอ");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>ยืนยันการยกเลิกคำขอ</DialogTitle>
            <DialogContent>
                <Typography>คุณแน่ใจหรือไม่ว่าต้องการยกเลิกคำขอนี้?</Typography>
                <TextField
                    fullWidth
                    multiline
                    required
                    rows={3}
                    label="กรุณาระบุเหตุผล"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    sx={{ mt: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    ยกเลิก
                </Button>
                <Button onClick={handleCancel} color="error" variant="contained">
                    ยืนยัน
                </Button>
            </DialogActions>
        </Dialog>
    );
}
