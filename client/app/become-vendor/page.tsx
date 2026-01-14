"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Store, Users, TrendingUp, ArrowLeft } from "lucide-react"

interface VendorForm {
  storeName: string
  businessType: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  businessDescription: string
  businessAddress: string
  businessCity: string
  businessCountry: string
  taxId: string
  bankName: string
  accountNumber: string
  accountHolder: string
}

export default function BecomeVendorPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<"info" | "details" | "banking">("info")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const [formData, setFormData] = useState<VendorForm>({
    storeName: "",
    businessType: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessDescription: "",
    businessAddress: "",
    businessCity: "",
    businessCountry: "",
    taxId: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateBasicInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.storeName.trim()) newErrors.storeName = "Store name is required"
    if (!formData.businessType) newErrors.businessType = "Business type is required"
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateDetails = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.businessDescription.trim()) newErrors.businessDescription = "Business description is required"
    if (!formData.businessAddress.trim()) newErrors.businessAddress = "Business address is required"
    if (!formData.businessCity.trim()) newErrors.businessCity = "City is required"
    if (!formData.businessCountry.trim()) newErrors.businessCountry = "Country is required"
    if (!formData.taxId.trim()) newErrors.taxId = "Tax ID is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateBanking = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required"
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required"
    if (!formData.accountHolder.trim()) newErrors.accountHolder = "Account holder name is required"
    if (!agreeTerms) newErrors.terms = "You must agree to terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (activeStep === "info" && validateBasicInfo()) {
      setActiveStep("details")
    } else if (activeStep === "details" && validateDetails()) {
      setActiveStep("banking")
    }
  }

  const handleSubmit = async () => {
    if (!validateBanking()) return

    setIsLoading(true)

    try {
      // In production, call your backend API
      console.log("Vendor registration:", formData)

      // Simulate successful registration
      setTimeout(() => {
        router.push("/vendor-registration-success")
      }, 500)
    } catch (err) {
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Market MTAANI
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold ${activeStep === "info" || (activeStep !== "info" && true) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                1
              </div>
              <p className="text-sm font-semibold">Basic Info</p>
            </div>

            <div className="text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold ${activeStep === "details" || activeStep === "banking" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                2
              </div>
              <p className="text-sm font-semibold">Business Details</p>
            </div>

            <div className="text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold ${activeStep === "banking" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                3
              </div>
              <p className="text-sm font-semibold">Banking Info</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-muted text-muted-foreground">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold">Complete</p>
            </div>
          </div>

          <Card className="border shadow-lg">
            {activeStep === "info" && (
              <div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Tell us about your store</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Store Name</label>
                    <Input
                      placeholder="Your store name"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                    />
                    {errors.storeName && <p className="text-xs text-destructive">{errors.storeName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Type</label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="produce">Produce Supplier</SelectItem>
                        <SelectItem value="grains">Grains & Cereals</SelectItem>
                        <SelectItem value="oils">Oils & Fats</SelectItem>
                        <SelectItem value="dairy">Dairy Products</SelectItem>
                        <SelectItem value="spices">Spices & Seasonings</SelectItem>
                        <SelectItem value="processed">Processed Foods</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.businessType && <p className="text-xs text-destructive">{errors.businessType}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="vendor@example.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        placeholder="+254 700 123 456"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  <Button
                    onClick={handleNextStep}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Next: Business Details
                  </Button>
                </CardContent>
              </div>
            )}

            {activeStep === "details" && (
              <div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Business Details
                  </CardTitle>
                  <CardDescription>Tell us more about your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Description</label>
                    <Textarea
                      placeholder="Describe your business, products, and experience..."
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleChange}
                      rows={4}
                    />
                    {errors.businessDescription && (
                      <p className="text-xs text-destructive">{errors.businessDescription}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Address</label>
                    <Input
                      placeholder="Street address"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleChange}
                    />
                    {errors.businessAddress && <p className="text-xs text-destructive">{errors.businessAddress}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Input
                        placeholder="City"
                        name="businessCity"
                        value={formData.businessCity}
                        onChange={handleChange}
                      />
                      {errors.businessCity && <p className="text-xs text-destructive">{errors.businessCity}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Country</label>
                      <Input
                        placeholder="Country"
                        name="businessCountry"
                        value={formData.businessCountry}
                        onChange={handleChange}
                      />
                      {errors.businessCountry && <p className="text-xs text-destructive">{errors.businessCountry}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tax ID</label>
                      <Input placeholder="Tax ID/PIN" name="taxId" value={formData.taxId} onChange={handleChange} />
                      {errors.taxId && <p className="text-xs text-destructive">{errors.taxId}</p>}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setActiveStep("info")}>
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Next: Banking Info
                    </Button>
                  </div>
                </CardContent>
              </div>
            )}

            {activeStep === "banking" && (
              <div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Banking Information
                  </CardTitle>
                  <CardDescription>Provide your bank details for payouts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bank Name</label>
                    <Input placeholder="Bank name" name="bankName" value={formData.bankName} onChange={handleChange} />
                    {errors.bankName && <p className="text-xs text-destructive">{errors.bankName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Number</label>
                    <Input
                      placeholder="Bank account number"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                    />
                    {errors.accountNumber && <p className="text-xs text-destructive">{errors.accountNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Holder Name</label>
                    <Input
                      placeholder="Name on bank account"
                      name="accountHolder"
                      value={formData.accountHolder}
                      onChange={handleChange}
                    />
                    {errors.accountHolder && <p className="text-xs text-destructive">{errors.accountHolder}</p>}
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <p className="text-sm text-primary mb-2 font-semibold">Security Note</p>
                    <p className="text-xs text-muted-foreground">
                      Your banking information is encrypted and secure. We never share your details with third parties.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm cursor-pointer leading-tight flex-1">
                      I agree to Market MTAANI's{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms & Conditions
                      </Link>
                      ,{" "}
                      <Link href="/vendor-agreement" className="text-primary hover:underline">
                        Vendor Agreement
                      </Link>
                      , and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setActiveStep("details")}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Complete Registration"}
                    </Button>
                  </div>
                </CardContent>
              </div>
            )}
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
