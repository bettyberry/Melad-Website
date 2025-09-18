// components/cart-notification.tsx
"use client"

import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CartNotificationProps {
  productName: string
  isVisible: boolean
  onClose: () => void
  language: string
}

export default function CartNotification({ 
  productName, 
  isVisible, 
  onClose, 
  language 
}: CartNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg bg-white p-4 shadow-lg border border-green-200"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {language === "en" ? "Added to Cart" : "ወደ ጋሪ ጨመረ"}
              </p>
              <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                {productName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 rounded-md p-1 hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}