"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

    return <div>กำลังตรวจสอบสิทธิ์ผู้ใช้งาน...</div>;
};

export default CheckUserPage;
