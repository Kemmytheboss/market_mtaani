"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Market MTAANI
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="hover:opacity-80 transition">
            Browse Products
          </Link>
          <Link href="/become-vendor" className="hover:opacity-80 transition">
            Become a Vendor
          </Link>
          <Link href="/about" className="hover:opacity-80 transition">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:inline">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
              Sign In
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary-foreground">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-primary">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/products" className="hover:opacity-80 transition">
              Browse Products
            </Link>
            <Link href="/become-vendor" className="hover:opacity-80 transition">
              Become a Vendor
            </Link>
            <Link href="/about" className="hover:opacity-80 transition">
              About
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
