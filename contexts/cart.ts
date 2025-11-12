// types/cart.ts
export interface CartItem {
  productId: string
  name: string
  quantity: number
  price: number
  image?: string
}

export interface CartState {
  items: CartItem[]
  loading: boolean
}

export type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }

export interface CartContextType {
  state: CartState
  addItem: (item: CartItem) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => void
}