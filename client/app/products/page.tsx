"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, ShoppingCart, Filter, X } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  vendor: string
  price: number
  wholesalePrice: number
  image: string
  description: string
  rating: number
  reviews: number
}

const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Produce",
    vendor: "Green Valley Farms",
    price: 450,
    wholesalePrice: 350,
    image: "/fresh-tomatoes.png",
    description: "Locally sourced premium tomatoes",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Maize Flour",
    category: "Grains",
    vendor: "Grain Masters",
    price: 850,
    wholesalePrice: 700,
    image: "/maize-flour.jpg",
    description: "Fine quality maize flour 25kg bag",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: "Sugar Beans",
    category: "Legumes",
    vendor: "Bean Depot",
    price: 650,
    wholesalePrice: 500,
    image: "/sugar-beans.jpg",
    description: "Premium grade sugar beans",
    rating: 4.7,
    reviews: 95,
  },
  {
    id: 4,
    name: "Cooking Oil",
    category: "Oils",
    vendor: "Oil Refineries Ltd",
    price: 1200,
    wholesalePrice: 950,
    image: "/cooking-oil-variety.png",
    description: "Pure refined cooking oil 5L",
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 5,
    name: "Onions",
    category: "Produce",
    vendor: "Green Valley Farms",
    price: 380,
    wholesalePrice: 280,
    image: "/fresh-onions.png",
    description: "Fresh red onions per kg",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 6,
    name: "Eggs (30 pieces)",
    category: "Dairy",
    vendor: "Farm Fresh Ltd",
    price: 950,
    wholesalePrice: 750,
    image: "/assorted-eggs.png",
    description: "Fresh farm eggs 30 pieces per carton",
    rating: 4.7,
    reviews: 178,
  },
  {
    id: 7,
    name: "Wheat Flour",
    category: "Grains",
    vendor: "Grain Masters",
    price: 750,
    wholesalePrice: 600,
    image: "/wheat-flour.jpg",
    description: "Premium wheat flour 25kg bag",
    rating: 4.4,
    reviews: 67,
  },
  {
    id: 8,
    name: "Red Peppers",
    category: "Produce",
    vendor: "Green Valley Farms",
    price: 520,
    wholesalePrice: 400,
    image: "/red-peppers.jpg",
    description: "Fresh vibrant red peppers",
    rating: 4.8,
    reviews: 112,
  },
  {
    id: 9,
    name: "Cabbages",
    category: "Produce",
    vendor: "Farm Fresh Ltd",
    price: 280,
    wholesalePrice: 200,
    image: "/fresh-cabbage.png",
    description: "Fresh green cabbages per kg",
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 10,
    name: "Rice",
    category: "Grains",
    vendor: "Grain Masters",
    price: 950,
    wholesalePrice: 800,
    image: "/bowl-of-steamed-rice.png",
    description: "Premium long grain rice 50kg bag",
    rating: 4.7,
    reviews: 145,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [userType, setUserType] = useState<"retail" | "wholesale">("retail")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [...new Set(ALL_PRODUCTS.map((p) => p.category))].sort()
  const vendors = [...new Set(ALL_PRODUCTS.map((p) => p.vendor))].sort()

  useEffect(() => {
    let filtered = ALL_PRODUCTS

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    // Vendor filter
    if (selectedVendors.length > 0) {
      filtered = filtered.filter((p) => selectedVendors.includes(p.vendor))
    }

    // Price filter
    const price = userType === "retail" ? "price" : "wholesalePrice"
    filtered = filtered.filter(
      (p) => p[price as keyof Product] >= priceRange[0] && p[price as keyof Product] <= priceRange[1],
    )

    // Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => (userType === "retail" ? a.price - b.price : a.wholesalePrice - b.wholesalePrice))
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => (userType === "retail" ? b.price - a.price : b.wholesalePrice - a.wholesalePrice))
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "reviews") {
      filtered.sort((a, b) => b.reviews - a.reviews)
    }

    setProducts(filtered)
  }, [searchTerm, selectedCategories, selectedVendors, priceRange, userType, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleVendor = (vendor: string) => {
    setSelectedVendors((prev) => (prev.includes(vendor) ? prev.filter((v) => v !== vendor) : [...prev, vendor]))
  }

  const activeFilters = selectedCategories.length + selectedVendors.length + (searchTerm ? 1 : 0)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Products</h1>
            <p className="text-muted-foreground">
              {products.length} products found {activeFilters > 0 && `(${activeFilters} filters applied)`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Customer Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="retail"
                      checked={userType === "retail"}
                      onChange={(e) => setUserType(e.target.value as "retail" | "wholesale")}
                    />
                    <span className="text-sm">Retail Prices</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="wholesale"
                      checked={userType === "wholesale"}
                      onChange={(e) => setUserType(e.target.value as "retail" | "wholesale")}
                    />
                    <span className="text-sm">Wholesale Prices</span>
                  </label>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Price Range</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Slider
                    min={0}
                    max={2000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                  <div className="flex gap-2 text-sm">
                    <span>KES {priceRange[0]}</span>
                    <span>-</span>
                    <span>KES {priceRange[1]}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      />
                      <span className="text-sm">{cat}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        ({ALL_PRODUCTS.filter((p) => p.category === cat).length})
                      </span>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Vendors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                  {vendors.map((vendor) => (
                    <label key={vendor} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={selectedVendors.includes(vendor)}
                        onCheckedChange={() => toggleVendor(vendor)}
                      />
                      <span className="text-sm">{vendor}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        ({ALL_PRODUCTS.filter((p) => p.vendor === vendor).length})
                      </span>
                    </label>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Sort Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search products, vendors..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="lg:hidden bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Products Grid */}
              {products.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No products found</h2>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategories([])
                        setSelectedVendors([])
                        setPriceRange([0, 2000])
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                      <CardContent className="p-0">
                        <div className="aspect-square bg-muted overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CardContent>
                      <CardHeader className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                            <CardDescription className="text-xs">{product.vendor}</CardDescription>
                          </div>
                          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full whitespace-nowrap">
                            {product.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          <span className="text-sm font-bold text-primary">{product.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.floor(product.rating) ? "text-accent" : "text-muted"}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
                      </CardHeader>

                      <CardContent className="pt-0 space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Price</p>
                          <p className="text-2xl font-bold text-primary">
                            KES {userType === "retail" ? product.price : product.wholesalePrice}
                          </p>
                          {userType === "wholesale" && (
                            <p className="text-xs text-green-600">
                              Save {Math.round(((product.price - product.wholesalePrice) / product.price) * 100)}%
                            </p>
                          )}
                        </div>

                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link href={`/products/${product.id}`} className="block">
                          <Button variant="outline" className="w-full bg-transparent">
                            View Details
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
