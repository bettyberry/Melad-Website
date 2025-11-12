"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image?: string
  }
  className?: string
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { language } = useLanguage()
  const { status } = useSession()

  const handleAddToCart = async () => {
    if (isAdding) return

    setIsAdding(true)
    try {
      const cartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      }

      // Single source of truth: use the Cart context API
      await addItem(cartItem)

      setAdded(true)
      // Briefly show "Added" and then reset
      setTimeout(() => setAdded(false), 1500)
    } catch (err) {
      console.error('Failed to add to cart', err)
      // Optionally show a toast (sonner is already in dependencies)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`relative overflow-hidden ${className ?? ''}`}
      size="lg"
      aria-disabled={isAdding}
      aria-live="polite"
    >
      {isAdding ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          {language === 'en' ? 'Adding...' : 'በማክተል ላይ...'}
        </>
      ) : added ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Added to Cart!' : 'ወደ ጋሪ ተጨምሯል!'}
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Add to Cart' : 'ወደ ጋሪ ጨምር'}
        </>
      )}
    </Button>
  )
}