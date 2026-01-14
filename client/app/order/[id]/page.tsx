"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Truck, MapPin, Clock, MessageCircle, Download } from "lucide-react"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = params.id

  // Mock order data
  const order = {
    id: orderId,
    date: "2024-01-20",
    status: "shipped",
    vendor: "Green Valley Farms",
    items: [
      { name: "Fresh Tomatoes", quantity: 2, price: 450, subtotal: 900 },
      { name: "Onions", quantity: 1, price: 380, subtotal: 380 },
    ],
    subtotal: 1280,
    tax: 192,
    shipping: 0,
    total: 1472,
    customerEmail: "john@example.com",
    shippingAddress: {
      name: "John Doe",
      address: "123 Business Street",
      city: "Nairobi",
      country: "Kenya",
      zipCode: "00100",
      phone: "+254 700 123 456",
    },
    tracking: {
      number: "TRK-2024-001234",
      provider: "FastCourier Kenya",
      estimatedDelivery: "2024-01-22",
    },
    timeline: [
      { status: "confirmed", date: "2024-01-20 09:15 AM", description: "Order confirmed by vendor" },
      { status: "processing", date: "2024-01-20 02:30 PM", description: "Order being prepared for shipment" },
      { status: "shipped", date: "2024-01-21 08:00 AM", description: "Order picked up by courier" },
    ],
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{orderId}</h1>
                <p className="text-muted-foreground">Ordered on {order.date}</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">Your order is on its way!</span>
                          <Badge className="bg-indigo-100 text-indigo-800">
                            <Truck className="w-3 h-3 mr-1" />
                            Shipped
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Expected delivery: <strong>{order.tracking.estimatedDelivery}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.timeline.map((event, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </div>
                            {idx < order.timeline.length - 1 && <div className="w-0.5 h-12 bg-border mt-2" />}
                          </div>
                          <div className="pb-4">
                            <p className="font-semibold">{event.description}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tracking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                    <p className="font-mono font-bold text-lg">{order.tracking.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Courier</p>
                    <p className="font-semibold">{order.tracking.provider}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                    <p className="font-semibold">{order.tracking.estimatedDelivery}</p>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Track on {order.tracking.provider}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">KES {item.subtotal}</p>
                        <p className="text-xs text-muted-foreground">KES {item.price} each</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>KES {order.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>KES {order.tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">KES {order.total}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{order.shippingAddress.name}</p>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.zipCode}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">{order.shippingAddress.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vendor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-semibold">{order.vendor}</p>
                  <p className="text-sm text-muted-foreground">Rating: 4.8/5 (124 reviews)</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Vendor
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full bg-transparent justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent justify-start">
                    Report Issue
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent justify-start">
                    Return Items
                  </Button>
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
