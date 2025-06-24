"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from "@mui/material";

interface RoomStat {
    RoomName: string;
    totalUsage: number;
}

interface StatsDialogProps {
    open: boolean;
    onClose: () => void;
    stats: RoomStat[];
}

export default function StatsDialog({ open, onClose, stats }: StatsDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>สถิติการใช้งานห้องประชุม</DialogTitle>
            <DialogContent dividers>
                {stats.length === 0 ? (
                    <Typography align="center">ไม่มีข้อมูลสถิติการใช้งาน</Typography>
                ) : (
                    stats.map((stat, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderBottom: "1px solid #ddd",
                                py: 1,
                            }}
                        >
                            <Typography>{stat.RoomName}</Typography>
                            <Typography fontWeight="bold">{stat.totalUsage} ครั้ง</Typography>
                        </Box>
                    ))
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>ปิด</Button>
            </DialogActions>
        </Dialog>
    );
}
