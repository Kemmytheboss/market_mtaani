import { Suspense } from "react"
import OrdersContent from "./orders-content"

export default function CustomerOrdersPage() {
  return (
    <Suspense fallback={null}>
      <OrdersContent />
    </Suspense>
  )
}
