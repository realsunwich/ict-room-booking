"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
    roomName: string;
}

export default function BookingDialog({ open, onClose, roomName }: BookingModalProps) {
    const [formData, setFormData] = useState({
        sender: "",
        jobName: "",
        phoneIn: "",
        phoneOut: "",
        department: "",
        purpose: "",
        RoomName: "",
        startDate: "",
        endDate: "",
        capacity: "",
        cfSender: "",
        cfPhone: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("error");

    useEffect(() => {
        if (open) {
            setFormData((prev) => ({ ...prev, RoomName: roomName }));
        }
    }, [open, roomName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({
            sender: "",
            jobName: "",
            phoneIn: "",
            phoneOut: "",
            department: "",
            purpose: "",
            RoomName: roomName,
            startDate: "",
            endDate: "",
            capacity: "",
            cfSender: "",
            cfPhone: "",
        });
    };

    const handleSubmit = async () => {
        const bookingData = {
            ...formData,
            RoomName: roomName,
        };

        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            if (res.ok) {
                setSnackbarMessage("จองห้องสำเร็จ");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                resetForm();
                setTimeout(() => {
                    setSnackbarOpen(false);
                    onClose();
                }, 2000);
            } else {
                setSnackbarMessage("เกิดข้อผิดพลาดในการจองห้อง");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Booking error:", error);
            setSnackbarMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm">
                <DialogTitle textAlign="center">แบบฟอร์มจองห้อง</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="ชื่อผู้ขอใช้" name="sender" value={formData.sender} onChange={handleChange} size="small" sx={{ width: "300px" }} required />
                        <FormControl size="small" sx={{ width: "300px" }} required>
                            <InputLabel id="jobName-label">ตำแหน่ง</InputLabel>
                            <Select
                                labelId="jobName-label"
                                id="jobName"
                                name="jobName"
                                value={formData.jobName}
                                onChange={(e) => setFormData({ ...formData, jobName: e.target.value })}
                                label="ตำแหน่ง"
                            >
                                <MenuItem value="อาจารย์">อาจารย์</MenuItem>
                                <MenuItem value="เจ้าหน้าที่">เจ้าหน้าที่</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="เบอร์โทรศัพท์ติดต่อ" name="phoneOut" value={formData.phoneOut} onChange={handleChange} size="small" sx={{ width: "300px" }} required />
                        <TextField label="เบอร์โทรศัพท์ภายใน" name="phoneIn" value={formData.phoneIn} onChange={handleChange} size="small" sx={{ width: "300px" }} />
                        <TextField label="สังกัดหน่วยงาน" name="department" value={formData.department} onChange={handleChange} size="small" sx={{ width: "300px" }} required />
                        <TextField label="วัตถุประสงค์ในการใช้งาน (รายละเอียด)" name="purpose" value={formData.purpose} onChange={handleChange} size="small" sx={{ width: "300px" }} required />
                        <TextField label="ห้องประชุม" name="RoomName" value={roomName} size="small" sx={{ width: "300px" }} disabled required />
                        <TextField type="datetime-local" label="เริ่มวันที่" name="startDate" value={formData.startDate} onChange={handleChange} size="small" sx={{ width: "300px" }} InputLabelProps={{ shrink: true }} required />
                        <TextField type="datetime-local" label="สิ้นสุดในวันที่" name="endDate" value={formData.endDate} onChange={handleChange} size="small" sx={{ width: "300px" }} InputLabelProps={{ shrink: true }} required />
                        <TextField type="number" label="จำนวนผู้เข้าร่วม" name="capacity" value={formData.capacity} onChange={handleChange} size="small" sx={{ width: "300px" }} required />
                        <TextField label="ผู้ขอใช้บริการ" name="cfSender" value={formData.cfSender} onChange={handleChange} size="small" sx={{ width: "300px" }} required />
                        <TextField label="เบอร์ติดต่อผู้ขอใช้" name="cfPhone" value={formData.cfPhone} onChange={handleChange} size="small" sx={{ width: "300px" }} required />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{
                                color: "error.main",
                                borderColor: "white",
                                "&:hover": {
                                    backgroundColor: "error.main",
                                    color: "white",
                                },
                            }}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleSubmit}
                            sx={{
                                color: "success.main",
                                borderColor: "white",
                                "&:hover": {
                                    backgroundColor: "success.main",
                                    color: "white",
                                },
                            }}
                        >
                            ยืนยันการจอง
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
