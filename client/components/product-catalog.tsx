"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart } from "lucide-react"
import Link from "next/link"

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Designer Leather Handbag",
    category: "Accessories",
    vendor: "Luxe Fashion House",
    price: 4500,
    wholesalePrice: 3500,
    image: "/elegant-leather-handbag.jpg",
    description: "Premium leather handbag with gold hardware",
  },
  {
    id: 2,
    name: "Men's Classic Oxford Shoes",
    category: "Shoes",
    vendor: "Shoe Gallery",
    price: 6800,
    wholesalePrice: 5200,
    image: "/mens-black-oxford-shoes.jpg",
    description: "Handcrafted genuine leather oxford shoes",
  },
  {
    id: 3,
    name: "Designer Perfume Collection",
    category: "Perfumes",
    vendor: "Fragrance Boutique",
    price: 8500,
    wholesalePrice: 6500,
    image: "/luxury-perfume-bottles.jpg",
    description: "Exclusive designer fragrance 100ml",
  },
  {
    id: 4,
    name: "Gold Plated Necklace Set",
    category: "Jewelry",
    vendor: "Gems & Gold",
    price: 3200,
    wholesalePrice: 2400,
    image: "/gold-necklace-jewelry-set.jpg",
    description: "18K gold plated necklace with matching earrings",
  },
  {
    id: 5,
    name: "Women's Summer Dress",
    category: "Clothing",
    vendor: "Fashion Forward",
    price: 2800,
    wholesalePrice: 2000,
    image: "/elegant-summer-dress.png",
    description: "Flowy summer dress in floral print",
  },
  {
    id: 6,
    name: "Casual Sneakers",
    category: "Shoes",
    vendor: "Urban Kicks",
    price: 4500,
    wholesalePrice: 3300,
    image: "/white-casual-sneakers.jpg",
    description: "Comfortable canvas sneakers for everyday wear",
  },
  {
    id: 7,
    name: "Silk Scarf Collection",
    category: "Accessories",
    vendor: "Elegance Textiles",
    price: 1800,
    wholesalePrice: 1200,
    image: "/colorful-silk-scarf.png",
    description: "Premium silk scarves in vibrant colors",
  },
  {
    id: 8,
    name: "Men's Formal Suit",
    category: "Clothing",
    vendor: "Tailored Elegance",
    price: 12000,
    wholesalePrice: 9500,
    image: "/mens-black-formal-suit.jpg",
    description: "Slim-fit formal suit with premium fabric",
  },
  {
    id: 9,
    name: "Diamond Stud Earrings",
    category: "Jewelry",
    vendor: "Gems & Gold",
    price: 5500,
    wholesalePrice: 4200,
    image: "/diamond-stud-earrings.jpg",
    description: "Brilliant cut diamond studs in sterling silver",
  },
  {
    id: 10,
    name: "Designer Sunglasses",
    category: "Accessories",
    vendor: "Shade Studio",
    price: 3800,
    wholesalePrice: 2800,
    image: "/designer-sunglasses.png",
    description: "UV protection designer sunglasses",
  },
  {
    id: 11,
    name: "Women's High Heels",
    category: "Shoes",
    vendor: "Heel Heaven",
    price: 5200,
    wholesalePrice: 3900,
    image: "/high-heels.png",
    description: "Elegant stiletto heels for special occasions",
  },
  {
    id: 12,
    name: "Men's Cologne Set",
    category: "Perfumes",
    vendor: "Fragrance Boutique",
    price: 7500,
    wholesalePrice: 5800,
    image: "/mens-cologne-bottle.jpg",
    description: "Sophisticated men's cologne 150ml",
  },
]

export default function ProductCatalog() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [userType, setUserType] = useState<"retail" | "wholesale">("retail")

  const categories = ["all", ...new Set(SAMPLE_PRODUCTS.map((p) => p.category))]

  useEffect(() => {
    let filtered = SAMPLE_PRODUCTS

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.vendor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    setProducts(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Browse Fashion & Accessories</h2>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search products or vendors..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button variant={userType === "retail" ? "default" : "outline"} onClick={() => setUserType("retail")}>
              Retail Prices
            </Button>
            <Button variant={userType === "wholesale" ? "default" : "outline"} onClick={() => setUserType("wholesale")}>
              Wholesale Prices
            </Button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="text-sm">{product.vendor}</CardDescription>
                    </div>
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="text-2xl font-bold text-primary">
                      KES {userType === "retail" ? product.price : product.wholesalePrice}
                    </p>
                    {userType === "wholesale" && (
                      <p className="text-xs text-muted-foreground">
                        Wholesale (Save {Math.round(((product.price - product.wholesalePrice) / product.price) * 100)}%)
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
    </section>
  )
}
