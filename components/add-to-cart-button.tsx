"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import React from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id: crypto.randomUUID(), // Unique ID for each cart item
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || "/images/placeholder-product.jpg", // default image
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
