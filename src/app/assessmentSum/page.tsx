"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import "react-medium-image-zoom/dist/styles.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Header from "@/components/header";

export default function assesmentSum() {
    const [showContact, setShowContact] = useState(true);

    useEffect(() => {
        document.title = "สรุปผลการประเมิน | ระบบจองห้องประชุม ICT";
    }, []);


    return (
        <Box sx={{ marginTop: { xs: 25, sm: 17 } }}>
            <Header />
            <Box
                sx={{
                    display: "flex", flexDirection: "column",
                    minHeight: "auto", bgcolor: "white",
                    px: { xs: 2, sm: 4 }, pt: { xs: 2, sm: 4 },
                    pb: 4, mt: 10, borderRadius: 7,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Box
                    sx={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        justifyContent: "center", textAlign: "center", mb: 4,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        สรุปผลการประเมินห้องประชุมภายในคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 1,
                    }}
                >
                    {showContact && (
                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                p: 2,
                                borderRadius: 2,
                                boxShadow: 2,
                                minWidth: 250,
                            }}
                        >
                            <Typography variant="body2" gutterBottom>
                                ผู้รับผิดชอบ : นายอนุวัฒน์ โลมากุล
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                ตำแหน่ง : นักวิชาการโสตทัศนศึกษา
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                เบอร์โทรติดต่อ : 098-9562398
                            </Typography>
                        </Box>
                    )}
                    <Tooltip title={showContact ? "ซ่อนข้อมูลติดต่อ" : "แสดงข้อมูลติดต่อ"}>
                        <Button
                            onClick={() => setShowContact((prev) => !prev)}
                            sx={{
                                minWidth: 0,
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                bgcolor: "primary.main",
                                color: "white",
                                "&:hover": { bgcolor: "primary.dark" },
                            }}
                        >
                            {showContact ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
}