"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Lock, Truck, Wallet } from "lucide-react"

interface ShippingForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  zipCode: string
}

interface PaymentForm {
  cardName: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("shipping")
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [sameAsShipping, setSameAsShipping] = useState(true)

  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  })

  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setShippingForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async () => {
    // Validate forms
    if (!shippingForm.firstName || !shippingForm.email || !shippingForm.address) {
      alert("Please fill in all shipping details")
      return
    }

    if (paymentMethod === "card" && (!paymentForm.cardNumber || !paymentForm.cvv)) {
      alert("Please fill in all payment details")
      return
    }

    // In production, integrate with Stripe
    console.log("Processing payment with", paymentMethod)

    // Simulate payment processing
    setTimeout(() => {
      router.push("/order-success")
    }, 1500)
  }

  const orderTotal = 4600

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/cart" className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="shipping" disabled={false}>
                    Shipping
                  </TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>

                <TabsContent value="shipping">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        Delivery Address
                      </CardTitle>
                      <CardDescription>Where should we deliver your order?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="First Name"
                          name="firstName"
                          value={shippingForm.firstName}
                          onChange={handleShippingChange}
                        />
                        <Input
                          placeholder="Last Name"
                          name="lastName"
                          value={shippingForm.lastName}
                          onChange={handleShippingChange}
                        />
                      </div>

                      <Input
                        placeholder="Email Address"
                        type="email"
                        name="email"
                        value={shippingForm.email}
                        onChange={handleShippingChange}
                      />

                      <Input
                        placeholder="Phone Number"
                        type="tel"
                        name="phone"
                        value={shippingForm.phone}
                        onChange={handleShippingChange}
                      />

                      <Input
                        placeholder="Street Address"
                        name="address"
                        value={shippingForm.address}
                        onChange={handleShippingChange}
                      />

                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          placeholder="City"
                          name="city"
                          value={shippingForm.city}
                          onChange={handleShippingChange}
                        />
                        <Input
                          placeholder="Country"
                          name="country"
                          value={shippingForm.country}
                          onChange={handleShippingChange}
                        />
                        <Input
                          placeholder="Zip Code"
                          name="zipCode"
                          value={shippingForm.zipCode}
                          onChange={handleShippingChange}
                        />
                      </div>

                      <Button
                        onClick={() => setActiveTab("billing")}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
                      >
                        Continue to Billing
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing">
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Address</CardTitle>
                      <CardDescription>Confirm your billing address</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3 p-4 border rounded-lg bg-muted/50">
                        <Checkbox
                          id="sameAsShipping"
                          checked={sameAsShipping}
                          onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                        />
                        <label htmlFor="sameAsShipping" className="text-sm cursor-pointer">
                          Billing address is the same as shipping address
                        </label>
                      </div>

                      {!sameAsShipping && (
                        <div className="space-y-4 mt-4">
                          <p className="text-sm text-muted-foreground">Enter your billing address</p>
                          <Input placeholder="Street Address" />
                          <div className="grid grid-cols-3 gap-4">
                            <Input placeholder="City" />
                            <Input placeholder="Country" />
                            <Input placeholder="Zip Code" />
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={() => setActiveTab("payment")}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
                      >
                        Continue to Payment
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payment">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wallet className="w-5 h-5" />
                        Payment Method
                      </CardTitle>
                      <CardDescription>Choose how you want to pay</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                          <RadioGroupItem value="stripe" id="stripe" />
                          <label htmlFor="stripe" className="flex-1 cursor-pointer">
                            <p className="font-semibold">Credit/Debit Card (Stripe)</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                          </label>
                        </div>

                        <div className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                          <RadioGroupItem value="mpesa" id="mpesa" />
                          <label htmlFor="mpesa" className="flex-1 cursor-pointer">
                            <p className="font-semibold">M-Pesa</p>
                            <p className="text-sm text-muted-foreground">Pay via Safaricom M-Pesa</p>
                          </label>
                        </div>

                        <div className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                          <RadioGroupItem value="bank" id="bank" />
                          <label htmlFor="bank" className="flex-1 cursor-pointer">
                            <p className="font-semibold">Bank Transfer</p>
                            <p className="text-sm text-muted-foreground">Direct bank deposit</p>
                          </label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "stripe" && (
                        <div className="space-y-4 mt-6 p-4 bg-muted/30 rounded-lg border">
                          <p className="text-sm font-medium">Card Information</p>

                          <Input
                            placeholder="Cardholder Name"
                            name="cardName"
                            value={paymentForm.cardName}
                            onChange={handlePaymentChange}
                          />

                          <Input
                            placeholder="Card Number"
                            name="cardNumber"
                            value={paymentForm.cardNumber}
                            onChange={handlePaymentChange}
                            maxLength={19}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              placeholder="MM/YY"
                              name="expiryDate"
                              value={paymentForm.expiryDate}
                              onChange={handlePaymentChange}
                              maxLength={5}
                            />
                            <Input
                              placeholder="CVV"
                              name="cvv"
                              value={paymentForm.cvv}
                              onChange={handlePaymentChange}
                              maxLength={4}
                            />
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Lock className="w-4 h-4" />
                            Your payment information is secure and encrypted
                          </div>
                        </div>
                      )}

                      {paymentMethod === "mpesa" && (
                        <div className="p-4 bg-muted/30 rounded-lg border space-y-2">
                          <p className="text-sm font-medium">M-Pesa Payment</p>
                          <p className="text-sm text-muted-foreground">
                            You will be redirected to M-Pesa to complete the payment.
                          </p>
                        </div>
                      )}

                      {paymentMethod === "bank" && (
                        <div className="p-4 bg-muted/30 rounded-lg border space-y-2">
                          <p className="text-sm font-medium">Bank Transfer Details</p>
                          <p className="text-sm text-muted-foreground">
                            We will send you bank details after placing the order.
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={handlePlaceOrder}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base"
                      >
                        Place Order (KES {orderTotal})
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 border-b pb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>KES 4000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (15%)</span>
                      <span>KES 600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">KES {orderTotal}</span>
                  </div>

                  <div className="bg-accent/10 p-3 rounded-lg text-xs text-accent-foreground">
                    You save KES 500 with your current cart
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
