import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
            Fashion. Style. Expression.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
            Market MTAANI is East Africa's premier fashion marketplace. Discover the latest in clothes, shoes, perfumes,
            jewelry, and accessories. Wholesalers, retailers, and fashion enthusiasts come together to build style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Browse Products
              </Button>
            </Link>
            <Link href="/become-vendor">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Start Selling
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 w-full">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">250K+</p>
              <p className="text-sm text-muted-foreground">Fashion Items</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">10K+</p>
              <p className="text-sm text-muted-foreground">Fashion Vendors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">75K+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
