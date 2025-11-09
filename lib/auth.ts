// lib/auth.ts
import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { findUserByEmail, validatePassword } from "@/models/User"

// Extend JWT to include custom fields
interface ExtendedJWT extends JWT {
  id?: string
  role?: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await findUserByEmail(credentials.email)
        if (!user) return null

        const isValid = await validatePassword(credentials.password, user.password)
        if (!isValid) return null

        return {
          id: user._id!.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image ?? null,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: ExtendedJWT; user?: User & { role?: string } }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id ?? "",
          role: token.role ?? "",
        },
      }
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
  },
}