"use client";

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface Room {
    name: string;
    detailImage_1: string;
    detailImage_2?: string;
}

interface RoomDetailDialogProps {
    open: boolean;
    onClose: () => void;
    room: Room | null;
}

export default function RoomDetailDialog({ open, onClose, room }: RoomDetailDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={typeof window !== "undefined" && window.innerWidth < 600}
            maxWidth="md"
            fullWidth
            scroll="body"
        >
            <DialogTitle
                align="center"
                sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    bgcolor: "#f5f5f5",
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1.5, sm: 2 },
                }}
            >
                {room?.name}
            </DialogTitle>
            <DialogContent
                dividers
                sx={{
                    bgcolor: "#fafafa",
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2, sm: 3 },
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    {[room?.detailImage_1, room?.detailImage_2]
                        .filter(Boolean)
                        .map((img, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    width: "100%",
                                    maxWidth: { xs: "100%", sm: 400 },
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    bgcolor: "white",
                                }}
                            >
                                <Zoom>
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`room-detail-${idx + 1}`}
                                        sx={{
                                            width: "100%",
                                            height: "auto",
                                            objectFit: "cover",
                                            cursor: "zoom-in",
                                            display: "block",
                                        }}
                                    />
                                </Zoom>
                                <Box sx={{ py: 1 }}>
                                    <Typography
                                        variant="body2"
                                        align="center"
                                        sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                                        color="text.primary"
                                    >
                                        {idx === 0 ? "ภาพภายในห้อง" : "ผังห้องประชุม"}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: "center",
                    py: { xs: 1.5, sm: 2 },
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        minWidth: 100,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        ":hover": {
                            bgcolor: "primary.main",
                            color: "white",
                            borderColor: "primary.main",
                        },
                    }}
                >
                    ปิด
                </Button>
            </DialogActions>
        </Dialog>
    );
}
