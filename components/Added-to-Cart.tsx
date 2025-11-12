"use client"

import { useCart } from "@/contexts/cart-context"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart()
  const { data: session } = useSession()
  const [adding, setAdding] = useState(false)

  const handleAdd = async () => {
    setAdding(true)
    await addItem({
      productId: product._id || product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    setAdding(false)
    alert("✅ Added to cart")
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={adding}
      className="flex items-center gap-2"
    >
      <ShoppingCart className="h-4 w-4" />
      {adding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}