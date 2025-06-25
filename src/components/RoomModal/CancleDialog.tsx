"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, } from "@mui/material";

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
    const handleCancel = async () => {
        try {
            const res = await fetch("/api/booking/cancel", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingID: booking.bookingID }),
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