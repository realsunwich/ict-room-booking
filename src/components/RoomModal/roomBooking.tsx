"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { th as thLocale } from "date-fns/locale";

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
    roomName: string;
}

const minBookingHour = 8;
const maxBookingHour = 17;

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

export default function BookingDialog({ open, onClose, roomName }: BookingModalProps) {

    const [startDay, setStartDay] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);

    const [endDay, setEndDay] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    const [formData, setFormData] = useState(initialFormData(roomName));

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error" as "success" | "error",
    });

    useEffect(() => {
        if (open) {
            setFormData((prev) => ({ ...prev, RoomName: roomName }));
            setStartDay(null);
            setStartTime(null);
            setEndDay(null);
            setEndTime(null);
        }
    }, [open, roomName]);

    function combineDateTime(date: Date | null, time: Date | null): Date | null {
        if (!date || !time) return null;
        const combined = new Date(date);
        combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
        return combined;
    }

    const isWithinBookingHours = (date: Date | null) => {
        if (!date) return false;
        const hour = date.getHours();
        return hour >= minBookingHour && hour < maxBookingHour;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const combined = combineDateTime(startDay, startTime);
        if (combined) {
            if (!isWithinBookingHours(combined)) {
                setSnackbar({
                    open: true,
                    message: `กรุณาเลือกเวลาระหว่าง ${minBookingHour}:00 - ${maxBookingHour}:00`,
                    severity: "error",
                });
                setFormData((prev) => ({ ...prev, startDate: "" }));
                return;
            }
            setFormData((prev) => ({ ...prev, startDate: combined.toISOString() }));
        } else {
            setFormData((prev) => ({ ...prev, startDate: "" }));
        }
    }, [startDay, startTime]);

    useEffect(() => {
        const combined = combineDateTime(endDay, endTime);
        if (combined) {
            if (!isWithinBookingHours(combined)) {
                setSnackbar({
                    open: true,
                    message: `กรุณาเลือกเวลาระหว่าง ${minBookingHour}:00 - ${maxBookingHour}:00`,
                    severity: "error",
                });
                setFormData((prev) => ({ ...prev, endDate: "" }));
                return;
            }
            if (formData.startDate) {
                const start = new Date(formData.startDate);
                if (combined <= start) {
                    setSnackbar({
                        open: true,
                        message: "วันที่สิ้นสุดต้องอยู๋หลังจากวันที่เริ่ม",
                        severity: "error",
                    });
                    setFormData((prev) => ({ ...prev, endDate: "" }));
                    return;
                }
            }
            setFormData((prev) => ({ ...prev, endDate: combined.toISOString() }));
        } else {
            setFormData((prev) => ({ ...prev, endDate: "" }));
        }
    }, [endDay, endTime, formData.startDate]);

    const handleSubmit = async () => {
        if (!formData.startDate || !formData.endDate) {
            setSnackbar({ open: true, message: "กรุณาเลือกวันและเวลาเริ่มต้น-สิ้นสุดให้ครบถ้วน", severity: "error" });
            return;
        }

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
                setStartDay(null);
                setStartTime(null);
                setEndDay(null);
                setEndTime(null);

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
                        <TextField label="เบอร์โทรศัพท์ภายใน" name="phoneIn" value={formData.phoneIn} onChange={handleChange}                            {...textFieldProps} required={false} />
                        <TextField label="สังกัดหน่วยงาน" name="officeLocation" value={formData.officeLocation} onChange={handleChange} {...textFieldProps} />
                        <TextField label="ห้องประชุม" name="RoomName" value={roomName} disabled {...textFieldProps} />
                        <TextField label="วัตถุประสงค์ในการใช้งาน (รายละเอียด)" name="purpose" value={formData.purpose} onChange={handleChange} {...textFieldProps} />

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
                            <DatePicker
                                label="เลือกวันเริ่ม"
                                value={startDay}
                                onChange={(newDate) => setStartDay(newDate)}
                                slotProps={{ textField: { ...textFieldProps } }}
                                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                            />
                            <TimePicker
                                label="เลือกเวลาเริ่ม"
                                value={startTime}
                                onChange={(newTime) => setStartTime(newTime)}
                                minutesStep={30}
                                ampm={false}
                                minTime={new Date(0, 0, 0, minBookingHour, 0)}
                                maxTime={new Date(0, 0, 0, maxBookingHour, 0)}
                                slotProps={{ textField: { ...textFieldProps } }}
                            />

                            <DatePicker
                                label="เลือกวันสิ้นสุด"
                                value={endDay}
                                onChange={(newDate) => setEndDay(newDate)}
                                minDate={startDay || new Date(new Date().setDate(new Date().getDate() + 1))}
                                disabled={!startDay}
                                slotProps={{ textField: { ...textFieldProps } }}
                            />
                            <TimePicker
                                label="เลือกเวลาสิ้นสุด"
                                value={endTime}
                                onChange={(newTime) => setEndTime(newTime)}
                                minutesStep={30}
                                ampm={false}
                                minTime={new Date(0, 0, 0, minBookingHour, 0)}
                                maxTime={new Date(0, 0, 0, maxBookingHour, 0)}
                                disabled={!endDay}
                                slotProps={{ textField: { ...textFieldProps } }}
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
