"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Package, Check, AlertCircle } from "lucide-react"

interface VendorOrder {
  id: string
  customerName: string
  customerPhone: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: "new" | "confirmed" | "packing" | "ready" | "shipped"
  date: string
}

const VENDOR_ORDERS: VendorOrder[] = [
  {
    id: "ORD-2024-001240",
    customerName: "Jane Kipchoge",
    customerPhone: "+254 722 456 789",
    items: [
      { name: "Fresh Tomatoes", quantity: 5, price: 2250 },
      { name: "Onions", quantity: 3, price: 1140 },
    ],
    total: 3390,
    status: "new",
    date: "2024-01-21",
  },
  {
    id: "ORD-2024-001239",
    customerName: "John Mwangi",
    customerPhone: "+254 700 123 456",
    items: [{ name: "Fresh Tomatoes", quantity: 2, price: 900 }],
    total: 900,
    status: "confirmed",
    date: "2024-01-20",
  },
  {
    id: "ORD-2024-001238",
    customerName: "Alice Omondi",
    customerPhone: "+254 711 987 654",
    items: [
      { name: "Fresh Tomatoes", quantity: 10, price: 4500 },
      { name: "Onions", quantity: 5, price: 1900 },
    ],
    total: 6400,
    status: "packing",
    date: "2024-01-19",
  },
  {
    id: "ORD-2024-001237",
    customerName: "Mohamed Hassan",
    customerPhone: "+254 733 456 789",
    items: [{ name: "Fresh Tomatoes", quantity: 1, price: 450 }],
    total: 450,
    status: "ready",
    date: "2024-01-18",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-red-100 text-red-800"
    case "confirmed":
      return "bg-blue-100 text-blue-800"
    case "packing":
      return "bg-yellow-100 text-yellow-800"
    case "ready":
      return "bg-purple-100 text-purple-800"
    case "shipped":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "new":
      return <AlertCircle className="w-4 h-4" />
    case "confirmed":
      return <Check className="w-4 h-4" />
    case "packing":
      return <Package className="w-4 h-4" />
    case "ready":
      return <Package className="w-4 h-4" />
    case "shipped":
      return <Check className="w-4 h-4" />
    default:
      return null
  }
}

export default function VendorOrdersContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredOrders = VENDOR_ORDERS.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getNextAction = (status: string) => {
    switch (status) {
      case "new":
        return "Confirm Order"
      case "confirmed":
        return "Start Packing"
      case "packing":
        return "Mark Ready"
      case "ready":
        return "Mark Shipped"
      case "shipped":
        return "Order Complete"
      default:
        return "View Order"
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/dashboard/vendor"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage and fulfill customer orders</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID or customer name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="new">New Orders</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="packing">Packing</SelectItem>
                <SelectItem value="ready">Ready to Ship</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No orders found</h2>
                <p className="text-muted-foreground">Orders will appear here when customers purchase your products</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className={`hover:shadow-md transition-shadow ${order.status === "new" ? "border-accent" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-bold text-lg">{order.id}</h3>
                          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          {order.status === "new" && (
                            <Badge className="bg-red-100 text-red-800 animate-pulse">New!</Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Customer</p>
                            <p className="font-semibold text-sm">{order.customerName}</p>
                            <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
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
                            <p className="text-xs text-muted-foreground mb-1">Total</p>
                            <p className="font-bold text-sm text-primary">KES {order.total}</p>
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

                      <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          {getNextAction(order.status)}
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          View Details
                        </Button>
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
