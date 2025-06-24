"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, } from "@mui/material";

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
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {stats.length === 1 && (
                <DialogTitle>สถิติการใช้งาน {stats[0].RoomName}</DialogTitle>
            )}
            <DialogContent dividers>
                {stats.length === 0 ? (
                    <Typography align="center">ไม่มีข้อมูลสถิติการใช้งาน</Typography>
                ) : (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {stats.map((stat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    bgcolor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold" mb={1}>
                                    ถูกใช้งานทั้งหมด {stat.totalUsage} ครั้ง
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>ปิด</Button>
            </DialogActions>
        </Dialog>
    );
}