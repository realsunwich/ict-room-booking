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
                        สรุปผลการประเมินห้องประชุม
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* รูปภาพสองรูปข้างกัน */}
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
                                cursor: "zoom-in",
                                "&:hover": { opacity: 0.85 }
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
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: { xs: "90vw", sm: "80vw", md: "70vw" },
                            maxHeight: "90vh",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            borderRadius: 2,
                            overflow: "auto",
                            p: 2,
                            cursor: "zoom-out"
                        }}
                    >
                        <Image
                            src={currentImg}
                            alt="Zoomed Image"
                            width={1600}
                            height={1200}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: 8,
                                display: "block",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
}