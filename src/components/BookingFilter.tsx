"use client";

import { useEffect } from "react";
import { Box, TextField, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent, } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { th } from "date-fns/locale";

interface BookingFilterProps {
    filterRoom: string;
    setFilterRoom: (value: string) => void;
    filterStatus: string;
    setFilterStatus: (value: string) => void;
    filterStartDate: string;
    setFilterStartDate: (value: string) => void;
    filterEndDate: string;
    setFilterEndDate: (value: string) => void;
    availableRooms: string[];
}

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // format: YYYY-MM-DD
};

export default function BookingFilter({
    filterRoom,
    setFilterRoom,
    filterStatus,
    setFilterStatus,
    filterStartDate,
    setFilterStartDate,
    filterEndDate,
    setFilterEndDate,
    availableRooms,
}: BookingFilterProps) {
    // เซ็ต default ถ้าเป็นค่าว่าง
    useEffect(() => {
        const today = getTodayDate();
        if (!filterStartDate) setFilterStartDate(today);
        if (!filterEndDate) setFilterEndDate(today);
    }, [filterStartDate, filterEndDate, setFilterStartDate, setFilterEndDate]);

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mb: 3,
            }}
        >
            <FormControl
                size="small"
                sx={{
                    minWidth: { xs: 180, sm: 220, md: 260 },
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                }}
            >
                <InputLabel>ห้องประชุม</InputLabel>
                <Select
                    value={filterRoom}
                    label="ห้องประชุม"
                    onChange={(e: SelectChangeEvent) => setFilterRoom(e.target.value)}
                >
                    <MenuItem value="">ทั้งหมด</MenuItem>
                    {availableRooms.map((room) => (
                        <MenuItem key={room} value={room}>
                            {room}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                select
                label="สถานะ"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                size="small"
                sx={{
                    minWidth: { xs: 140, sm: 180, md: 200 },
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                }}
            >
                <MenuItem value="">ทั้งหมด</MenuItem>
                <MenuItem value="กำลังรอ">กำลังรอ</MenuItem>
                <MenuItem value="อนุมัติ">อนุมัติ</MenuItem>
                <MenuItem value="ไม่อนุมัติ">ไม่อนุมัติ</MenuItem>
                <MenuItem value="เสร็จสิ้น">เสร็จสิ้น</MenuItem>
                <MenuItem value="ถูกยกเลิก">ถูกยกเลิก</MenuItem>
            </TextField>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
                <DatePicker
                    label="วันที่เริ่ม"
                    value={filterStartDate ? new Date(filterStartDate) : null}
                    onChange={(newValue) => {
                        if (newValue) {
                            setFilterStartDate(newValue.toISOString().split("T")[0]); // เก็บเป็น YYYY-MM-DD
                        }
                    }}
                    format="dd/MM/yyyy"
                    slotProps={{
                        textField: {
                            size: "small",
                            sx: {
                                minWidth: { xs: 120, sm: 150, md: 180 },
                                flex: { xs: "1 1 100%", sm: "0 1 auto" },
                            },
                        },
                    }}
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
                <DatePicker
                    label="วันที่สิ้นสุด"
                    value={filterEndDate ? new Date(filterEndDate) : null}
                    onChange={(newValue) => {
                        if (newValue) {
                            setFilterEndDate(newValue.toISOString().split("T")[0]); // เก็บเป็น YYYY-MM-DD
                        }
                    }}
                    format="dd/MM/yyyy"
                    slotProps={{
                        textField: {
                            size: "small",
                            sx: {
                                minWidth: { xs: 120, sm: 150, md: 180 },
                                flex: { xs: "1 1 100%", sm: "0 1 auto" },
                            },
                        },
                    }}
                />
            </LocalizationProvider>

        </Box>
    );
}
