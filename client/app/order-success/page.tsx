"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Clock, Download } from "lucide-react"

export default function OrderSuccessPage() {
  const orderId = "ORD-2024-001234"
  const orderDate = new Date().toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg">Thank you for your purchase</p>
          </div>

          <Card className="mb-8 border shadow-lg">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="text-xl font-bold text-primary">{orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                  <p className="text-lg font-semibold">{orderDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t pt-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">KES 4,600</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                  <p className="text-lg font-semibold text-green-600">Successful</p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-4">Items Ordered</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Fresh Tomatoes x 2</span>
                    <span>KES 900</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maize Flour x 1</span>
                    <span>KES 850</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-1">Order Placed</p>
                <p className="text-sm text-muted-foreground">Your order has been received and is being processed</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg opacity-50">
              <Package className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-1">Processing</p>
                <p className="text-sm text-muted-foreground">We're preparing your items for shipment</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg opacity-50">
              <Truck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-1">Shipped</p>
                <p className="text-sm text-muted-foreground">Your order is on its way to you</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6">
              <Link href="/dashboard/customer">Track Order</Link>
            </Button>

            <Button asChild variant="outline" className="w-full bg-transparent py-6">
              <Link href="/products">Continue Shopping</Link>
            </Button>

            <Button asChild variant="outline" className="w-full bg-transparent py-6">
              <a href="#" className="flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Invoice
              </a>
            </Button>
          </div>

          <div className="mt-12 p-6 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-2">Confirmation email sent to</p>
            <p className="font-semibold mb-4">john@example.com</p>
            <p className="text-sm text-muted-foreground">
              A detailed order confirmation and tracking information has been sent to your email. Check your inbox or
              spam folder if you don't see it.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
