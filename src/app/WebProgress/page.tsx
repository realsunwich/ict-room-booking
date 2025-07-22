"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Typography, Divider, Modal } from "@mui/material";
import Image from "next/image";

import Header from "@/components/header";

export default function AssessmentSum() {
    const { data: session } = useSession();

    const [open, setOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState("");

    useEffect(() => {
        if (!open) return;

        const container = document.getElementById("zoom-container");
        const image = document.getElementById("zoom-image") as HTMLElement;

        let scale = 1;
        let lastScale = 1;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                lastScale = scale;
                startX = dx * dx + dy * dy;
            } else if (e.touches.length === 1) {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            }
        };

        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = dx * dx + dy * dy;
                const newScale = Math.min(3, Math.max(1, (dist / startX) * lastScale));
                scale = newScale;
                image.style.transform = `scale(${scale})`;
            }
        };

        container?.addEventListener("touchstart", onTouchStart, { passive: false });
        container?.addEventListener("touchmove", onTouchMove, { passive: false });

        return () => {
            container?.removeEventListener("touchstart", onTouchStart);
            container?.removeEventListener("touchmove", onTouchMove);
        };
    }, [open]);

    useEffect(() => {
        document.title = "สรุปผลการประเมิน | ระบบจองห้องประชุม ICT";
    }, []);

    const handleOpen = (src: string) => {
        setCurrentImg(src);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <Box
            sx={{
                marginTop: session?.user?.role === "User" ? { xs: 23, sm: 15 } : { xs: 19, sm: 15 },
            }}
        >
            <Header />
            <Box
                sx={{
                    bgcolor: "white",
                    px: { xs: 2, sm: 4 },
                    pt: { xs: 2, sm: 4 },
                    pb: 4,
                    mt: 10,
                    borderRadius: 7,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5" fontWeight={600}>
                        ขั้นตอนการขอใช้บริการห้องประชุมและโสตทัศนูปกรณ์
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        mt: 4,
                    }}
                >
                    {["/images/โฟลวขั้นตอน.jpg", "/images/ลำดับการทำงาน.jpg"].map((src, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: "100%",
                                maxWidth: 380,
                                mx: "auto", // center ในจอเล็ก
                                cursor: "zoom-in",
                                "&:hover": { opacity: 0.85 },
                            }}
                            onClick={() => handleOpen(src)}
                        >
                            <Image
                                src={src}
                                alt={`Workflow ${index + 1}`}
                                layout="responsive"
                                width={800}
                                height={600}
                                style={{ borderRadius: 12 }}
                                priority
                            />
                        </Box>
                    ))}
                </Box>

                <Modal open={open} onClose={handleClose}>
                    <Box
                        onClick={handleClose}
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            bgcolor: "rgba(0,0,0,0.9)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            zIndex: 9999,
                        }}
                    >
                        <Box
                            id="zoom-container"
                            sx={{
                                touchAction: "none",
                                width: "100%",
                                maxWidth: 800,
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                id="zoom-image"
                                src={currentImg}
                                alt="Zoomed"
                                width={1600}
                                height={1200}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    maxHeight: "100%",
                                    borderRadius: 8,
                                    transformOrigin: "center center",
                                    transition: "transform 0.1s ease-out",
                                }}
                            />
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
}