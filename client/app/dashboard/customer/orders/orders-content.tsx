"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Search, Package, Truck, CheckCircle, Clock, ArrowLeft, MessageCircle } from "lucide-react"

interface Order {
  id: string
  date: string
  vendor: string
  items: { name: string; quantity: number; price: number }[]
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered"
  total: number
  estimatedDelivery: string
}

const ORDERS: Order[] = [
  {
    id: "ORD-2024-001234",
    date: "2024-01-20",
    vendor: "Green Valley Farms",
    items: [
      { name: "Fresh Tomatoes", quantity: 2, price: 900 },
      { name: "Onions", quantity: 1, price: 380 },
    ],
    status: "shipped",
    total: 1280,
    estimatedDelivery: "2024-01-22",
  },
  {
    id: "ORD-2024-001233",
    date: "2024-01-18",
    vendor: "Grain Masters",
    items: [{ name: "Maize Flour", quantity: 1, price: 850 }],
    status: "delivered",
    total: 850,
    estimatedDelivery: "2024-01-20",
  },
  {
    id: "ORD-2024-001232",
    date: "2024-01-15",
    vendor: "Bean Depot",
    items: [{ name: "Sugar Beans", quantity: 2, price: 1300 }],
    status: "delivered",
    total: 1300,
    estimatedDelivery: "2024-01-18",
  },
  {
    id: "ORD-2024-001231",
    date: "2024-01-12",
    vendor: "Oil Refineries Ltd",
    items: [{ name: "Cooking Oil", quantity: 1, price: 1200 }],
    status: "delivered",
    total: 1200,
    estimatedDelivery: "2024-01-15",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "confirmed":
      return "bg-blue-100 text-blue-800"
    case "processing":
      return "bg-purple-100 text-purple-800"
    case "shipped":
      return "bg-indigo-100 text-indigo-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />
    case "confirmed":
      return <CheckCircle className="w-4 h-4" />
    case "processing":
      return <Package className="w-4 h-4" />
    case "shipped":
      return <Truck className="w-4 h-4" />
    case "delivered":
      return <CheckCircle className="w-4 h-4" />
    default:
      return null
  }
}

export default function OrdersContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredOrders = ORDERS.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/dashboard/customer"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
            <p className="text-muted-foreground">Track and manage all your purchases</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all" onValueChange={setSelectedStatus} className="w-full md:w-auto">
              <TabsList className="bg-transparent border-b rounded-none w-full md:w-auto">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No orders found</h2>
                <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
                <Link href="/products">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Products</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-bold text-lg">{order.id}</h3>
                          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Vendor</p>
                            <p className="font-semibold text-sm">{order.vendor}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Order Date</p>
                            <p className="font-semibold text-sm">{order.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Items</p>
                            <p className="font-semibold text-sm">{order.items.length} item(s)</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Est. Delivery</p>
                            <p className="font-semibold text-sm">{order.estimatedDelivery}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.name} x {item.quantity}
                              </span>
                              <span className="font-medium">KES {item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">Total</p>
                          <p className="text-2xl font-bold text-primary">KES {order.total}</p>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/order/${order.id}`}>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
