"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ManageBookingDialog({
    open,
    onClose,
    booking,
    onStatusChange,
}: {
    open: boolean;
    onClose: () => void;
    booking: any;
    onStatusChange: (status: string, reason?: string) => void;
}) {
    const [reason, setReason] = useState("");
    const handleClose = () => {
        setReason("");
        onClose();
    };

    if (!booking) return null;

    const handleApprove = () => {
        onStatusChange("อนุมัติ");
    };

    const handleReject = () => {
        onStatusChange("ไม่อนุมัติ", reason);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>จัดการคำขอใช้ห้องประชุม</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    สถานที่ : {booking.RoomName || "-"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    วัตถุประสงค์ : {booking.purpose || "-"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    วันที่ :{" "}
                    {booking.startDate
                        ? new Date(booking.startDate).toLocaleString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                        : "-"}
                    {" "}ถึง{" "}
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
    );
}
