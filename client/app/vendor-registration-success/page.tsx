"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, Clock, FileText, LogIn } from "lucide-react"

export default function VendorRegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Market MTAANI!</h1>
          <p className="text-muted-foreground text-lg">Your vendor account is being set up</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
            <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Verification Email Sent</p>
              <p className="text-sm text-muted-foreground">
                Check your email for verification link. Click it to activate your account.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg opacity-75">
            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Approval Pending</p>
              <p className="text-sm text-muted-foreground">Our team reviews applications within 24-48 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg opacity-75">
            <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Account Ready</p>
              <p className="text-sm text-muted-foreground">Start adding products once approval is confirmed</p>
            </div>
          </div>
        </div>

        <Card className="mb-8 border shadow-lg">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">1. Verify Your Email</p>
              <p className="text-sm text-muted-foreground mb-3">
                Click the link in the confirmation email we sent to your registered email address.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">2. Complete Your Store Profile</p>
              <p className="text-sm text-muted-foreground mb-3">
                Add store logo, banner, and more detailed information to build trust with buyers.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">3. Add Your First Products</p>
              <p className="text-sm text-muted-foreground mb-3">
                Once approved, start listing your products with detailed descriptions and pricing.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">4. Get Your First Orders</p>
              <p className="text-sm text-muted-foreground">
                Manage orders from your dashboard and grow your business with Market MTAANI.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 p-6 bg-accent/10 border-accent/20">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Didn't receive email?</p>
            <Button variant="outline" className="bg-transparent">
              Resend Verification Email
            </Button>
          </div>
        </Card>

        <div className="space-y-3">
          <Link href="/login">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In to Your Account
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent py-6">
              Back to Market MTAANI
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-lg border">
          <p className="text-sm font-semibold mb-2">Have Questions?</p>
          <p className="text-sm text-muted-foreground mb-4">
            Our vendor support team is here to help. Contact us at vendor-support@marketmtaani.com or call +254 700 123
            456
          </p>
        </div>
      </div>
    </div>
  )
}
