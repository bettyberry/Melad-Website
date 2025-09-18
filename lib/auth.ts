import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
// Make sure the path is correct; adjust if your User model is elsewhere
import User from "../models/User"
import connectDB from "./mongodb"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB()
        const user = await User.findOne({ email: credentials?.email })
        if (!user) throw new Error("No user found")

        const isValid = await compare(credentials!.password, user.password)
        if (!isValid) throw new Error("Invalid password")

        return { id: user._id.toString(), name: user.name, email: user.email }
      },
    }),
  ],
  session: { strategy: "jwt" }, // ✅ TS will now accept this
  secret: process.env.NEXTAUTH_SECRET,
}
