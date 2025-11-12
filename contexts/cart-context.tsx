// contexts/cart-context.tsx
"use client"

import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useSession } from "next-auth/react"

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartState {
  items: CartItem[]
  loading: boolean
}

type Action =
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }

const CartContext = createContext<any>(null)

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "SET_ITEMS": return { ...state, items: action.payload, loading: false }
    case "ADD_ITEM": {
      const exists = state.items.find(i => i.productId === action.payload.productId)
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          )
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === action.payload.productId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.productId !== action.payload) }
    case "CLEAR_CART":
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [state, dispatch] = useReducer(reducer, { items: [], loading: true })

  // Load from API or localStorage
  useEffect(() => {
    async function loadCart() {
      if (session?.user?.email) {
        try {
          const res = await fetch("/api/cart/get")
          if (res.ok) {
            const data = await res.json()
            dispatch({ type: "SET_ITEMS", payload: data.items || [] })
          } else {
            dispatch({ type: "SET_ITEMS", payload: [] })
          }
        } catch (err) {
          console.error('Failed to load cart from API, falling back to localStorage', err)
          const stored = localStorage.getItem("cartItems")
          dispatch({ type: "SET_ITEMS", payload: stored ? JSON.parse(stored) : [] })
        }
      } else {
        const stored = localStorage.getItem("cartItems")
        dispatch({ type: "SET_ITEMS", payload: stored ? JSON.parse(stored) : [] })
      }
    }
    loadCart()
  }, [session])

  // Save to localStorage for guests
  useEffect(() => {
    if (!session?.user?.email) {
      localStorage.setItem("cartItems", JSON.stringify(state.items))
      window.dispatchEvent(new Event("cartUpdated"))
    }
  }, [state.items, session])

  const addItem = async (product: CartItem) => {
    // Optimistically update UI
    dispatch({ type: "ADD_ITEM", payload: product })
    if (session?.user?.email) {
      try {
        const res = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...product }),
        })
        if (res.ok) {
          const data = await res.json()
          if (data.items) dispatch({ type: "SET_ITEMS", payload: data.items })
        } else {
          // Robust logging: read raw text first (avoids clone/parsing oddities), try parse JSON, include headers
          let rawText: string | null = null
          try {
            rawText = await res.text()
          } catch (e) {
            rawText = null
          }

          let parsedBody: any = null
          if (rawText) {
            try {
              parsedBody = JSON.parse(rawText)
            } catch (e) {
              parsedBody = null
            }
          }

          // Build a plain serializable snapshot so the console shows the state at log time
          let headersObj: Record<string, string> = {}
          try {
            // headers.entries() is iterable of [k,v]
            headersObj = Object.fromEntries(typeof res.headers?.entries === 'function' ? res.headers.entries() : [])
          } catch (e) {
            headersObj = {}
          }

          const snapshot = {
            status: res.status,
            statusText: res.statusText,
            headers: headersObj,
            body: parsedBody ?? rawText,
          }

          // Stringify snapshot so the console receives a frozen copy (avoids live object mutation/display issues)
          try {
            console.error('addItem failed, server response:', JSON.stringify(snapshot, null, 2))
          } catch (e) {
            console.error('addItem failed, server response (unserializable):', snapshot)
          }

          // Also emit raw body separately for quick inspection
          if (rawText) console.error('addItem raw response body:', rawText)
        }
      } catch (err) {
        console.error('Failed to sync addItem with server', err)
      }
    }
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } })
    if (session?.user?.email) {
      try {
        const res = await fetch("/api/cart/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        })
        if (res.ok) {
          const data = await res.json()
          if (data.cart) dispatch({ type: "SET_ITEMS", payload: data.cart.items || [] })
        }
      } catch (err) {
        console.error('Failed to sync updateQuantity with server', err)
      }
    }
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const removeItem = async (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId })
    if (session?.user?.email) {
      try {
        const res = await fetch("/api/cart/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        })
        if (res.ok) {
          const data = await res.json()
          if (data.items) dispatch({ type: "SET_ITEMS", payload: data.items })
        }
      } catch (err) {
        console.error('Failed to sync removeItem with server', err)
      }
    }
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" })
    if (session?.user?.email) {
      await fetch("/api/cart/clear", { method: "DELETE" })
    } else {
      localStorage.removeItem("cartItems")
    }
    window.dispatchEvent(new Event("cartUpdated"))
  }

  return (
    <CartContext.Provider value={{ state, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)