import { useSession } from "next-auth/react";
import { useState } from "react";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export function useCart() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const addToCart = async (productId: string, quantity: number = 1): Promise<{ success: boolean; message?: string; error?: string }> => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (session?.user?.email) {
          // For logged-in users, cart is saved in database
          console.log('Product added to database cart');
        } else {
          // For guest users, save to localStorage
          const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
          
          const existingItemIndex = existingCart.findIndex(
            (item: CartItem) => item.productId === productId
          );

          if (existingItemIndex > -1) {
            existingCart[existingItemIndex].quantity += quantity;
          } else {
            if (result.cartItem) {
              existingCart.push(result.cartItem);
            }
          }

          localStorage.setItem('cartItems', JSON.stringify(existingCart));
          console.log('Product added to localStorage cart');
        }

        // Trigger cart update event
        window.dispatchEvent(new Event('cartUpdated'));
        
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: 'Failed to add product to cart' };
    } finally {
      setLoading(false);
    }
  };

  const getCartCount = async (): Promise<number> => {
    if (session?.user?.email) {
      try {
        const response = await fetch('/api/cart/get');
        if (response.ok) {
          const data = await response.json();
          return data.items?.length || 0;
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    }
    
    // Fallback to localStorage for guests or on error
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return cartItems.length;
  };

  return {
    addToCart,
    getCartCount,
    loading
  };
}