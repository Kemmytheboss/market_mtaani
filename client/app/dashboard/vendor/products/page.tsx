import { Suspense } from "react"
import VendorProductsContent from "./products-content"

export default function VendorProductsPage() {
  return (
    <Suspense fallback={null}>
      <VendorProductsContent />
    </Suspense>
  )
}
