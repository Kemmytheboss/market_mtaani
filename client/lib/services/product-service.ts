import { apiCall } from "../api-client"

export interface Product {
  id: string
  name: string
  description: string
  category: string
  vendor_id: string
  vendor_name: string
  price_retail: number
  price_wholesale: number
  min_wholesale_quantity: number
  stock_quantity: number
  image_url: string
  rating: number
  reviews_count: number
}

export interface ProductFilters {
  search?: string
  category?: string
  vendor_id?: string
  min_price?: number
  max_price?: number
  sort_by?: "price" | "rating" | "reviews"
  sort_order?: "asc" | "desc"
}

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value))
        }
      })
    }
    return apiCall<Product[]>(`/products?${params.toString()}`)
  },

  async getProductById(productId: string): Promise<Product> {
    return apiCall<Product>(`/products/${productId}`)
  },

  async searchProducts(query: string): Promise<Product[]> {
    return apiCall<Product[]>(`/products/search?q=${encodeURIComponent(query)}`)
  },

  async getProductsByVendor(vendorId: string): Promise<Product[]> {
    return apiCall<Product[]>(`/products/vendor/${vendorId}`)
  },

  async getCategories(): Promise<string[]> {
    return apiCall<string[]>("/products/categories")
  },
}
