import AzureADProvider from "next-auth/providers/azure-ad";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("NEXTAUTH_SECRET :", process.env.NEXTAUTH_SECRET);

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            tenantId: process.env.AZURE_AD_TENANT_ID!,
            authorization: {
                params: { scope: "openid email profile User.Read" },
            },
            httpOptions: { timeout: 10000 },
        }),
    ],
    callbacks: {
        jwt: async ({ token, account }) => {
            try {
                console.log("⚙️ jwt callback called, account:", account);

                if (account) {
                    token.accessToken = account.access_token;

                    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
                        headers: { Authorization: `Bearer ${account.access_token}` },
                    });
                    const user = await response.json();

                    token.name = user.displayName;
                    token.email = user.mail ?? user.userPrincipalName;
                    token.officeLocation = user.officeLocation;

                    if (token.email) {
                        let dbUser = await prisma.users.findUnique({
                            where: { userEmail: token.email },
                        });

                        if (!dbUser) {
                            dbUser = await prisma.users.create({
                                data: {
                                    userEmail: token.email,
                                    officeLocation: typeof token.officeLocation === "string" ? token.officeLocation : null,
                                    role: "User",
                                },
                            });
                        }

                        token.role = dbUser?.role ?? "User";
                    }
                } else {
                    if (token.email && !token.role) {
                        const dbUser = await prisma.users.findUnique({
                            where: { userEmail: token.email },
                        });
                        token.role = dbUser?.role ?? token.role;
                    }
                }
            } catch (error) {
                console.error("Error in jwt callback:", error);
                throw new Error("Failed to process authentication");
            }
            return token;
        },
        async session({ session, token }) {
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.officeLocation = typeof token.officeLocation === "string" ? token.officeLocation : null;
            (session.user as any).role = token.role;

            return session;
        },
    },
};