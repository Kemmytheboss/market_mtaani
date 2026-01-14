"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react"

interface VendorProduct {
  id: number
  name: string
  sku: string
  category: string
  price: number
  wholesalePrice: number
  stock: number
  status: "active" | "inactive" | "draft"
  sales: number
  rating: number
}

const VENDOR_PRODUCTS: VendorProduct[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    sku: "PROD-001",
    category: "Produce",
    price: 450,
    wholesalePrice: 350,
    stock: 150,
    status: "active",
    sales: 342,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Red Onions",
    sku: "PROD-002",
    category: "Produce",
    price: 380,
    wholesalePrice: 280,
    stock: 200,
    status: "active",
    sales: 456,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Hot Peppers",
    sku: "PROD-003",
    category: "Produce",
    price: 520,
    wholesalePrice: 400,
    stock: 80,
    status: "active",
    sales: 128,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Garlic Cloves",
    sku: "PROD-004",
    category: "Produce",
    price: 650,
    wholesalePrice: 500,
    stock: 0,
    status: "inactive",
    sales: 89,
    rating: 4.6,
  },
]

export default function VendorProductsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [products] = useState(VENDOR_PRODUCTS)

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || p.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0)

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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Products</h1>
              <p className="text-muted-foreground">Manage your product catalog</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Products</p>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Active</p>
                <p className="text-3xl font-bold text-primary">{activeProducts}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Stock</p>
                <p className="text-3xl font-bold">{totalStock}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
                <p className="text-3xl font-bold text-accent">{totalSales}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Product List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
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
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Product Name</th>
                      <th className="text-left py-3 px-4 font-semibold">SKU</th>
                      <th className="text-left py-3 px-4 font-semibold">Price</th>
                      <th className="text-left py-3 px-4 font-semibold">Stock</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Sales</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-muted/50 transition">
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4 text-muted-foreground text-xs font-mono">{product.sku}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold">KES {product.price}</p>
                            <p className="text-xs text-muted-foreground">W: {product.wholesalePrice}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {product.stock} units
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              product.status === "active"
                                ? "bg-blue-100 text-blue-800"
                                : product.status === "draft"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold">{product.sales}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-muted rounded transition text-muted-foreground hover:text-foreground">
                              {product.status === "active" ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                            <button className="p-1.5 hover:bg-muted rounded transition text-muted-foreground hover:text-primary">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 hover:bg-muted rounded transition text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No products found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
