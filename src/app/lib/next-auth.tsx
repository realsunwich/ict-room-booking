import AzureADProvider from "next-auth/providers/azure-ad";
import { NextAuthOptions } from "next-auth";

console.log("NEXTAUTH_SECRET :",process.env.NEXTAUTH_SECRET);
console.log("AZURE_AD_CLIENT_SECRET",process.env.AZURE_AD_CLIENT_SECRET)

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
        session: ({ session, token }) => {
            console.log("Session : ", session);
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    email: token.email,
                },
            };
        },
        jwt: async ({ token, account }) => {
            console.log("Account : ", account);
            if (account) {
                token.accessToken = account.access_token;

                const response = await fetch('https://graph.microsoft.com/v1.0/me', {
                    headers: {
                        Authorization: `Bearer ${account.access_token}`,
                    },
                });

                const user = await response.json();

                token.name = user.displayName;
                token.email = user.mail;
            }
            return token;
        },
    },
};