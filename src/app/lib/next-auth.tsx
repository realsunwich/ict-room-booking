import AzureADProvider from "next-auth/providers/azure-ad";
import { NextAuthOptions } from "next-auth";
import { PrismaClient as PrismaClientDB2 } from '@/../generated/db2';

const db2 = new PrismaClientDB2();

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
                        let dbUser = await db2.user.findUnique({
                            where: { U_email: token.email },
                        });

                        if (!dbUser) {
                            dbUser = await db2.user.create({
                                data: {
                                    U_email: token.email,
                                    U_name: token.name,
                                    U_branch: typeof token.officeLocation === "string" ? token.officeLocation : null,
                                    U_meetingroom: 1,
                                },
                            });
                        }
                        token.role = dbUser.U_meetingroom === 99 ? "99" : "1"
                    }
                } else {
                    if (token.email && !token.role) {
                        const dbUser = await db2.user.findUnique({
                            where: { U_email: token.email },
                        });
                        token.role = String(dbUser?.U_meetingroom ?? token.role);
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
            (session.user).role = typeof token.role === "string" ? token.role : null;

            return session;
        },
    },
};
