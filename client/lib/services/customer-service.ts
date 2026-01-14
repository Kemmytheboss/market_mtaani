import { apiCall } from "../api-client"

export interface Customer {
  id: string
  email: string
  name: string
  customer_type: "retailer" | "wholesaler"
  phone: string
  address: string
}

export interface LoginResponse {
  access_token: string
  customer: Customer
}

export interface SignupPayload {
  email: string
  password: string
  name: string
  customer_type: "retailer" | "wholesaler"
  phone: string
  address: string
}

export const customerService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    return apiCall<LoginResponse>("/customers/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  async signup(data: SignupPayload): Promise<LoginResponse> {
    return apiCall<LoginResponse>("/customers/signup", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async getProfile(customerId: string): Promise<Customer> {
    return apiCall<Customer>(`/customers/${customerId}`)
  },

  async updateProfile(customerId: string, data: Partial<Customer>): Promise<Customer> {
    return apiCall<Customer>(`/customers/${customerId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },
}
