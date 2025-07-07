import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/next-auth";
import LoginClient from "../LoginClient/page";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    
    if (session) {
        redirect("/check-user");
    }

    return <LoginClient />;
}