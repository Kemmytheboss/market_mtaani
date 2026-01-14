"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, MapPin, Heart, LogOut, Package, Clock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 5500,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      total: 3200,
      status: "In Transit",
      items: 2,
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <ShoppingBag className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">24</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-accent mb-2" />
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">2</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Package className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">KES 125K</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Heart className="w-8 h-8 text-accent mb-2" />
                <p className="text-sm text-muted-foreground">Wishlist Items</p>
                <p className="text-2xl font-bold">8</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-transparent border-b w-full justify-start rounded-none">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Your latest purchases</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div
                            key={order.id}
                            className="flex justify-between items-start p-4 border rounded-lg hover:bg-muted/50 transition"
                          >
                            <div>
                              <p className="font-semibold">{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.date} • {order.items} items
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">KES {order.total}</p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>All Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12 text-muted-foreground">
                        Detailed order management coming soon
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12 text-muted-foreground">Your wishlist items coming soon</div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">john@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Type</p>
                    <p className="font-semibold">Wholesaler</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Main Office</p>
                      <p className="text-sm text-muted-foreground">123 Business Street, Nairobi, Kenya</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Addresses
                  </Button>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full bg-transparent text-destructive hover:bg-destructive/10">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
