// app/checkout/page.tsx
"use client"

import { useCart } from "@/contexts/cart-context"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { state } = useCart()
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/login?redirect=/checkout')
      return
    }

    // Redirect if cart is empty
    if (state.items.length === 0 && status === 'authenticated') {
      router.push('/cart')
      return
    }
  }, [session, status, state.items.length, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Redirecting to login...</div>
  }

  if (state.items.length === 0) {
    return <div>Redirecting to cart...</div>
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {/* Checkout form */}
    </div>
  )
}