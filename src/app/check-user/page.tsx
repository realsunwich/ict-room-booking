"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

const CheckUserPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            fetch(`/api/login?userEmail=${session?.user?.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.result === "T") {
                        router.replace("/dashboard");
                    } else {
                        router.replace("/no-access");
                    }
                });
        } else if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [session, status, router]);

    return <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={2}>กำลังตรวจสอบสิทธิ์ผู้ใช้งาน...</Box>;
};

export default CheckUserPage;
