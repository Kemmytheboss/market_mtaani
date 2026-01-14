import { Suspense } from "react"
import VendorOrdersContent from "./orders-content"

export default function VendorOrdersPage() {
  return (
    <Suspense fallback={null}>
      <VendorOrdersContent />
    </Suspense>
  )
}
