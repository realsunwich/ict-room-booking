import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
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
        userID?: number;
        userEmail?: string | null;
        officeLocation?: string | null;
        role: string | null;
    }
}