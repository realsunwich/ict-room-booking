"use client";

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, RadioGroup, FormControlLabel, Radio, TextField, CircularProgress, Alert, } from "@mui/material";

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
    const [clearStatus, setclearStatus] = useState<string>("");
    const [damageAction, setDamageAction] = useState<string>("");

    const [remark, setRemark] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await fetch("/api/booking/roomcheck", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingID,
                    clearStatus,
                    damageAction,
                    remark,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "เกิดข้อผิดพลาดในการบันทึก");
            }

            onCheckComplete();
            onClose();
        } catch (error) 
        {
            console.error("Error submitting room check:", error);
            const err = error as Error;
            setError(err.message || "เกิดข้อผิดพลาด");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setclearStatus("");
            setDamageAction("");
            setRemark("");
            setError("");
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>ตรวจเช็คหลังการใช้บริการห้องประชุม</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                    <RadioGroup
                        value={clearStatus}
                        onChange={(e) => setclearStatus(e.target.value)}
                        row
                    >
                        <FormControlLabel value="clear" control={<Radio />} label="เรียบร้อยดี" />
                        <FormControlLabel value="not_clear" control={<Radio />} label="ไม่เรียบร้อย" />
                    </RadioGroup>
                </FormControl>

                {clearStatus === "not_clear" && (
                    <>
                        <TextField
                            label="เพราะมีรายการความเสียหายหลังการใช้งาน ดังนี้"
                            multiline
                            rows={3}
                            fullWidth
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            disabled={loading}
                            required
                            error={remark.trim() === ""}
                            helperText={remark.trim() === "" ? "กรุณากรอกหมายเหตุ" : ""}
                        />

                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                                value={damageAction}
                                onChange={(e) => setDamageAction(e.target.value)}
                                row
                            >
                                <FormControlLabel
                                    value="notify_user"
                                    control={<Radio />}
                                    label="ดำเนินการแจ้งกลับไปยังผู้ใช้งานทราบหลังตรวจพบความเสียหายแล้ว"
                                />
                                <FormControlLabel
                                    value="self_fixed"
                                    control={<Radio />}
                                    label="ดำเนินการแก้ไขด้วยตัวเองแล้วเรียบร้อย"
                                />
                            </RadioGroup>
                        </FormControl>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    ยกเลิก
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={
                        loading ||
                        (clearStatus === "not_clear" && remark.trim() === "")
                    }
                >
                    {loading ? <CircularProgress size={24} /> : "บันทึก"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CheckRoomDialog;
