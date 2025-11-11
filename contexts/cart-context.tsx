// contexts/cart-context.tsx
"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface CartItem {
  _id: string; // unique for each cart entry
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}


interface CartState {
  items: CartItem[]
  loading: boolean
}

interface CartContextType {
  state: CartState
  addItem: (item: CartItem) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart actions
type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ITEMS':
      return { ...state, items: action.payload, loading: false }
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.productId === action.payload.productId)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload)
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: true
  })
  const { data: session } = useSession()

  // Load cart on initial render
  useEffect(() => {
    refreshCart()
  }, [session])

  const refreshCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      let items: CartItem[] = []
      
      if (session?.user?.email) {
        // Fetch from API for logged-in users
        const res = await fetch('/api/cart/get')
        if (res.ok) {
          const data = await res.json()
          items = data.items || []
        }
      } else {
        // Get from localStorage for guests
        const stored = localStorage.getItem('cartItems')
        items = stored ? JSON.parse(stored) : []
      }
      
      dispatch({ type: 'SET_ITEMS', payload: items })
      
      // Trigger cart update event for header
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.error('Failed to refresh cart:', error)
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const addItem = async (item: CartItem) => {
    try {
      dispatch({ type: 'ADD_ITEM', payload: item })
      
      if (session?.user?.email) {
        // Sync with API for logged-in users
        await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      } else {
        // Update localStorage for guests
        const currentItems = state.items
        const existingItem = currentItems.find(i => i.productId === item.productId)
        let newItems: CartItem[]
        
        if (existingItem) {
          newItems = currentItems.map(i =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        } else {
          newItems = [...currentItems, item]
        }
        
        localStorage.setItem('cartItems', JSON.stringify(newItems))
      }
      
      // Trigger cart update event
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.error('Failed to add item:', error)
      // Revert on error
      await refreshCart()
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
      
      if (session?.user?.email) {
        await fetch('/api/cart/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity })
        })
      } else {
        const currentItems = state.items
        const newItems = currentItems
          .map(item => item.productId === productId ? { ...item, quantity } : item)
          .filter(item => item.quantity > 0)
        localStorage.setItem('cartItems', JSON.stringify(newItems))
      }
      
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.error('Failed to update quantity:', error)
      await refreshCart()
    }
  }

  const removeItem = async (productId: string) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: productId })
      
      if (session?.user?.email) {
        await fetch('/api/cart/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId })
        })
      } else {
        const newItems = state.items.filter(item => item.productId !== productId)
        localStorage.setItem('cartItems', JSON.stringify(newItems))
      }
      
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.error('Failed to remove item:', error)
      await refreshCart()
    }
  }

  const clearCart = async () => {
    try {
      dispatch({ type: 'CLEAR_CART' })
      
      if (session?.user?.email) {
        await fetch('/api/cart/clear', { method: 'POST' })
      } else {
        localStorage.removeItem('cartItems')
      }
      
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.error('Failed to clear cart:', error)
      await refreshCart()
    }
  }

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}