import { apiCall } from "../api-client"

export interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  subtotal: number
}

export interface Order {
  id: string
  customer_id: string
  vendor_id: string
  order_date: string
  status: "pending" | "confirmed" | "packing" | "ready" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  items: OrderItem[]
  shipping_address: string
  tracking_number?: string
}

export interface CreateOrderPayload {
  customer_id: string
  vendor_id: string
  items: Array<{ product_id: string; quantity: number }>
  shipping_address: string
  payment_method: string
}

export const orderService = {
  async getCustomerOrders(customerId: string): Promise<Order[]> {
    return apiCall<Order[]>(`/orders/customer/${customerId}`)
  },

  async getVendorOrders(vendorId: string): Promise<Order[]> {
    return apiCall<Order[]>(`/orders/vendor/${vendorId}`)
  },

  async getOrderById(orderId: string): Promise<Order> {
    return apiCall<Order>(`/orders/${orderId}`)
  },

  async createOrder(data: CreateOrderPayload): Promise<Order> {
    return apiCall<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async updateOrderStatus(orderId: string, status: Order["status"]): Promise<Order> {
    return apiCall<Order>(`/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  },

  async getOrderRevenue(vendorId: string, period: string): Promise<{ total: number; orders: number }> {
    return apiCall<{ total: number; orders: number }>(`/orders/vendor/${vendorId}/revenue?period=${period}`)
  },

  async getOrdersByStatus(vendorId: string, status: Order["status"]): Promise<Order[]> {
    return apiCall<Order[]>(`/orders/vendor/${vendorId}/status/${status}`)
  },
}
