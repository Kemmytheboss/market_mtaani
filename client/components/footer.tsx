import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Market MTAANI</h3>
            <p className="text-sm opacity-80">
              East Africa's trusted B2B/B2C marketplace connecting vendors and buyers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="opacity-80 hover:opacity-100 transition">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/become-vendor" className="opacity-80 hover:opacity-100 transition">
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link href="/categories" className="opacity-80 hover:opacity-100 transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="opacity-80 hover:opacity-100 transition">
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="opacity-80 hover:opacity-100 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="opacity-80 hover:opacity-100 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-80 hover:opacity-100 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="opacity-80 hover:opacity-100 transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@marketmtaani.com</span>
              </li>
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80">© 2026 Market MTAANI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <Link href="/privacy" className="opacity-80 hover:opacity-100 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="opacity-80 hover:opacity-100 transition">
              Terms
            </Link>
            <Link href="/cookies" className="opacity-80 hover:opacity-100 transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
