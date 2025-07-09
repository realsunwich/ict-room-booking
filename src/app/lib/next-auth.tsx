import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/calendar",
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, account, profile }) => {
            if (account) {
                token.accessToken = account.access_token;
                token.name = profile?.name;
                token.email = profile?.email;

                if (token.email) {
                    let dbUser = await prisma.users.findUnique({
                        where: { userEmail: token.email },
                    });

                    if (!dbUser) {
                        dbUser = await prisma.users.create({
                            data: {
                                userEmail: token.email,
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
            return token;
        },
        async session({ session, token }) {
            session.user.name = token.name;
            session.user.email = token.email;
            (session.user).role = typeof token.role === "string" ? token.role : null;
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
};
