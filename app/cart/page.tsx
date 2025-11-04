// pages/cart.tsx
"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { language } = useLanguage()
  const [cartItems, setCartItems] = useState<any[]>([])
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]')
    setCartItems(items)
  }, [])
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    
    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }
  
  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-28">
        <div className="container mx-auto px-4">
          <div className="text-center">
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
                {language === "en" ? "Continue Shopping" : "ግዢ ይቀጥሉ"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {language === "en" ? "Shopping Cart" : "የግዢ ጋሪ"}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-lg font-bold text-primary mt-1">
                      {item.price}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
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
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>{language === "en" ? "Total" : "ጠቅላላ"}</span>
                  <span>{total}</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                {language === "en" ? "Proceed to Checkout" : "ወደ ክፍያ ይሂዱ"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}