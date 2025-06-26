"use client";

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, } from "@mui/material";

interface Booking {
    startDate: string;
    endDate: string;
    bookingID: string;
    RoomName: string;
    sender: string;
    phoneIn: string;
    phoneOut: string;
    jobName: string;
    officeLocation: string;
    purpose: string;
    capacity: number;
    cfSender: string;
    cfPhone: string;
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
        } catch (err) {
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
