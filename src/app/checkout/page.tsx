"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Wallet, Building2, ShieldCheck, ArrowRight, Ticket as TicketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { status } = useSession();
  
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passport: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    
    if (status === "authenticated") {
      fetch("/api/user/profile")
        .then(res => res.json())
        .then(data => {
          if (data && !data.message) {
            const names = data.name ? data.name.split(" ") : ["", ""];
            setFormData(prev => ({
              ...prev,
              firstName: names[0] || "",
              lastName: names.slice(1).join(" ") || "",
              email: data.email || "",
              phone: data.phone || "",
              passport: data.passport || ""
            }));
          }
        })
        .catch(console.error);
    }

    const saved = localStorage.getItem("dekotix_cart");
    if (saved) {
      setOrderSummary(JSON.parse(saved));
    }
  }, [status, router]);

  const subtotal = orderSummary.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.11; // 11% Tax
  const platformFee = 50000;
  const total = subtotal + tax + platformFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickets: orderSummary }),
      });

      if (res.ok) {
        localStorage.removeItem("dekotix_cart");
        window.location.href = "/dashboard";
      } else {
        alert("Please log in to purchase a ticket.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to process payment");
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen pt-24 pb-32 bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32 bg-background relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 w-full h-[400px] bg-gradient-to-b from-primary/10 to-transparent -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase securely.</p>
        </div>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Form & Payment */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* User Information Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-border/50 bg-card/60 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>We'll use this to send your e-tickets and updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">National ID / Passport Number</label>
                    <input
                      type="text"
                      required
                      value={formData.passport}
                      onChange={(e) => setFormData({...formData, passport: e.target.value})}
                      className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="Must match physical ID for entry"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="border-border/50 bg-card/60 backdrop-blur-md overflow-hidden">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>All transactions are secure and encrypted.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("credit-card")}
                      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === "credit-card" ? "border-primary bg-primary/10" : "border-border/50 bg-background/50 hover:bg-card"}`}
                    >
                      <CreditCard className={`w-8 h-8 ${paymentMethod === "credit-card" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("virtual-account")}
                      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === "virtual-account" ? "border-primary bg-primary/10" : "border-border/50 bg-background/50 hover:bg-card"}`}
                    >
                      <Building2 className={`w-8 h-8 ${paymentMethod === "virtual-account" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">Bank Transfer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("e-wallet")}
                      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === "e-wallet" ? "border-primary bg-primary/10" : "border-border/50 bg-background/50 hover:bg-card"}`}
                    >
                      <Wallet className={`w-8 h-8 ${paymentMethod === "e-wallet" ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">E-Wallet</span>
                    </button>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Card Number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none">CVC</label>
                          <input type="text" placeholder="123" className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="sticky top-24">
              <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-2xl">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Items */}
                  <div className="space-y-4">
                    {orderSummary.map((item, index) => (
                      <div key={index} className="flex justify-between items-start gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <TicketIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold">{item.name}</span>
                            <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="pt-4 space-y-3 border-t border-border/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="tabular-nums">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (11%)</span>
                      <span className="tabular-nums">{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Platform Fee</span>
                      <span className="tabular-nums">{formatPrice(platformFee)}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-6 bg-background/50 border-t border-border/50 pt-6">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary tabular-nums">{formatPrice(total)}</span>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20 group overflow-hidden relative"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2 z-10 relative">
                        <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 z-10 relative">
                        <ShieldCheck className="w-5 h-5" />
                        Pay Now
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By clicking "Pay Now", you agree to our Terms of Service and Purchase Policy.
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
