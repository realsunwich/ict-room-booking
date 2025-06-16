"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button, CircularProgress, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, } from "@mui/material";
import Header from "@/components/header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface ICTRoom {
    RoomID: string;
    RoomName?: string;
    RoomLocation?: string;
    RoomCapacity?: number;
    RoomStatus?: string;
    RecordStatus?: string;
}

export default function RoomsManage() {
    const { data: session } = useSession();
    const [rooms, setRooms] = useState<ICTRoom[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentRoom, setCurrentRoom] = useState<Partial<ICTRoom>>({});
    const [deleteConfirm, setDeleteConfirm] = useState<null | string>(null);

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarConfig, setSnackbarConfig] = useState({ message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });


    const handleSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
        setSnackbarConfig({ message, severity });
        setOpenSnackbar(true);
    };


    useEffect(() => {
        document.title = "จัดการห้องประชุม | ระบบจองห้องประชุม ICT";

        const fetchRooms = async () => {
            try {
                const res = await fetch("/api/admin/rooms");
                const data = await res.json();
                setRooms(data);
            } catch (error) {
                console.error("โหลดข้อมูลห้องผิดพลาด", error);
                handleSnackbar('ไม่สามารถโหลดข้อมูลได้', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const openAddModal = () => {
        setCurrentRoom({});
        setIsEditMode(false);
        setModalOpen(true);
    };

    const openEditModal = (room: ICTRoom) => {
        setCurrentRoom(room);
        setIsEditMode(true);
        setModalOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;

        try {
            await fetch(`/api/admin/rooms/${deleteConfirm}`, {
                method: "DELETE",
            });
            handleSnackbar('ลบห้องสำเร็จ', 'success');
            setRooms((prev) => prev.filter((r) => r.RoomID !== deleteConfirm));
            setDeleteConfirm(null);
        } catch (error) {
            console.error("ลบห้องไม่สำเร็จ", error);
            handleSnackbar('ไม่สามารถลบห้องได้', 'error');
        }
    };

    const handleSave = async () => {
        try {
            const method = isEditMode ? "PUT" : "POST";
            const url = isEditMode
                ? `/api/admin/rooms/${currentRoom.RoomID}`
                : `/api/admin/rooms`;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentRoom),
            });

            const saved = await res.json();

            if (isEditMode) {
                setRooms((prev) =>
                    prev.map((r) => (r.RoomID === saved.RoomID ? saved : r))
                );
                handleSnackbar('แก้ไขห้องสำเร็จ', 'success');
            } else {
                setRooms((prev) => [...prev, saved]);
                handleSnackbar('เพิ่มห้องสำเร็จ', 'success');
            }

            setModalOpen(false);
        } catch (error) {
            console.error("บันทึกไม่สำเร็จ", error);
            handleSnackbar('ไม่สามารถบันทึกข้อมูลได้', 'error');
        }
    };

    return (
        <Box sx={{ marginTop: { xs: 2, sm: 10 } }}>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "auto",
                    bgcolor: "white",
                    px: { xs: 2, sm: 4 },
                    pt: { xs: 2, sm: 4 },
                    pb: 4,
                    mt: 10,
                    borderRadius: 2,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5" color="primary">จัดการห้องประชุม</Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={openAddModal}
                        sx={{
                            backgroundColor: "primary.main",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "primary.light",
                            },
                        }}
                    >
                        เพิ่มห้องใหม่
                    </Button>
                </Box>

                {loading ? (
                    <Box sx={{ textAlign: "center", mt: 4, justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress />
                        <Typography mt={2}>กำลังโหลด...</Typography>
                    </Box>
                ) : (
                    <Stack direction="column" spacing={2} mt={2} sx={{ maxWidth: "250px" }}>
                        {rooms.map((room) => (
                            <Card key={room.RoomID}>
                                <CardContent>
                                    <Typography variant="h6">{room.RoomName}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        สถานที่ : {room.RoomLocation || "ไม่ระบุ"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ความจุ : {room.RoomCapacity || "-"} คน
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        สถานะ :{" "}
                                        <span
                                            style={{
                                                color:
                                                    room.RoomStatus === "พร้อมใช้งาน"
                                                        ? "success.main"
                                                        : room.RoomStatus === "ไม่พร้อมใช้งาน"
                                                            ? "error.main"
                                                            : room.RoomStatus === "ถูกจองแล้ว"
                                                                ? "warning.main"
                                                                : "text.secondary",
                                            }}
                                        >
                                            {room.RoomStatus === "พร้อมใช้งาน"
                                                ? "พร้อมใช้งาน"
                                                : room.RoomStatus === "ไม่พร้อมใช้งาน"
                                                    ? "ไม่พร้อมใช้งาน"
                                                    : room.RoomStatus === "ถูกจองแล้ว"
                                                        ? "ถูกจองแล้ว"
                                                        : "ไม่ระบุ"}
                                        </span>
                                    </Typography>

                                    <Stack direction="row" justifyContent="end" mt={1}>
                                        <IconButton color="warning" onClick={() => openEditModal(room)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => setDeleteConfirm(room.RoomID)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}
            </Box>

            {/* Modal: เพิ่ม / แก้ไข */}
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{isEditMode ? "แก้ไขห้องประชุม" : "เพิ่มห้องประชุม"}</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField
                        label="ชื่อห้อง"
                        size="small"
                        value={currentRoom.RoomName || ""}
                        onChange={(e) => setCurrentRoom({ ...currentRoom, RoomName: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, marginTop: 1 }}
                    />
                    <TextField
                        label="สถานที่"
                        size="small"
                        value={currentRoom.RoomLocation || ""}
                        onChange={(e) => setCurrentRoom({ ...currentRoom, RoomLocation: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <TextField
                        label="ความจุ"
                        size="small"
                        value={currentRoom.RoomCapacity || ""}
                        onChange={(e) => setCurrentRoom({ ...currentRoom, RoomCapacity: +e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)}>ยกเลิก</Button>
                    <Button variant="contained" onClick={handleSave}>
                        บันทึก
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal: ยืนยันการลบ */}
            <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
                <DialogTitle>ยืนยันการลบ</DialogTitle>
                <DialogContent>
                    <Typography>คุณแน่ใจหรือไม่ว่าต้องการลบห้องนี้?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirm(null)}>ยกเลิก</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        ลบ
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarConfig.severity}>
                    {snackbarConfig.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
