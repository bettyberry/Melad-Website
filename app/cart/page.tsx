// app/cart/page.tsx
"use client"

import { useLanguage } from "@/components/language-provider"
import { useCart } from "@/contexts/cart-context"
import type { CartItem } from '@/types/cart'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, Loader2, ShoppingCart, LogIn } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function CartPage() {
  const { language } = useLanguage()
  const { state, updateQuantity, removeItem, refreshCart, clearCart } = useCart()
  const { items, loading } = state
  const { data: session, status } = useSession()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleQuantityUpdate = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    await updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = async (productId: string) => {
    await removeItem(productId)
  }

  const handleClearCart = async () => {
    if (confirm(language === "en" 
      ? "Are you sure you want to clear your cart?" 
      : "ጋሪዎን ማጽጃ መፈለግዎን እርግጠኛ ነዎት?"
    )) {
      await clearCart()
    }
  }

  const handleProceedToCheckout = async () => {
    if (!session) {
      setShowLoginPrompt(true)
      return
    }

    // If user is logged in, first merge any local guest cart into the server cart
    try {
      const localItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
      if (Array.isArray(localItems) && localItems.length > 0) {
        try {
          const res = await fetch('/api/cart/merge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: localItems })
          })

          if (res.ok) {
            // clear guest storage after successful merge
            localStorage.setItem('cartItems', JSON.stringify([]))
            // notify other listeners
            window.dispatchEvent(new Event('cartUpdated'))
          } else {
            const err = await res.json().catch(() => ({}))
            console.warn('Cart merge failed before checkout:', err)
          }
        } catch (err) {
          console.error('Failed to merge local cart before checkout', err)
        }
      }
    } catch (err) {
      console.error('Error reading local cart before checkout', err)
    }

    // Proceed to checkout
    window.location.href = "/checkout"
  }

  const total = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">
              {language === "en" ? "Loading cart..." : "ጋሪ በመጫን ላይ..."}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 pt-14">
              {language === "en" ? "Shopping Cart" : "የግዢ ጋሪ"}
            </h1>
            {session && (
              <p className="text-sm text-gray-600 mt-1">
                {language === "en" 
                  ? `Welcome back, ${session.user?.name}!` 
                  : `እንኳን ደህና መጡ፣ ${session.user?.name}!`}
              </p>
            )}
          </div>
          
          {items.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {language === "en" ? "Clear Cart" : "ጋሪ አጽዳ"}
            </Button>
          )}
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "en" ? "Your cart is empty" : "ጋሪዎ ባዶ ነው"}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === "en" 
                ? "Looks like you haven't added anything to your cart yet." 
                : "እንደሚመስለን ገና ምንም ነገር ወደ ጋሪዎ አላከሉም።"}
            </p>
            <Link href="/products">
              <Button>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {language === "en" ? "Continue Shopping" : "ግዢ ይቀጥሉ"}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {language === "en" ? "Cart Items" : "የጋሪ ዕቃዎች"}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {itemCount} {language === "en" ? "items" : "ዕቃዎች"}
                  </span>
                </div>
                
                {items.map((item: CartItem, idx: number) => (
                  <div key={`${item.productId}-${idx}`} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
  src={item.image || "/images/placeholder-product.jpg"}
  alt={item.name || "Product image"}
  fill
  className="object-contain rounded-md"
/>

                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-lg font-bold text-primary mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleQuantityUpdate(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleQuantityUpdate(item.productId, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="text-right min-w-20">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveItem(item.productId)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {language === "en" ? "Order Summary" : "የትዕዛዝ ማጠቃለያ"}
                </h2>
                
                <div className="space-y-2 mb-4">
                  {items.map((item: CartItem, idx: number) => (
                    <div key={`${item.productId}-${idx}`} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate flex-1 mr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>{language === "en" ? "Total" : "ጠቅላላ"}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Checkout Button with Login Requirement */}
                {!session ? (
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <LogIn className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-sm font-medium text-yellow-800">
                          {language === "en" ? "Login Required" : "ግባ ማድረግ ያስፈልጋል"}
                        </span>
                      </div>
                      <p className="text-xs text-yellow-700">
                        {language === "en" 
                          ? "Please login to proceed with checkout" 
                          : "እባክዎ ለመግዛት ይግቡ"}
                      </p>
                    </div>
                    <Button 
                      onClick={handleProceedToCheckout}
                      className="w-full" 
                      size="lg"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      {language === "en" ? "Login to Checkout" : "ለመግዛት ይግቡ"}
                    </Button>
                  </div>
                ) : (
                  <Link href="/checkout">
                    <Button className="w-full" size="lg">
                      {language === "en" ? "Proceed to Checkout" : "ወደ ክፍያ ይሂዱ"}
                    </Button>
                  </Link>
                )}
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    {language === "en" 
                      ? "Free shipping on orders over $50" 
                      : "ከ50 ዶላር በላይ በሆኑ ትዕዛዞች ላይ ነፃ መላኪያ"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Prompt Dialog */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <LogIn className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-lg font-semibold">
                {language === "en" ? "Login Required" : "ግባ ማድረግ ያስፈልጋል"}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              {language === "en" 
                ? "You need to login to proceed with checkout. Don't worry, your cart items will be saved!"
                : "ለመግዛት መግባት ያስፈልግዎታል። አትጨነቁ፣ የጋሪ ዕቃዎችዎ ይቀራሉ!"}
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1"
              >
                {language === "en" ? "Cancel" : "ተው"}
              </Button>
              <Button
                onClick={() => {
                  setShowLoginPrompt(false)
                  // Trigger login modal from header
                  window.dispatchEvent(new CustomEvent('openLoginModal'))
                }}
                className="flex-1"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {language === "en" ? "Login" : "ግባ"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}