"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { th as thLocale } from "date-fns/locale";

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

interface EditBookingDialogProps {
    open: boolean;
    onClose: () => void;
    roomName: string;
    defaultData: Booking;
}

function combineDateTime(date: Date, time: Date) {
    const newDate = new Date(date);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    return newDate;
}

export default function EditBookingDialog({
    open,
    onClose,
    roomName,
    defaultData,
}: EditBookingDialogProps) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error" as "success" | "error",
    });

    const [startDay, setStartDay] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endDay, setEndDay] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [formData, setFormData] = useState({
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


    useEffect(() => {
        if (defaultData && open) {
            setFormData({
                sender: defaultData.sender ?? "",
                jobName: defaultData.jobName ?? "",
                phoneIn: defaultData.phoneIn ?? "",
                phoneOut: defaultData.phoneOut ?? "",
                officeLocation: defaultData.officeLocation ?? "",
                purpose: defaultData.purpose ?? "",
                RoomName: defaultData.RoomName,
                startDate: defaultData.startDate,
                endDate: defaultData.endDate,
                capacity: defaultData.capacity.toString(),
                cfSender: defaultData.cfSender ?? "",
                cfPhone: defaultData.cfPhone ?? "",
            });
            setStartDay(new Date(defaultData.startDate));
            setStartTime(new Date(defaultData.startDate));
            setEndDay(new Date(defaultData.endDate));
            setEndTime(new Date(defaultData.endDate));
        }
    }, [defaultData, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!startDay || !startTime || !endDay || !endTime) {
            setSnackbar({ open: true, message: "กรุณากรอกวันและเวลาให้ครบ", severity: "error" });
            return;
        }

        const updatedStart = combineDateTime(startDay, startTime);
        const updatedEnd = combineDateTime(endDay, endTime);

        if (updatedEnd <= updatedStart) {
            setSnackbar({ open: true, message: "เวลาสิ้นสุดต้องมากกว่าเวลาเริ่ม", severity: "error" });
            return;
        }

        const updatedData = {
            ...formData,
            RoomName: roomName,
            startDate: updatedStart.toISOString(),
            endDate: updatedEnd.toISOString(),
        };

        try {
            const res = await fetch("/api/booking/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                setSnackbar({ open: true, message: "แก้ไขคำขอสำเร็จ", severity: "success" });
                setTimeout(() => {
                    setSnackbar((prev) => ({ ...prev, open: false }));
                    onClose();
                }, 1500);
            } else {
                setSnackbar({ open: true, message: "ไม่สามารถแก้ไขได้", severity: "error" });
            }
        } catch {
            setSnackbar({ open: true, message: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์", severity: "error" });
        }
    };

    const textFieldProps = {
        size: "small" as const,
        sx: { width: 300 },
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm">
                <DialogTitle textAlign="center">แก้ไขข้อมูลคำขอ</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="ชื่อผู้ขอใช้" name="sender" value={formData?.sender ?? ""} onChange={handleChange} {...textFieldProps} />
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
                        <TextField label="เบอร์โทรศัพท์ภายใน" name="phoneIn" value={formData.phoneIn} onChange={handleChange} {...textFieldProps} />
                        <TextField label="สังกัดหน่วยงาน" name="officeLocation" value={formData.officeLocation} onChange={handleChange} {...textFieldProps} />
                        <TextField label="ชื่อห้อง" name="RoomName" value={formData.RoomName} onChange={handleChange} {...textFieldProps} disabled />
                        <TextField label="วัตถุประสงค์" name="purpose" value={formData.purpose} onChange={handleChange} {...textFieldProps} />
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
                            <DatePicker label="วันที่เริ่ม" value={startDay} onChange={setStartDay} />
                            <TimePicker label="เวลาเริ่ม" value={startTime} onChange={setStartTime} minutesStep={30} />
                            <DatePicker label="วันที่สิ้นสุด" value={endDay} onChange={setEndDay} />
                            <TimePicker label="เวลาสิ้นสุด" value={endTime} onChange={setEndTime} minutesStep={30} />
                        </LocalizationProvider>
                        <TextField label="จำนวนผู้เข้าร่วม" name="capacity" type="number" value={formData.capacity} onChange={handleChange} {...textFieldProps} />
                        <TextField label="ผู้ขอใช้บริการ" name="cfSender" value={formData.cfSender} onChange={handleChange} {...textFieldProps} />
                        <TextField label="เบอร์ติดต่อผู้ขอใช้" name="cfPhone" value={formData.cfPhone} onChange={handleChange} {...textFieldProps} />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <Button onClick={onClose} color="error" variant="outlined">ยกเลิก</Button>
                        <Button onClick={handleSave} color="primary" variant="outlined">บันทึก</Button>
                    </Stack>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </>
    );
}
