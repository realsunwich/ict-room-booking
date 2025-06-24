"use client";

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, CircularProgress, Alert, } from "@mui/material";

interface CheckRoomDialogProps {
    open: boolean;
    onClose: () => void;
    bookingID: string;
    onCheckComplete: () => void;
}

const CheckRoomDialog: React.FC<CheckRoomDialogProps> = ({
    open,
    onClose,
    bookingID,
    onCheckComplete,
}) => {
    const [cleanStatus, setCleanStatus] = useState<string>("");
    const [equipmentStatus, setEquipmentStatus] = useState<string>("");
    const [remark, setRemark] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!cleanStatus || !equipmentStatus) {
            setError("กรุณาเลือกสถานะให้ครบถ้วน");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/booking/checkRoom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingID,
                    cleanStatus,
                    equipmentStatus,
                    remark,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "เกิดข้อผิดพลาดในการบันทึก");
            }

            onCheckComplete();
            onClose();
        } catch (err: any) {
            setError(err.message || "เกิดข้อผิดพลาด");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setCleanStatus("");
            setEquipmentStatus("");
            setRemark("");
            setError("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>ตรวจเช็คความเรียบร้อยหลังใช้งาน</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                    <FormLabel component="legend">สถานะความสะอาด</FormLabel>
                    <RadioGroup
                        value={cleanStatus}
                        onChange={(e) => setCleanStatus(e.target.value)}
                        row
                    >
                        <FormControlLabel value="clean" control={<Radio />} label="สะอาด" />
                        <FormControlLabel value="not_clean" control={<Radio />} label="ไม่สะอาด" />
                    </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                    <FormLabel component="legend">สถานะอุปกรณ์</FormLabel>
                    <RadioGroup
                        value={equipmentStatus}
                        onChange={(e) => setEquipmentStatus(e.target.value)}
                        row
                    >
                        <FormControlLabel value="complete" control={<Radio />} label="ครบถ้วน" />
                        <FormControlLabel value="incomplete" control={<Radio />} label="ขาด" />
                    </RadioGroup>
                </FormControl>

                <TextField
                    label="หมายเหตุ (ถ้ามี)"
                    multiline
                    rows={3}
                    fullWidth
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    disabled={loading}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    ยกเลิก
                </Button>
                <Button onClick={handleSubmit} variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "บันทึก"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CheckRoomDialog;
