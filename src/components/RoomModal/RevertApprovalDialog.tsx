"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    bookingID: string;
    onSuccess: () => void;
}

export default function RevertApprovalDialog({
    open,
    onClose,
    bookingID,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);

    const handleRevert = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/booking/revert-approval", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingID }),
            });

            if (!res.ok) throw new Error("เกิดข้อผิดพลาด");

            onSuccess();
            onClose();
        } catch (error) {
            alert("ไม่สามารถเปลี่ยนกลับเป็นกำลังรอได้");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>ยกเลิกการอนุมัติ</DialogTitle>
            <DialogContent>
                <Typography>คุณต้องการยกเลิกการอนุมัติหรือไม่?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>ยกเลิก</Button>
                <Button onClick={handleRevert} color="primary" variant="contained" disabled={loading}>
                    ยืนยัน
                </Button>
            </DialogActions>
        </Dialog>
    );
}