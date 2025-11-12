// lib/cart-utils.ts
export const addToCart = async (product: any, quantity: number = 1, session: any) => {
  const cartItem = {
    productId: product._id || product.id,
    title: product.name,
    price: product.price,
    image: product.images?.[0] || '/placeholder.svg',
    quantity
  }

  if (session) {
    // Authenticated user - save to database
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id || product.id,
          quantity
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Fallback to localStorage
      addToLocalCart(cartItem)
    }
  } else {
    // Guest user - save to localStorage
    addToLocalCart(cartItem)
  }

  // Update global cart state
  window.dispatchEvent(new Event('cartUpdated'))
}

const addToLocalCart = (newItem: any) => {
  const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]')
  const existingItemIndex = existingCart.findIndex((item: any) => item.productId === newItem.productId)

  if (existingItemIndex > -1) {
    existingCart[existingItemIndex].quantity += newItem.quantity
  } else {
    existingCart.push(newItem)
  }

  localStorage.setItem('cartItems', JSON.stringify(existingCart))
}