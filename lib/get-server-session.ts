// lib/get-server-session.ts
import { authOptions } from '@/lib/auth'
import { getServerSession as getServerSessionNextAuth } from 'next-auth'

export function getServerSession() {
  return getServerSessionNextAuth(authOptions)
}