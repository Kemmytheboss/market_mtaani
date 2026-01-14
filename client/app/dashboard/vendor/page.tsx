"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Package, ShoppingCart, DollarSign, Plus } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const chartData = [
  { date: "Jan 1", sales: 2000, orders: 4 },
  { date: "Jan 5", sales: 3000, orders: 6 },
  { date: "Jan 10", sales: 2800, orders: 5 },
  { date: "Jan 15", sales: 3900, orders: 8 },
  { date: "Jan 20", sales: 4300, orders: 9 },
]

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
              <p className="text-muted-foreground">Welcome back to your store</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <DollarSign className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">KES 125K</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <ShoppingCart className="w-8 h-8 text-accent mb-2" />
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">42</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Package className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">128</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-accent mb-2" />
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">3.2%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Your sales for the last 20 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#1a7f7e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Manage Products
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent justify-start">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Orders
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
