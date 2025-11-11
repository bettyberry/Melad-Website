// app/checkout/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  CreditCard, 
  Truck, 
  Shield, 
  Lock, 
  ArrowLeft,
  Loader2,
  LogIn
} from "lucide-react"

interface CartItem {
  _id?: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderData {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function CheckoutPage() {
  console.log("Rendering CheckoutPage");
  const { language } = useLanguage()
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [processing, setProcessing] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  
  // Form states
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  })
  
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Check authentication status
  useEffect(() => {
    if (status === "unauthenticated") {
      setShowLoginPrompt(true)
    }
  }, [status])

  // Fetch cart items only if authenticated
  const fetchCartItems = async () => {
    try {
      if (session?.user?.email) {
        const res = await fetch('/api/cart/get')
        if (res.ok) {
          const data = await res.json()
          const items = data.items || []
          setCartItems(items)
        }
      } else {
        // If not authenticated, get items from localStorage but show login prompt
        const items: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]')
        setCartItems(items)
        if (items.length > 0) {
          setShowLoginPrompt(true)
        }
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error)
      const items: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]')
      setCartItems(items)
    } finally {
      setHasLoaded(true)
    }
  }

  useEffect(() => {
    if (status !== "loading") {
      fetchCartItems()
    }
  }, [session, status])

  // Redirect if cart is empty after loading
  useEffect(() => {
    if (hasLoaded && cartItems.length === 0 && !showLoginPrompt) {
      router.push('/cart')
    }
  }, [hasLoaded, cartItems, router, showLoginPrompt])

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!shippingAddress.firstName.trim()) {
      newErrors.firstName = language === "en" ? "First name is required" : "የመጀመሪያ ስም ያስፈልጋል"
    }
    
    if (!shippingAddress.lastName.trim()) {
      newErrors.lastName = language === "en" ? "Last name is required" : "የአባት ስም ያስፈልጋል"
    }
    
    if (!shippingAddress.email.trim()) {
      newErrors.email = language === "en" ? "Email is required" : "ኢሜይል ያስፈልጋል"
    } else if (!/\S+@\S+\.\S+/.test(shippingAddress.email)) {
      newErrors.email = language === "en" ? "Email is invalid" : "ኢሜይል ልክ አይደለም"
    }
    
    if (!shippingAddress.phone.trim()) {
      newErrors.phone = language === "en" ? "Phone number is required" : "ስልክ ቁጥር ያስፈልጋል"
    }
    
    if (!shippingAddress.address.trim()) {
      newErrors.address = language === "en" ? "Address is required" : "አድራሻ ያስፈልጋል"
    }
    
    if (!shippingAddress.city.trim()) {
      newErrors.city = language === "en" ? "City is required" : "ከተማ ያስፈልጋል"
    }
    
    if (!shippingAddress.zipCode.trim()) {
      newErrors.zipCode = language === "en" ? "ZIP code is required" : "ZIP ኮድ ያስፈልጋል"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) {
      setShowLoginPrompt(true)
      return
    }
    
    if (!validateForm()) {
      return
    }

    setProcessing(true)

    try {
      const orderData: OrderData = {
        items: cartItems,
        shippingAddress,
        paymentMethod,
        subtotal,
        shipping,
        tax,
        total
      }

      // Create order
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      const result = await response.json()

      if (response.ok) {
        // Clear cart
        if (session?.user?.email) {
          await fetch('/api/cart/clear', { method: 'POST' })
        } else {
          localStorage.setItem('cartItems', JSON.stringify([]))
        }
        
        window.dispatchEvent(new Event('cartUpdated'))
        
        // Redirect to success page
        router.push(`/checkout/success?orderId=${result.orderId}`)
      } else {
        throw new Error(result.error || 'Failed to create order')
      }
    } catch (error) {
      console.error('Checkout failed:', error)
      alert(language === "en" ? "Checkout failed. Please try again." : "ክፍያ አልተሳካም። እባክዎ እንደገና ይሞክሩ።")
    } finally {
      setProcessing(false)
    }
  }

  const handleLoginRedirect = () => {
    // Trigger login modal from header
    window.dispatchEvent(new CustomEvent('openLoginModal'))
  }

  // Show loading state while checking authentication and cart
  if (status === "loading" || !hasLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 py-28">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "en" ? "Loading checkout..." : "ክፍያ በመጫን ላይ..."}
            </h2>
          </div>
        </div>
      </div>
    )
  }

  // Show login prompt if not authenticated
  if (showLoginPrompt) {
    return (
      <div className="min-h-screen bg-gray-50 py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <LogIn className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {language === "en" ? "Login Required" : "ግባ ማድረግ ያስፈልጋል"}
              </h1>
              <p className="text-gray-600">
                {language === "en" 
                  ? "You need to login to proceed with checkout." 
                  : "ለመግዛት መግባት ያስፈልግዎታል።"}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <Shield className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">
                  {language === "en" ? "Your cart is safe" : "ጋሪዎ ደህንነቱ ተጠብቆ ነው"}
                </span>
              </div>
              <p className="text-xs text-yellow-700">
                {language === "en" 
                  ? "Don't worry, your cart items will be saved and available after login."
                  : "አትጨነቁ፣ የጋሪ ዕቃዎችዎ ይቀራሉ እና ከመግባትዎ በኋላ ይገኛሉ።"}
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleLoginRedirect}
                className="w-full" 
                size="lg"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {language === "en" ? "Login to Continue" : "ለመቀጠል ይግቡ"}
              </Button>
              
              <Link href="/cart" className="block">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {language === "en" ? "Back to Cart" : "ወደ ጋሪ ተመለስ"}
                </Button>
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {language === "en" 
                  ? "Don't have an account? You'll be able to create one during checkout."
                  : "መለያ የሎትም? በመግዛት ጊዜ መፍጠር ይችላሉ።"}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Don't render checkout form if not authenticated
  if (!session) {
    return null
  }

  // Don't render anything if cart is empty (will redirect)
  if (cartItems.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 pt-24">
                {language === "en" ? "Checkout" : "ክፍያ"}
              </h1>
              <p className="text-gray-600 mt-1">
                {language === "en" 
                  ? "Complete your purchase securely" 
                  : "ግዢዎን በደህንነት ይጨርሱ"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Shield className="h-4 w-4" />
            <span>{language === "en" ? "Secure checkout" : "ደህንነቱ የተጠበቀ ክፍያ"}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>{language === "en" ? "Shipping Address" : "የመላኪያ አድራሻ"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {language === "en" ? "First Name" : "የመጀመሪያ ስም"} *
                      </Label>
                      <Input
                        id="firstName"
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          firstName: e.target.value
                        }))}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {language === "en" ? "Last Name" : "የአባት ስም"} *
                      </Label>
                      <Input
                        id="lastName"
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          lastName: e.target.value
                        }))}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress(prev => ({
                        ...prev,
                        email: e.target.value
                      }))}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === "en" ? "Phone Number" : "ስልክ ቁጥር"} *
                    </Label>
                    <Input
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress(prev => ({
                        ...prev,
                        phone: e.target.value
                      }))}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      {language === "en" ? "Street Address" : "የመኖሪያ አድራሻ"} *
                    </Label>
                    <Input
                      id="address"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress(prev => ({
                        ...prev,
                        address: e.target.value
                      }))}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        {language === "en" ? "City" : "ከተማ"} *
                      </Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          city: e.target.value
                        }))}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">
                        {language === "en" ? "State" : "ክልል"}
                      </Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          state: e.target.value
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">
                        {language === "en" ? "ZIP Code" : "ZIP ኮድ"} *
                      </Label>
                      <Input
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          zipCode: e.target.value
                        }))}
                        className={errors.zipCode ? "border-red-500" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>{language === "en" ? "Payment Method" : "የክፍያ ዘዴ"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        {language === "en" ? "Credit/Debit Card" : "ክሬዲት/ዴቢት ካርድ"}
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg mt-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        PayPal
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg mt-2">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        {language === "en" ? "Bank Transfer" : "የባንክ ሂደት"}
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>
                    {language === "en" ? "Order Summary" : "የትዕዛዝ ማጠቃለያ"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cartItems.map(item => (
                      <div key={item.productId} className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            src={item.image || "/images/placeholder-product.jpg"}
                            alt={item.name || "Product Image"}
                            fill
                            className="rounded-md object-cover"
                          />
                          <Badge 
                            variant="secondary" 
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                          >
                            {item.quantity}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Order Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === "en" ? "Subtotal" : "ንዑስ ጠቅላላ"}</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>{language === "en" ? "Shipping" : "መላኪያ"}</span>
                      <span>{shipping === 0 ? (
                        <span className="text-green-600">
                          {language === "en" ? "Free" : "ነፃ"}
                        </span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>{language === "en" ? "Tax" : "ታክስ"}</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>{language === "en" ? "Total" : "ጠቅላላ"}</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="flex items-center justify-center space-x-4 pt-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Lock className="h-3 w-3" />
                      <span>SSL Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>256-bit</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        {language === "en" ? "Processing..." : "በማቀናበር ላይ..."}
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        {language === "en" 
                          ? `Pay $${total.toFixed(2)}` 
                          : `$${total.toFixed(2)} ይክፈሉ`}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    {language === "en" 
                      ? "By completing your purchase, you agree to our Terms of Service" 
                      : "ግዢዎን በማጠናቀቅ፣ የአገልግሎት ውሎቻችንን ተስማምተዋል"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}