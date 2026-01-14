import Header from "@/components/header"
import Hero from "@/components/hero"
import ProductCatalog from "@/components/product-catalog"
import Footer from "@/components/footer"

export const metadata = {
  title: "Market MTAANI - Fashion & Accessories Marketplace",
  description:
    "Shop clothes, shoes, perfumes, jewelry, and accessories. Connect with fashion vendors and buy wholesale or retail.",
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductCatalog />
      <Footer />
    </>
  )
}
