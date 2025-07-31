import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
        user: {
            name: ReactNode;
            email: ReactNode;
            userID?: number;
            userEmail?: string | null;
            officeLocation?: string | null;
            role: string | null;
        };
    }

    interface User {
        U_id?: number;
        U_name?: string | null;
        U_branch?: string | null;
        U_meetingroom?: string | null;
    }
}