"use client";

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export interface FilterOptions {
    room: string;
    role: string;
    gender: string;
}

interface AssessmentFilterProps {
    filter: FilterOptions;
    setFilter: (filter: FilterOptions) => void;
    availableRooms: string[];
    availableRoles: string[];
    availableGenders: string[];
}

export default function AssessmentFilter({
    filter,
    setFilter,
    availableRooms,
    availableRoles,
    availableGenders,
}: AssessmentFilterProps) {

    const handleChange = (field: keyof FilterOptions) => (event: SelectChangeEvent) => {
        setFilter({ ...filter, [field]: event.target.value });
    };

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
                    minWidth: { xs: "100%", sm: 250 },
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                }}
            >
                <InputLabel>ห้องประชุม</InputLabel>
                <Select value={filter.room} label="ห้องประชุม" onChange={handleChange("room")}>
                    <MenuItem value="">ทั้งหมด</MenuItem>
                    {availableRooms.map((room) => (
                        <MenuItem key={room} value={room}>
                            {room}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl
                size="small"
                sx={{
                    minWidth: { xs: "100%", sm: 200 },
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                }}
            >
                <InputLabel>สถานภาพ</InputLabel>
                <Select value={filter.role} label="สถานภาพ" onChange={handleChange("role")}>
                    <MenuItem value="">ทั้งหมด</MenuItem>
                    {availableRoles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl
                size="small"
                sx={{
                    minWidth: { xs: "100%", sm: 200 },
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                }}
            >
                <InputLabel>เพศ</InputLabel>
                <Select value={filter.gender} label="เพศ" onChange={handleChange("gender")}>
                    <MenuItem value="">ทั้งหมด</MenuItem>
                    {availableGenders.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                            {gender}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
