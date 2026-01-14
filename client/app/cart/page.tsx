"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react"

interface CartItem {
  id: number
  name: string
  vendor: string
  price: number
  quantity: number
  image: string
}

const SAMPLE_CART: CartItem[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    vendor: "Green Valley Farms",
    price: 450,
    quantity: 2,
    image: "/fresh-tomatoes.png",
  },
  {
    id: 2,
    name: "Maize Flour",
    vendor: "Grain Masters",
    price: 850,
    quantity: 1,
    image: "/maize-flour.jpg",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(SAMPLE_CART)
  const [couponCode, setCouponCode] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = subtotal > 5000 ? 0 : 500
  const tax = Math.round(subtotal * 0.15)
  const total = subtotal + shippingCost + tax

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Add some products to get started</p>
                <Link href="/products">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Products</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{item.vendor}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-muted p-1 rounded-lg w-fit">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-background rounded transition"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-background rounded transition"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-muted-foreground mb-1">KES {item.price} each</p>
                              <p className="font-bold text-lg">KES {item.price * item.quantity}</p>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 border-b pb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>KES {subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (15%)</span>
                        <span>KES {tax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className={shippingCost === 0 ? "text-green-600 font-semibold" : ""}>
                          {shippingCost === 0 ? "FREE" : `KES ${shippingCost}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">KES {total}</span>
                    </div>

                    <p className="text-xs text-green-600">
                      {shippingCost === 0 ? "Free shipping applied!" : "Free shipping on orders over KES 5,000"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Promo Code</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button variant="outline" className="bg-transparent">
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Common codes: SAVE10, WELCOME20</p>
                  </CardContent>
                </Card>

                <Link href="/checkout">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
