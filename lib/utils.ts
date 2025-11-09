import bcrypt from "bcryptjs"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs))
}
