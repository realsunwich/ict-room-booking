"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { th as thLocale } from "date-fns/locale";

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
    roomName: string;
}

function toLocalISOString(date: Date) {
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hour}:${minute}`;
}

const shouldDisableHour = (hour: number) => {
    return hour < minBookingHour || hour >= maxBookingHour;
};

const shouldDisableMinute = (minute: number) => {
    return minute !== 0 && minute !== 30;
};

const minBookingHour = 8;
const maxBookingHour = 17;

const getTime = (hours: number, minutes = 0) => {
    const d = new Date(0);
    d.setHours(hours, minutes, 0, 0);
    return d;
};

const initialFormData = (roomName: string) => ({
    sender: "",
    jobName: "",
    phoneIn: "",
    phoneOut: "",
    officeLocation: "",
    purpose: "",
    RoomName: roomName,
    startDate: "",
    endDate: "",
    capacity: "",
    cfSender: "",
    cfPhone: "",
});

export default function BookingDialog({
    open,
    onClose,
    roomName,
}: BookingModalProps) {
    const [formData, setFormData] = useState(initialFormData(roomName));
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error" as "success" | "error",
    });

    useEffect(() => {
        if (open) {
            setFormData((prev) => ({ ...prev, RoomName: roomName }));
        }
    }, [open, roomName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isWithinBookingHours = (date: Date | null) => {
        if (!date) return false;
        const hour = date.getHours();
        return hour >= minBookingHour && hour < maxBookingHour;
    };

    const handleDateChange = (name: "startDate" | "endDate", value: Date | null) => {
        if (!value) return;

        if (!isWithinBookingHours(value)) {
            setSnackbar({
                open: true,
                message: `กรุณาเลือกเวลาระหว่าง ${minBookingHour}:00 - ${maxBookingHour}:00`,
                severity: "error",
            });
            return;
        }

        if (name === "endDate" && formData.startDate) {
            const start = new Date(formData.startDate);
            if (value <= start) {
                setSnackbar({
                    open: true,
                    message: "วันที่สิ้นสุดต้องอยู๋หลังจากวันที่เริ่ม",
                    severity: "error",
                });
                return;
            }
        }

        setFormData({ ...formData, [name]: toLocalISOString(value) });
    };

    const handleSubmit = async () => {
        const bookingData = { ...formData, RoomName: roomName };

        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (res.ok) {
                setSnackbar({ open: true, message: "จองห้องสำเร็จ", severity: "success" });
                setFormData(initialFormData(roomName));
                setTimeout(() => {
                    setSnackbar((prev) => ({ ...prev, open: false }));
                    onClose();
                }, 2000);
            } else {
                setSnackbar({ open: true, message: "เกิดข้อผิดพลาดในการจองห้อง", severity: "error" });
            }
        } catch {
            setSnackbar({ open: true, message: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์", severity: "error" });
        }
    };

    const textFieldProps = {
        size: "small" as const,
        sx: { width: 300 },
        required: true,
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm">
                <DialogTitle textAlign="center">แบบฟอร์มจองห้อง</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="ชื่อผู้ขอใช้" name="sender" value={formData.sender} onChange={handleChange} {...textFieldProps} />
                        <FormControl size="small" sx={{ width: 300 }} required>
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
                        <TextField label="เบอร์โทรศัพท์ติดต่อ" name="phoneOut" value={formData.phoneOut} onChange={handleChange} {...textFieldProps} />
                        <TextField
                            label="เบอร์โทรศัพท์ภายใน"
                            name="phoneIn"
                            value={formData.phoneIn}
                            onChange={handleChange}
                            {...textFieldProps}
                            required={false}
                        />
                        <TextField label="สังกัดหน่วยงาน" name="officeLocation" value={formData.officeLocation} onChange={handleChange} {...textFieldProps} />
                        <TextField label="วัตถุประสงค์ในการใช้งาน (รายละเอียด)" name="purpose" value={formData.purpose} onChange={handleChange} {...textFieldProps} />
                        <TextField label="ห้องประชุม" name="RoomName" value={roomName} disabled {...textFieldProps} />
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
                            <DateTimePicker
                                label="เริ่มวันที่"
                                value={formData.startDate ? new Date(formData.startDate) : null}
                                onChange={(val) => handleDateChange("startDate", val)}
                                minutesStep={30}
                                ampm={false}
                                slotProps={{ textField: textFieldProps }}
                                shouldDisableTime={(timeValue, clockType) => {
                                    if (clockType === "hours") return shouldDisableHour(timeValue.getHours());
                                    if (clockType === "minutes") return shouldDisableMinute(timeValue.getMinutes());
                                    return false;
                                }}
                            />

                            <DateTimePicker
                                label="สิ้นสุดในวันที่"
                                value={formData.endDate ? new Date(formData.endDate) : null}
                                onChange={(val) => handleDateChange("endDate", val)}
                                minutesStep={30}
                                ampm={false}
                                slotProps={{ textField: textFieldProps }}
                                shouldDisableTime={(timeValue, clockType) => {
                                    if (clockType === "hours") return shouldDisableHour(timeValue.getHours());
                                    if (clockType === "minutes") return shouldDisableMinute(timeValue.getMinutes());
                                    return false;
                                }}
                            />
                        </LocalizationProvider>
                        <TextField type="number" label="จำนวนผู้เข้าร่วม" name="capacity" value={formData.capacity} onChange={handleChange} {...textFieldProps} />
                        <TextField label="ผู้ขอใช้บริการ" name="cfSender" value={formData.cfSender} onChange={handleChange} {...textFieldProps} />
                        <TextField label="เบอร์ติดต่อผู้ขอใช้" name="cfPhone" value={formData.cfPhone} onChange={handleChange} {...textFieldProps} />
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
                                "&:hover": { backgroundColor: "error.main", color: "white" },
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
                                "&:hover": { backgroundColor: "success.main", color: "white" },
                            }}
                        >
                            ยืนยันการจอง
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
