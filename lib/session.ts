import {getServerSession} from "next-auth/next"
import {NextAuthOptions, User} from "next-auth"
import { AdapterUser} from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import jsonwebtoken from "jsonwebtoken"
import {JWT} from "next-auth/jwt"

import {SessionInterface, UserProfile} from "@/common.types";
import {createUser, getUser} from "@/graphql/requests";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    jwt: {
        encode: ({ secret, token }) => {
            return jsonwebtoken.sign(
                {
                    ...token,
                    iss: "grafbase",
                    exp: Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60,
                },
                secret
            );
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret);
            return decodedToken as JWT;
        },
    },
    theme: {
        colorScheme: "light",
        logo: "/log.svg"
    },
    callbacks: {
        async session({session}) {
            const email = session.user?.email as string
            try {
                const data = await getUser(email) as { user?: UserProfile }

                return {
                    ...session,
                    user: {
                        ...session.user,
                        ...data.user
                    }
                }
            } catch (e) {
                console.log(e)
                return session
            }
        },

        async signIn({user}: { user: User | AdapterUser }) {
            try {
                const userExists = await getUser(user?.email as string) as { user?: UserProfile }

                if (!userExists.user) {
                    await createUser(
                        user.email as string,
                        user.name as string,
                        user.image as string
                    )
                }

                return true
            } catch (e: any) {
                console.log(e)
                return false
            }
        }
    }
}

export const getCurrentUser = async () => {
    return await getServerSession(authOptions) as SessionInterface
}